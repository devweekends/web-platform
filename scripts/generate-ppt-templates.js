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
// DEV WEEKENDS TEMPLATE 1: INTRO/TITLE SLIDE
// ============================================
function createDWTemplate1() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "Dev Weekends - Intro Template";
  pptx.author = "Dev Weekends";

  // Slide 1 - Title Slide
  const slide1 = pptx.addSlide();
  slide1.background = { color: "FAFAFA" };

  // Left accent bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.1,
    h: "100%",
    fill: { color: "18181B" },
  });

  // Branding
  slide1.addText("DEV WEEKENDS", {
    x: 0.5,
    y: 0.3,
    fontSize: 12,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
    charSpacing: 4,
  });

  slide1.addText("EMPOWERING ENGINEERS SINCE 2020", {
    x: 0.5,
    y: 0.55,
    fontSize: 8,
    fontFace: "Arial",
    color: "71717A",
    charSpacing: 2,
  });

  // Main Title
  slide1.addText("Your Presentation\nTitle Goes Here", {
    x: 0.5,
    y: 2.2,
    w: 8,
    fontSize: 48,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
    lineSpacing: 54,
  });

  // Subtitle
  slide1.addText("A brief description or subtitle for your presentation", {
    x: 0.5,
    y: 4.0,
    fontSize: 16,
    fontFace: "Arial",
    color: "71717A",
  });

  // Divider line
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 4.5,
    w: 2.5,
    h: 0.03,
    fill: { color: "18181B" },
  });

  // Presenter info
  slide1.addText("Presenter Name", {
    x: 0.5,
    y: 4.8,
    fontSize: 14,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
  });

  slide1.addText("Role / Position • Date", {
    x: 0.5,
    y: 5.05,
    fontSize: 11,
    fontFace: "Arial",
    color: "71717A",
  });

  // Decorative element (corner box)
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 11.5,
    y: 0.5,
    w: 0.8,
    h: 0.8,
    line: { color: "18181B", width: 1.5 },
  });

  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 11.7,
    y: 0.7,
    w: 0.8,
    h: 0.8,
    fill: { color: "FEF08A", transparency: 40 },
  });

  // Bottom bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.35,
    w: "100%",
    h: 0.15,
    fill: { color: "18181B" },
  });

  // Website
  slide1.addText("devweekends.org", {
    x: 11,
    y: 5.1,
    fontSize: 10,
    fontFace: "Arial",
    color: "71717A",
  });

  // Slide 2 - Content Template
  const slide2 = pptx.addSlide();
  slide2.background = { color: "FAFAFA" };

  // Header bar
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: "100%",
    h: 1.2,
    fill: { color: "18181B" },
  });

  slide2.addText("DEV WEEKENDS", {
    x: 0.5,
    y: 0.25,
    fontSize: 10,
    fontFace: "Arial",
    bold: true,
    color: "FAFAFA",
    charSpacing: 3,
  });

  slide2.addText("Your Section Title Here", {
    x: 0.5,
    y: 0.6,
    fontSize: 28,
    fontFace: "Arial",
    bold: true,
    color: "FAFAFA",
  });

  slide2.addText("01", {
    x: 12,
    y: 0.6,
    fontSize: 16,
    fontFace: "Arial",
    bold: true,
    color: "FAFAFA",
  });

  // Key Points section
  slide2.addText("KEY POINTS", {
    x: 0.5,
    y: 1.5,
    fontSize: 10,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
    charSpacing: 2,
  });

  const points = [
    { title: "First Key Point", desc: "Description or additional context for this point goes here." },
    { title: "Second Key Point", desc: "Description or additional context for this point goes here." },
    { title: "Third Key Point", desc: "Description or additional context for this point goes here." },
    { title: "Fourth Key Point", desc: "Description or additional context for this point goes here." },
  ];

  points.forEach((point, i) => {
    const yPos = 1.9 + i * 0.8;
    slide2.addShape(pptx.shapes.RECTANGLE, {
      x: 0.5,
      y: yPos,
      w: 0.08,
      h: 0.08,
      fill: { color: "18181B" },
    });
    slide2.addText(point.title, {
      x: 0.7,
      y: yPos - 0.05,
      fontSize: 14,
      fontFace: "Arial",
      bold: true,
      color: "18181B",
    });
    slide2.addText(point.desc, {
      x: 0.7,
      y: yPos + 0.22,
      fontSize: 11,
      fontFace: "Arial",
      color: "71717A",
    });
  });

  // Visual placeholder
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 6.5,
    y: 1.5,
    w: 5.5,
    h: 3.5,
    fill: { color: "F4F4F5" },
    line: { color: "E4E4E7", width: 1 },
  });

  slide2.addText("Image / Chart / Diagram\nPlace your visual content here", {
    x: 6.5,
    y: 2.8,
    w: 5.5,
    fontSize: 14,
    fontFace: "Arial",
    color: "A1A1AA",
    align: "center",
  });

  // Bottom bar
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.35,
    w: "100%",
    h: 0.15,
    fill: { color: "18181B" },
  });

  slide2.addText("© Dev Weekends 2025", {
    x: 0.5,
    y: 5.1,
    fontSize: 9,
    fontFace: "Arial",
    color: "71717A",
  });

  slide2.addText("devweekends.org", {
    x: 11,
    y: 5.1,
    fontSize: 9,
    fontFace: "Arial",
    color: "71717A",
  });

  return pptx.writeFile({ fileName: path.join(outputDir, "DW-Template-1-Intro.pptx") });
}

