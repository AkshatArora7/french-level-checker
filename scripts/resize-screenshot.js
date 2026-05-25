/**
 * Resize ss/image.png into Chrome Web Store screenshot dimensions.
 *
 *  Required: 1280x800 or 640x400 PNG/JPEG (1.6:1 aspect ratio).
 *  Source:  1919x1131 (1.697 ratio) — slightly too wide.
 *
 *  Strategy: crop 109 px from the LEFT (keeps the popup in the top-right
 *  intact), then downscale.  Produces 1280x800, 640x400, and a 440x280
 *  promo tile.  All outputs go in ss/.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = path.join(__dirname, "..", "ss", "image.png");
const OUT_DIR = path.join(__dirname, "..", "ss");

async function run() {
  const meta = await sharp(SRC).metadata();
  // Crop to a 1.6 ratio: keep full height, trim width to height * 1.6
  const targetW = Math.round(meta.height * 1.6);
  const offsetX = meta.width - targetW; // crop from the LEFT, keep right side
  const cropped = sharp(SRC).extract({
    left: offsetX,
    top: 0,
    width: targetW,
    height: meta.height,
  });

  const buffer = await cropped.png().toBuffer();

  const outputs = [
    { w: 1280, h: 800, name: "screenshot-1280x800.png" },
    { w: 640, h: 400, name: "screenshot-640x400.png" },
    { w: 440, h: 280, name: "promo-440x280.png" },
  ];
  for (const { w, h, name } of outputs) {
    const out = path.join(OUT_DIR, name);
    await sharp(buffer)
      .resize(w, h, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toFile(out);
    const sizeKB = (fs.statSync(out).size / 1024).toFixed(1);
    console.log(`  ${name}  (${sizeKB} KB)`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
