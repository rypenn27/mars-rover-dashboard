import { useEffect, useState } from 'react';
import { ROVERS } from '../api/rovers.js';
import { useLatestPhotos } from '../hooks/usePhotos.js';
import { useRoverStats } from '../hooks/useRoverStats.js';
import { SolCounter } from '../components/shared/SolCounter.jsx';
import { StatTile } from '../components/shared/StatTile.jsx';
import { PhotoCard } from '../components/shared/PhotoCard.jsx';
import { MarsMap } from '../components/shared/MarsMap.jsx';
import { RoverPortrait } from '../components/shared/RoverPortrait.jsx';
import { formatEastern } from '../utils/time.js';
import './Latest.css';

export function Latest({ roverId }) {
  const rover = ROVERS[roverId];
  const { status: photosStatus, photos, error: photosError, refreshing } = useLatestPhotos(roverId, 12);
  const { status: statsStatus, stats } = useRoverStats(roverId);

  // Defaults to the newest photo; clicking a thumbnail below promotes it here.
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    setSelectedId(null);
  }, [roverId]);

  const hero = photos.find((p) => p.id === selectedId) || photos[0];
  const rest = photos.filter((p) => p !== hero);

  return (
    <div className="latest">
      <section className="latest__overview">
        <div className="latest__hero">
          <RoverPortrait rover={rover} />
          {photosStatus === 'loading' && <div className="skeleton latest__hero-skeleton" />}
          {photosStatus === 'error' && (
            <div className="latest__hero-error">
              Couldn't reach NASA's raw image feed. {photosError?.message}
            </div>
          )}
          {photosStatus === 'ready' && hero && (
            <figure className="latest__hero-figure fade-in">
              <img src={hero.imageUrl} alt={hero.title || hero.camera} />
              <figcaption>
                <span className="eyebrow">
                  Sol {hero.sol} &middot; {formatEastern(hero.capturedAtUtc) || hero.earthDate}
                </span>
                <span>{hero.camera}</span>
              </figcaption>
            </figure>
          )}
          {photosStatus === 'ready' && !hero && (
            <div className="latest__hero-error">No recent photos returned.</div>
          )}
        </div>

        <aside className="latest__sidebar">
          <h2>{rover.name}</h2>
          <p className="latest__mission eyebrow">{rover.mission} &middot; {rover.landingSite}</p>
          <SolCounter landingDate={rover.landingDate} />
          <div className="latest__stats">
            <StatTile
              label="Max Sol Reached"
              value={statsStatus === 'ready' ? stats.maxSol.toLocaleString() : '—'}
            />
            <StatTile
              label="Total Raw Photos"
              value={statsStatus === 'ready' ? stats.totalPhotos.toLocaleString() : '—'}
            />
            <StatTile label="Status" value={rover.status === 'active' ? 'Active' : 'Complete'} />
          </div>
          <MarsMap activeRover={rover} capturedAtUtc={hero?.capturedAtUtc} />
        </aside>
      </section>

      <section className="latest__gallery">
        <div className="latest__gallery-head">
          <h3 className="eyebrow">Recent Downlinks</h3>
          {refreshing && (
            <span className="latest__updating eyebrow" role="status">
              <span className="latest__updating-dot" /> Checking NASA for new photos
            </span>
          )}
        </div>
        {photosStatus === 'ready' && (
          <div className="latest__grid">
            {rest.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onSelect={(p) => setSelectedId(p.id)} />
            ))}
          </div>
        )}
        {photosStatus === 'loading' && (
          <div className="latest__grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton latest__grid-skeleton" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
