import './RoverPortrait.css';

export function RoverPortrait({ rover }) {
  const { portrait } = rover;
  return (
    <div className="rover-portrait fade-in" style={{ '--accent': rover.accent }}>
      <img src={portrait.url} alt={`${rover.name} rover — ${portrait.caption}`} />
      <div className="rover-portrait__info">
        <span className="rover-portrait__name">{rover.name}</span>
        <span className="rover-portrait__caption">{portrait.caption}</span>
        <span className="rover-portrait__credit mono">{portrait.credit}</span>
      </div>
    </div>
  );
}
