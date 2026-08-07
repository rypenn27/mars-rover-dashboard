// Every rover mission that has landed on Mars, for the mini landing-site
// map. Curiosity and Perseverance are the two with live photo feeds in
// this dashboard (see rovers.js) — the rest are historical/reference only.
// Coordinates are planetocentric, positive-east longitude (IAU convention),
// approximate to the landing ellipse, sourced from public NASA/JPL mission
// pages.
export const LANDING_SITES = [
  {
    id: 'sojourner',
    name: 'Sojourner',
    mission: 'Mars Pathfinder',
    site: 'Ares Vallis',
    year: 1997,
    status: 'retired',
    lat: 19.33,
    lon: 326.45,
  },
  {
    id: 'spirit',
    name: 'Spirit',
    mission: 'MER-A',
    site: 'Gusev Crater',
    year: 2004,
    status: 'retired',
    lat: -14.5684,
    lon: 175.4726,
  },
  {
    id: 'opportunity',
    name: 'Opportunity',
    mission: 'MER-B',
    site: 'Meridiani Planum',
    year: 2004,
    status: 'retired',
    lat: -1.9462,
    lon: 354.4734,
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    mission: 'MSL',
    site: 'Gale Crater',
    year: 2012,
    status: 'active',
    lat: -4.5895,
    lon: 137.4417,
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    mission: 'Mars 2020',
    site: 'Jezero Crater',
    year: 2021,
    status: 'active',
    lat: 18.4447,
    lon: 77.4508,
  },
  {
    id: 'zhurong',
    name: 'Zhurong',
    mission: 'Tianwen-1',
    site: 'Utopia Planitia',
    year: 2021,
    status: 'inactive since 2022',
    lat: 25.066,
    lon: 109.925,
  },
];
