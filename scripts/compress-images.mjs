import sharp from "sharp";
import { readdirSync, statSync, mkdirSync } from "fs";
import { join, extname, basename } from "path";

const PUBLIC = "/Users/tylereggleston/code/homeservices-frontend/public";

const targets = [
  // Funnel option images (shown in step 1 — highest priority)
  { src: `${PUBLIC}/single-family-home.png`,       dest: `${PUBLIC}/single-family-home.webp` },
  { src: `${PUBLIC}/services/mobile-home.png`,     dest: `${PUBLIC}/services/mobile-home.webp` },
  { src: `${PUBLIC}/services/apartment.png`,       dest: `${PUBLIC}/services/apartment.webp` },
  // Service grid images on landing page
  { src: `${PUBLIC}/services/roofing.jpg`,         dest: `${PUBLIC}/services/roofing.webp` },
  { src: `${PUBLIC}/services/solar.jpg`,           dest: `${PUBLIC}/services/solar.webp` },
  { src: `${PUBLIC}/services/windows.jpg`,         dest: `${PUBLIC}/services/windows.webp` },
  { src: `${PUBLIC}/services/bathroom.jpg`,        dest: `${PUBLIC}/services/bathroom.webp` },
  { src: `${PUBLIC}/services/gutters.jpg`,         dest: `${PUBLIC}/services/gutters.webp` },
  { src: `${PUBLIC}/services/hvac.jpg`,            dest: `${PUBLIC}/services/hvac.webp` },
  { src: `${PUBLIC}/services/painting.jpg`,        dest: `${PUBLIC}/services/painting.webp` },
  { src: `${PUBLIC}/services/siding.jpg`,          dest: `${PUBLIC}/services/siding.webp` },
  { src: `${PUBLIC}/services/walk-in-tubs.jpg`,    dest: `${PUBLIC}/services/walk-in-tubs.webp` },
  // Mascot on home page
  { src: `${PUBLIC}/remodel-wizard.png`,           dest: `${PUBLIC}/remodel-wizard.webp` },
];

let totalBefore = 0;
let totalAfter = 0;

for (const { src, dest } of targets) {
  try {
    const before = statSync(src).size;
    totalBefore += before;

    await sharp(src)
      .resize(800, 600, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest);

    const after = statSync(dest).size;
    totalAfter += after;

    const saving = (((before - after) / before) * 100).toFixed(0);
    console.log(`✓ ${basename(src).padEnd(30)} ${(before/1024).toFixed(0).padStart(6)}KB → ${(after/1024).toFixed(0).padStart(5)}KB  (-${saving}%)`);
  } catch (err) {
    console.error(`✗ ${src}: ${err.message}`);
  }
}

console.log("");
console.log(`Total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(0)}%)`);
