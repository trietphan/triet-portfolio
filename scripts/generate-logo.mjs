/**
 * Generates every static form of the aifutures mark from one source of truth.
 *
 * Geometry and colour here must stay in sync with src/components/Logo.tsx —
 * both were fitted against the original artwork (petal = circle r=0.326R centred
 * 0.5R out, capped with a point at 1.0R; per-petal tip→base gradient; 95% alpha).
 *
 *   node scripts/generate-logo.mjs
 *
 * Set PUPPETEER_EXECUTABLE_PATH to use a system Chromium.
 */
import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = (f) => resolve(__dirname, "../public", f);

const PETALS = [
  ["#ff6e60", "#ff3c32"], ["#ff993b", "#fa650b"], ["#ffd05a", "#f9b221"], ["#6ddf88", "#30bf59"],
  ["#50d6e6", "#12b6ca"], ["#5791ff", "#1766f6"], ["#827aef", "#4c44d7"], ["#c175ef", "#9c40d7"],
];
const PETAL_PATH =
  "M 0,-100 Q -18.54,-85.63 -24.72,-71.26 A 32.6,32.6 0 1 0 24.72,-71.26 Q 18.54,-85.63 0,-100 Z";
const ALPHA = 0.95;

function markup({ size = 512, pad = 118 } = {}) {
  // objectBoundingBox keeps each gradient aligned to its own petal regardless of
  // rotation — same reasoning as src/components/Logo.tsx.
  const defs = PETALS.map(([tip, base], i) =>
    `<linearGradient id="p${i}" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">` +
    `<stop offset="0" stop-color="${tip}"/><stop offset="1" stop-color="${base}"/></linearGradient>`
  ).join("");
  const petals = PETALS.map((_, i) =>
    `<path d="${PETAL_PATH}" fill="url(#p${i})" opacity="${ALPHA}" transform="rotate(${i * 45})"/>`
  ).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${pad * 2} ${pad * 2}" width="${size}" height="${size}">` +
    `<defs>${defs}</defs><g style="isolation:isolate">${petals}</g></svg>`;
}

async function main() {
  // 1. Scalable master
  const svg = markup({ size: 512 });
  writeFileSync(pub("logo.svg"), svg);
  console.log("✅ public/logo.svg");

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 2. Transparent PNGs at the sizes the site and the résumé need
  for (const [file, size] of [["logo.png", 512], ["favicon.png", 512], ["favicon-512.png", 512]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.setContent(
      `<body style="margin:0;background:transparent">${markup({ size })}</body>`
    );
    const buf = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
    writeFileSync(pub(file), buf);
    await page.close();
    console.log(`✅ public/${file} (${size}px)`);
  }

  // 3. Open Graph card
  const og = await browser.newPage();
  await og.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await og.setContent(`<body style="margin:0;width:1200px;height:630px;background:#0a0a1a;
      font-family:Inter,system-ui,sans-serif;display:flex;align-items:center;gap:64px;padding:0 88px;position:relative;overflow:hidden">
    <div style="position:absolute;top:-160px;right:-120px;width:560px;height:560px;border-radius:50%;
      background:conic-gradient(from -90deg,#ff6e60,#ff993b,#ffd05a,#6ddf88,#50d6e6,#5791ff,#827aef,#c175ef,#ff6e60);
      filter:blur(150px);opacity:0.30"></div>
    <div style="flex-shrink:0;position:relative">${markup({ size: 260 })}</div>
    <div style="position:relative">
      <div style="font-size:60px;font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.05">Triet Phan</div>
      <div style="font-size:27px;font-weight:600;color:#ff993b;margin-top:14px">Founder · aifutures.dev</div>
      <div style="font-size:21px;color:rgba(255,255,255,0.42);margin-top:20px;line-height:1.5;max-width:560px">
        An independent product lab building instruments for the agentic age.
      </div>
      <div style="display:flex;gap:10px;margin-top:30px">
        ${["AI Futures Trader", "AIFlow", "Agent Control Center"].map((t, i) =>
          `<span style="padding:8px 15px;border-radius:999px;font-size:15px;font-weight:500;
            color:${["#ffd05a", "#50d6e6", "#c175ef"][i]};
            border:1px solid ${["#ffd05a", "#50d6e6", "#c175ef"][i]}40;
            background:${["#ffd05a", "#50d6e6", "#c175ef"][i]}12">${t}</span>`).join("")}
      </div>
    </div>
  </body>`);
  await new Promise((r) => setTimeout(r, 400));
  writeFileSync(pub("og-image.png"), await og.screenshot());
  console.log("✅ public/og-image.png (1200x630)");

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
