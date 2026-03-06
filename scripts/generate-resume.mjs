import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/Triet_Phan_Resume.pdf");

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    color: #1a1a2e;
    line-height: 1.5;
    padding: 48px 52px;
    font-size: 10.5px;
  }

  /* ─── Header ─── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 16px;
    border-bottom: 2px solid #ff6b2b;
    margin-bottom: 20px;
  }

  .header-left h1 {
    font-size: 28px;
    font-weight: 800;
    color: #0a0a1a;
    letter-spacing: -0.5px;
    line-height: 1.1;
  }

  .header-left .tagline {
    font-size: 12px;
    color: #ff6b2b;
    font-weight: 600;
    margin-top: 4px;
    letter-spacing: 0.5px;
  }

  .header-right {
    text-align: right;
    font-size: 10px;
    color: #444;
    line-height: 1.7;
  }

  .header-right a {
    color: #ff6b2b;
    text-decoration: none;
  }

  /* ─── Section ─── */
  .section {
    margin-bottom: 18px;
  }

  .section-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #ff6b2b;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #eee;
  }

  /* ─── Summary ─── */
  .summary {
    font-size: 10.5px;
    color: #333;
    line-height: 1.6;
  }

  /* ─── Experience ─── */
  .job {
    margin-bottom: 14px;
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }

  .job-title {
    font-size: 11.5px;
    font-weight: 700;
    color: #0a0a1a;
  }

  .job-date {
    font-size: 9.5px;
    color: #888;
    font-weight: 500;
    white-space: nowrap;
  }

  .job-company {
    font-size: 10px;
    color: #666;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .job ul {
    padding-left: 14px;
    color: #444;
  }

  .job li {
    margin-bottom: 2px;
    line-height: 1.5;
  }

  /* ─── Two columns ─── */
  .two-col {
    display: flex;
    gap: 40px;
  }

  .two-col > div {
    flex: 1;
  }

  /* ─── Education ─── */
  .edu-item {
    margin-bottom: 8px;
  }

  .edu-degree {
    font-weight: 700;
    font-size: 10.5px;
    color: #0a0a1a;
  }

  .edu-school {
    font-size: 10px;
    color: #666;
  }

  /* ─── Skills ─── */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .skill-tag {
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 9.5px;
    font-weight: 500;
    background: #f5f0ff;
    color: #6b3fa0;
    border: 1px solid #e8e0f5;
  }

  .skill-tag.orange {
    background: #fff5ee;
    color: #c44d00;
    border-color: #ffe0cc;
  }

  .skill-tag.cyan {
    background: #eefffe;
    color: #007a75;
    border-color: #ccf5f3;
  }

  .skill-tag.green {
    background: #eefff5;
    color: #006b3f;
    border-color: #ccf5e0;
  }

  /* ─── Awards ─── */
  .awards-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .award-tag {
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 9px;
    font-weight: 500;
    background: #fff8ee;
    color: #8a6d00;
    border: 1px solid #f0e6cc;
  }

  /* ─── Projects ─── */
  .project {
    margin-bottom: 10px;
  }

  .project-name {
    font-weight: 700;
    font-size: 10.5px;
    color: #0a0a1a;
    display: inline;
  }

  .project-desc {
    font-size: 10px;
    color: #555;
    display: inline;
  }

  .project-tags {
    font-size: 9px;
    color: #888;
    margin-top: 2px;
  }
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="header-left">
    <h1>Triet Phan</h1>
    <div class="tagline">AI Enthusiast · Full-Stack Developer · Educator</div>
  </div>
  <div class="header-right">
    Chicago, Illinois<br>
    <a href="https://www.linkedin.com/in/trietphan">linkedin.com/in/trietphan</a><br>
    <a href="https://github.com/trietphan">github.com/trietphan</a><br>
    <a href="mailto:trietphan85@gmail.com">trietphan85@gmail.com</a>
  </div>
</div>

<!-- Summary -->
<div class="section">
  <div class="section-title">Summary</div>
  <div class="summary">
    Full-stack developer and AI enthusiast with a Master's in Computer Science. Passionate about building technology that empowers people to pursue their dreams. Experienced in shipping production applications used by 200+ users, architecting AI agent systems, and mentoring the next generation of developers through hands-on tutoring.
  </div>
</div>

