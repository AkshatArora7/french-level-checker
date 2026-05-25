/**
 * Build the Chrome Web Store package for the French Level Checker extension.
 *
 *  1. Rasterize extension/icon.svg into icons/icon-16.png, icon-48.png, icon-128.png.
 *  2. Bundle the entire extension/ folder (minus the source SVG) into
 *     public/french-level-checker-extension.zip — ready to upload to the
 *     Chrome Web Store dev console, AND to download from /extension.
 *
 *  Run with:  node scripts/build-extension.js
 *  Or via the npm script:  npm run pack:extension
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const AdmZip = require("adm-zip");

const ROOT = path.resolve(__dirname, "..");
const EXT_DIR = path.join(ROOT, "extension");
const ICONS_DIR = path.join(EXT_DIR, "icons");
const SVG_PATH = path.join(EXT_DIR, "icon.svg");
const OUT_ZIP = path.join(ROOT, "public", "french-level-checker-extension.zip");

const SIZES = [16, 32, 48, 128];

async function generateIcons() {
  if (!fs.existsSync(SVG_PATH)) {
    throw new Error("extension/icon.svg not found");
  }
  fs.mkdirSync(ICONS_DIR, { recursive: true });
  const svg = fs.readFileSync(SVG_PATH);
  for (const size of SIZES) {
    const out = path.join(ICONS_DIR, `icon-${size}.png`);
    await sharp(svg, { density: 384 })
      .resize(size, size, { fit: "contain" })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`  generated icons/icon-${size}.png`);
  }
}

function packZip() {
  if (fs.existsSync(OUT_ZIP)) fs.unlinkSync(OUT_ZIP);
  fs.mkdirSync(path.dirname(OUT_ZIP), { recursive: true });

  const zip = new AdmZip();
  // Recursively add the extension/ folder, but skip the source SVG and any
  // hidden files for a clean Web Store upload.
  function walk(dir, base = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.join(base, entry.name).replace(/\\/g, "/");
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      if (rel === "icon.svg") continue;
      if (rel === "STORE-LISTING.md") continue;
      if (rel === "README.md") continue;
      if (entry.isDirectory()) {
        walk(full, rel);
      } else {
        zip.addLocalFile(full, base.replace(/\\/g, "/"));
      }
    }
  }
  walk(EXT_DIR);
  zip.writeZip(OUT_ZIP);
  const size = (fs.statSync(OUT_ZIP).size / 1024).toFixed(1);
  console.log(`  built public/french-level-checker-extension.zip (${size} KB)`);
}

(async () => {
  console.log("Generating icons...");
  await generateIcons();
  console.log("Packing extension...");
  packZip();
  console.log("\nDone. Upload public/french-level-checker-extension.zip to:");
  console.log("  https://chrome.google.com/webstore/devconsole/");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
