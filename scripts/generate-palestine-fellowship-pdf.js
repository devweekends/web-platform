const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Output directory
const outputDir = path.join(__dirname, "../images/templates/initiatives");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create PDF
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  bufferPages: true,
  autoFirstPage: true,
  info: {
    Title: "Dev Weekends Palestine Tech Fellowship Initiative",
    Author: "Dev Weekends",
    Subject: "Tech Fellowship for Palestinian Engineers",
  },
});

const outputPath = path.join(outputDir, "DevWeekends-Palestine-Fellowship-Initiative.pdf");
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Colors
const BLACK = "#18181B";
const GRAY = "#71717A";
const LIGHT_GRAY = "#E4E4E7";
const WHITE = "#FAFAFA";
const PALESTINE_GREEN = "#009736";
const PALESTINE_RED = "#CE1126";

// Helper functions
function drawHeader(doc, pageNum) {
  doc.save();
  doc.fontSize(8).fillColor(GRAY).text("DEV WEEKENDS", 60, 30, { characterSpacing: 2 });
  doc.fontSize(8).fillColor(GRAY).text(`${pageNum}`, 535, 30, { align: "right" });
  doc.restore();
}

function drawFooter(doc) {
  doc.save();
  doc.moveTo(60, 780).lineTo(535, 780).strokeColor(LIGHT_GRAY).lineWidth(0.5).stroke();
  doc.fontSize(8).fillColor(GRAY).text("devweekends.com", 60, 790);
  doc.fontSize(8).fillColor(GRAY).text("Palestine Tech Fellowship Initiative", 535, 790, { align: "right", width: 200 });
  doc.restore();
}

function drawPalestineFlag(doc, x, y, width, height) {
  const stripeHeight = height / 3;
  doc.rect(x, y, width, stripeHeight).fill("#000000");
  doc.rect(x, y + stripeHeight, width, stripeHeight).fill("#FFFFFF");
  doc.rect(x, y + stripeHeight * 2, width, stripeHeight).fill(PALESTINE_GREEN);
  doc.save();
  doc.moveTo(x, y).lineTo(x + width * 0.35, y + height / 2).lineTo(x, y + height).fill(PALESTINE_RED);
  doc.restore();
}

// ============================================
// PAGE 1: COVER
// ============================================
function page1Cover() {
  doc.rect(0, 0, 8, 842).fill(BLACK);

  doc.fontSize(10).fillColor(BLACK).text("DEV WEEKENDS", 60, 60, { characterSpacing: 3 });
  doc.fontSize(8).fillColor(GRAY).text("EMPOWERING ENGINEERS SINCE 2017", 60, 78, { characterSpacing: 1 });

  drawPalestineFlag(doc, 60, 160, 120, 80);

  doc.fontSize(42).fillColor(BLACK).text("Palestine Tech", 60, 280, { lineGap: 5 });
  doc.fontSize(42).fillColor(BLACK).text("Fellowship Initiative", 60, 335);

  doc.fontSize(14).fillColor(GRAY).text("A Zero-Cost Technical Mentorship Program", 60, 410);
  doc.fontSize(14).fillColor(GRAY).text("for Palestinian Engineers and Students", 60, 430);

  doc.rect(60, 470, 100, 3).fill(BLACK);

  doc.fontSize(11).fillColor(BLACK).text("4-Month Intensive Fellowship", 60, 510);
  doc.fontSize(11).fillColor(BLACK).text("200 Students Capacity", 60, 530);
  doc.fontSize(11).fillColor(BLACK).text("70% Projected Placement Rate", 60, 550);
  doc.fontSize(11).fillColor(BLACK).text("100% Free - No Funding Required", 60, 570);

  doc.rect(480, 60, 50, 50).stroke(BLACK);
  doc.rect(495, 75, 50, 50).fill(LIGHT_GRAY);

  doc.fontSize(10).fillColor(GRAY).text("devweekends.com", 60, 750);
}

