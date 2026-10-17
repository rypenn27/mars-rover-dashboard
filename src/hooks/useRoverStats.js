import { useEffect, useState } from 'react';
import { fetchRoverStats } from '../api/photos.js';
import { readSaved, save } from '../utils/savedCopy.js';

// Same approach as useLatestPhotos: last visit's numbers first, then NASA's.
export function useRoverStats(roverId) {
  const [state, setState] = useState(() => initialState(roverId));

  useEffect(() => {
    let cancelled = false;
    const key = `stats:${roverId}`;
    const saved = readSaved(key);
    setState(initialState(roverId));

    fetchRoverStats(roverId)
      .then((stats) => {
        if (cancelled) return;
        save(key, stats);
        setState({ status: 'ready', stats, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setState(saved
          ? { status: 'ready', stats: saved, error }
          : { status: 'error', stats: null, error });
      });

    return () => {
      cancelled = true;
    };
  }, [roverId]);

  return state;
}

function initialState(roverId) {
  const saved = readSaved(`stats:${roverId}`);
  return saved
    ? { status: 'ready', stats: saved, error: null }
    : { status: 'loading', stats: null, error: null };
}
