import './StatTile.css';

export function StatTile({ label, value }) {
  return (
    <div className="stat-tile">
      <span className="eyebrow">{label}</span>
      <span className="stat-tile__value mono">{value}</span>
    </div>
  );
}