// ============================================
// DEV WEEKENDS TEMPLATE 2: CONTENT SLIDE
// ============================================
function createDWTemplate2() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "Dev Weekends - Content Template";
  pptx.author = "Dev Weekends";

  // Slide 1 - Two Column Layout
  const slide1 = pptx.addSlide();
  slide1.background = { color: "FAFAFA" };

  // Left accent bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.1,
    h: "100%",
    fill: { color: "18181B" },
  });

  // Branding
  slide1.addText("DEV WEEKENDS", {
    x: 0.5,
    y: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
    charSpacing: 3,
  });

  // Section title
  slide1.addText("WHAT WE DO", {
    x: 0.5,
    y: 1.0,
    fontSize: 9,
    fontFace: "Arial",
    bold: true,
    color: "71717A",
    charSpacing: 2,
  });

  slide1.addText("Transforming Beginners\nInto Industry-Ready Engineers", {
    x: 0.5,
    y: 1.3,
    w: 5,
    fontSize: 32,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
    lineSpacing: 38,
  });

  // Description
  slide1.addText(
    "Our comprehensive mentorship programs combine live sessions, 1:1 guidance, and hands-on projects to accelerate your engineering career.",
    {
      x: 0.5,
      y: 2.8,
      w: 5,
      fontSize: 13,
      fontFace: "Arial",
      color: "71717A",
      lineSpacing: 20,
    }
  );

  // Right column - Feature cards
  const features = [
    { num: "01", title: "Live Sessions", desc: "20+ interactive sessions with industry experts" },
    { num: "02", title: "1:1 Mentorship", desc: "Personal mentor for your entire journey" },
    { num: "03", title: "DSA Training", desc: "30+ intensive algorithm sessions" },
    { num: "04", title: "Job Placement", desc: "92% success rate in placements" },
  ];

  features.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 6.2 + col * 2.8;
    const yPos = 0.8 + row * 2.2;

    slide1.addShape(pptx.shapes.RECTANGLE, {
      x: xPos,
      y: yPos,
      w: 2.5,
      h: 1.8,
      fill: { color: "F4F4F5" },
    });

    slide1.addText(f.num, {
      x: xPos + 0.15,
      y: yPos + 0.15,
      fontSize: 9,
      fontFace: "Arial",
      bold: true,
      color: "A1A1AA",
    });

    slide1.addText(f.title, {
      x: xPos + 0.15,
      y: yPos + 0.6,
      fontSize: 14,
      fontFace: "Arial",
      bold: true,
      color: "18181B",
    });

    slide1.addText(f.desc, {
      x: xPos + 0.15,
      y: yPos + 1.0,
      w: 2.2,
      fontSize: 10,
      fontFace: "Arial",
      color: "71717A",
      lineSpacing: 14,
    });
  });

  // Bottom bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.35,
    w: "100%",
    h: 0.15,
    fill: { color: "18181B" },
  });

  // Slide 2 - Process/Timeline
  const slide2 = pptx.addSlide();
  slide2.background = { color: "FAFAFA" };

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.1,
    h: "100%",
    fill: { color: "18181B" },
  });

  slide2.addText("DEV WEEKENDS", {
    x: 0.5,
    y: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
    charSpacing: 3,
  });

  slide2.addText("THE JOURNEY", {
    x: 0.5,
    y: 0.9,
    fontSize: 9,
    fontFace: "Arial",
    bold: true,
    color: "71717A",
    charSpacing: 2,
  });

  slide2.addText("Your 4-Month Transformation", {
    x: 0.5,
    y: 1.2,
    fontSize: 28,
    fontFace: "Arial",
    bold: true,
    color: "18181B",
  });

  // Timeline
  const months = [
    { month: "Month 1-2", title: "Foundation", desc: "Programming fundamentals, web dev basics, DSA introduction" },
    { month: "Month 3", title: "Advanced Skills", desc: "Complex algorithms, system design, real projects" },
    { month: "Month 4", title: "Industry Ready", desc: "Mock interviews, portfolio, job applications" },
  ];

  // Timeline line
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 2.45,
    w: 11.5,
    h: 0.02,
    fill: { color: "E4E4E7" },
  });

  months.forEach((m, i) => {
    const xPos = 0.5 + i * 4;

    // Circle marker
    slide2.addShape(pptx.shapes.OVAL, {
      x: xPos,
      y: 2.3,
      w: 0.3,
      h: 0.3,
      fill: { color: "18181B" },
    });

    slide2.addText(m.month, {
      x: xPos - 0.2,
      y: 2.8,
      fontSize: 10,
      fontFace: "Arial",
      bold: true,
      color: "71717A",
    });

    slide2.addText(m.title, {
      x: xPos - 0.2,
      y: 3.1,
      fontSize: 16,
      fontFace: "Arial",
      bold: true,
      color: "18181B",
    });

    slide2.addText(m.desc, {
      x: xPos - 0.2,
      y: 3.5,
      w: 3.5,
      fontSize: 11,
      fontFace: "Arial",
      color: "71717A",
      lineSpacing: 16,
    });
  });

  // Bottom bar
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.35,
    w: "100%",
    h: 0.15,
    fill: { color: "18181B" },
  });

  return pptx.writeFile({ fileName: path.join(outputDir, "DW-Template-2-Content.pptx") });
}

