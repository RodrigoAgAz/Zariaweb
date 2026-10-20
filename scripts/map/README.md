# Map source

- `gen-map.mjs` made `src/assets/home/zaria-dotmap.svg` and the city points in `map-geometry.json`
  (the map's 1200 x 680 coordinate space). It needs d3-geo, topojson-client and world-atlas, which
  are not installed in this project: install them in a scratch folder to add a city, run it, and
  copy the new point into `map-geometry.json` and into `pts` in `src/components/home/Reach.astro`.
- `gen-routes.mjs` builds the network from those points: edit the `ROUTES` list (from, to, curve
  depth, which way it bows) and run `node scripts/map/gen-routes.mjs`. It writes
  `src/components/home/map-routes.json` (the paths) and `src/components/home/map-routes.css`
  (draw order, scroll ranges and each route's light). After changing routes, check that the city
  labels in `Reach.astro` still clear the lines.
