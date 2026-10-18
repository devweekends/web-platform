import { Connection, Document, Model, Schema } from 'mongoose';

export const FELLOWSHIP_SURVEY_SOURCES = [
  'fellowship-2026-stats',
  'fellowship-2026-data-engineering-clan',
] as const;

export type FellowshipSurveySource = (typeof FELLOWSHIP_SURVEY_SOURCES)[number];

interface FellowshipRatings {
  programStructure?: string;
  sessionQuality?: string;
  learningResources?: string;
  communityExperience?: string;
  overallExperience?: string;
}

interface MentorRatings {
  availability?: string;
  guidance?: string;
  technicalKnowledge?: string;
  communication?: string;
  overallSupport?: string;
}

export interface IFellowshipSurveyResponse extends Document {
  source: {
    form: FellowshipSurveySource;
    rowKey: string;
    submittedAt?: Date;
  };
  dedupeKey: string;
  participant: {
    name: string;
    email: string;
    phone?: string;
  };
  fellowship: {
    program?: string;
    clanName?: string;
    mentorName?: string;
  };
  activity: {
    projectsDeveloped?: number;
    projectDetails?: string;
    openSourceWork?: string;
    freelanceWork?: string;
    remotePlatform?: string;
    leetcodeSolved?: number;
    mindsetTalksCompleted?: number;
    articlesRead?: number;
    dinnerEngineerTalksCompleted?: number;
    spiritualTalksCompleted?: number;
    thoughtQuestionPagesWritten?: number;
    dsaRecordedSessionsWatched?: number;
    engineeringSessionsAttended?: number;
    preferredLearningFormat?: string;
  };
  outcomes: {
    interviewsCleared?: string;
    internshipCracked?: string;
    jobCracked?: string;
  };
  ratings: {
    program: FellowshipRatings;
    mentor: MentorRatings;
  };
  feedback: {
    postFellowshipSupport?: string;
    upcomingPrograms?: string;
    fellowshipHelp?: string;
    mentorExperience?: string;
    fellowshipExperience?: string;
    changeAndKeep?: string;
    additionalComments?: string;
  };
  // Keeps the original Google Form response intact for a lossless, auditable import.
  sourcePayload?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const ratingFields = {
  programStructure: { type: String, trim: true, maxlength: 100 },
  sessionQuality: { type: String, trim: true, maxlength: 100 },
  learningResources: { type: String, trim: true, maxlength: 100 },
  communityExperience: { type: String, trim: true, maxlength: 100 },
  overallExperience: { type: String, trim: true, maxlength: 100 },
};

const FellowshipSurveyResponseSchema = new Schema<IFellowshipSurveyResponse>(
  {
    source: {
      form: { type: String, enum: FELLOWSHIP_SURVEY_SOURCES, required: true },
      rowKey: { type: String, required: true, trim: true, maxlength: 200 },
      submittedAt: Date,
    },
    dedupeKey: { type: String, required: true, trim: true, maxlength: 128 },
    participant: {
      name: { type: String, required: true, trim: true, maxlength: 120 },
      email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
      phone: { type: String, trim: true, maxlength: 60 },
    },
    fellowship: {
      program: { type: String, trim: true, maxlength: 120 },
      clanName: { type: String, trim: true, maxlength: 120 },
      mentorName: { type: String, trim: true, maxlength: 120 },
    },
    activity: {
      projectsDeveloped: { type: Number, min: 0 },
      projectDetails: { type: String, trim: true, maxlength: 5000 },
      openSourceWork: { type: String, trim: true, maxlength: 1000 },
      freelanceWork: { type: String, trim: true, maxlength: 1000 },
      remotePlatform: { type: String, trim: true, maxlength: 500 },
      leetcodeSolved: { type: Number, min: 0 },
      mindsetTalksCompleted: { type: Number, min: 0 },
      articlesRead: { type: Number, min: 0 },
      dinnerEngineerTalksCompleted: { type: Number, min: 0 },
      spiritualTalksCompleted: { type: Number, min: 0 },
      thoughtQuestionPagesWritten: { type: Number, min: 0 },
      dsaRecordedSessionsWatched: { type: Number, min: 0 },
      engineeringSessionsAttended: { type: Number, min: 0 },
      preferredLearningFormat: { type: String, trim: true, maxlength: 500 },
    },
    outcomes: {
      interviewsCleared: { type: String, trim: true, maxlength: 500 },
      internshipCracked: { type: String, trim: true, maxlength: 500 },
      jobCracked: { type: String, trim: true, maxlength: 500 },
    },
    ratings: {
      program: ratingFields,
      mentor: {
        availability: { type: String, trim: true, maxlength: 100 },
        guidance: { type: String, trim: true, maxlength: 100 },
        technicalKnowledge: { type: String, trim: true, maxlength: 100 },
        communication: { type: String, trim: true, maxlength: 100 },
        overallSupport: { type: String, trim: true, maxlength: 100 },
      },
    },
    feedback: {
      postFellowshipSupport: { type: String, trim: true, maxlength: 5000 },
      upcomingPrograms: { type: String, trim: true, maxlength: 1000 },
      fellowshipHelp: { type: String, trim: true, maxlength: 5000 },
      mentorExperience: { type: String, trim: true, maxlength: 5000 },
      fellowshipExperience: { type: String, trim: true, maxlength: 5000 },
      changeAndKeep: { type: String, trim: true, maxlength: 5000 },
      additionalComments: { type: String, trim: true, maxlength: 5000 },
    },
    sourcePayload: { type: Schema.Types.Mixed, select: false },
  },
  { timestamps: true },
);

// The import will use a stable key derived from the source file and source row.
FellowshipSurveyResponseSchema.index({ 'source.form': 1, 'source.rowKey': 1 }, { unique: true });
FellowshipSurveyResponseSchema.index({ dedupeKey: 1 }, { unique: true });
FellowshipSurveyResponseSchema.index({ 'participant.email': 1, 'source.submittedAt': 1 });
FellowshipSurveyResponseSchema.index({ 'fellowship.clanName': 1, 'fellowship.mentorName': 1 });

export function getFellowshipSurveyResponseModel(
  connection: Connection,
): Model<IFellowshipSurveyResponse> {
  return (
    (connection.models.FellowshipSurveyResponse as Model<IFellowshipSurveyResponse> | undefined) ||
    connection.model<IFellowshipSurveyResponse>(
      'FellowshipSurveyResponse',
      FellowshipSurveyResponseSchema,
    )
  );
}