// ============================================
// PAGE 2: EXECUTIVE SUMMARY
// ============================================
function page2ExecutiveSummary() {
  doc.addPage();
  drawHeader(doc, 2);

  doc.fontSize(9).fillColor(GRAY).text("01", 60, 80, { characterSpacing: 2 });
  doc.fontSize(9).fillColor(GRAY).text("EXECUTIVE SUMMARY", 60, 95, { characterSpacing: 2 });

  doc.fontSize(28).fillColor(BLACK).text("The Opportunity", 60, 130);
  doc.rect(60, 170, 60, 2).fill(BLACK);

  const summaryText = `Dev Weekends, a volunteer-driven tech community operating since 2017, proposes a dedicated technical fellowship program for Palestinian engineers and students affected by the ongoing crisis.

This initiative leverages our existing infrastructure, mentor network, and proven curriculum to provide world-class technical training at zero cost to participants and zero external funding requirement.`;

  doc.fontSize(11).fillColor(GRAY).text(summaryText, 60, 195, {
    width: 475,
    lineGap: 7,
    align: "justify",
  });

  doc.rect(60, 305, 475, 170).fill("#F4F4F5");
  doc.rect(60, 305, 4, 170).fill(BLACK);

  doc.fontSize(10).fillColor(BLACK).text("PROGRAM FUNDAMENTALS", 80, 320, { characterSpacing: 2 });

  const keyPoints = [
    "Duration: 4-month intensive fellowship program",
    "Capacity: 200 Palestinian students per cohort",
    "Cost to Participants: Completely free",
    "External Funding: None required",
    "Delivery: 100% remote via online platforms",
    "Focus Areas: Full-Stack Development with AI Engineering",
    "Projected Outcome: 70% job placement within 6 months",
  ];

  keyPoints.forEach((point, i) => {
    doc.fontSize(10).fillColor(GRAY).text(point, 80, 345 + i * 18, { width: 430 });
  });

  doc.fontSize(10).fillColor(BLACK).text("THE IMPERATIVE", 60, 500, { characterSpacing: 2 });

  const whyText = `Palestinian youth possess exceptional talent and determination. However, access to quality technical education and mentorship remains severely limited. Remote work opportunities in technology offer a pathway to economic independence that transcends geographical and political constraints.

Dev Weekends has successfully trained 800+ engineers across Pakistan, achieving a 70% placement rate over 8+ years of operation. We are prepared to extend this proven model to serve Palestinian students immediately.`;

  doc.fontSize(11).fillColor(GRAY).text(whyText, 60, 525, {
    width: 475,
    lineGap: 7,
    align: "justify",
  });

  doc.rect(60, 650, 475, 80).fill("#F4F4F5");
  doc.rect(60, 650, 4, 80).fill(PALESTINE_GREEN);

  doc.fontSize(10).fillColor(BLACK).text("OUR TRACK RECORD", 80, 665, { characterSpacing: 2 });
  
  const stats = ["50+ Active Industry Mentors", "800+ Engineers Trained", "70% Placement Rate", "8+ Years of Operation"];
  stats.forEach((stat, i) => {
    const xPos = 80 + (i % 2) * 220;
    const yPos = 690 + Math.floor(i / 2) * 20;
    doc.fontSize(10).fillColor(GRAY).text(stat, xPos, yPos);
  });

  drawFooter(doc);
}

