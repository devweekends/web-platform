const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// Output directory
const outputDir = path.join(__dirname, "../images/templates/ppt");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ============================================
// MINDMASTER PRESENTATION - 15 SLIDES
// "Beyond Code, There's the Mind"
// ============================================
function createMindMasterPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "MindMaster - Beyond Code, There's the Mind";
  pptx.author = "Dev Weekends";
  pptx.subject = "MindMaster Program Overview";

  // Color palette
  const colors = {
    dark: "18181B",
    light: "FAFAFA",
    gray: "71717A",
    lightGray: "A1A1AA",
    yellow: "FEF08A",
    yellowDark: "EAB308",
    muted: "F4F4F5",
  };

  // ============================================
  // SLIDE 1: TITLE SLIDE
  // ============================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: colors.dark };

  // Top bar accent
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 0.08,
    fill: { color: colors.yellow },
  });

  // Brand label
  slide1.addText("DEV WEEKENDS PRESENTS", {
    x: 0.6, y: 0.5, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 4,
  });

  // Main Title
  slide1.addText("MINDMASTER", {
    x: 0.6, y: 1.6, fontSize: 72, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 2,
  });

  // Subtitle
  slide1.addText("Beyond Code, There's the Mind", {
    x: 0.6, y: 2.8, fontSize: 28, fontFace: "Arial",
    color: colors.lightGray, italic: true,
  });

  // Tagline
  slide1.addText("A Closed Community for Thinkers", {
    x: 0.6, y: 3.5, fontSize: 14, fontFace: "Arial",
    color: colors.gray, charSpacing: 2,
  });

  // Stats row
  const stats1 = [
    { num: "200+", label: "Closed Members" },
    { num: "Weekly", label: "Deep Dives" },
    { num: "Invite", label: "Only Access" },
  ];
  stats1.forEach((stat, i) => {
    slide1.addText(stat.num, {
      x: 0.6 + i * 2.5, y: 4.4, fontSize: 32, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide1.addText(stat.label, {
      x: 0.6 + i * 2.5, y: 4.9, fontSize: 10, fontFace: "Arial",
      color: colors.gray, charSpacing: 1,
    });
  });

  // Decorative corner
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 11.2, y: 0.4, w: 1.5, h: 1.5,
    line: { color: colors.yellow, width: 2 },
  });

  // Website
  slide1.addText("devweekends.org/mindmaster", {
    x: 0.6, y: 5.15, fontSize: 11, fontFace: "Arial", color: colors.gray,
  });

  // ============================================
  // SLIDE 2: THE PHILOSOPHY
  // ============================================
  const slide2 = pptx.addSlide();
  slide2.background = { color: colors.light };

  // Header bar
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide2.addText("OUR PHILOSOPHY", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide2.addText("Why MindMaster Exists", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide2.addText("01", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Quote block
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 1.5, w: 0.08, h: 1.2,
    fill: { color: colors.yellowDark },
  });
  slide2.addText("\"Technical skills get you hired.\nMental frameworks make you exceptional.\"", {
    x: 0.9, y: 1.5, w: 10, fontSize: 22, fontFace: "Arial",
    italic: true, color: colors.dark, lineSpacing: 32,
  });

  // Main content
  slide2.addText("The best engineers we know share one thing in common:", {
    x: 0.6, y: 3.0, fontSize: 14, fontFace: "Arial", color: colors.gray,
  });
  slide2.addText("They've mastered themselves before mastering code.", {
    x: 0.6, y: 3.4, fontSize: 16, fontFace: "Arial", bold: true, color: colors.dark,
  });

  // Three points
  const points2 = [
    { title: "Mindset", desc: "How you think determines what you build" },
    { title: "Discipline", desc: "Consistency beats intensity every time" },
    { title: "Purpose", desc: "Know your 'why' before your 'what'" },
  ];
  points2.forEach((point, i) => {
    slide2.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 4, y: 4.0, w: 3.5, h: 1.1,
      fill: { color: colors.muted },
    });
    slide2.addText(point.title, {
      x: 0.8 + i * 4, y: 4.15, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.dark,
    });
    slide2.addText(point.desc, {
      x: 0.8 + i * 4, y: 4.5, w: 3.2, fontSize: 11, fontFace: "Arial",
      color: colors.gray,
    });
  });

  // ============================================
  // SLIDE 3: THE THREE PILLARS
  // ============================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: colors.dark };

  slide3.addText("THE THREE PILLARS", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide3.addText("What We Explore Together", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide3.addText("02", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const pillars = [
    {
      num: "01",
      title: "Psychology of Excellence",
      desc: "Understanding how the mind works is the first step to mastering it. We explore cognitive biases, decision-making, and the psychology behind peak performance.",
      topics: ["Cognitive Biases", "Decision Making", "Peak Performance", "Mental Models"]
    },
    {
      num: "02",
      title: "Time & Energy Mastery",
      desc: "Time management is energy management. Learn frameworks from the world's top performers to structure your days, weeks, and life for maximum impact.",
      topics: ["Energy Management", "Deep Work", "Pomodoro+", "Life Design"]
    },
    {
      num: "03",
      title: "The Spiritual Dimension",
      desc: "Purpose, meaning, and inner peace. The best engineers we know have found balance between ambition and contentment.",
      topics: ["Finding Purpose", "Inner Peace", "Mindfulness", "Giving Back"]
    },
  ];

  pillars.forEach((pillar, i) => {
    const xPos = 0.6 + i * 4.1;
    // Number
    slide3.addText(pillar.num, {
      x: xPos, y: 1.6, fontSize: 48, fontFace: "Arial",
      bold: true, color: colors.yellow,
    });
    // Title
    slide3.addText(pillar.title, {
      x: xPos, y: 2.4, w: 3.8, fontSize: 16, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    // Description
    slide3.addText(pillar.desc, {
      x: xPos, y: 2.95, w: 3.8, fontSize: 11, fontFace: "Arial",
      color: colors.lightGray, lineSpacing: 16,
    });
    // Topics
    pillar.topics.forEach((topic, j) => {
      slide3.addText("• " + topic, {
        x: xPos, y: 4.1 + j * 0.35, fontSize: 10, fontFace: "Arial",
        color: colors.gray,
      });
    });
  });

  // ============================================
  // SLIDE 4: PSYCHOLOGY DEEP DIVE
  // ============================================
  const slide4 = pptx.addSlide();
  slide4.background = { color: colors.light };

  // Header
  slide4.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide4.addText("PILLAR ONE", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.yellow, charSpacing: 3,
  });
  slide4.addText("Psychology of Excellence", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide4.addText("03", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Content grid
  const psychTopics = [
    { title: "Cognitive Biases", desc: "Understand the 50+ biases that cloud your judgment and learn to recognize them in real-time." },
    { title: "Decision Frameworks", desc: "First principles thinking, inversion, and second-order effects for better choices." },
    { title: "Flow States", desc: "Achieve peak performance by engineering your environment for deep focus." },
    { title: "Emotional Intelligence", desc: "Master self-awareness, self-regulation, and social skills for leadership." },
    { title: "Growth Mindset", desc: "Transform failures into feedback and challenges into opportunities." },
    { title: "Habit Engineering", desc: "Build systems that make good habits automatic and bad habits impossible." },
  ];

  psychTopics.forEach((topic, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + col * 4.1, y: 1.4 + row * 1.6, w: 3.9, h: 1.4,
      line: { color: colors.gray, width: 0.5 },
    });
    slide4.addText(topic.title, {
      x: 0.8 + col * 4.1, y: 1.55 + row * 1.6, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.dark,
    });
    slide4.addText(topic.desc, {
      x: 0.8 + col * 4.1, y: 1.95 + row * 1.6, w: 3.5, fontSize: 10, fontFace: "Arial",
      color: colors.gray, lineSpacing: 14,
    });
  });

  // Quote
  slide4.addText("\"Your brain is a supercomputer. Learn to program it.\"", {
    x: 0.6, y: 4.9, fontSize: 14, fontFace: "Arial",
    italic: true, color: colors.dark,
  });

  // ============================================
  // SLIDE 5: TIME & ENERGY MASTERY
  // ============================================
  const slide5 = pptx.addSlide();
  slide5.background = { color: colors.muted };

  // Header
  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide5.addText("PILLAR TWO", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.yellow, charSpacing: 3,
  });
  slide5.addText("Time & Energy Mastery", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide5.addText("04", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Left column - The Problem
  slide5.addText("THE PROBLEM", {
    x: 0.6, y: 1.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.gray, charSpacing: 2,
  });
  slide5.addText("We don't have a time management problem.\nWe have an energy management problem.", {
    x: 0.6, y: 1.75, w: 5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.dark, lineSpacing: 24,
  });

  const problems = [
    "Working 12+ hours but feeling unproductive",
    "Constant context switching killing deep work",
    "Burnout cycles that destroy consistency",
    "Procrastination despite knowing better",
  ];
  problems.forEach((prob, i) => {
    slide5.addText("✗ " + prob, {
      x: 0.6, y: 2.7 + i * 0.4, fontSize: 11, fontFace: "Arial", color: colors.gray,
    });
  });

  // Right column - The Solution
  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 6.5, y: 1.4, w: 6, h: 3.5,
    fill: { color: colors.light },
    line: { color: colors.dark, width: 1 },
  });
  slide5.addText("THE MINDMASTER WAY", {
    x: 6.8, y: 1.6, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.dark, charSpacing: 2,
  });

  const solutions = [
    { title: "Energy Audits", desc: "Map your peak hours and protect them" },
    { title: "Deep Work Blocks", desc: "4 hours of focus > 12 hours of chaos" },
    { title: "Strategic Recovery", desc: "Rest is a skill, not a weakness" },
    { title: "Weekly Reviews", desc: "Reflection compounds improvement" },
  ];
  solutions.forEach((sol, i) => {
    slide5.addText("✓ " + sol.title, {
      x: 6.8, y: 2.1 + i * 0.6, fontSize: 12, fontFace: "Arial",
      bold: true, color: colors.dark,
    });
    slide5.addText(sol.desc, {
      x: 7.1, y: 2.35 + i * 0.6, fontSize: 10, fontFace: "Arial", color: colors.gray,
    });
  });

  // ============================================
  // SLIDE 6: SPIRITUAL DIMENSION
  // ============================================
  const slide6 = pptx.addSlide();
  slide6.background = { color: colors.dark };

  slide6.addText("PILLAR THREE", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.yellow, charSpacing: 3,
  });
  slide6.addText("The Spiritual Dimension", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide6.addText("05", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Quote
  slide6.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 1.6, w: 11.5, h: 1.3,
    fill: { color: "27272A" },
  });
  slide6.addText("\"What's the point of building great software if you're building a miserable life?\"", {
    x: 0.9, y: 1.9, w: 11, fontSize: 18, fontFace: "Arial",
    italic: true, color: colors.light,
  });

  // Four pillars of spiritual growth
  const spiritual = [
    { title: "Purpose", desc: "Finding your 'why' beyond the paycheck", icon: "🎯" },
    { title: "Gratitude", desc: "The antidote to ambition's dark side", icon: "🙏" },
    { title: "Service", desc: "Giving back multiplies meaning", icon: "🤝" },
    { title: "Peace", desc: "Inner calm in a chaotic industry", icon: "☮️" },
  ];

  spiritual.forEach((item, i) => {
    slide6.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 3, y: 3.2, w: 2.8, h: 1.8,
      fill: { color: "3F3F46" },
    });
    slide6.addText(item.icon, {
      x: 0.6 + i * 3, y: 3.35, w: 2.8, fontSize: 24, fontFace: "Arial",
      align: "center",
    });
    slide6.addText(item.title, {
      x: 0.6 + i * 3, y: 3.95, w: 2.8, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.light, align: "center",
    });
    slide6.addText(item.desc, {
      x: 0.75 + i * 3, y: 4.35, w: 2.5, fontSize: 10, fontFace: "Arial",
      color: colors.lightGray, align: "center", lineSpacing: 14,
    });
  });

  // ============================================
  // SLIDE 7: TALK OF THE WEEK/MONTH CONCEPT
  // ============================================
  const slide7 = pptx.addSlide();
  slide7.background = { color: colors.light };

  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide7.addText("CURATED CONTENT", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide7.addText("Weekly & Monthly Picks", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide7.addText("06", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Two columns
  // Talk of the Week
  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 1.4, w: 5.7, h: 3.5,
    line: { color: colors.dark, width: 1.5 },
  });
  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 1.4, w: 5.7, h: 0.45,
    fill: { color: colors.dark },
  });
  slide7.addText("TALK OF THE WEEK", {
    x: 0.8, y: 1.5, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 2,
  });
  slide7.addText("🎬 Featured Video", {
    x: 0.8, y: 2.1, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.dark,
  });
  slide7.addText("Each week, we curate the most impactful talk on psychology, productivity, or personal growth.", {
    x: 0.8, y: 2.5, w: 5.2, fontSize: 11, fontFace: "Arial",
    color: colors.gray, lineSpacing: 16,
  });
  slide7.addText("Watch → Reflect → Discuss", {
    x: 0.8, y: 3.3, fontSize: 12, fontFace: "Arial",
    bold: true, color: colors.dark,
  });
  slide7.addText("Every talk comes with guided reflection questions and community discussion.", {
    x: 0.8, y: 3.65, w: 5.2, fontSize: 10, fontFace: "Arial",
    color: colors.gray,
  });

  // Talk of the Month
  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 6.6, y: 1.4, w: 5.7, h: 3.5,
    line: { color: colors.yellowDark, width: 1.5 },
  });
  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 6.6, y: 1.4, w: 5.7, h: 0.45,
    fill: { color: colors.yellowDark },
  });
  slide7.addText("TALK OF THE MONTH", {
    x: 6.8, y: 1.5, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.dark, charSpacing: 2,
  });
  slide7.addText("⭐ Premium Deep Dive", {
    x: 6.8, y: 2.1, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.dark,
  });
  slide7.addText("Monthly, we select a transformative piece that deserves extended study and practice.", {
    x: 6.8, y: 2.5, w: 5.2, fontSize: 11, fontFace: "Arial",
    color: colors.gray, lineSpacing: 16,
  });
  slide7.addText("30-Day Implementation", {
    x: 6.8, y: 3.3, fontSize: 12, fontFace: "Arial",
    bold: true, color: colors.dark,
  });
  slide7.addText("Includes a 30-day challenge to actually implement what you've learned.", {
    x: 6.8, y: 3.65, w: 5.2, fontSize: 10, fontFace: "Arial",
    color: colors.gray,
  });

  // ============================================
  // SLIDE 8: BOOK RECOMMENDATIONS
  // ============================================
  const slide8 = pptx.addSlide();
  slide8.background = { color: colors.muted };

  slide8.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide8.addText("READING LIST", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide8.addText("Books That Changed Us", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide8.addText("07", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const books = [
    { title: "Atomic Habits", author: "James Clear", category: "Psychology", color: "3B82F6" },
    { title: "Deep Work", author: "Cal Newport", category: "Time Mastery", color: "10B981" },
    { title: "Man's Search for Meaning", author: "Viktor Frankl", category: "Spiritual", color: "8B5CF6" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Psychology", color: "3B82F6" },
    { title: "The 7 Habits", author: "Stephen Covey", category: "Time Mastery", color: "10B981" },
    { title: "Meditations", author: "Marcus Aurelius", category: "Spiritual", color: "8B5CF6" },
  ];

  books.forEach((book, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    slide8.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + col * 4.1, y: 1.4 + row * 1.7, w: 3.9, h: 1.5,
      fill: { color: colors.light },
      line: { color: book.color, width: 2 },
    });
    slide8.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + col * 4.1, y: 1.4 + row * 1.7, w: 3.9, h: 0.35,
      fill: { color: book.color },
    });
    slide8.addText(book.category.toUpperCase(), {
      x: 0.8 + col * 4.1, y: 1.47 + row * 1.7, fontSize: 8, fontFace: "Arial",
      bold: true, color: colors.light, charSpacing: 1,
    });
    slide8.addText(book.title, {
      x: 0.8 + col * 4.1, y: 1.95 + row * 1.7, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.dark,
    });
    slide8.addText("by " + book.author, {
      x: 0.8 + col * 4.1, y: 2.35 + row * 1.7, fontSize: 10, fontFace: "Arial",
      color: colors.gray,
    });
  });

  // ============================================
  // SLIDE 9: COMMUNITY FORMAT
  // ============================================
  const slide9 = pptx.addSlide();
  slide9.background = { color: colors.dark };

  slide9.addText("HOW IT WORKS", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide9.addText("The MindMaster Format", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide9.addText("08", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Weekly flow
  const weeklyFlow = [
    { day: "MON", activity: "New Content Released", desc: "Weekly talk + book recommendation" },
    { day: "TUE-THU", activity: "Self-Study Period", desc: "Watch, read, reflect independently" },
    { day: "FRI", activity: "Discussion Thread", desc: "Share insights in Discord" },
    { day: "SAT", activity: "Live Session", desc: "Group discussion + Q&A" },
    { day: "SUN", activity: "Implementation", desc: "Apply one insight this week" },
  ];

  weeklyFlow.forEach((item, i) => {
    const yPos = 1.5 + i * 0.75;
    slide9.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6, y: yPos, w: 1.2, h: 0.6,
      fill: { color: colors.yellow },
    });
    slide9.addText(item.day, {
      x: 0.6, y: yPos + 0.15, w: 1.2, fontSize: 12, fontFace: "Arial",
      bold: true, color: colors.dark, align: "center",
    });
    slide9.addText(item.activity, {
      x: 2, y: yPos + 0.05, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide9.addText(item.desc, {
      x: 2, y: yPos + 0.38, fontSize: 11, fontFace: "Arial",
      color: colors.lightGray,
    });
  });

  // Right side - key point
  slide9.addShape(pptx.shapes.RECTANGLE, {
    x: 7.5, y: 1.5, w: 4.8, h: 3.3,
    fill: { color: "3F3F46" },
  });
  slide9.addText("Not Just Consuming.\nActually Transforming.", {
    x: 7.8, y: 1.8, w: 4.3, fontSize: 18, fontFace: "Arial",
    bold: true, color: colors.light, lineSpacing: 26,
  });
  slide9.addText("We don't just share videos and books. We create structured experiences that turn information into transformation.", {
    x: 7.8, y: 2.8, w: 4.3, fontSize: 12, fontFace: "Arial",
    color: colors.lightGray, lineSpacing: 18,
  });
  slide9.addText("Average engagement: 85%+", {
    x: 7.8, y: 3.8, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.yellow,
  });
  slide9.addText("of members complete weekly activities", {
    x: 7.8, y: 4.15, fontSize: 10, fontFace: "Arial",
    color: colors.lightGray,
  });

  // ============================================
  // SLIDE 10: WHO IS THIS FOR
  // ============================================
  const slide10 = pptx.addSlide();
  slide10.background = { color: colors.light };

  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide10.addText("TARGET AUDIENCE", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide10.addText("Who Is MindMaster For?", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide10.addText("09", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Yes column
  slide10.addText("✓ THIS IS FOR YOU IF:", {
    x: 0.6, y: 1.4, fontSize: 12, fontFace: "Arial",
    bold: true, color: "10B981",
  });
  const yesPoints = [
    "You're an engineer who wants more than technical skills",
    "You believe personal development is as important as coding",
    "You want a community of like-minded thinkers",
    "You're ready to invest time in self-mastery",
    "You value depth over surface-level content",
  ];
  yesPoints.forEach((point, i) => {
    slide10.addText("• " + point, {
      x: 0.6, y: 1.8 + i * 0.45, w: 5.5, fontSize: 11, fontFace: "Arial",
      color: colors.dark,
    });
  });

  // No column
  slide10.addText("✗ THIS IS NOT FOR YOU IF:", {
    x: 6.6, y: 1.4, fontSize: 12, fontFace: "Arial",
    bold: true, color: "EF4444",
  });
  const noPoints = [
    "You only care about coding skills",
    "You prefer passive content consumption",
    "You're not willing to engage in discussions",
    "You want quick fixes, not real growth",
    "You're not ready to question your beliefs",
  ];
  noPoints.forEach((point, i) => {
    slide10.addText("• " + point, {
      x: 6.6, y: 1.8 + i * 0.45, w: 5.5, fontSize: 11, fontFace: "Arial",
      color: colors.gray,
    });
  });

  // Note
  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.4, w: 11.7, h: 0.6,
    fill: { color: colors.muted },
  });
  slide10.addText("💡 MindMaster is invite-only. Current members recommend engineers who would thrive in this environment.", {
    x: 0.8, y: 4.55, fontSize: 11, fontFace: "Arial",
    color: colors.gray,
  });

  // ============================================
  // SLIDE 11: SAMPLE TOPICS
  // ============================================
  const slide11 = pptx.addSlide();
  slide11.background = { color: colors.dark };

  slide11.addText("SAMPLE TOPICS", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide11.addText("What We've Explored", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide11.addText("10", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const topics = [
    "Dopamine Detox: Reclaiming Your Attention",
    "The Art of Saying No (Without Guilt)",
    "Building Anti-Fragile Routines",
    "Imposter Syndrome: Friend or Foe?",
    "The Stoic Engineer's Playbook",
    "Energy Management > Time Management",
    "Finding Meaning in Repetitive Work",
    "The 5AM Club: Myth or Magic?",
    "Digital Minimalism for Developers",
    "Meditation for the Skeptical Mind",
    "Building Your Personal Board of Directors",
    "The Compound Effect of Small Choices",
  ];

  topics.forEach((topic, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    slide11.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + col * 4.1, y: 1.5 + row * 0.95, w: 3.9, h: 0.8,
      fill: { color: "3F3F46" },
    });
    slide11.addText(topic, {
      x: 0.8 + col * 4.1, y: 1.7 + row * 0.95, w: 3.5, fontSize: 11, fontFace: "Arial",
      color: colors.light,
    });
  });

  // ============================================
  // SLIDE 12: TESTIMONIALS
  // ============================================
  const slide12 = pptx.addSlide();
  slide12.background = { color: colors.light };

  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide12.addText("MEMBER VOICES", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide12.addText("What Members Say", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide12.addText("11", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const testimonials = [
    {
      quote: "MindMaster changed how I approach my career. It's not just about shipping code anymore—it's about building a life.",
      name: "Software Engineer, FAANG",
    },
    {
      quote: "The weekly discussions are the highlight of my week. Finally, a community that talks about the things that actually matter.",
      name: "Senior Developer, Startup",
    },
    {
      quote: "I've read hundreds of self-help books. MindMaster is the first community that helped me actually implement what I learned.",
      name: "Tech Lead, Remote",
    },
  ];

  testimonials.forEach((test, i) => {
    slide12.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 4.1, y: 1.4, w: 3.9, h: 2.8,
      fill: { color: colors.muted },
    });
    slide12.addText("❝", {
      x: 0.8 + i * 4.1, y: 1.5, fontSize: 32, fontFace: "Arial",
      color: colors.yellowDark,
    });
    slide12.addText(test.quote, {
      x: 0.8 + i * 4.1, y: 2.1, w: 3.5, fontSize: 11, fontFace: "Arial",
      italic: true, color: colors.dark, lineSpacing: 16,
    });
    slide12.addText("— " + test.name, {
      x: 0.8 + i * 4.1, y: 3.7, fontSize: 10, fontFace: "Arial",
      color: colors.gray,
    });
  });

  // Stats bar
  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.5, w: 11.7, h: 0.7,
    fill: { color: colors.dark },
  });
  const testimonialStats = [
    { num: "200+", label: "Active Members" },
    { num: "95%", label: "Weekly Engagement" },
    { num: "4.9/5", label: "Satisfaction Rating" },
  ];
  testimonialStats.forEach((stat, i) => {
    slide12.addText(stat.num, {
      x: 1.5 + i * 4, y: 4.6, fontSize: 18, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide12.addText(stat.label, {
      x: 1.5 + i * 4 + 1.2, y: 4.68, fontSize: 11, fontFace: "Arial",
      color: colors.lightGray,
    });
  });

  // ============================================
  // SLIDE 13: INTEGRATION WITH DEV WEEKENDS
  // ============================================
  const slide13 = pptx.addSlide();
  slide13.background = { color: colors.muted };

  slide13.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide13.addText("ECOSYSTEM", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide13.addText("Part of Something Bigger", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide13.addText("12", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Dev Weekends ecosystem
  slide13.addText("MindMaster is part of the Dev Weekends ecosystem:", {
    x: 0.6, y: 1.4, fontSize: 14, fontFace: "Arial",
    color: colors.dark,
  });

  const ecosystem = [
    { name: "Fellowship Program", desc: "3-month intensive training", highlight: false },
    { name: "MindMaster", desc: "Personal growth community", highlight: true },
    { name: "Mentorship", desc: "1-on-1 career guidance", highlight: false },
    { name: "Community", desc: "20,000+ member network", highlight: false },
  ];

  ecosystem.forEach((item, i) => {
    slide13.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 3.05, y: 1.9, w: 2.9, h: 1.4,
      fill: { color: item.highlight ? colors.yellowDark : colors.light },
      line: { color: item.highlight ? colors.yellowDark : colors.gray, width: 1 },
    });
    slide13.addText(item.name, {
      x: 0.6 + i * 3.05, y: 2.15, w: 2.9, fontSize: 13, fontFace: "Arial",
      bold: true, color: item.highlight ? colors.dark : colors.dark, align: "center",
    });
    slide13.addText(item.desc, {
      x: 0.6 + i * 3.05, y: 2.55, w: 2.9, fontSize: 10, fontFace: "Arial",
      color: item.highlight ? colors.dark : colors.gray, align: "center",
    });
  });

  // Bottom quote
  slide13.addText("\"We don't just teach code. We build engineers who change lives.\"", {
    x: 0.6, y: 3.7, w: 11, fontSize: 16, fontFace: "Arial",
    italic: true, color: colors.dark,
  });
  slide13.addText("— Dev Weekends Mission", {
    x: 0.6, y: 4.2, fontSize: 11, fontFace: "Arial",
    color: colors.gray,
  });

  // Stats
  slide13.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.6, w: 11.7, h: 0.7,
    fill: { color: colors.dark },
  });
  const ecoStats = [
    { num: "20,000+", label: "Community Members" },
    { num: "800+", label: "Engineers Trained" },
    { num: "7", label: "Countries Reached" },
  ];
  ecoStats.forEach((stat, i) => {
    slide13.addText(stat.num, {
      x: 1.2 + i * 4, y: 4.7, fontSize: 18, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide13.addText(stat.label, {
      x: 1.2 + i * 4 + 1.6, y: 4.78, fontSize: 10, fontFace: "Arial",
      color: colors.lightGray,
    });
  });

  // ============================================
  // SLIDE 14: HOW TO JOIN
  // ============================================
  const slide14 = pptx.addSlide();
  slide14.background = { color: colors.dark };

  slide14.addText("JOIN MINDMASTER", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide14.addText("How to Get Invited", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide14.addText("13", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Steps
  const steps = [
    { num: "01", title: "Join Dev Weekends Community", desc: "Start by joining our Discord and engaging with the community" },
    { num: "02", title: "Demonstrate Growth Mindset", desc: "Show genuine interest in personal development, not just technical skills" },
    { num: "03", title: "Get Recommended", desc: "Current MindMaster members recommend engineers who would thrive" },
    { num: "04", title: "Receive Invite", desc: "Invited members get access to the closed MindMaster channels" },
  ];

  steps.forEach((step, i) => {
    const yPos = 1.5 + i * 0.95;
    slide14.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6, y: yPos, w: 11.5, h: 0.8,
      fill: { color: "3F3F46" },
    });
    slide14.addText(step.num, {
      x: 0.8, y: yPos + 0.2, fontSize: 20, fontFace: "Arial",
      bold: true, color: colors.yellow,
    });
    slide14.addText(step.title, {
      x: 1.8, y: yPos + 0.1, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide14.addText(step.desc, {
      x: 1.8, y: yPos + 0.45, w: 9.5, fontSize: 11, fontFace: "Arial",
      color: colors.lightGray,
    });
  });

  // Note
  slide14.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.5, w: 11.5, h: 0.6,
    fill: { color: colors.yellow },
  });
  slide14.addText("💡 We keep MindMaster invite-only to maintain the quality of discussions and community culture.", {
    x: 0.8, y: 4.63, fontSize: 11, fontFace: "Arial",
    bold: true, color: colors.dark,
  });

  // ============================================
  // SLIDE 15: CTA / CLOSING
  // ============================================
  const slide15 = pptx.addSlide();
  slide15.background = { color: colors.dark };

  // Yellow accent bar at top
  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 0.08,
    fill: { color: colors.yellow },
  });

  // Main message
  slide15.addText("Ready to Level Up?", {
    x: 0.6, y: 1.2, w: 11.5, fontSize: 48, fontFace: "Arial",
    bold: true, color: colors.light, align: "center",
  });

  slide15.addText("Join our weekly sessions where we watch, discuss, and learn together.\nIt's not just about consuming content—it's about growing with a community.", {
    x: 0.6, y: 2.4, w: 11.5, fontSize: 16, fontFace: "Arial",
    color: colors.lightGray, align: "center", lineSpacing: 24,
  });

  // CTAs
  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 3.5, w: 3, h: 0.7,
    fill: { color: colors.light },
  });
  slide15.addText("Join Discord →", {
    x: 3.5, y: 3.6, w: 3, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.dark, align: "center",
  });

  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8, y: 3.5, w: 3, h: 0.7,
    line: { color: colors.light, width: 1.5 },
  });
  slide15.addText("View Sessions", {
    x: 6.8, y: 3.6, w: 3, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.light, align: "center",
  });

  // Footer info
  slide15.addText("discord.gg/Cy7Rgkf4Up", {
    x: 0.6, y: 4.6, w: 11.5, fontSize: 14, fontFace: "Arial",
    color: colors.lightGray, align: "center",
  });
  slide15.addText("devweekends.org/mindmaster", {
    x: 0.6, y: 4.95, w: 11.5, fontSize: 12, fontFace: "Arial",
    color: colors.gray, align: "center",
  });

  // Brand
  slide15.addText("DEV WEEKENDS", {
    x: 0.6, y: 5.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.gray, charSpacing: 3,
  });

  // Bottom bar
  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 5.42, w: "100%", h: 0.08,
    fill: { color: colors.yellow },
  });

  // Save
  const outputPath = path.join(outputDir, "MindMaster-Complete-Presentation.pptx");
  pptx.writeFile({ fileName: outputPath })
    .then(() => console.log(`✅ Created: ${outputPath}`))
    .catch(err => console.error(`❌ Error: ${err}`));
}

// Run the generator
createMindMasterPresentation();
console.log("\n🧠 MindMaster Presentation Generator Complete!\n");
