const EASTERN_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
});

/** Formats a UTC ISO timestamp as US Eastern time, e.g. "Jul 30, 2026, 3:53 PM EDT". */
export function formatEastern(isoUtc) {
  if (!isoUtc) return null;
  return EASTERN_FORMATTER.format(new Date(isoUtc));
}
