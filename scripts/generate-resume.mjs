import puppeteer from "puppeteer";
import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/Triet_Phan_Resume.pdf");

// Embed logo as base64 so it works inside Puppeteer
const logoPath = resolve(__dirname, "../public/logo.png");
let logoBase64 = "";
try {
  logoBase64 = `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`;
} catch {}

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }

  html, body {
    width: 816px;   /* Letter = 8.5in @ 96dpi */
    height: 1056px; /* 11in @ 96dpi */
    overflow: hidden;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 8.6px;
    line-height: 1.42;
    color: #1a1a2e;
    background: #fff;
    padding: 30px 36px 26px;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  /* ── Header ─────────────────────────── */
  .header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-bottom: 9px;
    border-bottom: 2.5px solid #ff6b2b;
  }
  .header-logo {
    width: 44px; height: 44px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }
  .header-name h1 {
    font-size: 22px;
    font-weight: 800;
    color: #0a0a1a;
    letter-spacing: -0.5px;
    line-height: 1.05;
  }
  .header-name .tagline {
    font-size: 9px;
    color: #ff6b2b;
    font-weight: 600;
    letter-spacing: 0.4px;
    margin-top: 1px;
  }
  .header-contact {
    margin-left: auto;
    text-align: right;
    font-size: 8px;
    color: #555;
    line-height: 1.7;
  }
  .header-contact a { color: #ff6b2b; text-decoration: none; }

  /* ── Layout ─────────────────────────── */
  .body-grid {
    display: flex;
    gap: 20px;
    flex: 1;
    min-height: 0;
  }

  .col-main  { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 9px; }
  .col-side  { width: 195px; flex-shrink: 0; display: flex; flex-direction: column; gap: 9px; }

  /* ── Section ────────────────────────── */
  .section { display: flex; flex-direction: column; gap: 5px; }

  .section-title {
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    color: #ff6b2b;
    padding-bottom: 2px;
    border-bottom: 1px solid #f0e8e0;
  }

  /* ── Summary ────────────────────────── */
  .summary { font-size: 8.5px; color: #333; line-height: 1.5; }

  /* ── Job ────────────────────────────── */
  .job { margin-bottom: 5px; }
  .job:last-child { margin-bottom: 0; }

  .job-header { display: flex; justify-content: space-between; align-items: baseline; }
  .job-title  { font-size: 9px; font-weight: 700; color: #0a0a1a; }
  .job-date   { font-size: 7.5px; color: #999; font-style: italic; white-space: nowrap; }
  .job-co     { font-size: 8px; color: #666; margin-bottom: 2px; }

  .job ul { padding-left: 10px; }
  .job li {
    list-style: none;
    padding-left: 7px;
    position: relative;
    color: #444;
    margin-bottom: 1px;
    line-height: 1.38;
  }
  .job li::before { content: "›"; position: absolute; left: 0; color: #ff6b2b; font-weight: 700; }

  /* ── Education ──────────────────────── */
  .edu-item   { margin-bottom: 4px; }
  .edu-degree { font-weight: 700; font-size: 8.5px; color: #0a0a1a; }
  .edu-school { font-size: 8px; color: #666; }

  /* ── Skills ─────────────────────────── */
  .skills-group { margin-bottom: 4px; }
  .skills-label { font-size: 7.5px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 3px; }
  .skill-wrap  { display: flex; flex-wrap: wrap; gap: 3px; }
  .skill-tag {
    padding: 1.5px 6px;
    border-radius: 8px;
    font-size: 7.5px;
    font-weight: 500;
  }
  .s-orange { background:#fff3ee; color:#c44d00; border:1px solid #ffd5bc; }
  .s-purple { background:#f5f0ff; color:#6b3fa0; border:1px solid #e8e0f5; }
  .s-cyan   { background:#eefffd; color:#007a75; border:1px solid #c5f5f0; }
  .s-green  { background:#edfff5; color:#006b3f; border:1px solid #c5f5da; }
  .s-gray   { background:#f5f5f5; color:#444;    border:1px solid #e0e0e0; }

  /* ── Projects ───────────────────────── */
  .project { margin-bottom: 5px; }
  .project:last-child { margin-bottom: 0; }
  .project-name { font-weight: 700; font-size: 8.5px; color: #0a0a1a; }
  .project-desc { font-size: 8px; color: #555; line-height: 1.4; margin-top: 1px; }
  .project-tags { font-size: 7.5px; color: #999; margin-top: 1.5px; }

  /* ── Awards ─────────────────────────── */
  .award-list { display: flex; flex-direction: column; gap: 2.5px; }
  .award-item {
    font-size: 8px; color: #555;
    padding-left: 8px;
    position: relative;
  }
  .award-item::before { content: "✦"; position: absolute; left: 0; color: #ffaa33; font-size: 7px; top: 0.5px; }

  /* ── Languages ──────────────────────── */
  .lang-row { font-size: 8px; color: #555; }

  /* ── Divider ─────────────────────────── */
  .divider { border: none; border-top: 1px dashed #f0e0d0; margin: 0; }

  /* ── Side accent bar ─────────────────── */
  .col-side .section-title { color: #b347ff; border-color: #ede0ff; }
  .col-side .section-title.orange { color: #ff6b2b; border-color: #f0e8e0; }
  .col-side .section-title.green  { color: #00aa66; border-color: #e0f5ec; }

  /* ── Footer ─────────────────────────── */
  .footer {
    text-align: center;
    font-size: 7.5px;
    color: #ccc;
    padding-top: 6px;
    border-top: 1px solid #f0e0d0;
  }
  .footer a { color: #ff6b2b; text-decoration: none; }
</style>
</head>
<body>

<!-- ═══ HEADER ═══ -->
<div class="header">
  ${logoBase64 ? `<img class="header-logo" src="${logoBase64}" alt="logo">` : ""}
  <div class="header-name">
    <h1>Triet Phan</h1>
    <div class="tagline">AI Enthusiast · Full-Stack Developer · Educator</div>
  </div>
  <div class="header-contact">
    Chicago, IL &nbsp;|&nbsp;
    <a href="tel:+17143123088">714-312-3088</a><br>
    <a href="https://phan.today">phan.today</a> &nbsp;|&nbsp;
    <a href="https://github.com/trietphan">github.com/trietphan</a><br>
    <a href="https://www.linkedin.com/in/trietphan">linkedin.com/in/trietphan</a> &nbsp;|&nbsp;
    <a href="https://x.com/trietp">x.com/trietp</a>
  </div>
</div>

<!-- ═══ SUMMARY ═══ -->
<div class="section">
  <div class="summary">
    Full-stack developer and AI enthusiast with an M.S. in Computer Science. Experienced in shipping production marketplace apps used by 200+ users at Airbnb, architecting multi-agent AI swarm systems, and mentoring students in computer science. Passionate about building technology that empowers people to dream bigger and move faster.
  </div>
</div>

<hr class="divider">

<!-- ═══ MAIN + SIDE COLUMNS ═══ -->
<div class="body-grid">

  <!-- ── MAIN ── -->
  <div class="col-main">

    <!-- Experience -->
    <div class="section">
      <div class="section-title">Experience</div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">CIS Tutor (Embedded)</span>
          <span class="job-date">Oct 2025 — Present</span>
        </div>
        <div class="job-co">Wilbur Wright College · City Colleges of Chicago — Chicago, IL</div>
        <ul>
          <li>Provide individual and group tutoring across CIS subjects: programming, databases, algorithms, and web development</li>
          <li>Serve as embedded tutor in live classrooms; lead workshops on study strategies and applied problem-solving</li>
          <li>Develop personalized learning plans; collaborate with instructors to align support with course objectives</li>
          <li>Created reference materials and exercises used as supplementary resources for enrolled students</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">JavaScript Developer I</span>
          <span class="job-date">Feb 2023 — Nov 2023</span>
        </div>
        <div class="job-co">AXANEXA — Chicago, IL</div>
        <ul>
          <li>Architected and delivered a resource management application on monday.com for Airbnb, adopted by 200+ team members for day-to-day project coordination and resource allocation</li>
          <li>Launched the company's inaugural Dependent Dropdown app on the Monday.com Marketplace — first-ever marketplace listing, now used across multiple client organizations</li>
          <li>Built a Role Assignment system capable of processing hundreds of concurrent tasks with intelligent API rate-limit queuing and GraphQL batch optimization</li>
          <li>Pioneered reactive UI/UX design patterns across desktop and mobile, reducing user onboarding friction and increasing adoption</li>
          <li>Contributed to technical documentation and internal component libraries used across the full engineering team</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Teaching Assistant — Accelerated Intro to CS</span>
          <span class="job-date">Aug 2016 — Dec 2017</span>
        </div>
        <div class="job-co">Illinois Institute of Technology — Chicago, IL</div>
        <ul>
          <li>Assisted professor in lab sessions for 60+ students; held weekly office hours and graded assignments with detailed feedback</li>
          <li>Identified common misconceptions and developed targeted exercises that improved class average by ~12%</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Digital Communications, Institutional Advancement</span>
          <span class="job-date">Nov 2015 — Dec 2017</span>
        </div>
        <div class="job-co">Illinois Institute of Technology — Chicago, IL</div>
        <ul>
          <li>Administered and maintained IIT Alumni and Mies Van der Rohe Society websites; migrated legacy media database improving load performance by 40%</li>
          <li>Produced Giving Day 2016 promotional video and proposed cloud backup architecture reducing infrastructure overhead</li>
          <li>Collaborated with marketing team to publish digital content reaching 10,000+ alumni and donors</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Mathematics Tutor</span>
          <span class="job-date">Jun 2014 — May 2015</span>
        </div>
        <div class="job-co">Wilbur Wright College · City Colleges of Chicago — Chicago, IL</div>
        <ul>
          <li>Delivered personalized math tutoring (Algebra through Calculus) to 30+ students per semester</li>
          <li>Maintained 95%+ student satisfaction rating; mentored students toward STEM pathways and scholarship opportunities</li>
        </ul>
      </div>
    </div>

    <!-- Projects -->
    <div class="section">
      <div class="section-title">Select Projects</div>

      <div class="project">
        <div class="project-name">ClawSwarm — AI Agent Swarm Architecture</div>
        <div class="project-desc">Autonomous multi-agent system with three specialized chiefs (CodeClaw, ResearchClaw, OpsClaw). Features auto-scoring quality gates (auto-approve ≥8, human review 5–7, rework &lt;5), real-time WebSocket streaming dashboard, ticket-based auth, and a full soak-test suite. Auto-approve rate ~65% across 50+ test runs.</div>
        <div class="project-tags">TypeScript · Convex · Next.js · WebSockets · AI Architecture</div>
      </div>

      <div class="project">
        <div class="project-name">AgentAwake — AI-Powered SaaS Platform</div>
        <div class="project-desc">SaaS product for AI-powered productivity with tiered pricing (Free → Pro $9/mo → Team $19/mo), automated drip email campaigns via Resend, Stripe billing integration, and a free prompt library lead magnet. Full end-to-end pipeline confirmed in production.</div>
        <div class="project-tags">Next.js · Stripe · Resend · Vercel · TypeScript</div>
      </div>

      <div class="project">
        <div class="project-name">ETH Smart Contracts · Market Profile Guide</div>
        <div class="project-desc">Ethereum smart contract deployment and interaction platform (Solidity, Web3.js). Interactive trading education site for market profile and price-action analysis, deployed on Vercel.</div>
        <div class="project-tags">Solidity · Ethereum · Web3.js · Next.js · Tailwind CSS</div>
      </div>
    </div>

  </div>

  <!-- ── SIDE ── -->
  <div class="col-side">

    <!-- Education -->
    <div class="section">
      <div class="section-title orange">Education</div>
      <div class="edu-item">
        <div class="edu-degree">M.S. Computer Science</div>
        <div class="edu-school">California State University, Fullerton</div>
      </div>
      <div class="edu-item">
        <div class="edu-degree">B.S. Computer Science</div>
        <div class="edu-school">Illinois Institute of Technology</div>
      </div>
      <div class="edu-item">
        <div class="edu-degree">A.S. Computer Science</div>
        <div class="edu-school">Wilbur Wright College</div>
      </div>
    </div>

    <!-- Skills -->
    <div class="section">
      <div class="section-title">Technical Skills</div>

      <div class="skills-group">
        <div class="skills-label">Languages</div>
        <div class="skill-wrap">
          <span class="skill-tag s-orange">JavaScript</span>
          <span class="skill-tag s-orange">TypeScript</span>
          <span class="skill-tag s-green">Python</span>
          <span class="skill-tag s-gray">Solidity</span>
        </div>
      </div>

      <div class="skills-group">
        <div class="skills-label">Frontend</div>
        <div class="skill-wrap">
          <span class="skill-tag s-cyan">React</span>
          <span class="skill-tag s-cyan">Next.js</span>
          <span class="skill-tag s-cyan">Tailwind CSS</span>
          <span class="skill-tag s-purple">Framer Motion</span>
        </div>
      </div>

      <div class="skills-group">
        <div class="skills-label">Backend & APIs</div>
        <div class="skill-wrap">
          <span class="skill-tag s-green">Node.js</span>
          <span class="skill-tag s-purple">GraphQL</span>
          <span class="skill-tag s-gray">REST APIs</span>
          <span class="skill-tag s-gray">WebSockets</span>
        </div>
      </div>

      <div class="skills-group">
        <div class="skills-label">Platforms & Tools</div>
        <div class="skill-wrap">
          <span class="skill-tag s-orange">Monday.com SDK</span>
          <span class="skill-tag s-orange">Make.com</span>
          <span class="skill-tag s-gray">Vercel</span>
          <span class="skill-tag s-gray">Stripe</span>
          <span class="skill-tag s-purple">Convex</span>
          <span class="skill-tag s-green">Resend</span>
          <span class="skill-tag s-gray">Git / GitHub</span>
        </div>
      </div>

      <div class="skills-group">
        <div class="skills-label">AI & Architecture</div>
        <div class="skill-wrap">
          <span class="skill-tag s-purple">AI Agent Systems</span>
          <span class="skill-tag s-purple">LLM Integration</span>
          <span class="skill-tag s-orange">Swarm Architecture</span>
          <span class="skill-tag s-green">RAG / Retrieval</span>
        </div>
      </div>
    </div>

    <!-- Honors -->
    <div class="section">
      <div class="section-title green">Honors & Awards</div>
      <div class="award-list">
        <div class="award-item">IIT Presidential Scholarship</div>
        <div class="award-item">Class Salutatorian</div>
        <div class="award-item">Phi Theta Kappa Honor Society</div>
        <div class="award-item">All Illinois Academic Team</div>
        <div class="award-item">Presidential Scholar Semi-finalist</div>
      </div>
    </div>

    <!-- Languages -->
    <div class="section">
      <div class="section-title">Languages</div>
      <div class="lang-row">🇻🇳 Vietnamese — Native</div>
      <div class="lang-row" style="margin-top:2px;">🇺🇸 English — Professional</div>
    </div>

    <!-- Interests -->
    <div class="section">
      <div class="section-title">Interests</div>
      <div style="font-size:8px; color:#555; line-height:1.6;">
        AI Systems Design · Agent Architecture<br>
        Education & Mentorship · Web3 / DeFi<br>
        Open Source · Market Structure Trading
      </div>
    </div>

  </div>
</div>

<!-- ═══ FOOTER ═══ -->
<div class="footer">
  <a href="https://phan.today">phan.today</a> &nbsp;·&nbsp; Chicago, IL &nbsp;·&nbsp; Available for new opportunities
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
    pageRanges: "1",
  });

  writeFileSync(outputPath, pdf);
  await browser.close();
  console.log(`✅ Resume generated: ${outputPath}`);
}

generatePDF().catch(console.error);
