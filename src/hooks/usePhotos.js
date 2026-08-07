import { useEffect, useState } from 'react';
import { fetchLatestPhotos } from '../api/photos.js';

export function useLatestPhotos(roverId, count = 12) {
  const [state, setState] = useState({ status: 'loading', photos: [], error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', photos: [], error: null });

    fetchLatestPhotos(roverId, count)
      .then((photos) => {
        if (!cancelled) setState({ status: 'ready', photos, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', photos: [], error });
      });

    return () => {
      cancelled = true;
    };
  }, [roverId, count]);

  return state;
}
