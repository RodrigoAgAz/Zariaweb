import { geoNaturalEarth1, geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
import fs from 'node:fs';

// Frame widened west to include San Francisco, south to Buenos Aires, east to Abu Dhabi
const W = 1200, H = 680, STEP = 8.5, R = 1.9;
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-50m.json', 'utf8'));
const land = feature(topo, topo.objects.land);
const frame = { type: 'Feature', geometry: { type: 'MultiPoint', coordinates: [[-128, 56], [62, 56], [-128, -46], [62, -46], [-33, 62]] } };
const proj = geoNaturalEarth1().rotate([33, 0]).fitExtent([[10, 10], [W - 10, H - 10]], frame);

const dots = [];
for (let y = STEP / 2; y < H; y += STEP) for (let x = STEP / 2; x < W; x += STEP) {
  const ll = proj.invert([x, y]);
  if (ll && geoContains(land, ll)) dots.push([+x.toFixed(1), +y.toFixed(1)]);
}
fs.writeFileSync('../assets/zaria-dotmap-v2.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><g fill="#e6ede1">${dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${R}"/>`).join('')}</g></svg>`);

const P = (lon, lat) => proj([lon, lat]).map(v => +v.toFixed(1));
const pts = {
  abudhabi: P(54.37, 24.45), madrid: P(-3.70, 40.42), newyork: P(-74.0, 40.71), sanfrancisco: P(-122.42, 37.77),
  mexico: P(-99.13, 19.43), guayaquil: P(-79.9, -2.19), buenosaires: P(-58.38, -34.60),
};
// bend: fraction of chord; sign +1 = bulge to the left of travel direction, -1 = right
function arc(a, b, bend, sign) {
  const [x1, y1] = pts[a], [x2, y2] = pts[b];
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
  const nx = (dy / d) * sign, ny = (-dx / d) * sign; // left normal in screen coords (y down)
  const cx = (x1 + x2) / 2 + nx * d * bend, cy = (y1 + y2) / 2 + ny * d * bend;
  return `M${x1} ${y1}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}
// Every route starts in Abu Dhabi; sign -1 bows each arc northwards. len feeds the light timing.
function length(d) {
  const [x1, y1, cx, cy, x2, y2] = d.match(/-?[\d.]+/g).map(Number);
  let L = 0, px = x1, py = y1;
  for (let i = 1; i <= 400; i++) {
    const t = i / 400, x = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t * t * x2, y = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t * t * y2;
    L += Math.hypot(x - px, y - py); px = x; py = y;
  }
  return +L.toFixed(1);
}
const legs = [
  ['madrid', 0.22, 'eu'],
  ['newyork', 0.26, 'us'],
  ['sanfrancisco', 0.3, 'us'],
  ['mexico', 0.24, 'eu'],
  ['guayaquil', 0.2, 'eu'],
  ['buenosaires', 0.14, 'eu'],
].map(([b, bend, g], i) => { const d = arc('abudhabi', b, bend, -1); return { i, from: 'abudhabi', to: b, group: g, d, len: length(d) }; });
console.log(JSON.stringify({ dots: dots.length, pts, legs }));