<!-- Experience -->
<div class="section">
  <div class="section-title">Experience</div>

  <div class="job">
    <div class="job-header">
      <div class="job-title">Computer Information Systems Tutor</div>
      <div class="job-date">Oct 2025 — Present</div>
    </div>
    <div class="job-company">Wilbur Wright College — City Colleges of Chicago · Chicago, IL</div>
    <ul>
      <li>Provide individual and group tutoring across a wide range of CIS subjects including programming, databases, and web development</li>
      <li>Serve as embedded tutor in classrooms, leading workshops on study skills and learning strategies</li>
      <li>Develop personalized learning plans that address each student's strengths and areas for growth</li>
      <li>Collaborate with instructors to align tutoring support with lesson plans and course objectives</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="job-title">JavaScript Developer I</div>
      <div class="job-date">Feb 2023 — Nov 2023</div>
    </div>
    <div class="job-company">AXANEXA · Chicago, IL</div>
    <ul>
      <li>Developed and deployed a resource management application on monday.com for Airbnb, adopted by 200+ team members for project coordination and resource allocation</li>
      <li>Launched the company's first-ever Dependent Dropdown application on the Monday.com Marketplace, pioneering marketplace offerings</li>
      <li>Built a role assignment/reassignment system handling hundreds of concurrent tasks with optimized API rate-limit management</li>
      <li>Pioneered UI/UX design strategies using reactive programming and modern design principles across multiple devices and platforms</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="job-title">Teaching Assistant — Accelerated Intro to Computer Science</div>
      <div class="job-date">Aug 2016 — Dec 2017</div>
    </div>
    <div class="job-company">Illinois Institute of Technology · Chicago, IL</div>
    <ul>
      <li>Assisted professor during laboratory sessions and graded student assignments</li>
      <li>Held office hours for individual mentoring and facilitated small group exploration of CS concepts</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="job-title">Digital Communications, Institutional Advancement</div>
      <div class="job-date">Nov 2015 — Dec 2017</div>
    </div>
    <div class="job-company">Illinois Institute of Technology · Chicago, IL</div>
    <ul>
      <li>Administered the IIT Alumni and Mies Van der Rohe Society websites</li>
      <li>Migrated media database to external storage, improving system speed by 40%</li>
      <li>Produced the Illinois Tech Giving Day 2016 Results video and in-house content for IA teams</li>
      <li>Proposed cloud-based backup solutions to improve workflow and reduce infrastructure costs</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="job-title">Mathematics Tutor</div>
      <div class="job-date">Jun 2014 — May 2015</div>
    </div>
    <div class="job-company">Wilbur Wright College — City Colleges of Chicago · Chicago, IL</div>
    <ul>
      <li>Motivated students to excel in STEM through personalized one-on-one math tutoring</li>
      <li>Encouraged independent problem-solving using Khan Academy and online learning resources</li>
    </ul>
  </div>
</div>

<!-- Two columns: Education + Skills -->
<div class="two-col">
  <div class="section">
    <div class="section-title">Education</div>
    <div class="edu-item">
      <div class="edu-degree">M.S. Computer Science</div>
      <div class="edu-school">California State University, Fullerton · 2018 — 2022</div>
    </div>
    <div class="edu-item">
      <div class="edu-degree">B.S. Computer Science</div>
      <div class="edu-school">Illinois Institute of Technology · 2015 — 2017</div>
    </div>
    <div class="edu-item">
      <div class="edu-degree">A.S. Computer Science</div>
      <div class="edu-school">Wilbur Wright College, Chicago · 2013 — 2015</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <span class="skill-tag orange">JavaScript</span>
      <span class="skill-tag orange">TypeScript</span>
      <span class="skill-tag cyan">React</span>
      <span class="skill-tag cyan">Next.js</span>
      <span class="skill-tag green">Node.js</span>
      <span class="skill-tag">GraphQL</span>
      <span class="skill-tag">REST APIs</span>
      <span class="skill-tag orange">Monday.com SDK</span>
      <span class="skill-tag green">Python</span>
      <span class="skill-tag cyan">Tailwind CSS</span>
      <span class="skill-tag">AI Architecture</span>
      <span class="skill-tag orange">Make.com</span>
      <span class="skill-tag cyan">UI/UX Design</span>
      <span class="skill-tag green">Framer Motion</span>
    </div>
  </div>
</div>

<!-- Two columns: Projects + Awards -->
<div class="two-col">
  <div class="section">
    <div class="section-title">Select Projects</div>
    <div class="project">
      <span class="project-name">MoonClawSwarm</span>
      <span class="project-desc"> — AI agent swarm architecture with 3 specialized chiefs, auto-scoring quality gates, real-time WebSocket streaming dashboard, and human-in-the-loop review system.</span>
      <div class="project-tags">TypeScript · Convex · AI Agents · WebSockets · Next.js</div>
    </div>
    <div class="project">
      <span class="project-name">AgentAwake</span>
      <span class="project-desc"> — SaaS platform for AI-powered productivity with professional plans, prompt libraries, and automated email flows.</span>
      <div class="project-tags">Next.js · Stripe · Resend · Vercel</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Honors & Awards</div>
    <div class="awards-list">
      <span class="award-tag">IIT Presidential Scholarship</span>
      <span class="award-tag">Class Salutatorian</span>
      <span class="award-tag">Phi Theta Kappa</span>
      <span class="award-tag">All Illinois Academic Team</span>
      <span class="award-tag">Presidential Scholar Semi-finalist</span>
    </div>
    <div style="margin-top: 14px;">
      <div class="section-title">Languages</div>
      <div style="font-size: 10px; color: #555;">Vietnamese (Native) · English (Professional Working)</div>
    </div>
  </div>
</div>

</body>
</html>`;

async function generatePDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "Letter",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  });
  writeFileSync(outputPath, pdf);
  await browser.close();
  console.log(`✅ Resume PDF generated: ${outputPath}`);
}

generatePDF().catch(console.error);
