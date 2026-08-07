import { useEffect, useState } from 'react';

// A Mars solar day (sol) is 88775.244 SI seconds, ~2.7% longer than an
// Earth day. This is an approximation of mission sol (landing date is
// known exactly, landing *time* isn't factored in here), good enough for
// a live counter — actual mission sol may be off by one near a rollover.
const SOL_MS = 88775244;

function solsSince(landingDate) {
  const landingMs = new Date(`${landingDate}T00:00:00Z`).getTime();
  return Math.floor((Date.now() - landingMs) / SOL_MS);
}

export function useSolCounter(landingDate) {
  const [sol, setSol] = useState(() => solsSince(landingDate));

  useEffect(() => {
    setSol(solsSince(landingDate));
    const id = setInterval(() => setSol(solsSince(landingDate)), 60_000);
    return () => clearInterval(id);
  }, [landingDate]);

  return sol;
}