// ============================================
// DEV WEEKENDS TEMPLATE 3: STATS/IMPACT
// ============================================
function createDWTemplate3() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "Dev Weekends - Stats Template";
  pptx.author = "Dev Weekends";

  // Slide 1 - Stats Dark Theme
  const slide1 = pptx.addSlide();
  slide1.background = { color: "18181B" };

  // Yellow accent bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.1,
    h: "100%",
    fill: { color: "FEF08A" },
  });

  // Branding
  slide1.addText("DEV WEEKENDS", {
    x: 0.5,
    y: 0.3,
    fontSize: 12,
    fontFace: "Arial",
    bold: true,
    color: "FAFAFA",
    charSpacing: 4,
  });

  slide1.addText("BY THE NUMBERS", {
    x: 0.5,
    y: 0.55,
    fontSize: 8,
    fontFace: "Arial",
    color: "71717A",
    charSpacing: 2,
  });

  // Section title
  slide1.addText("OUR IMPACT", {
    x: 0.5,
    y: 1.1,
    fontSize: 10,
    fontFace: "Arial",
    bold: true,
    color: "FEF08A",
    charSpacing: 3,
  });

  slide1.addText("Making a Difference", {
    x: 0.5,
    y: 1.4,
    fontSize: 36,
    fontFace: "Arial",
    bold: true,
    color: "FAFAFA",
  });

  // Stats cards
  const stats = [
    { value: "30+", label: "Mentors", desc: "Industry professionals" },
    { value: "300+", label: "Mentees", desc: "Engineers trained" },
    { value: "92%", label: "Placement", desc: "Success rate" },
    { value: "5+", label: "Years", desc: "Empowering engineers" },
  ];

  stats.forEach((s, i) => {
    const xPos = 0.5 + i * 3;

    slide1.addShape(pptx.shapes.RECTANGLE, {
      x: xPos,
      y: 2.2,
      w: 2.7,
      h: 2.0,
      fill: { color: "27272A" },
    });

    slide1.addText(s.value, {
      x: xPos + 0.2,
      y: 2.4,
      fontSize: 48,
      fontFace: "Arial",
      bold: true,
      color: "FAFAFA",
    });

    slide1.addShape(pptx.shapes.RECTANGLE, {
      x: xPos + 0.2,
      y: 3.2,
      w: 0.6,
      h: 0.03,
      fill: { color: "FEF08A" },
    });

    slide1.addText(s.label, {
      x: xPos + 0.2,
      y: 3.4,
      fontSize: 14,
      fontFace: "Arial",
      bold: true,
      color: "FAFAFA",
    });

    slide1.addText(s.desc, {
      x: xPos + 0.2,
      y: 3.7,
      fontSize: 10,
      fontFace: "Arial",
      color: "71717A",
    });
  });

  // Bottom text
  slide1.addText("From complete beginners to industry-ready engineers", {
    x: 0,
    y: 4.6,
    w: "100%",
    fontSize: 14,
    fontFace: "Arial",
    color: "71717A",
    align: "center",
  });

  // Decorative corner
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 11.5,
    y: 0.3,
    w: 0.6,
    h: 0.6,
    line: { color: "FEF08A", width: 1.5 },
  });

  // Yellow bottom bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.35,
    w: "100%",
    h: 0.15,
    fill: { color: "FEF08A" },
  });

  slide1.addText("devweekends.org", {
    x: 11,
    y: 5.1,
    fontSize: 9,
    fontFace: "Arial",
    color: "71717A",
  });

  // Slide 2 - Testimonial/Quote
  const slide2 = pptx.addSlide();
  slide2.background = { color: "18181B" };

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.1,
    h: "100%",
    fill: { color: "FEF08A" },
  });

  slide2.addText("DEV WEEKENDS", {
    x: 0.5,
    y: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    bold: true,
    color: "FAFAFA",
    charSpacing: 3,
  });

  slide2.addText("TESTIMONIAL", {
    x: 0.5,
    y: 1.0,
    fontSize: 9,
    fontFace: "Arial",
    bold: true,
    color: "FEF08A",
    charSpacing: 2,
  });

  // Quote marks
  slide2.addText('"', {
    x: 0.3,
    y: 1.2,
    fontSize: 120,
    fontFace: "Georgia",
    color: "27272A",
  });

  // Quote text
  slide2.addText(
    "Dev Weekends was the turning point in my career. The mentorship, the community support, and the structured learning path helped me land my dream job.",
    {
      x: 1.5,
      y: 2.0,
      w: 9,
      fontSize: 22,
      fontFace: "Georgia",
      italic: true,
      color: "A3A3A3",
      lineSpacing: 32,
    }
  );

  // Author
  slide2.addText("— Mentee Name, Software Engineer @ Company", {
    x: 1.5,
    y: 4.0,
    fontSize: 12,
    fontFace: "Arial",
    color: "71717A",
  });

  // Yellow bottom bar
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.35,
    w: "100%",
    h: 0.15,
    fill: { color: "FEF08A" },
  });

  return pptx.writeFile({ fileName: path.join(outputDir, "DW-Template-3-Stats.pptx") });
}

