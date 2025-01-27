import { PMTilesSource } from "../../../../types/PMTilesSource";

export const ArmedConflictPMTilesHeatmapSource: PMTilesSource = {
  id: "uppsala-armed-conflict-heatmap",
  url: "pmtiles://https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles",
  type: "vector",
  attribution:
    '<a href="https://ucdp.uu.se/">Uppsala Conflict Data Program</a>',
  maxzoom: 18,
  minzoom: 2,
  layers: [
    {
      id: "event-heatmap-layer",
      sourceLayer: "event",
      type: "heatmap",
      paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    'heatmap-weight': 0.5,
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 18, 3],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparency color
    // to create a blur-like effect.
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.8,
      'rgb(239,138,98)',
      0.9,
      'rgb(255,201,101)'
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 18, 20],
    // Transition from heatmap to circle layer by zoom level
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
      },
    },
  ],
};
