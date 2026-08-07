import { useSolCounter } from '../../hooks/useSolCounter.js';
import './SolCounter.css';

export function SolCounter({ landingDate }) {
  const sol = useSolCounter(landingDate);

  return (
    <div className="sol-counter">
      <span className="live-dot" />
      <span className="eyebrow">Mission Sol</span>
      <span className="sol-counter__value mono">{sol.toLocaleString()}</span>
    </div>
  );
}
