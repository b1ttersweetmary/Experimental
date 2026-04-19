import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

await sharp(join(root, "public/web-logo.svg"))
  .resize(128, 128, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .png()
  .toFile(join(root, "app/icon.png"));

console.log("app/icon.png ← public/web-logo.svg");
