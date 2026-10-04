import { chromium } from 'file:///C:/Users/Prasun%20Bhattacharyya/Desktop/Projects/compound-calculator/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="50%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.32" />
    </filter>
  </defs>

  <!-- Squircle container matching navbar icon -->
  <rect width="512" height="512" rx="144" fill="url(#brandGrad)" />
  <rect x="8" y="8" width="496" height="496" rx="136" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="12" />

  <!-- The Modular Utility Matrix: 4 precision nodes + signature dot -->
  <g filter="url(#shadow)" transform="translate(48, 48) scale(13)">
    <!-- Top-Left: Calculation block -->
    <rect x="6" y="6" width="8" height="8" rx="2.5" fill="#ffffff" />
    <!-- Top-Right: Logic / developer block -->
    <rect x="18" y="6" width="8" height="8" rx="2.5" fill="#ffffff" fill-opacity="0.95" />
    <!-- Bottom-Left: Growth / metric block -->
    <rect x="6" y="18" width="8" height="8" rx="2.5" fill="#ffffff" fill-opacity="0.95" />
    <!-- Bottom-Right: The Signature Focal Period '.' of GenPopUtils. -->
    <circle cx="22" cy="22" r="4.2" fill="#ffffff" />
    <!-- Subtle central connector crosshair -->
    <path d="M14 10h4M10 14v4M18 14v4M14 22h4" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.45" />
  </g>
</svg>`;

// Save the 512x512 SVG directly
fs.writeFileSync('public/favicon.svg', svgContent.trim());

async function generate() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;display:flex;align-items:center;justify-content:center;width:512px;height:512px;">${svgContent}</body></html>`;
  await page.setContent(html);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 }
  ];

  const pngBuffers = {};

  for (const { name, size } of sizes) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">${svgContent.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg></body></html>`);
    const buffer = await page.screenshot({ type: 'png', omitBackground: true });
    fs.writeFileSync(path.join('public', name), buffer);
    pngBuffers[size] = buffer;
    console.log(`Generated ${name} (${size}x${size})`);
  }

  await browser.close();

  // Create multi-image favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const numImages = icoSizes.length;
  const headerSize = 6 + 16 * numImages;

  let currentOffset = headerSize;
  const entries = [];
  const imageBuffers = [];

  for (const size of icoSizes) {
    const buf = pngBuffers[size];
    imageBuffers.push(buf);

    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(buf.length, 8); // bytes in resource
    entry.writeUInt32LE(currentOffset, 12); // image offset

    entries.push(entry);
    currentOffset += buf.length;
  }

  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // image type 1 = icon
  iconDir.writeUInt16LE(numImages, 4); // number of images

  const icoBuffer = Buffer.concat([iconDir, ...entries, ...imageBuffers]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log(`Generated favicon.ico with ${numImages} sizes (16, 32, 48)`);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
