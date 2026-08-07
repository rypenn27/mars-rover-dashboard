// Fetch functions for NASA's raw rover image feeds.
//
// api.nasa.gov/mars-photos (the manifest/photos API named in the original
// project brief) is no longer live — it now returns "No such app". Both
// rovers' data here comes straight from mars.nasa.gov instead, which hosts
// the raw images NASA actually downlinks and updates same-day. The two
// rovers are served by two different backends with different shapes:
//   - Perseverance: legacy `rss/api` feed (category=mars2020)
//   - Curiosity:    newer `api/v1/raw_image_items` feed (condition_1=msl:mission)
// Both send `Access-Control-Allow-Origin: *`, so no dev proxy is needed.
import { cameraLabel } from './rovers.js';

const MSL_ENDPOINT = 'https://mars.nasa.gov/api/v1/raw_image_items/';
const M20_ENDPOINT = 'https://mars.nasa.gov/rss/api/';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

// Both feeds return UTC timestamps without a trailing "Z" on some fields;
// force UTC parsing so downstream timezone conversion (e.g. to Eastern) is
// correct regardless of the machine's local timezone.
function toUtcIso(raw) {
  if (!raw) return null;
  return raw.endsWith('Z') ? raw : `${raw}Z`;
}

function normalizeMsl(item) {
  const capturedAtUtc = toUtcIso(item.date_taken);
  return {
    id: String(item.id),
    sol: item.sol,
    earthDate: capturedAtUtc ? capturedAtUtc.slice(0, 10) : null,
    capturedAtUtc,
    camera: cameraLabel(item.instrument),
    imageUrl: item.https_url || item.url,
    title: item.title,
    credit: item.image_credit,
  };
}

function normalizeM20(item) {
  const files = item.image_files || {};
  const capturedAtUtc = toUtcIso(item.date_taken_utc);
  return {
    id: item.imageid,
    sol: item.sol,
    earthDate: capturedAtUtc ? capturedAtUtc.slice(0, 10) : null,
    capturedAtUtc,
    camera: cameraLabel(item.camera?.instrument),
    imageUrl: files.large || files.full_res || files.medium,
    title: item.title,
    credit: item.credit,
  };
}

/** Most recent photos for a rover, newest first. */
export async function fetchLatestPhotos(roverId, count = 12) {
  if (roverId === 'curiosity') {
    const data = await fetchJson(
      `${MSL_ENDPOINT}?order=sol+desc,date_taken+desc&per_page=${count}&page=0&condition_1=msl:mission`
    );
    return (data.items || []).map(normalizeMsl);
  }
  const data = await fetchJson(
    `${M20_ENDPOINT}?feed=raw_images&category=mars2020&feedtype=json&num=${count}&page=0&order=sol+desc`
  );
  return (data.images || []).map(normalizeM20);
}

/**
 * Mission stats derived from the raw-image feeds themselves, since the
 * dedicated manifest endpoint (api.nasa.gov/mars-photos/manifests) is dead.
 */
export async function fetchRoverStats(roverId) {
  if (roverId === 'curiosity') {
    const data = await fetchJson(
      `${MSL_ENDPOINT}?order=sol+desc,date_taken+desc&per_page=1&page=0&condition_1=msl:mission`
    );
    return {
      maxSol: data.items?.[0]?.sol ?? null,
      totalPhotos: data.total ?? null,
    };
  }
  const data = await fetchJson(
    `${M20_ENDPOINT}?feed=raw_images&category=mars2020&feedtype=json&num=1&page=0&order=sol+desc`
  );
  return {
    maxSol: data.images?.[0]?.sol ?? null,
    totalPhotos: data.total_images ?? null,
  };
}
