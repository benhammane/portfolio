// Encodes a 1080p project video into the three files used by ProjectVideo:
//   src/assert/<name>-preview.mp4  8 s, 768×432, muted   (hover preview)
//   src/assert/<name>-full.mp4     1280×720, H.264 + AAC (modal player)
//   src/assert/<name>-poster.webp  1280×720               (poster / LCP image)
//
// Usage:
//   node scripts/encode-project-video.mjs <master.mp4> <name> [--preview-start=4] [--poster=<image>] [--poster-at=2]
//
// The master itself stays out of git (add it to .gitignore); only the three
// encoded files are versioned.
import { spawnSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const [input, name, ...flags] = process.argv.slice(2);
if (!input || !name) {
  console.error("Usage: node scripts/encode-project-video.mjs <master.mp4> <name> [--preview-start=4] [--poster=<image>] [--poster-at=2]");
  process.exit(1);
}
const opt = Object.fromEntries(flags.map((f) => f.replace(/^--/, "").split("=")));
const out = (suffix) => path.resolve("src/assert", `${name}-${suffix}`);

function run(args) {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg failed (${r.status})`);
}

// Hover preview: short, muted, small — loaded only on first hover.
run([
  "-ss", opt["preview-start"] ?? "0", "-t", "8", "-i", input,
  "-an", "-vf", "scale=768:432:flags=lanczos,fps=30",
  "-c:v", "libx264", "-profile:v", "high", "-crf", "30", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", out("preview.mp4"),
]);

// Modal video: 720p with sound, streamable (faststart).
run([
  "-i", input,
  "-vf", "scale=1280:720:flags=lanczos",
  "-c:v", "libx264", "-profile:v", "high", "-crf", "28", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "96k", "-ar", "48000",
  "-movflags", "+faststart", out("full.mp4"),
]);

// Poster: a designed thumbnail if provided, else a frame of the video.
if (opt.poster) {
  await sharp(opt.poster).resize(1280, 720, { fit: "cover" }).webp({ quality: 82 }).toFile(out("poster.webp"));
} else {
  const frame = out("poster-frame.png");
  run(["-ss", opt["poster-at"] ?? "2", "-i", input, "-frames:v", "1", "-vf", "scale=1280:720", frame]);
  await sharp(frame).webp({ quality: 82 }).toFile(out("poster.webp"));
  (await import("node:fs")).unlinkSync(frame);
}

for (const s of ["preview.mp4", "full.mp4", "poster.webp"]) {
  console.log(`✓ ${path.relative(process.cwd(), out(s))}  ${(statSync(out(s)).size / 1024).toFixed(0)} Ko`);
}
