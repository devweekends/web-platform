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
// DEV WEEKENDS FELLOWSHIP PRESENTATION - 15 SLIDES
// "From Mentee to Industry-Ready Engineer"
// ============================================
function createFellowshipPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "Dev Weekends Fellowship 2025";
  pptx.author = "Dev Weekends";
  pptx.subject = "Fellowship Program Overview";

  // Color palette
  const colors = {
    dark: "18181B",
    light: "FAFAFA",
    gray: "71717A",
    lightGray: "A1A1AA",
    yellow: "FEF08A",
    yellowDark: "EAB308",
    muted: "F4F4F5",
    blue: "3B82F6",
    green: "10B981",
    purple: "8B5CF6",
    orange: "F97316",
    red: "EF4444",
  };

  // ============================================
  // SLIDE 1: TITLE SLIDE
  // ============================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: colors.dark };

  // Yellow accent bar at top
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 0.08,
    fill: { color: colors.yellow },
  });

  // Brand
  slide1.addText("DEV WEEKENDS", {
    x: 0.6, y: 0.5, fontSize: 12, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 4,
  });

  // Main title
  slide1.addText("FELLOWSHIP", {
    x: 0.6, y: 1.4, fontSize: 80, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });

  // Year badge
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 2.8, w: 1.5, h: 0.5,
    fill: { color: colors.yellow },
  });
  slide1.addText("2025", {
    x: 0.6, y: 2.88, w: 1.5, fontSize: 18, fontFace: "Arial",
    bold: true, color: colors.dark, align: "center",
  });

  // Subtitle
  slide1.addText("From Mentee to Industry-Ready Engineer", {
    x: 0.6, y: 3.5, fontSize: 22, fontFace: "Arial",
    color: colors.lightGray,
  });

  // Program highlights
  slide1.addText("3 Months • 30 DSA Sessions • 12 Engineering Projects", {
    x: 0.6, y: 4.1, fontSize: 14, fontFace: "Arial",
    color: colors.gray, charSpacing: 1,
  });

  // Stats row
  const stats1 = [
    { num: "30", label: "DSA Sessions" },
    { num: "12", label: "Weekend Projects" },
    { num: "300+", label: "LeetCode Problems" },
    { num: "100%", label: "Free" },
  ];
  stats1.forEach((stat, i) => {
    slide1.addText(stat.num, {
      x: 0.6 + i * 2.8, y: 4.6, fontSize: 28, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide1.addText(stat.label, {
      x: 0.6 + i * 2.8, y: 5.0, fontSize: 10, fontFace: "Arial",
      color: colors.gray, charSpacing: 1,
    });
  });

  // Decorative corner element
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 11.2, y: 0.4, w: 1.5, h: 1.5,
    line: { color: colors.yellow, width: 2 },
  });

  // Bottom bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 5.42, w: "100%", h: 0.08,
    fill: { color: colors.yellow },
  });

  // ============================================
  // SLIDE 2: THE PROBLEM WE SOLVE
  // ============================================
  const slide2 = pptx.addSlide();
  slide2.background = { color: colors.light };

  // Header bar
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide2.addText("THE GAP WE BRIDGE", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide2.addText("Brilliant Minds. Broken System.", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide2.addText("01", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Three problems
  const problems = [
    {
      num: "01",
      title: "The Education Gap",
      desc: "Universities teach syntax. Industry needs systems thinking, problem-solving, and the ability to build at scale."
    },
    {
      num: "02",
      title: "No Roadmap",
      desc: "Brilliant minds stuck without direction. No mentors to guide them toward global careers."
    },
    {
      num: "03",
      title: "Learning Alone",
      desc: "Self-learning without community means falling behind. No accountability, no support."
    },
  ];

  problems.forEach((prob, i) => {
    slide2.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 4.1, y: 1.4, w: 3.9, h: 2.5,
      fill: { color: colors.muted },
    });
    slide2.addText(prob.num, {
      x: 0.8 + i * 4.1, y: 1.55, fontSize: 36, fontFace: "Arial",
      bold: true, color: colors.lightGray,
    });
    slide2.addText(prob.title, {
      x: 0.8 + i * 4.1, y: 2.2, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.dark,
    });
    slide2.addText(prob.desc, {
      x: 0.8 + i * 4.1, y: 2.6, w: 3.5, fontSize: 11, fontFace: "Arial",
      color: colors.gray, lineSpacing: 15,
    });
  });

  // Solution banner
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.2, w: 11.7, h: 0.8,
    fill: { color: colors.dark },
  });
  slide2.addText("We built something different. Free. Intensive. Life-changing.", {
    x: 0.6, y: 4.4, w: 11.7, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light, align: "center",
  });

  // ============================================
  // SLIDE 3: PROGRAM OVERVIEW
  // ============================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: colors.dark };

  slide3.addText("PROGRAM OVERVIEW", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide3.addText("What Makes Us Different", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide3.addText("02", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Three main components
  const components = [
    {
      title: "DSA Grind Sessions",
      sessions: "30 Deep Sessions",
      icon: "🧠",
      details: ["3 sessions per week", "2 hours each session", "20+ hours pre-recorded", "LeetCode 100-1000+"]
    },
    {
      title: "Engineering Grind",
      sessions: "12 Weekend Sessions",
      icon: "⚡",
      details: ["Every weekend session", "JS, React, Redux, Node", "Database & Architecture", "AWS, Docker, K8s"]
    },
    {
      title: "Deep Grind Projects",
      sessions: "12 Major Projects",
      icon: "🚀",
      details: ["1 project per weekend", "Expert mentor guidance", "Industry-standard code", "Portfolio-ready apps"]
    },
  ];

  components.forEach((comp, i) => {
    slide3.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 4.1, y: 1.4, w: 3.9, h: 3.5,
      fill: { color: "3F3F46" },
    });
    slide3.addText(comp.icon, {
      x: 0.6 + i * 4.1, y: 1.6, w: 3.9, fontSize: 36, fontFace: "Arial",
      align: "center",
    });
    slide3.addText(comp.title, {
      x: 0.6 + i * 4.1, y: 2.3, w: 3.9, fontSize: 15, fontFace: "Arial",
      bold: true, color: colors.light, align: "center",
    });
    slide3.addText(comp.sessions, {
      x: 0.6 + i * 4.1, y: 2.7, w: 3.9, fontSize: 11, fontFace: "Arial",
      color: colors.yellow, align: "center",
    });
    comp.details.forEach((detail, j) => {
      slide3.addText("• " + detail, {
        x: 0.9 + i * 4.1, y: 3.15 + j * 0.4, fontSize: 10, fontFace: "Arial",
        color: colors.lightGray,
      });
    });
  });

  // ============================================
  // SLIDE 4: THREE TRACKS
  // ============================================
  const slide4 = pptx.addSlide();
  slide4.background = { color: colors.light };

  slide4.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide4.addText("CHOOSE YOUR PATH", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide4.addText("Three Tracks. One Mission.", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide4.addText("03", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const tracks = [
    {
      level: "Beginner Track",
      subtitle: "All Foundations Covered",
      color: colors.green,
      highlights: ["Programming fundamentals", "Web technologies", "Data structures basics", "First portfolio projects", "Mentorship support"],
      badge: "Mentee → Fellow (Bronze)"
    },
    {
      level: "Intermediate Track",
      subtitle: "4 Advanced Sessions",
      color: colors.blue,
      highlights: ["Advanced data structures", "Complex algorithms", "System design fundamentals", "Multiple tech stacks", "Interview preparation"],
      badge: "Fellow (Bronze) → Fellow (Silver)"
    },
    {
      level: "Advanced Track",
      subtitle: "4 Expert Sessions",
      color: colors.purple,
      highlights: ["Complex system architecture", "Advanced optimization", "Leadership & mentoring", "Industry collaboration", "Expert certifications"],
      badge: "Fellow (Silver) → Fellow (Gold)"
    },
  ];

  tracks.forEach((track, i) => {
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 4.1, y: 1.4, w: 3.9, h: 3.7,
      line: { color: track.color, width: 2 },
    });
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 4.1, y: 1.4, w: 3.9, h: 0.5,
      fill: { color: track.color },
    });
    slide4.addText(track.level, {
      x: 0.6 + i * 4.1, y: 1.5, w: 3.9, fontSize: 13, fontFace: "Arial",
      bold: true, color: colors.light, align: "center",
    });
    slide4.addText(track.subtitle, {
      x: 0.6 + i * 4.1, y: 2.05, w: 3.9, fontSize: 10, fontFace: "Arial",
      color: colors.gray, align: "center",
    });
    track.highlights.forEach((hl, j) => {
      slide4.addText("✓ " + hl, {
        x: 0.8 + i * 4.1, y: 2.5 + j * 0.38, fontSize: 10, fontFace: "Arial",
        color: colors.dark,
      });
    });
    // Badge at bottom
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 0.75 + i * 4.1, y: 4.55, w: 3.6, h: 0.4,
      fill: { color: colors.muted },
    });
    slide4.addText(track.badge, {
      x: 0.75 + i * 4.1, y: 4.62, w: 3.6, fontSize: 9, fontFace: "Arial",
      bold: true, color: colors.dark, align: "center",
    });
  });

  // ============================================
  // SLIDE 5: 3-MONTH TIMELINE
  // ============================================
  const slide5 = pptx.addSlide();
  slide5.background = { color: colors.muted };

  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide5.addText("PROGRAM TIMELINE", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide5.addText("Your 3-Month Journey", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide5.addText("04", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Timeline
  const timeline = [
    {
      week: "Week 1-4",
      title: "Foundation & Skill Building",
      desc: "Master DSA, development environment setup, and start building your first projects",
      milestone: "Complete Projects & DSA"
    },
    {
      week: "Week 5-8",
      title: "Open Source & Advanced",
      desc: "Dive into advanced DSA, system design, and contribute to open source projects like GSoC",
      milestone: "Open Source Contributions"
    },
    {
      week: "Week 9-12",
      title: "Industry & Remote Jobs",
      desc: "Work on complex projects, prepare for remote job interviews, and build your professional portfolio",
      milestone: "Remote Job Ready"
    },
  ];

  // Timeline line
  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 1.5, y: 1.8, w: 0.08, h: 3.0,
    fill: { color: colors.gray },
  });

  timeline.forEach((item, i) => {
    const yPos = 1.6 + i * 1.1;
    // Node
    slide5.addShape(pptx.shapes.OVAL, {
      x: 1.35, y: yPos + 0.15, w: 0.35, h: 0.35,
      fill: { color: colors.dark },
    });
    // Content card
    slide5.addShape(pptx.shapes.RECTANGLE, {
      x: 2.1, y: yPos, w: 9.5, h: 0.95,
      fill: { color: colors.light },
      line: { color: colors.gray, width: 0.5 },
    });
    slide5.addText(item.week, {
      x: 2.3, y: yPos + 0.08, fontSize: 10, fontFace: "Arial",
      bold: true, color: colors.blue,
    });
    slide5.addText(item.title, {
      x: 2.3, y: yPos + 0.33, fontSize: 13, fontFace: "Arial",
      bold: true, color: colors.dark,
    });
    slide5.addText(item.desc, {
      x: 2.3, y: yPos + 0.6, w: 6.5, fontSize: 10, fontFace: "Arial",
      color: colors.gray,
    });
    // Milestone badge
    slide5.addShape(pptx.shapes.RECTANGLE, {
      x: 9.3, y: yPos + 0.25, w: 2.1, h: 0.45,
      fill: { color: colors.yellowDark },
    });
    slide5.addText("🏆 " + item.milestone, {
      x: 9.35, y: yPos + 0.33, w: 2, fontSize: 8, fontFace: "Arial",
      bold: true, color: colors.dark, align: "center",
    });
  });

  // ============================================
  // SLIDE 6: TECH STACK
  // ============================================
  const slide6 = pptx.addSlide();
  slide6.background = { color: colors.dark };

  slide6.addText("TECH STACK", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide6.addText("What You'll Master", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide6.addText("05", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const techStack = [
    { name: "JavaScript", hours: "2 hours", category: "Frontend" },
    { name: "React", hours: "2 hours", category: "Frontend" },
    { name: "Redux", hours: "2 hours", category: "State" },
    { name: "Node.js", hours: "2 hours", category: "Backend" },
    { name: "Database Design", hours: "2 hours", category: "Data" },
    { name: "System Architecture", hours: "2 hours", category: "Design" },
    { name: "Next.js", hours: "2 hours", category: "Fullstack" },
    { name: "Microservices", hours: "3x HLD", category: "Architecture" },
    { name: "AWS", hours: "2 hours", category: "Cloud" },
    { name: "Docker", hours: "2 hours", category: "DevOps" },
    { name: "Kubernetes", hours: "2 hours", category: "DevOps" },
    { name: "CI/CD", hours: "2 hours", category: "DevOps" },
  ];

  techStack.forEach((tech, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    slide6.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + col * 3.05, y: 1.4 + row * 1.25, w: 2.9, h: 1.1,
      fill: { color: "3F3F46" },
    });
    slide6.addText(tech.name, {
      x: 0.75 + col * 3.05, y: 1.55 + row * 1.25, fontSize: 13, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide6.addText(tech.category, {
      x: 0.75 + col * 3.05, y: 1.9 + row * 1.25, fontSize: 9, fontFace: "Arial",
      color: colors.yellow,
    });
    slide6.addText(tech.hours, {
      x: 0.75 + col * 3.05, y: 2.15 + row * 1.25, fontSize: 9, fontFace: "Arial",
      color: colors.lightGray,
    });
  });

  // ============================================
  // SLIDE 7: DSA CURRICULUM
  // ============================================
  const slide7 = pptx.addSlide();
  slide7.background = { color: colors.light };

  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide7.addText("DSA CURRICULUM", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide7.addText("30 Sessions of Algorithmic Mastery", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide7.addText("06", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const dsaTopics = [
    { phase: "Phase 1", topics: "Arrays, Strings, HashMaps, Two Pointers", problems: "100+ problems" },
    { phase: "Phase 2", topics: "Linked Lists, Stacks, Queues, Binary Search", problems: "100+ problems" },
    { phase: "Phase 3", topics: "Trees, Graphs, BFS/DFS, Recursion", problems: "100+ problems" },
    { phase: "Phase 4", topics: "Dynamic Programming, Greedy, Advanced", problems: "100+ problems" },
  ];

  dsaTopics.forEach((phase, i) => {
    const yPos = 1.4 + i * 0.95;
    slide7.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6, y: yPos, w: 11.7, h: 0.8,
      fill: { color: colors.muted },
      line: { color: colors.blue, width: i === 3 ? 2 : 0.5 },
    });
    slide7.addText(phase.phase, {
      x: 0.8, y: yPos + 0.2, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.blue,
    });
    slide7.addText(phase.topics, {
      x: 2.2, y: yPos + 0.2, w: 7.5, fontSize: 12, fontFace: "Arial",
      color: colors.dark,
    });
    slide7.addText(phase.problems, {
      x: 10.3, y: yPos + 0.2, fontSize: 11, fontFace: "Arial",
      bold: true, color: colors.green,
    });
  });

  // LeetCode progression
  slide7.addText("LeetCode Progression Path:", {
    x: 0.6, y: 4.4, fontSize: 12, fontFace: "Arial",
    bold: true, color: colors.dark,
  });

  const leetcodeProgress = [
    { level: "100", label: "Bronze" },
    { level: "200", label: "Bronze+" },
    { level: "300", label: "Silver" },
    { level: "400", label: "Silver+" },
    { level: "1000+", label: "Gold" },
  ];

  leetcodeProgress.forEach((lc, i) => {
    slide7.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 2.4, y: 4.75, w: 2.2, h: 0.55,
      fill: { color: i === 4 ? colors.yellowDark : colors.light },
      line: { color: colors.gray, width: 1 },
    });
    slide7.addText(lc.level + " → " + lc.label, {
      x: 0.6 + i * 2.4, y: 4.85, w: 2.2, fontSize: 10, fontFace: "Arial",
      bold: true, color: colors.dark, align: "center",
    });
  });

  // ============================================
  // SLIDE 8: ACHIEVEMENT SYSTEM
  // ============================================
  const slide8 = pptx.addSlide();
  slide8.background = { color: colors.dark };

  slide8.addText("ACHIEVEMENT SYSTEM", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide8.addText("Level Up Your Career", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide8.addText("07", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const achievements = [
    { level: "Mentee", requirement: "Entry level", icon: "🌱", color: colors.gray },
    { level: "Fellow", requirement: "Complete basic track", icon: "⭐", color: colors.lightGray },
    { level: "Fellow (Bronze)", requirement: "LeetCode 100-200", icon: "🥉", color: "CD7F32" },
    { level: "Fellow (Silver)", requirement: "LeetCode 300-400", icon: "🥈", color: "C0C0C0" },
    { level: "Fellow (Gold)", requirement: "LeetCode 1000+", icon: "🥇", color: colors.yellowDark },
  ];

  achievements.forEach((ach, i) => {
    slide8.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 2.45, y: 1.5, w: 2.3, h: 2.8,
      fill: { color: "3F3F46" },
      line: { color: ach.color, width: 2 },
    });
    slide8.addText(ach.icon, {
      x: 0.6 + i * 2.45, y: 1.7, w: 2.3, fontSize: 36, fontFace: "Arial",
      align: "center",
    });
    slide8.addText(ach.level, {
      x: 0.6 + i * 2.45, y: 2.6, w: 2.3, fontSize: 12, fontFace: "Arial",
      bold: true, color: colors.light, align: "center",
    });
    slide8.addText(ach.requirement, {
      x: 0.7 + i * 2.45, y: 3.0, w: 2.1, fontSize: 9, fontFace: "Arial",
      color: colors.lightGray, align: "center", lineSpacing: 13,
    });
  });

  // Arrow progression
  slide8.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.5, w: 11.7, h: 0.5,
    fill: { color: "3F3F46" },
  });
  slide8.addText("🌱 → ⭐ → 🥉 → 🥈 → 🥇", {
    x: 0.6, y: 4.58, w: 11.7, fontSize: 20, fontFace: "Arial",
    align: "center",
  });

  // ============================================
  // SLIDE 9: FELLOWSHIP PERKS
  // ============================================
  const slide9 = pptx.addSlide();
  slide9.background = { color: colors.light };

  slide9.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide9.addText("FELLOWSHIP PERKS", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide9.addText("What You Get", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide9.addText("08", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const perks = [
    "Free Access to Expert Training",
    "Free Access to Paid Courses",
    "Access to Partner Network",
    "Part of Mentor Network",
    "Recommendations to Companies",
    "Personal Referral to Companies",
    "VIP Access to all Events",
    "Personalized Mentorship",
    "Mock Interviews",
  ];

  perks.forEach((perk, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    slide9.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + col * 4.1, y: 1.4 + row * 1.1, w: 3.9, h: 0.95,
      fill: { color: colors.muted },
    });
    slide9.addText("✓", {
      x: 0.8 + col * 4.1, y: 1.55 + row * 1.1, fontSize: 18, fontFace: "Arial",
      bold: true, color: colors.green,
    });
    slide9.addText(perk, {
      x: 1.3 + col * 4.1, y: 1.65 + row * 1.1, w: 3, fontSize: 11, fontFace: "Arial",
      color: colors.dark,
    });
  });

  // Price banner
  slide9.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.75, w: 11.7, h: 0.55,
    fill: { color: colors.green },
  });
  slide9.addText("💰 Total Value: $5,000+  •  Your Cost: $0 (100% FREE)", {
    x: 0.6, y: 4.87, w: 11.7, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.light, align: "center",
  });

  // ============================================
  // SLIDE 10: THREE PILLARS PHILOSOPHY
  // ============================================
  const slide10 = pptx.addSlide();
  slide10.background = { color: colors.dark };

  slide10.addText("OUR PHILOSOPHY", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide10.addText("Engineering Excellence Requires Three Pillars", {
    x: 0.6, y: 0.8, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide10.addText("09", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const pillars = [
    {
      num: "01",
      subtitle: "The WHY",
      title: "Purpose",
      tagline: "Find your 'why' before your 'what'",
      points: ["Spiritual grounding", "Deeper purpose beyond jobs", "Resilience through meaning", "Intentional living"]
    },
    {
      num: "02",
      subtitle: "The MINDSET",
      title: "Psychology",
      tagline: "Your mindset is your most important algorithm",
      points: ["Dopamine management", "Overcoming procrastination", "Growth mindset", "Building persistence"]
    },
    {
      num: "03",
      subtitle: "The SKILLS",
      title: "Practice",
      tagline: "World-class engineering through deliberate practice",
      points: ["DSA mastery", "Tech stack proficiency", "System design", "Open source excellence"]
    },
  ];

  pillars.forEach((pillar, i) => {
    slide10.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 4.1, y: 1.4, w: 3.9, h: 3.6,
      fill: { color: "3F3F46" },
    });
    slide10.addText("PILLAR " + pillar.num, {
      x: 0.8 + i * 4.1, y: 1.55, fontSize: 9, fontFace: "Arial",
      color: colors.lightGray, charSpacing: 2,
    });
    slide10.addText(pillar.subtitle, {
      x: 0.8 + i * 4.1, y: 1.9, fontSize: 10, fontFace: "Arial",
      color: colors.yellow,
    });
    slide10.addText(pillar.title, {
      x: 0.8 + i * 4.1, y: 2.2, fontSize: 20, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide10.addText("\"" + pillar.tagline + "\"", {
      x: 0.8 + i * 4.1, y: 2.65, w: 3.5, fontSize: 9, fontFace: "Arial",
      italic: true, color: colors.lightGray, lineSpacing: 13,
    });
    pillar.points.forEach((point, j) => {
      slide10.addText("• " + point, {
        x: 0.8 + i * 4.1, y: 3.3 + j * 0.4, fontSize: 10, fontFace: "Arial",
        color: colors.lightGray,
      });
    });
  });

  // ============================================
  // SLIDE 11: SUCCESS METRICS
  // ============================================
  const slide11 = pptx.addSlide();
  slide11.background = { color: colors.blue };

  slide11.addText("SUCCESS METRICS", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: "93C5FD", charSpacing: 3,
  });
  slide11.addText("Average Improvement Across All Fellows", {
    x: 0.6, y: 0.8, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide11.addText("10", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  const metrics = [
    { label: "Code Quality", value: 95 },
    { label: "Problem Solving", value: 88 },
    { label: "System Design", value: 92 },
    { label: "Interview Ready", value: 90 },
  ];

  metrics.forEach((metric, i) => {
    slide11.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 3.05, y: 1.5, w: 2.9, h: 2.5,
      fill: { color: "2563EB" },
    });
    slide11.addText(metric.value + "%", {
      x: 0.6 + i * 3.05, y: 1.8, w: 2.9, fontSize: 42, fontFace: "Arial",
      bold: true, color: colors.light, align: "center",
    });
    slide11.addText(metric.label, {
      x: 0.6 + i * 3.05, y: 2.9, w: 2.9, fontSize: 12, fontFace: "Arial",
      color: colors.light, align: "center",
    });
    // Progress bar
    slide11.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8 + i * 3.05, y: 3.35, w: 2.5, h: 0.15,
      fill: { color: "1D4ED8" },
    });
    slide11.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8 + i * 3.05, y: 3.35, w: 2.5 * (metric.value / 100), h: 0.15,
      fill: { color: colors.light },
    });
  });

  // Bottom stats
  slide11.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.3, w: 11.7, h: 0.9,
    fill: { color: "2563EB" },
  });
  const bottomStats = [
    { num: "800+", label: "Engineers Trained" },
    { num: "1000+", label: "Job Placements" },
    { num: "67%", label: "Success Rate" },
    { num: "50+", label: "Universities Reached" },
  ];
  bottomStats.forEach((stat, i) => {
    slide11.addText(stat.num, {
      x: 1 + i * 3, y: 4.45, fontSize: 22, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide11.addText(stat.label, {
      x: 1 + i * 3, y: 4.85, fontSize: 10, fontFace: "Arial",
      color: "93C5FD",
    });
  });

  // ============================================
  // SLIDE 12: MEGA CAPSTONE PROJECT
  // ============================================
  const slide12 = pptx.addSlide();
  slide12.background = { color: colors.light };

  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide12.addText("CAPSTONE PROJECT", {
    x: 0.6, y: 0.15, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.light, charSpacing: 3,
  });
  slide12.addText("The Crown Jewel of Your Portfolio", {
    x: 0.6, y: 0.5, fontSize: 28, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide12.addText("11", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Main description
  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 1.4, w: 7, h: 2.0,
    fill: { color: colors.dark },
  });
  slide12.addText("Industry-Level Project", {
    x: 0.8, y: 1.6, fontSize: 18, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide12.addText("Work on a comprehensive industry-level project under the guidance of 2 expert mentors. This project will be the crown jewel of your portfolio.", {
    x: 0.8, y: 2.1, w: 6.6, fontSize: 12, fontFace: "Arial",
    color: colors.lightGray, lineSpacing: 18,
  });

  // What you'll build
  slide12.addText("What You'll Build:", {
    x: 8, y: 1.5, fontSize: 12, fontFace: "Arial",
    bold: true, color: colors.dark,
  });
  const capstoneFeatures = [
    "Full-stack application",
    "Microservices architecture",
    "Cloud deployment (AWS)",
    "CI/CD pipeline",
    "Documentation & tests",
  ];
  capstoneFeatures.forEach((feat, i) => {
    slide12.addText("✓ " + feat, {
      x: 8, y: 1.85 + i * 0.35, fontSize: 11, fontFace: "Arial",
      color: colors.dark,
    });
  });

  // Mentorship badge
  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 3.6, w: 11.7, h: 0.7,
    fill: { color: colors.muted },
  });
  slide12.addText("👥 2 Expert Mentors  •  📅 4 Weeks Duration  •  🎯 Portfolio Ready  •  💼 Job Interview Asset", {
    x: 0.6, y: 3.78, w: 11.7, fontSize: 11, fontFace: "Arial",
    color: colors.dark, align: "center",
  });

  // Tech stack used
  slide12.addText("Tech Stack:", {
    x: 0.6, y: 4.5, fontSize: 11, fontFace: "Arial",
    bold: true, color: colors.gray,
  });
  const capTech = ["React", "Node.js", "MongoDB", "Docker", "AWS", "GitHub Actions"];
  capTech.forEach((tech, i) => {
    slide12.addShape(pptx.shapes.RECTANGLE, {
      x: 2 + i * 1.7, y: 4.45, w: 1.5, h: 0.4,
      fill: { color: colors.dark },
    });
    slide12.addText(tech, {
      x: 2 + i * 1.7, y: 4.52, w: 1.5, fontSize: 9, fontFace: "Arial",
      bold: true, color: colors.light, align: "center",
    });
  });

  // ============================================
  // SLIDE 13: DEV WEEKENDS ECOSYSTEM
  // ============================================
  const slide13 = pptx.addSlide();
  slide13.background = { color: colors.muted };

  slide13.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: "100%", h: 1.1,
    fill: { color: colors.dark },
  });
  slide13.addText("DEV WEEKENDS ECOSYSTEM", {
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

  // Quote
  slide13.addText("\"We don't just teach code. We build engineers who change lives.\"", {
    x: 0.6, y: 1.35, w: 11.5, fontSize: 18, fontFace: "Arial",
    italic: true, color: colors.dark, align: "center",
  });

  // Ecosystem cards
  const ecosystem = [
    { name: "Fellowship", desc: "3-month intensive training program", icon: "🎓", highlight: true },
    { name: "Mentorship", desc: "1-on-1 career guidance", icon: "🧭", highlight: false },
    { name: "MindMaster", desc: "Personal growth community", icon: "🧠", highlight: false },
    { name: "Community", desc: "20,000+ member network", icon: "🌐", highlight: false },
  ];

  ecosystem.forEach((item, i) => {
    slide13.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6 + i * 3.05, y: 2.0, w: 2.9, h: 1.8,
      fill: { color: item.highlight ? colors.dark : colors.light },
      line: { color: item.highlight ? colors.yellow : colors.gray, width: item.highlight ? 2 : 1 },
    });
    slide13.addText(item.icon, {
      x: 0.6 + i * 3.05, y: 2.15, w: 2.9, fontSize: 28, fontFace: "Arial",
      align: "center",
    });
    slide13.addText(item.name, {
      x: 0.6 + i * 3.05, y: 2.8, w: 2.9, fontSize: 13, fontFace: "Arial",
      bold: true, color: item.highlight ? colors.light : colors.dark, align: "center",
    });
    slide13.addText(item.desc, {
      x: 0.7 + i * 3.05, y: 3.15, w: 2.7, fontSize: 9, fontFace: "Arial",
      color: item.highlight ? colors.lightGray : colors.gray, align: "center",
    });
  });

  // Global stats
  slide13.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.0, w: 11.7, h: 1.2,
    fill: { color: colors.dark },
  });
  const globalStats = [
    { num: "20,000+", label: "Community Members" },
    { num: "7", label: "Countries" },
    { num: "50+", label: "Universities" },
    { num: "100%", label: "Free Forever" },
  ];
  globalStats.forEach((stat, i) => {
    slide13.addText(stat.num, {
      x: 1 + i * 3, y: 4.2, fontSize: 24, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide13.addText(stat.label, {
      x: 1 + i * 3, y: 4.65, fontSize: 10, fontFace: "Arial",
      color: colors.lightGray,
    });
  });

  // ============================================
  // SLIDE 14: HOW TO APPLY
  // ============================================
  const slide14 = pptx.addSlide();
  slide14.background = { color: colors.dark };

  slide14.addText("HOW TO APPLY", {
    x: 0.6, y: 0.4, fontSize: 10, fontFace: "Arial",
    bold: true, color: colors.lightGray, charSpacing: 3,
  });
  slide14.addText("Your Journey Starts Here", {
    x: 0.6, y: 0.8, fontSize: 32, fontFace: "Arial",
    bold: true, color: colors.light,
  });
  slide14.addText("13", {
    x: 12, y: 0.5, fontSize: 16, fontFace: "Arial",
    bold: true, color: colors.light,
  });

  // Application steps
  const appSteps = [
    { num: "01", title: "Fill Application Form", desc: "Complete the online application with your background and goals" },
    { num: "02", title: "Initial Screening", desc: "Our team reviews applications for commitment and potential" },
    { num: "03", title: "Orientation Call", desc: "Brief call to understand your goals and answer questions" },
    { num: "04", title: "Welcome to Fellowship", desc: "Start your 3-month transformation journey" },
  ];

  appSteps.forEach((step, i) => {
    const yPos = 1.4 + i * 0.9;
    slide14.addShape(pptx.shapes.RECTANGLE, {
      x: 0.6, y: yPos, w: 11.5, h: 0.75,
      fill: { color: "3F3F46" },
    });
    slide14.addText(step.num, {
      x: 0.8, y: yPos + 0.18, fontSize: 20, fontFace: "Arial",
      bold: true, color: colors.yellow,
    });
    slide14.addText(step.title, {
      x: 1.8, y: yPos + 0.1, fontSize: 14, fontFace: "Arial",
      bold: true, color: colors.light,
    });
    slide14.addText(step.desc, {
      x: 1.8, y: yPos + 0.42, w: 9.5, fontSize: 10, fontFace: "Arial",
      color: colors.lightGray,
    });
  });

  // Application note
  slide14.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 4.85, w: 11.5, h: 0.5,
    fill: { color: colors.yellow },
  });
  slide14.addText("📝 Applications open seasonally. Limited spots available each cohort.", {
    x: 0.6, y: 4.95, w: 11.5, fontSize: 11, fontFace: "Arial",
    bold: true, color: colors.dark, align: "center",
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
  slide15.addText("Ready to Transform\nYour Career?", {
    x: 0.6, y: 1.0, w: 11.5, fontSize: 48, fontFace: "Arial",
    bold: true, color: colors.light, align: "center", lineSpacing: 58,
  });

  slide15.addText("Join 800+ engineers who have transformed their careers\nthrough the Dev Weekends Fellowship.", {
    x: 0.6, y: 2.5, w: 11.5, fontSize: 16, fontFace: "Arial",
    color: colors.lightGray, align: "center", lineSpacing: 24,
  });

  // CTAs
  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 3.4, w: 3, h: 0.7,
    fill: { color: colors.light },
  });
  slide15.addText("Apply Now →", {
    x: 3.5, y: 3.5, w: 3, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.dark, align: "center",
  });

  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8, y: 3.4, w: 3, h: 0.7,
    line: { color: colors.light, width: 1.5 },
  });
  slide15.addText("Join Discord", {
    x: 6.8, y: 3.5, w: 3, fontSize: 14, fontFace: "Arial",
    bold: true, color: colors.light, align: "center",
  });

  // What you get summary
  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 1.5, y: 4.3, w: 10, h: 0.55,
    fill: { color: "3F3F46" },
  });
  slide15.addText("30 DSA Sessions • 12 Projects • Expert Mentorship • 100% Free", {
    x: 1.5, y: 4.42, w: 10, fontSize: 12, fontFace: "Arial",
    color: colors.light, align: "center",
  });

  // Footer
  slide15.addText("devweekends.org/fellowship", {
    x: 0.6, y: 5.0, w: 11.5, fontSize: 12, fontFace: "Arial",
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
  const outputPath = path.join(outputDir, "DevWeekends-Fellowship-Complete-Presentation.pptx");
  pptx.writeFile({ fileName: outputPath })
    .then(() => console.log(`✅ Created: ${outputPath}`))
    .catch(err => console.error(`❌ Error: ${err}`));
}

// Run the generator
createFellowshipPresentation();
console.log("\n🎓 Dev Weekends Fellowship Presentation Generator Complete!\n");
