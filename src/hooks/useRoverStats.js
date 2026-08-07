import { useEffect, useState } from 'react';
import { fetchRoverStats } from '../api/photos.js';

export function useRoverStats(roverId) {
  const [state, setState] = useState({ status: 'loading', stats: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', stats: null, error: null });

    fetchRoverStats(roverId)
      .then((stats) => {
        if (!cancelled) setState({ status: 'ready', stats, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', stats: null, error });
      });

    return () => {
      cancelled = true;
    };
  }, [roverId]);

  return state;
}
