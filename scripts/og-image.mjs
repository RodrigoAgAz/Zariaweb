// Generates public/og-image.png (1200 x 630): white ground, the stacked logo centred.
// Run: node scripts/og-image.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;
const logoWidth = 560;
const logo = await sharp('brand/logo/svg/zaria-logo-stacked.svg', { density: 300 })
	.resize({ width: logoWidth })
	.png()
	.toBuffer();
const { height } = await sharp(logo).metadata();
await sharp({ create: { width: W, height: H, channels: 3, background: '#FFFFFF' } })
	.composite([{ input: logo, left: Math.round((W - logoWidth) / 2), top: Math.round((H - height) / 2) }])
	.png({ compressionLevel: 9 })
	.toFile('public/og-image.png');
console.log('public/og-image.png written');
