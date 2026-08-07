// Static rover configuration. Landing dates power the client-side sol math;
// the authoritative "current sol" still comes from the live feeds.
export const ROVERS = {
  perseverance: {
    id: 'perseverance',
    name: 'Perseverance',
    mission: 'Mars 2020',
    landingDate: '2021-02-18',
    landingSite: 'Jezero Crater',
    // Landing coordinates (planetocentric, NASA/JPL). Photos are shown
    // against this fixed point rather than a per-photo position — the
    // feeds don't expose geodetic lat/lon per image, only a site/drive
    // index local to each rover's own traverse frame.
    landingCoords: { lat: 18.4447, lon: 77.4508 },
    status: 'active',
    accent: 'var(--rust)',
    // NASA Image and Video Library (images-assets.nasa.gov) — stable,
    // permanent asset hosting, distinct from the raw-image feeds.
    portrait: {
      url: 'https://images-assets.nasa.gov/image/PIA24542/PIA24542~medium.jpg',
      caption: "Selfie with Ingenuity, Sol 46",
      credit: 'NASA/JPL-Caltech/MSSS',
    },
  },
  curiosity: {
    id: 'curiosity',
    name: 'Curiosity',
    mission: 'MSL',
    landingDate: '2012-08-05',
    landingSite: 'Gale Crater',
    landingCoords: { lat: -4.5895, lon: 137.4417 },
    status: 'active',
    accent: 'var(--amber)',
    portrait: {
      url: 'https://images-assets.nasa.gov/image/PIA23240/PIA23240~medium.jpg',
      caption: 'Selfie at "Aberlady," Sol 2440',
      credit: 'NASA/JPL-Caltech/MSSS',
    },
  },
};

export const ROVER_LIST = Object.values(ROVERS);

// Friendly names for the raw instrument codes the feeds return.
const CAMERA_NAMES = {
  // Perseverance
  NAVCAM_LEFT: 'Navigation — Left',
  NAVCAM_RIGHT: 'Navigation — Right',
  FRONT_HAZCAM_LEFT_A: 'Front Hazcam — Left',
  FRONT_HAZCAM_RIGHT_A: 'Front Hazcam — Right',
  REAR_HAZCAM_LEFT: 'Rear Hazcam — Left',
  REAR_HAZCAM_RIGHT: 'Rear Hazcam — Right',
  MCZ_LEFT: 'Mastcam-Z — Left',
  MCZ_RIGHT: 'Mastcam-Z — Right',
  SHERLOC_WATSON: 'SHERLOC WATSON',
  SHERLOC_ACI: 'SHERLOC ACI',
  SUPERCAM_RMI: 'SuperCam RMI',
  // Curiosity
  NAV_LEFT_A: 'Navigation — Left A',
  NAV_LEFT_B: 'Navigation — Left B',
  NAV_RIGHT_A: 'Navigation — Right A',
  NAV_RIGHT_B: 'Navigation — Right B',
  FHAZ_LEFT_B: 'Front Hazcam — Left',
  FHAZ_RIGHT_B: 'Front Hazcam — Right',
  RHAZ_LEFT_B: 'Rear Hazcam — Left',
  RHAZ_RIGHT_B: 'Rear Hazcam — Right',
  MAST_LEFT: 'Mastcam — Left',
  MAST_RIGHT: 'Mastcam — Right',
  CHEMCAM_RMI: 'ChemCam RMI',
  MAHLI: 'MAHLI',
  MARDI: 'MARDI',
};

export function cameraLabel(code) {
  if (!code) return 'Unknown';
  return CAMERA_NAMES[code] || code.replace(/_/g, ' ');
}
