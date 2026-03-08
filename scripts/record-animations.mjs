import puppeteer from "puppeteer";
import { execSync, spawnSync } from "child_process";
import { mkdirSync, rmSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const LOGOS = [
  { name: "logo1-murmuration", html: "anim-logo1.html", warmup: 2500 },
  { name: "logo2-arrow-swarm",  html: "anim-logo2.html", warmup: 2000 },
  { name: "logo3-chevron",      html: "anim-logo3.html", warmup: 2000 },
];

const FPS    = 30;
const SECS   = 4;
const FRAMES = FPS * SECS;
const SIZE   = 800;

async function recordLogo({ name, html, warmup }) {
  console.log(`\n🎬 Recording ${name}...`);
  const framesDir = resolve(__dirname, `../tmp-frames/${name}`);
  if (existsSync(framesDir)) rmSync(framesDir, { recursive: true });
  mkdirSync(framesDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 60000,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 });

  const url = `file://${resolve(__dirname, html)}`;
  await page.goto(url, { waitUntil: "load" });

  // Let animation run and warm up
  await new Promise(r => setTimeout(r, warmup));

  // Capture frames using canvas.toDataURL via evaluate (fast, no screenshot protocol timeout)
  for (let i = 0; i < FRAMES; i++) {
    const dataUrl = await page.evaluate(() => {
      const c = document.getElementById("c");
      return c ? c.toDataURL("image/png") : null;
    });

    if (dataUrl) {
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
      const buf = Buffer.from(base64, "base64");
      const pad = String(i).padStart(4, "0");
      writeFileSync(`${framesDir}/frame_${pad}.png`, buf);
    }

    // Advance 1 frame (33ms)
    await new Promise(r => setTimeout(r, 33));
    if (i % 10 === 0) process.stdout.write(`  frame ${i}/${FRAMES}\r`);
  }

  await browser.close();
  console.log(`  ✅ ${FRAMES} frames captured`);

  const outDir = resolve(__dirname, "../public/animations");
  mkdirSync(outDir, { recursive: true });

  // MP4
  const mp4 = `${outDir}/${name}.mp4`;
  spawnSync("ffmpeg", [
    "-y", "-framerate", String(FPS),
    "-i", `${framesDir}/frame_%04d.png`,
    "-vf", `scale=${SIZE}:${SIZE}:flags=lanczos`,
    "-c:v", "libx264", "-preset", "fast", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4,
  ], { stdio: "inherit" });
  console.log(`  ✅ MP4: ${mp4}`);

  // GIF (480px, 15fps)
  const gif = `${outDir}/${name}.gif`;
  spawnSync("ffmpeg", [
    "-y", "-framerate", String(FPS),
    "-i", `${framesDir}/frame_%04d.png`,
    "-vf", "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer",
    gif,
  ], { stdio: "inherit" });
  console.log(`  ✅ GIF: ${gif}`);

  rmSync(framesDir, { recursive: true });
}

(async () => {
  for (const logo of LOGOS) {
    await recordLogo(logo);
  }
  console.log("\n🎉 All done! Files in public/animations/");
})().catch(e => { console.error(e); process.exit(1); });