// ============================================
// MINDMASTER TEMPLATE 1: INTRO SLIDE
// ============================================
function createMMTemplate1() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "MindMaster - Intro Template";
  pptx.author = "MindMaster - Dev Weekends";

  // Slide 1 - Title
  const slide1 = pptx.addSlide();
  slide1.background = { color: "0A0A0A" };

  // Gold accent bar
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.05,
    h: "100%",
    fill: { color: "D4A574" },
  });

  // Branding
  slide1.addText("MINDMASTER", {
    x: 0.5,
    y: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    color: "D4A574",
    charSpacing: 6,
  });

  slide1.addText("A DEV WEEKENDS INITIATIVE", {
    x: 0.5,
    y: 0.55,
    fontSize: 8,
    fontFace: "Arial",
    color: "525252",
    charSpacing: 3,
  });

  // Decorative circles
  slide1.addShape(pptx.shapes.OVAL, {
    x: 10.5,
    y: 0.5,
    w: 1.5,
    h: 1.5,
    line: { color: "262626", width: 1 },
  });

  slide1.addShape(pptx.shapes.OVAL, {
    x: 10.65,
    y: 0.65,
    w: 1.2,
    h: 1.2,
    line: { color: "262626", width: 1 },
  });

  slide1.addShape(pptx.shapes.OVAL, {
    x: 10.8,
    y: 0.8,
    w: 0.9,
    h: 0.9,
    line: { color: "D4A574", width: 0.5, transparency: 60 },
  });

  // Tagline
  slide1.addText("BEYOND CODE, THERE'S THE MIND", {
    x: 0.5,
    y: 1.8,
    fontSize: 9,
    fontFace: "Arial",
    color: "525252",
    charSpacing: 4,
  });

  // Main title
  slide1.addText("Your Presentation\nTitle Here", {
    x: 0.5,
    y: 2.3,
    w: 9,
    fontSize: 48,
    fontFace: "Georgia",
    color: "FAFAFA",
    lineSpacing: 58,
  });

  // Divider
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 4.1,
    w: 1,
    h: 0.01,
    fill: { color: "D4A574" },
  });

  // Subtitle
  slide1.addText("A journey into psychology, purpose, and peak performance", {
    x: 0.5,
    y: 4.35,
    fontSize: 14,
    fontFace: "Georgia",
    italic: true,
    color: "737373",
  });

  // Presenter
  slide1.addText("Presenter Name", {
    x: 0.5,
    y: 5.0,
    fontSize: 12,
    fontFace: "Arial",
    color: "FAFAFA",
  });

  slide1.addText("Date", {
    x: 0.5,
    y: 5.25,
    fontSize: 10,
    fontFace: "Arial",
    color: "525252",
  });

  // Bottom line
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.48,
    w: "100%",
    h: 0.01,
    fill: { color: "262626" },
  });

  slide1.addText("mindmaster.devweekends.org", {
    x: 10,
    y: 5.2,
    fontSize: 9,
    fontFace: "Arial",
    color: "525252",
  });

  // Slide 2 - Quote/Wisdom
  const slide2 = pptx.addSlide();
  slide2.background = { color: "0A0A0A" };

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.05,
    h: "100%",
    fill: { color: "D4A574" },
  });

  slide2.addText("MINDMASTER", {
    x: 0.5,
    y: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    color: "D4A574",
    charSpacing: 6,
  });

  // Category tag
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 0.9,
    w: 1.5,
    h: 0.25,
    fill: { color: "1A1A1A" },
  });

  slide2.addText("WISDOM", {
    x: 0.55,
    y: 0.93,
    fontSize: 8,
    fontFace: "Arial",
    color: "D4A574",
    charSpacing: 2,
  });

  // Large quote mark
  slide2.addText('"', {
    x: 0.2,
    y: 1.2,
    fontSize: 150,
    fontFace: "Georgia",
    color: "1A1A1A",
  });

  // Quote
  slide2.addText(
    "The mind is everything.\nWhat you think, you become.",
    {
      x: 1.5,
      y: 2.2,
      w: 9,
      fontSize: 36,
      fontFace: "Georgia",
      italic: true,
      color: "A3A3A3",
      lineSpacing: 48,
    }
  );

  // Author
  slide2.addText("— Buddha", {
    x: 1.5,
    y: 4.0,
    fontSize: 14,
    fontFace: "Arial",
    color: "525252",
  });

  // Bottom line
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.48,
    w: "100%",
    h: 0.01,
    fill: { color: "262626" },
  });

  return pptx.writeFile({ fileName: path.join(outputDir, "MindMaster-Template-1-Intro.pptx") });
}

