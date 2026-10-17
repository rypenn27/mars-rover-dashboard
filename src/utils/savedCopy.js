// Keeps the last NASA answer in the browser so the page can show it instantly
// on the next visit. NASA's Perseverance feed caches answers for only 60
// seconds and takes ~15s to rebuild one, so without this a first load waits
// on that. Storage can be unavailable (private windows, blocked site data),
// so every read and write is allowed to fail quietly.
const PREFIX = 'mars-dash:';

export function readSaved(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Not saved; the next visit just waits for NASA like before.
  }
}