// ============================================
// PAGE 3: PROGRAM STRUCTURE
// ============================================
function page3ProgramStructure() {
  doc.addPage();
  drawHeader(doc, 3);

  doc.fontSize(9).fillColor(GRAY).text("02", 60, 80, { characterSpacing: 2 });
  doc.fontSize(9).fillColor(GRAY).text("PROGRAM STRUCTURE", 60, 95, { characterSpacing: 2 });

  doc.fontSize(28).fillColor(BLACK).text("Fellowship Curriculum", 60, 130);
  doc.rect(60, 170, 60, 2).fill(BLACK);

  doc.fontSize(11).fillColor(GRAY).text(
    "A comprehensive 4-month program combining technical training, mentorship, and career preparation. All sessions run concurrently throughout the program with weekly tasks and guidance.",
    60, 190, { width: 475, lineGap: 6 }
  );

  // Concurrent tracks box
  doc.rect(60, 250, 475, 120).fill("#F4F4F5");
  doc.rect(60, 250, 4, 120).fill(BLACK);

  doc.fontSize(10).fillColor(BLACK).text("CONCURRENT TRAINING TRACKS", 80, 268, { characterSpacing: 2 });

  doc.fontSize(11).fillColor(BLACK).text("20+ Tech Sessions", 80, 295);
  doc.fontSize(10).fillColor(GRAY).text("Live sessions with industry experts covering Full-Stack and AI Engineering", 80, 312, { width: 200 });

  doc.fontSize(11).fillColor(BLACK).text("30+ DSA Sessions", 300, 295);
  doc.fontSize(10).fillColor(GRAY).text("Intensive data structures and algorithms training (3 sessions per week)", 300, 312, { width: 200 });

  // Phase 1
  doc.fontSize(9).fillColor(GRAY).text("01", 60, 395, { characterSpacing: 2 });
  doc.fontSize(14).fillColor(BLACK).text("Foundation Phase", 60, 410);
  doc.fontSize(9).fillColor(GRAY).text("Month 1-2", 60, 430);

  const phase1Items = [
    "Full-Stack Development fundamentals (JavaScript, React, Node.js)",
    "Database design and management",
    "Git, GitHub, and collaborative workflows",
    "Weekly tasks with mentor guidance and feedback",
    "AI/ML fundamentals integrated into projects",
  ];

  phase1Items.forEach((item, i) => {
    doc.fontSize(10).fillColor(GRAY).text(item, 80, 450 + i * 16, { width: 430 });
  });

  // Phase 2
  doc.fontSize(9).fillColor(GRAY).text("02", 60, 545, { characterSpacing: 2 });
  doc.fontSize(14).fillColor(BLACK).text("Advanced Engineering Phase", 60, 560);
  doc.fontSize(9).fillColor(GRAY).text("Month 3", 60, 580);

  const phase2Items = [
    "System Design fundamentals and patterns",
    "Cloud platforms (AWS, Azure) and DevOps",
    "AI Engineering: LLMs, Prompt Engineering, RAG Systems",
    "Complex project development with weekly deliverables",
  ];

  phase2Items.forEach((item, i) => {
    doc.fontSize(10).fillColor(GRAY).text(item, 80, 600 + i * 16, { width: 430 });
  });

  // Phase 3
  doc.fontSize(9).fillColor(GRAY).text("03", 60, 680, { characterSpacing: 2 });
  doc.fontSize(14).fillColor(BLACK).text("Career Readiness Phase", 60, 695);
  doc.fontSize(9).fillColor(GRAY).text("Month 4", 60, 715);

  const phase3Items = [
    "Resume building and LinkedIn optimization",
    "Mock interview preparation and feedback",
    "Remote job application strategy",
  ];

  phase3Items.forEach((item, i) => {
    doc.fontSize(10).fillColor(GRAY).text(item, 80, 735 + i * 16, { width: 430 });
  });

  drawFooter(doc);
}

