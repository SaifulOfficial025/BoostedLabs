/**
 * Image Compression Script
 * Run: node compress-images.js
 * 
 * This script:
 * 1. Finds all PNG/JPG/JPEG images in the public folder
 * 2. Converts them to WebP format (25-35% smaller)
 * 3. Compresses with quality 80
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function compressImages() {
  if (!fs.existsSync(publicDir)) {
    console.error('❌ Public directory not found!');
    return;
  }

  const files = fs.readdirSync(publicDir);
  let processed = 0;
  let skipped = 0;
  let errors = 0;

  console.log('🚀 Starting image compression...\n');

  for (const file of files) {
    // Skip if it's already a webp file
    if (file.endsWith('.webp')) {
      skipped++;
      continue;
    }

    // Check if it's an image file
    if (!/\.(png|jpg|jpeg)$/i.test(file)) {
      continue;
    }

    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

    // Skip if webp version already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipped ${file} (WebP version exists)`);
      skipped++;
      continue;
    }

    try {
      // Get original file size
      const originalSize = fs.statSync(inputPath).size;

      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      // Get new file size
      const newSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${file} → ${path.basename(outputPath)}`);
      console.log(`   📊 ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)\n`);

      processed++;
    } catch (err) {
      console.error(`❌ Error converting ${file}:`, err.message);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📈 Compression Summary:');
  console.log(`   ✅ Processed: ${processed}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('='.repeat(50));

  if (processed > 0) {
    console.log('\n💡 Next steps:');
    console.log('   1. Update your image imports to use .webp extensions');
    console.log('   2. Optionally delete the original PNG/JPG files');
    console.log('   3. Run "npm run build" to apply optimizations');
  }
}

compressImages().catch(console.error);
