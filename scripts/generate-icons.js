const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'LogoDeCongolibsApk.png');
const resDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

async function generate() {
  if (!fs.existsSync(src)) {
    console.error('Source icon not found:', src);
    process.exit(1);
  }

  for (const [folder, size] of Object.entries(sizes)) {
    const outDir = path.join(resDir, folder);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, 'ic_launcher.png');

    console.log(`Generating ${outPath} (${size}x${size})`);
    try {
      await sharp(src)
        .resize(size, size, { fit: 'cover' })
        .png()
        .toFile(outPath);
    } catch (err) {
      console.error('Failed to generate icon for', folder, err);
      process.exit(1);
    }
  }

  console.log('Icons generated successfully.');
}

generate();