// ============================================
// PAGE 4: MENTORSHIP MODEL
// ============================================
function page4MentorshipModel() {
  doc.addPage();
  drawHeader(doc, 4);

  doc.fontSize(9).fillColor(GRAY).text("03", 60, 80, { characterSpacing: 2 });
  doc.fontSize(9).fillColor(GRAY).text("MENTORSHIP MODEL", 60, 95, { characterSpacing: 2 });

  doc.fontSize(28).fillColor(BLACK).text("Support Framework", 60, 130);
  doc.rect(60, 170, 60, 2).fill(BLACK);

  doc.fontSize(12).fillColor(BLACK).text("Personal Mentor Assignment", 60, 200);
  doc.fontSize(10).fillColor(GRAY).text(
    "Each participant is paired with a dedicated industry mentor who provides personalized guidance throughout the 4-month program. Mentors are professionals from leading tech companies worldwide.",
    60, 218, { width: 475, lineGap: 5 }
  );

  doc.fontSize(12).fillColor(BLACK).text("1:1 Mentorship Sessions", 60, 275);
  doc.fontSize(10).fillColor(GRAY).text(
    "Weekly one-on-one sessions focused on individual progress, technical challenges, and career planning. Each participant receives dedicated mentorship time throughout the program.",
    60, 293, { width: 475, lineGap: 5 }
  );

  doc.fontSize(12).fillColor(BLACK).text("Weekly Tasks and Guidance", 60, 350);
  doc.fontSize(10).fillColor(GRAY).text(
    "Structured weekly assignments with clear deliverables. Mentors provide detailed feedback and guidance to ensure continuous progress and skill development.",
    60, 368, { width: 475, lineGap: 5 }
  );

  doc.fontSize(12).fillColor(BLACK).text("Mock Interview Preparation", 60, 425);
  doc.fontSize(10).fillColor(GRAY).text(
    "Comprehensive interview preparation including technical coding rounds, system design discussions, and behavioral interviews with real feedback from practicing engineers.",
    60, 443, { width: 475, lineGap: 5 }
  );

  doc.fontSize(12).fillColor(BLACK).text("Resume and Career Advisory", 60, 500);
  doc.fontSize(10).fillColor(GRAY).text(
    "Professional resume review, LinkedIn optimization, and strategic career guidance tailored for remote international job markets and global opportunities.",
    60, 518, { width: 475, lineGap: 5 }
  );

  doc.fontSize(12).fillColor(BLACK).text("Remote Job Placement Support", 60, 575);
  doc.fontSize(10).fillColor(GRAY).text(
    "Active job placement assistance including referrals to our industry network, guidance on freelancing platforms like Upwork and Toptal, and support for direct applications.",
    60, 593, { width: 475, lineGap: 5 }
  );

  doc.rect(60, 655, 475, 80).fill("#F4F4F5");
  doc.rect(60, 655, 4, 80).fill(PALESTINE_GREEN);

  doc.fontSize(10).fillColor(BLACK).text("MENTOR COMMITMENT", 80, 673, { characterSpacing: 2 });
  doc.fontSize(10).fillColor(GRAY).text(
    "Mentors commit 40-50 hours across the entire program duration, providing consistent support and guidance to their assigned mentees throughout the fellowship.",
    80, 695, { width: 430, lineGap: 5 }
  );

  drawFooter(doc);
}

// ============================================
// PAGE 5: SPECIALIZATION
// ============================================
function page5Specialization() {
  doc.addPage();
  drawHeader(doc, 5);

  doc.fontSize(9).fillColor(GRAY).text("04", 60, 80, { characterSpacing: 2 });
  doc.fontSize(9).fillColor(GRAY).text("SPECIALIZATION", 60, 95, { characterSpacing: 2 });

  doc.fontSize(28).fillColor(BLACK).text("Full-Stack with AI Engineering", 60, 130);
  doc.rect(60, 170, 60, 2).fill(BLACK);

  const introText = `Our primary focus is Full-Stack Development with integrated AI Engineering. This approach ensures participants gain comprehensive skills that are immediately applicable in the current job market where AI integration is becoming standard practice.`;

  doc.fontSize(11).fillColor(GRAY).text(introText, 60, 195, { width: 475, lineGap: 6 });

  doc.fontSize(10).fillColor(BLACK).text("FULL-STACK DEVELOPMENT", 60, 270, { characterSpacing: 2 });

  const fullStackTopics = [
    { title: "Frontend Development", desc: "React, Next.js, TypeScript, and modern UI frameworks" },
    { title: "Backend Engineering", desc: "Node.js, Express, REST APIs, and database management" },
    { title: "DevOps Fundamentals", desc: "Docker, CI/CD pipelines, and cloud deployment" },
    { title: "System Design", desc: "Architecture patterns, scalability, and performance optimization" },
  ];

  let yPos = 295;
  fullStackTopics.forEach((topic) => {
    doc.fontSize(11).fillColor(BLACK).text(topic.title, 60, yPos);
    doc.fontSize(10).fillColor(GRAY).text(topic.desc, 60, yPos + 15, { width: 475 });
    yPos += 42;
  });

  doc.fontSize(10).fillColor(BLACK).text("AI ENGINEERING INTEGRATION", 60, 475, { characterSpacing: 2 });

  const aiTopics = [
    { title: "Large Language Models", desc: "Working with GPT, Claude, and open-source models" },
    { title: "Prompt Engineering", desc: "Systematic approaches to designing effective AI prompts" },
    { title: "AI API Integration", desc: "Building applications with OpenAI, Anthropic, and other services" },
    { title: "RAG Systems", desc: "Retrieval-Augmented Generation for intelligent applications" },
    { title: "AI Agents", desc: "Developing autonomous agents for complex task automation" },
  ];

  yPos = 500;
  aiTopics.forEach((topic) => {
    doc.fontSize(11).fillColor(BLACK).text(topic.title, 60, yPos);
    doc.fontSize(10).fillColor(GRAY).text(topic.desc, 60, yPos + 15, { width: 475 });
    yPos += 42;
  });

  doc.rect(60, 720, 475, 40).fill("#F4F4F5");
  doc.rect(60, 720, 4, 40).fill(BLACK);
  doc.fontSize(10).fillColor(GRAY).text(
    "AI-integrated full-stack skills position graduates for the highest-demand roles in global tech markets.",
    80, 732, { width: 430 }
  );

  drawFooter(doc);
}

