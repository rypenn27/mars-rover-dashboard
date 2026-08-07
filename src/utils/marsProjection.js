// Orthographic projection (viewing Mars as a globe from directly above the
// equator at a given central longitude). A single globe can only ever show
// one hemisphere — the known rover landing sites split cleanly into two
// near-antipodal clusters (Curiosity/Perseverance/Zhurong/Spirit near
// 77-175°E vs. Opportunity/Sojourner near 326-355°E), so no single view
// shows all of them. Using two centers exactly 180° apart guarantees every
// site lands in exactly one of the two hemispheres (z and -z are exact
// opposites for antipodal centers), so a pair of globes covers 100% of
// sites with no gaps, regardless of where future sites might be added.
export const HEMISPHERE_CENTERS = [110, 290];

/**
 * Projects a planetocentric lat/lon (degrees) to a point in a unit disk
 * centered at (0,0) with radius 1, as viewed from directly above
 * (0, centerLon). `visible` is false if the point is on the far side.
 */
export function projectOrthographic(lat, lon, centerLon) {
  const phi = (lat * Math.PI) / 180;
  const lambda = ((lon - centerLon) * Math.PI) / 180;

  const x = Math.cos(phi) * Math.sin(lambda);
  const y = -Math.sin(phi);
  const z = Math.cos(phi) * Math.cos(lambda);

  return { x, y, visible: z > 0 };
}
