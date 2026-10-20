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
  bogota: P(-74.07, 4.71), lima: P(-77.04, -12.05), santiago: P(-70.67, -33.45), washington: P(-77.04, 38.91),
};
console.log(JSON.stringify({ dots: dots.length, pts }));
