import { useState } from 'react';
import { RoverToggle } from './components/shared/RoverToggle.jsx';
import { Latest } from './pages/Latest.jsx';
import { History } from './pages/History.jsx';
import './App.css';

export default function App() {
  const [roverId, setRoverId] = useState('perseverance');
  const [view, setView] = useState('latest');

  return (
    <div className="app">
      <header className="app__header wrap">
        <div className="app__title">
          <span className="eyebrow">Mission Control</span>
          <h1>Mars Rover Dashboard</h1>
        </div>
        <RoverToggle selected={roverId} onSelect={setRoverId} />
      </header>

      <nav className="app__tabs wrap">
        <button
          className={`app__tab${view === 'latest' ? ' is-active' : ''}`}
          onClick={() => setView('latest')}
        >
          Latest
        </button>
        <button
          className={`app__tab${view === 'history' ? ' is-active' : ''}`}
          onClick={() => setView('history')}
        >
          History
        </button>
      </nav>

      <main className="wrap">
        {view === 'latest' ? <Latest roverId={roverId} /> : <History />}
      </main>
    </div>
  );
}
