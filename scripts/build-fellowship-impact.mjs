/**
 * Builds the public Fellowship 2026 impact numbers from the private survey
 * responses and writes them to data/fellowship-2026-impact.json. The /fellowship
 * page reads that file, so the public page never touches the database and never
 * sees a name, email or phone number. Only totals are written.
 *
 * How the numbers are counted:
 * - One response per fellow: duplicates (same email) keep the latest submission.
 * - Outcomes count only an explicit yes or a count of at least one (see
 *   lib/fellowship-survey.mjs).
 * - Projects and LeetCode totals only include fellows who gave a number, and
 *   ignore numbers too large to be real.
 *
 * Read only. Usage (from project root, with IMPACT_MONGODB_URI in .env):
 *   node scripts/build-fellowship-impact.mjs
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

import { answeredYes } from '../lib/fellowship-survey.mjs';

const OUTPUT = path.join(process.cwd(), 'data', 'fellowship-2026-impact.json');
const MAX_PROJECTS = 50;
const MAX_LEETCODE = 1000;
const MAX_COUNT = 150; // talks, articles, pages and sessions per fellow over three months

const number = (value, max) => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 && n <= max ? n : undefined;
};

const rating = (value) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : undefined;
};

function ratingSummary(values) {
  const valid = values.map(rating).filter((n) => n !== undefined);
  const average = valid.reduce((a, b) => a + b, 0) / (valid.length || 1);
  return {
    average: Math.round(average * 10) / 10,
    fourOrFive: valid.filter((n) => n >= 4).length,
    answered: valid.length,
  };
}

function total(values, max) {
  const valid = values.map((v) => number(v, max)).filter((n) => n !== undefined);
  return { total: Math.round(valid.reduce((a, b) => a + b, 0)), reportedBy: valid.length };
}

async function main() {
  if (!process.env.IMPACT_MONGODB_URI) throw new Error('IMPACT_MONGODB_URI is not set');
  const conn = await mongoose.createConnection(process.env.IMPACT_MONGODB_URI, { serverSelectionTimeoutMS: 10000 }).asPromise();

  try {
    const docs = await conn.db
      .collection('fellowshipsurveyresponses')
      .find({}, { projection: { sourcePayload: 0 } })
      .toArray();

    const latest = new Map();
    for (const doc of docs) {
      const key = String(doc.participant?.email || doc._id).trim().toLowerCase();
      const current = latest.get(key);
      const time = new Date(doc.source?.submittedAt || doc.createdAt || 0).getTime();
      if (!current || time > current.time) latest.set(key, { time, doc });
    }
    const fellows = [...latest.values()].map((entry) => entry.doc);

    const yes = (pick) => fellows.filter((f) => answeredYes(pick(f))).length;
    const dates = docs.map((d) => d.source?.submittedAt).filter(Boolean).map((d) => new Date(d).getTime());

    const impact = {
      survey: {
        from: new Date(Math.min(...dates)).toISOString().slice(0, 10),
        to: new Date(Math.max(...dates)).toISOString().slice(0, 10),
        responses: docs.length,
        respondents: fellows.length,
      },
      projects: total(fellows.map((f) => f.activity?.projectsDeveloped), MAX_PROJECTS),
      leetcode: total(fellows.map((f) => f.activity?.leetcodeSolved), MAX_LEETCODE),
      beyondCode: {
        mindsetTalks: total(fellows.map((f) => f.activity?.mindsetTalksCompleted), MAX_COUNT).total,
        spiritualTalks: total(fellows.map((f) => f.activity?.spiritualTalksCompleted), MAX_COUNT).total,
        dinnerTalks: total(fellows.map((f) => f.activity?.dinnerEngineerTalksCompleted), MAX_COUNT).total,
        articlesRead: total(fellows.map((f) => f.activity?.articlesRead), MAX_COUNT).total,
        reflectionPages: total(fellows.map((f) => f.activity?.thoughtQuestionPagesWritten), MAX_COUNT).total,
        dsaRecordingsWatched: total(fellows.map((f) => f.activity?.dsaRecordedSessionsWatched), MAX_COUNT).total,
        liveSessionsAttended: total(fellows.map((f) => f.activity?.engineeringSessionsAttended), MAX_COUNT).total,
      },
      outcomes: {
        interviews: yes((f) => f.outcomes?.interviewsCleared),
        internships: yes((f) => f.outcomes?.internshipCracked),
        jobs: yes((f) => f.outcomes?.jobCracked),
        freelance: yes((f) => f.activity?.freelanceWork),
        openSource: yes((f) => f.activity?.openSourceWork),
        anyPath: fellows.filter((f) =>
          [f.outcomes?.interviewsCleared, f.outcomes?.internshipCracked, f.outcomes?.jobCracked, f.activity?.freelanceWork, f.activity?.openSourceWork].some(answeredYes),
        ).length,
      },
      ratings: {
        program: ratingSummary(fellows.map((f) => f.ratings?.program?.overallExperience)),
        mentor: ratingSummary(fellows.map((f) => f.ratings?.mentor?.overallSupport)),
      },
    };

    fs.writeFileSync(OUTPUT, JSON.stringify(impact, null, 2) + '\n');
    console.log(JSON.stringify(impact, null, 2));
    console.log(`\nWrote ${path.relative(process.cwd(), OUTPUT)}`);
  } finally {
    await conn.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
