import { ROVER_LIST } from '../../api/rovers.js';
import './RoverToggle.css';

export function RoverToggle({ selected, onSelect }) {
  return (
    <div className="rover-toggle" role="tablist" aria-label="Select rover">
      {ROVER_LIST.map((rover) => (
        <button
          key={rover.id}
          role="tab"
          aria-selected={rover.id === selected}
          className={`rover-toggle__btn${rover.id === selected ? ' is-active' : ''}`}
          style={{ '--accent': rover.accent }}
          onClick={() => onSelect(rover.id)}
        >
          {rover.name}
        </button>
      ))}
    </div>
  );
}