// ============================================
// PAGE 6: PROJECTED IMPACT
// ============================================
function page6ProjectedImpact() {
  doc.addPage();
  drawHeader(doc, 6);

  doc.fontSize(9).fillColor(GRAY).text("05", 60, 80, { characterSpacing: 2 });
  doc.fontSize(9).fillColor(GRAY).text("PROJECTED IMPACT", 60, 95, { characterSpacing: 2 });

  doc.fontSize(28).fillColor(BLACK).text("Measurable Outcomes", 60, 130);
  doc.rect(60, 170, 60, 2).fill(BLACK);

  const metrics = [
    { value: "200", label: "Students per Cohort", desc: "Maximum capacity for quality mentorship" },
    { value: "70%", label: "Placement Target", desc: "Within 6 months of completion" },
    { value: "140", label: "Engineers Employed", desc: "Projected placements per cohort" },
    { value: "0", label: "Cost to Students", desc: "Completely free participation" },
  ];

  metrics.forEach((metric, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 60 + col * 245;
    const yPos = 200 + row * 115;

    doc.rect(xPos, yPos, 225, 100).fill("#F4F4F5");
    doc.rect(xPos, yPos, 4, 100).fill(BLACK);

    doc.fontSize(36).fillColor(BLACK).text(metric.value, xPos + 20, yPos + 15);
    doc.fontSize(11).fillColor(BLACK).text(metric.label, xPos + 20, yPos + 58);
    doc.fontSize(9).fillColor(GRAY).text(metric.desc, xPos + 20, yPos + 75);
  });

  doc.fontSize(10).fillColor(BLACK).text("IMPLEMENTATION TIMELINE", 60, 450, { characterSpacing: 2 });

  const timeline = [
    { phase: "Week 1-2", activity: "Application review and cohort selection" },
    { phase: "Week 3-4", activity: "Onboarding and mentor matching" },
    { phase: "Month 1-2", activity: "Foundation training with concurrent DSA and Tech sessions" },
    { phase: "Month 3", activity: "Advanced skills, AI integration, and specialization" },
    { phase: "Month 4", activity: "Career preparation and job placement support" },
    { phase: "Month 5-6", activity: "Ongoing placement support and outcome tracking" },
  ];

  timeline.forEach((item, i) => {
    const yPos = 480 + i * 26;
    doc.fontSize(10).fillColor(BLACK).text(item.phase, 60, yPos, { width: 80 });
    doc.fontSize(10).fillColor(GRAY).text(item.activity, 150, yPos, { width: 385 });
  });

  doc.rect(60, 650, 475, 80).fill(BLACK);
  doc.fontSize(10).fillColor(WHITE).text("LONG-TERM VISION", 80, 668, { characterSpacing: 2 });
  doc.fontSize(10).fillColor(LIGHT_GRAY).text(
    "Successful fellows become mentors, creating a self-sustaining ecosystem that continues to serve Palestinian engineers for generations. Each cohort strengthens the next.",
    80, 690, { width: 420, lineGap: 5 }
  );

  drawFooter(doc);
}

