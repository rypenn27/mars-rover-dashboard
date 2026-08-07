import { LANDING_SITES } from '../../api/landingSites.js';
import { HEMISPHERE_CENTERS, projectOrthographic } from '../../utils/marsProjection.js';
import { formatEastern } from '../../utils/time.js';
import './MarsMap.css';

const SIZE = 130;
const R = SIZE / 2 - 4;
const CENTER = SIZE / 2;
const PARALLELS = [-60, -30, 0, 30, 60];
const MERIDIANS = [-60, -30, 0, 30, 60];

function arcPath(points) {
  if (points.length < 2) return '';
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
}

function graticuleParallel(lat, centerLon) {
  const pts = [];
  for (let lon = centerLon - 90; lon <= centerLon + 90; lon += 5) {
    const { x, y, visible } = projectOrthographic(lat, lon, centerLon);
    if (visible) pts.push({ x: CENTER + x * R, y: CENTER + y * R });
  }
  return pts;
}

function graticuleMeridian(lonOffset, centerLon) {
  const pts = [];
  for (let lat = -90; lat <= 90; lat += 5) {
    const { x, y, visible } = projectOrthographic(lat, centerLon + lonOffset, centerLon);
    if (visible) pts.push({ x: CENTER + x * R, y: CENTER + y * R });
  }
  return pts;
}

function Globe({ centerLon, activeRover }) {
  const sitesHere = LANDING_SITES.map((site) => ({
    site,
    ...projectOrthographic(site.lat, site.lon, centerLon),
  })).filter((s) => s.visible);

  const holdsActive = sitesHere.some((s) => s.site.id === activeRover.id);

  return (
    <div className={`mars-globe${holdsActive ? ' is-active' : ''}`} style={holdsActive ? { '--accent': activeRover.accent } : undefined}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Mars globe">
        <defs>
          <radialGradient id={`marsBody-${centerLon}`} cx="35%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#e2571a" />
            <stop offset="55%" stopColor="#a83c10" />
            <stop offset="100%" stopColor="#5c1f09" />
          </radialGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={R} fill={`url(#marsBody-${centerLon})`} />

        <g stroke="rgba(0,0,0,0.28)" strokeWidth="0.75" fill="none">
          {PARALLELS.map((lat) => (
            <path key={`p${lat}`} d={arcPath(graticuleParallel(lat, centerLon))} />
          ))}
          {MERIDIANS.map((lonOffset) => (
            <path key={`m${lonOffset}`} d={arcPath(graticuleMeridian(lonOffset, centerLon))} />
          ))}
        </g>

        <circle cx={CENTER} cy={CENTER} r={R} fill="none" stroke="var(--line-strong)" strokeWidth="1" />

        {sitesHere.map(({ site, x, y }) => {
          const isActive = site.id === activeRover.id;
          const px = CENTER + x * R;
          const py = CENTER + y * R;
          const fill = isActive ? activeRover.accent : 'var(--text-faint)';
          return (
            <g key={site.id}>
              {isActive && (
                <circle cx={px} cy={py} r="4" fill={fill} opacity="0.3">
                  <animate attributeName="r" values="4;10;4" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={px} cy={py} r={isActive ? 4 : 2.5} fill={fill} stroke="#0a0a0f" strokeWidth={isActive ? 1.3 : 0.8}>
                <title>{`${site.name} (${site.mission}) — ${site.site}, ${site.year}`}</title>
              </circle>
            </g>
          );
        })}
      </svg>
      <span className="mars-globe__caption">
        {sitesHere.map((s) => s.site.name).join(' · ')}
      </span>
    </div>
  );
}

export function MarsMap({ activeRover, capturedAtUtc }) {
  const active = LANDING_SITES.find((s) => s.id === activeRover.id);

  return (
    <div className="mars-map">
      <div className="mars-map__globes">
        {HEMISPHERE_CENTERS.map((centerLon) => (
          <Globe key={centerLon} centerLon={centerLon} activeRover={activeRover} />
        ))}
      </div>

      <ul className="mars-map__legend">
        {LANDING_SITES.map((site) => (
          <li
            key={site.id}
            className={`mars-map__legend-item${site.id === activeRover.id ? ' is-active' : ''}`}
            style={site.id === activeRover.id ? { '--accent': activeRover.accent } : undefined}
          >
            <span className="mars-map__dot" />
            <span className="mars-map__legend-name">{site.name}</span>
            <span className="mars-map__legend-detail">{site.site} &middot; {site.year}</span>
          </li>
        ))}
      </ul>

      {capturedAtUtc && active && (
        <p className="mars-map__time mono">
          {active.name}'s latest photo &middot; {formatEastern(capturedAtUtc)}
        </p>
      )}
      <p className="mars-map__note">
        Markers show each mission's landing site, not a live position — NASA
        doesn't publish per-photo geolocation.
      </p>
    </div>
  );
}
