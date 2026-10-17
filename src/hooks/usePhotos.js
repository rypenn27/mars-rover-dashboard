import { useEffect, useState } from 'react';
import { fetchLatestPhotos } from '../api/photos.js';
import { readSaved, save } from '../utils/savedCopy.js';

// Shows the photos saved from the last visit right away (status 'ready',
// refreshing true), then swaps in NASA's newest list when it arrives.
export function useLatestPhotos(roverId, count = 12) {
  const [state, setState] = useState(() => initialState(roverId));

  useEffect(() => {
    let cancelled = false;
    const key = `photos:${roverId}`;
    const saved = readSaved(key);
    setState(initialState(roverId));

    fetchLatestPhotos(roverId, count)
      .then((photos) => {
        if (cancelled) return;
        save(key, photos);
        setState({ status: 'ready', photos, error: null, refreshing: false });
      })
      .catch((error) => {
        if (cancelled) return;
        // Keep showing the saved photos if NASA can't be reached.
        setState(saved
          ? { status: 'ready', photos: saved, error, refreshing: false }
          : { status: 'error', photos: [], error, refreshing: false });
      });

    return () => {
      cancelled = true;
    };
  }, [roverId, count]);

  return state;
}

function initialState(roverId) {
  const saved = readSaved(`photos:${roverId}`);
  return saved
    ? { status: 'ready', photos: saved, error: null, refreshing: true }
    : { status: 'loading', photos: [], error: null, refreshing: false };
}