// ============================================
// PAGE 7: CALL TO ACTION
// ============================================
function page7CallToAction() {
  doc.addPage();
  drawHeader(doc, 7);

  doc.fontSize(9).fillColor(GRAY).text("06", 60, 80, { characterSpacing: 2 });
  doc.fontSize(9).fillColor(GRAY).text("GET INVOLVED", 60, 95, { characterSpacing: 2 });

  doc.fontSize(28).fillColor(BLACK).text("Join the Initiative", 60, 130);
  doc.rect(60, 170, 60, 2).fill(BLACK);

  doc.fontSize(14).fillColor(BLACK).text("For Palestinian Students", 60, 200);
  doc.fontSize(10).fillColor(GRAY).text(
    "Applications are open for Palestinian students and early-career engineers. No prior experience required for the Foundation Track. Visit our website to apply.",
    60, 220, { width: 475, lineGap: 5 }
  );

  doc.fontSize(10).fillColor(BLACK).text("Requirements:", 60, 265);
  const studentReqs = [
    "Palestinian nationality or residence",
    "Basic computer and internet access (if not available, we can fund up to 30 students or more through sponsorships)",
    "Commitment to complete the 4-month program",
    "English proficiency (intermediate level)",
  ];
  studentReqs.forEach((req, i) => {
    doc.fontSize(10).fillColor(GRAY).text("- " + req, 70, 285 + i * 18, { width: 455 });
  });

  doc.fontSize(14).fillColor(BLACK).text("For Volunteer Mentors", 60, 380);
  doc.fontSize(10).fillColor(GRAY).text(
    "We welcome experienced engineers who wish to contribute their time and expertise. Anyone passionate about helping can join through our website.",
    60, 400, { width: 475, lineGap: 5 }
  );

  doc.fontSize(10).fillColor(BLACK).text("Mentor Commitment:", 60, 445);
  const mentorReqs = [
    "40-50 hours total across the program duration",
    "Industry experience in relevant technical domains",
    "Passion for education and community service",
    "Availability for remote sessions",
  ];
  mentorReqs.forEach((req, i) => {
    doc.fontSize(10).fillColor(GRAY).text("- " + req, 70, 465 + i * 18, { width: 455 });
  });

  doc.rect(60, 555, 475, 100).fill("#F4F4F5");
  doc.rect(60, 555, 4, 100).fill(PALESTINE_GREEN);

  doc.fontSize(10).fillColor(BLACK).text("CONNECT WITH US", 80, 575, { characterSpacing: 2 });

  doc.fontSize(11).fillColor(BLACK).text("Website", 80, 605);
  doc.fontSize(11).fillColor(GRAY).text("devweekends.com", 200, 605);

  doc.fontSize(11).fillColor(BLACK).text("Apply / Join as Mentor", 80, 628);
  doc.fontSize(11).fillColor(GRAY).text("devweekends.com", 200, 628);

  doc.fontSize(12).fillColor(BLACK).text(
    "No funding required. Just dedicated engineers helping engineers build better futures.",
    60, 695, { width: 475, align: "center" }
  );

  drawPalestineFlag(doc, 247, 730, 60, 40);

  drawFooter(doc);
}

// ============================================
// GENERATE PDF
// ============================================
console.log("Generating Palestine Tech Fellowship Initiative PDF...\n");

page1Cover();
page2ExecutiveSummary();
page3ProgramStructure();
page4MentorshipModel();
page5Specialization();
page6ProjectedImpact();
page7CallToAction();

doc.end();

stream.on("finish", () => {
  console.log("PDF generated successfully!");
  console.log(`Output: ${outputPath}`);
});
