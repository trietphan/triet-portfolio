import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── LOGO HTML ───────────────────────────────────────────────────────────────
const logoHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 512px; height: 512px; background: transparent; overflow: hidden; }

  .wrap {
    width: 512px;
    height: 512px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* Outer glow ring */
  .ring-outer {
    position: absolute;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    background: conic-gradient(from 180deg, #ff6b2b, #ffaa33, #b347ff, #ff6b2b);
    padding: 3px;
  }

  .ring-inner-mask {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #0a0a1a;
  }

  /* Middle circle */
  .circle {
    position: absolute;
    width: 456px;
    height: 456px;
    border-radius: 50%;
    background: radial-gradient(ellipse at 30% 30%, #1c0d05, #0a0a1a 70%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Inner glow */
  .glow {
    position: absolute;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(255,107,43,0.12) 0%, transparent 70%);
  }

  /* Monogram */
  .letters {
    position: relative;
    z-index: 2;
    font-family: 'Inter', 'Arial Black', system-ui;
    font-weight: 900;
    font-size: 190px;
    letter-spacing: -12px;
    line-height: 1;
    background: linear-gradient(135deg, #ff6b2b 0%, #ffaa33 50%, #ff8800 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 20px rgba(255,107,43,0.5));
    padding-left: 8px;
  }

  /* Subtle tick mark — bottom right */
  .dot {
    position: absolute;
    bottom: 128px;
    right: 118px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #00ff88;
    box-shadow: 0 0 12px #00ff88;
    z-index: 3;
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet">
</head>
<body>
  <div class="wrap">
    <div class="ring-outer">
      <div class="ring-inner-mask"></div>
    </div>
    <div class="circle">
      <div class="glow"></div>
      <div class="letters">TP</div>
    </div>
    <div class="dot"></div>
  </div>
</body>
</html>`;

// ─── BANNER HTML ─────────────────────────────────────────────────────────────
const bannerHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; background: #0a0a1a; }

  body {
    font-family: 'Inter', 'Arial', system-ui;
    position: relative;
  }

  /* Background orbs */
  .orb1 {
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(255,107,43,0.18) 0%, transparent 70%);
    top: -100px; right: 100px;
  }
  .orb2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(179,71,255,0.12) 0%, transparent 70%);
    bottom: -80px; left: 300px;
  }
  .orb3 {
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,255,245,0.06) 0%, transparent 70%);
    top: 50px; left: 50px;
  }

  /* Noise texture */
  .noise {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px;
  }

  /* Grid lines — subtle */
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,107,43,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,43,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Content */
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 90px;
    gap: 60px;
  }

  .left { flex: 1; }

  /* Logo mark (mini version) */
  .logo-mark {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: conic-gradient(from 180deg, #ff6b2b, #ffaa33, #b347ff, #ff6b2b);
    padding: 2px;
    margin-bottom: 32px;
  }
  .logo-mark-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #0a0a1a, #1a0a05);
    color: #ff6b2b;
  }

  .label {
    font-size: 13px;
    font-weight: 600;
    color: #ff6b2b;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 80px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -3px;
    margin-bottom: 20px;
  }

  .name-T { color: #ff6b2b; }
  .name-rest { color: rgba(255,255,255,0.92); }

  .tagline {
    font-size: 20px;
    color: rgba(255,255,255,0.45);
    font-weight: 300;
    line-height: 1.5;
    max-width: 480px;
    margin-bottom: 36px;
  }

  .tagline span.c1 { color: #00fff5; font-weight: 500; }
  .tagline span.c2 { color: #ff6b2b; font-weight: 500; }
  .tagline span.c3 { color: #f5ff00; font-weight: 500; }

  .pills {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .pill {
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid;
  }

  /* Right side — decorative visual */
  .right {
    width: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .big-logo {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: conic-gradient(from 180deg, #ff6b2b, #ffaa33, #b347ff, #ff6b2b);
    padding: 4px;
    position: relative;
  }

  .big-logo-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(ellipse at 30% 30%, #1c0d05, #0a0a1a 70%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .big-letters {
    font-size: 100px;
    font-weight: 900;
    letter-spacing: -6px;
    background: linear-gradient(135deg, #ff6b2b, #ffaa33);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 16px rgba(255,107,43,0.4));
    padding-left: 4px;
  }

  .big-logo-dot {
    position: absolute;
    bottom: 22px;
    right: 14px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00ff88;
    box-shadow: 0 0 16px #00ff88;
  }

  /* Floating decorative shapes */
  .geo {
    position: absolute;
    opacity: 0.15;
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600;900&display=swap" rel="stylesheet">
</head>
<body>
  <div class="orb1"></div>
  <div class="orb2"></div>
  <div class="orb3"></div>
  <div class="noise"></div>
  <div class="grid"></div>

  <div class="content">
    <div class="left">
      <div class="label">Portfolio · 2026</div>

      <h1>
        <span class="name-T">T</span><span class="name-rest">riet</span><br>
        <span class="name-rest">Phan</span>
      </h1>

      <div class="tagline">
        Crafting <span class="c1">tools that empower</span>,
        building <span class="c2">systems that scale</span>,
        inspiring the <span class="c3">next generation</span>.
      </div>

      <div class="pills">
        <div class="pill" style="color:#b347ff; border-color:rgba(179,71,255,0.25); background:rgba(179,71,255,0.08);">AI Agent Architect</div>
        <div class="pill" style="color:#00fff5; border-color:rgba(0,255,245,0.25); background:rgba(0,255,245,0.06);">Full-Stack Developer</div>
        <div class="pill" style="color:#ffaa33; border-color:rgba(255,170,51,0.25); background:rgba(255,170,51,0.06);">Educator</div>
      </div>
    </div>

    <div class="right">
      <!-- Floating wireframe triangle -->
      <svg class="geo" style="top:20px;right:40px;" width="60" height="60" viewBox="0 0 60 60">
        <polygon points="30,4 56,52 4,52" fill="none" stroke="#ff6b2b" stroke-width="1"/>
      </svg>
      <!-- Floating hex -->
      <svg class="geo" style="bottom:30px;left:10px;" width="70" height="70" viewBox="0 0 70 70">
        <polygon points="35,4 63,19.5 63,50.5 35,66 7,50.5 7,19.5" fill="none" stroke="#b347ff" stroke-width="1"/>
      </svg>

      <div class="big-logo">
        <div class="big-logo-inner">
          <div class="big-letters">TP</div>
        </div>
        <div class="big-logo-dot"></div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function generate() {
  const browser = await puppeteer.launch({ headless: true });

  // ── Logo 512x512 ──
  console.log("Generating logo...");
  let page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 2 });
  await page.setContent(logoHtml, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 800)); // let font load
  const logoPath = resolve(__dirname, "../public/logo.png");
  await page.screenshot({ path: logoPath, omitBackground: true });
  console.log(`✅ Logo: ${logoPath}`);

  // ── Favicon 64x64 ──
  console.log("Generating favicon...");
  page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  await page.setContent(logoHtml, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 800));
  const faviconPath = resolve(__dirname, "../public/favicon.png");
  await page.screenshot({ path: faviconPath, omitBackground: true, clip: { x: 0, y: 0, width: 512, height: 512 } });
  console.log(`✅ Favicon: ${faviconPath}`);

  // ── OG Banner 1200x630 ──
  console.log("Generating banner...");
  page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(bannerHtml, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 800));
  const bannerPath = resolve(__dirname, "../public/og-image.png");
  await page.screenshot({ path: bannerPath, omitBackground: false });
  console.log(`✅ Banner: ${bannerPath}`);

  // ── Logo SVG (for inline use) ──
  const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6b2b"/>
      <stop offset="50%" stop-color="#ffaa33"/>
      <stop offset="100%" stop-color="#ff8800"/>
    </linearGradient>
    <radialGradient id="bg" cx="30%" cy="30%">
      <stop offset="0%" stop-color="#1c0d05"/>
      <stop offset="100%" stop-color="#0a0a1a"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%">
      <stop offset="0%" stop-color="rgba(255,107,43,0.15)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <!-- Outer ring gradient -->
  <circle cx="256" cy="256" r="248" fill="none" stroke="url(#grad)" stroke-width="6"/>
  <!-- Background -->
  <circle cx="256" cy="256" r="244" fill="url(#bg)"/>
  <!-- Inner glow -->
  <circle cx="256" cy="256" r="180" fill="url(#glow)"/>
  <!-- TP text approximated as paths would go here — using text for SVG inline use -->
  <text x="256" y="316" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="186" fill="url(#grad)" text-anchor="middle" letter-spacing="-10">TP</text>
  <!-- Green dot -->
  <circle cx="365" cy="390" r="16" fill="#00ff88"/>
</svg>`;
  const svgPath = resolve(__dirname, "../public/logo.svg");
  writeFileSync(svgPath, svgContent);
  console.log(`✅ SVG: ${svgPath}`);

  await browser.close();
  console.log("\n🎨 All brand assets generated!");
}

generate().catch(console.error);