// ============================================
// MINDMASTER TEMPLATE 2: CONTENT
// ============================================
function createMMTemplate2() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "MindMaster - Content Template";
  pptx.author = "MindMaster - Dev Weekends";

  // Slide 1 - Three Pillars
  const slide1 = pptx.addSlide();
  slide1.background = { color: "0A0A0A" };

  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.05,
    h: "100%",
    fill: { color: "D4A574" },
  });

  slide1.addText("MINDMASTER", {
    x: 0.5,
    y: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    color: "D4A574",
    charSpacing: 6,
  });

  slide1.addText("01", {
    x: 11.8,
    y: 0.3,
    fontSize: 12,
    fontFace: "Arial",
    color: "525252",
  });

  // Title
  slide1.addText("The Three Pillars of Growth", {
    x: 0.5,
    y: 1.0,
    fontSize: 32,
    fontFace: "Georgia",
    color: "FAFAFA",
  });

  // Three columns
  const pillars = [
    {
      num: "01",
      title: "Psychology of Excellence",
      desc: "Understanding how the mind works is the first step to mastering it. Cognitive biases, decision-making, and peak performance.",
    },
    {
      num: "02",
      title: "Time & Energy Mastery",
      desc: "Time management is energy management. Learn frameworks from top performers to structure your days for maximum impact.",
    },
    {
      num: "03",
      title: "The Spiritual Dimension",
      desc: "Purpose, meaning, and inner peace. Finding balance between ambition and contentment in your engineering journey.",
    },
  ];

  pillars.forEach((p, i) => {
    const xPos = 0.5 + i * 4;

    slide1.addText(p.num, {
      x: xPos,
      y: 1.9,
      fontSize: 10,
      fontFace: "Arial",
      color: "D4A574",
      charSpacing: 2,
    });

    slide1.addText(p.title, {
      x: xPos,
      y: 2.3,
      w: 3.5,
      fontSize: 18,
      fontFace: "Arial",
      bold: true,
      color: "FAFAFA",
    });

    slide1.addText(p.desc, {
      x: xPos,
      y: 2.9,
      w: 3.5,
      fontSize: 11,
      fontFace: "Arial",
      color: "737373",
      lineSpacing: 18,
    });
  });

  // Bottom decorative line
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 4.5,
    w: 0.5,
    h: 0.01,
    fill: { color: "D4A574" },
  });

  slide1.addText("KEY INSIGHT", {
    x: 0.5,
    y: 4.7,
    fontSize: 8,
    fontFace: "Arial",
    color: "525252",
    charSpacing: 2,
  });

  slide1.addText("True growth happens when you master both the technical and the mental.", {
    x: 0.5,
    y: 4.95,
    fontSize: 13,
    fontFace: "Georgia",
    color: "A3A3A3",
  });

  // Bottom line
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.48,
    w: "100%",
    h: 0.01,
    fill: { color: "262626" },
  });

  slide1.addText("© MindMaster 2025", {
    x: 0.5,
    y: 5.2,
    fontSize: 9,
    fontFace: "Arial",
    color: "525252",
  });

  slide1.addText("A Dev Weekends Initiative", {
    x: 10.2,
    y: 5.2,
    fontSize: 9,
    fontFace: "Arial",
    color: "525252",
  });

  // Slide 2 - Book/Talk Recommendation
  const slide2 = pptx.addSlide();
  slide2.background = { color: "0A0A0A" };

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.05,
    h: "100%",
    fill: { color: "D4A574" },
  });

  slide2.addText("MINDMASTER", {
    x: 0.5,
    y: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    color: "D4A574",
    charSpacing: 6,
  });

  // Category
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 0.9,
    w: 1.8,
    h: 0.25,
    fill: { color: "1A1A1A" },
  });

  slide2.addText("BOOK OF THE WEEK", {
    x: 0.6,
    y: 0.93,
    fontSize: 8,
    fontFace: "Arial",
    color: "D4A574",
    charSpacing: 2,
  });

  // Book visual placeholder
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 1.5,
    w: 2.5,
    h: 3.5,
    fill: { color: "1A1A1A" },
    line: { color: "262626", width: 1 },
  });

  slide2.addText("Book\nCover", {
    x: 0.5,
    y: 2.8,
    w: 2.5,
    fontSize: 14,
    fontFace: "Arial",
    color: "525252",
    align: "center",
  });

  // Book details
  slide2.addText("Deep Work", {
    x: 3.5,
    y: 1.5,
    fontSize: 28,
    fontFace: "Georgia",
    color: "FAFAFA",
  });

  slide2.addText("by Cal Newport", {
    x: 3.5,
    y: 2.0,
    fontSize: 14,
    fontFace: "Arial",
    color: "737373",
  });

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5,
    y: 2.4,
    w: 0.8,
    h: 0.01,
    fill: { color: "D4A574" },
  });

  slide2.addText(
    "Rules for Focused Success in a Distracted World. A guide to cultivating deep work habits in an age of constant distraction and shallow tasks.",
    {
      x: 3.5,
      y: 2.7,
      w: 7,
      fontSize: 13,
      fontFace: "Arial",
      color: "A3A3A3",
      lineSpacing: 22,
    }
  );

  // Key takeaways
  slide2.addText("KEY TAKEAWAYS", {
    x: 3.5,
    y: 3.8,
    fontSize: 9,
    fontFace: "Arial",
    color: "D4A574",
    charSpacing: 2,
  });

  const takeaways = [
    "Embrace boredom - resist the urge to switch tasks",
    "Schedule deep work blocks religiously",
    "Quit social media (or drastically limit it)",
  ];

  takeaways.forEach((t, i) => {
    slide2.addText("•  " + t, {
      x: 3.5,
      y: 4.1 + i * 0.35,
      fontSize: 11,
      fontFace: "Arial",
      color: "737373",
    });
  });

  // Bottom line
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.48,
    w: "100%",
    h: 0.01,
    fill: { color: "262626" },
  });

  return pptx.writeFile({ fileName: path.join(outputDir, "MindMaster-Template-2-Content.pptx") });
}

// ============================================
// RUN ALL GENERATORS
// ============================================
async function generateAll() {
  console.log("🚀 Generating PowerPoint templates...\n");

  try {
    await createDWTemplate1();
    console.log("✅ Created: DW-Template-1-Intro.pptx");

    await createDWTemplate2();
    console.log("✅ Created: DW-Template-2-Content.pptx");

    await createDWTemplate3();
    console.log("✅ Created: DW-Template-3-Stats.pptx");

    await createMMTemplate1();
    console.log("✅ Created: MindMaster-Template-1-Intro.pptx");

    await createMMTemplate2();
    console.log("✅ Created: MindMaster-Template-2-Content.pptx");

    console.log("\n🎉 All PowerPoint templates generated successfully!");
    console.log(`📁 Output directory: ${outputDir}`);
  } catch (error) {
    console.error("❌ Error generating templates:", error);
  }
}

generateAll();
