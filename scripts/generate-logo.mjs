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
const app = (f) => resolve(__dirname, "../src/app", f);

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

/**
 * Wraps PNG bytes in an ICO container. The ICO format allows a raw PNG payload
 * per entry, which every browser that still asks for favicon.ico understands.
 */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);          // reserved
  header.writeUInt16LE(1, 2);          // type: icon
  header.writeUInt16LE(pngs.length, 4);

  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, data }, i) => {
    const p = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, p);       // width  (0 means 256)
    dir.writeUInt8(size >= 256 ? 0 : size, p + 1);   // height
    dir.writeUInt8(0, p + 2);                        // palette colours
    dir.writeUInt8(0, p + 3);                        // reserved
    dir.writeUInt16LE(1, p + 4);                     // colour planes
    dir.writeUInt16LE(32, p + 6);                    // bits per pixel
    dir.writeUInt32LE(data.length, p + 8);
    dir.writeUInt32LE(offset, p + 12);
    offset += data.length;
  });

  return Buffer.concat([header, dir, ...pngs.map((p) => p.data)]);
}

async function shot(browser, { size, body }) {
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(body);
  const buf = await page.screenshot({
    omitBackground: true,
    clip: { x: 0, y: 0, width: size, height: size },
  });
  await page.close();
  return Buffer.from(buf);
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
    const data = await shot(browser, {
      size,
      body: `<body style="margin:0;background:transparent">${markup({ size })}</body>`,
    });
    writeFileSync(pub(file), data);
    console.log(`✅ public/${file} (${size}px)`);
  }

  // 3. Browser and app icons.
  //
  // Icons get tighter padding than the logo: at 16px the extra whitespace eats
  // most of the glyph and the mark reads as a smudge.
  const iconSvg = markup({ size: 512, pad: 104 });
  writeFileSync(app("icon.svg"), iconSvg);
  console.log("✅ src/app/icon.svg");

  const iconBody = (size) =>
    `<body style="margin:0;background:transparent">${markup({ size, pad: 104 })}</body>`;

  // favicon.ico for the browsers that still request it by name
  const icoSizes = [16, 32, 48];
  const icoPngs = [];
  for (const size of icoSizes) {
    icoPngs.push({ size, data: await shot(browser, { size, body: iconBody(size) }) });
  }
  writeFileSync(app("favicon.ico"), ico(icoPngs));
  console.log(`✅ src/app/favicon.ico (${icoSizes.join(", ")}px)`);

  // Apple touch icon: iOS ignores transparency and composites on white, so the
  // mark ships on its own dark plate.
  const appleData = await shot(browser, {
    size: 180,
    body: `<body style="margin:0;width:180px;height:180px;background:#0a0a1a;display:flex;align-items:center;justify-content:center">
      ${markup({ size: 146, pad: 104 })}</body>`,
  });
  writeFileSync(app("apple-icon.png"), appleData);
  console.log("✅ src/app/apple-icon.png (180px)");

  for (const size of [192, 512]) {
    const data = await shot(browser, {
      size,
      body: `<body style="margin:0;width:${size}px;height:${size}px;background:#0a0a1a;display:flex;align-items:center;justify-content:center">
        ${markup({ size: Math.round(size * 0.82), pad: 104 })}</body>`,
    });
    writeFileSync(pub(`icon-${size}.png`), data);
    console.log(`✅ public/icon-${size}.png`);
  }

  writeFileSync(
    pub("site.webmanifest"),
    JSON.stringify(
      {
        name: "Triet Phan — aifutures.dev",
        short_name: "Triet Phan",
        description:
          "Founder of aifutures.dev, an independent product lab building AI Futures Trader, AIFlow and Agent Control Center.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a1a",
        theme_color: "#0a0a1a",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      null,
      2
    ) + "\n"
  );
  console.log("✅ public/site.webmanifest");

  // 4. Open Graph card
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
