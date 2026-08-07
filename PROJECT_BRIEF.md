# Mars Rover Dashboard — Project Brief

## Overview
A web dashboard for tracking Mars rover activity. Two core views:

1. **Latest** — a near-real-time snapshot of what a rover is doing right now (most recent photos, current sol, last known location/status).
2. **History** — an explorable archive of past photos, driving distance, and traverse path over the life of the mission.

This is a frontend-focused personal project. No physical hardware involved (a Raspberry Pi kiosk version may come later, but is out of scope for now).

## Tech Stack
- **React + Vite** — recommended over plain HTML/JS. This app has real client-side state to manage (selected rover, sol range filters, gallery pagination, loading/error states per API call), and React makes that manageable without hand-rolled DOM juggling. Vite keeps the dev loop fast with no heavyweight tooling.
- Plain CSS (or CSS Modules) rather than a UI framework like Bootstrap/MUI — the visual identity here should feel custom (see Design Direction below), and a generic component library would fight that.
- **No backend to start.** Call NASA's public APIs directly from the client. Revisit a lightweight backend only if API key exposure or rate limiting becomes a real problem (NASA's API key is free and low-stakes to expose client-side for a personal project, but a thin proxy is an easy upgrade later if needed).

## Data Sources
- **NASA Mars Rover Photos API** (`api.nasa.gov/mars-photos`) — primary data source. Query by rover (curiosity, perseverance, opportunity, spirit), by sol, by Earth date, or by camera. Returns photo URLs plus sol/date metadata. Free API key from api.nasa.gov (rate-limited but generous for personal use).
- **NASA APOD API** — optional secondary/stretch feed for Mars-related Astronomy Picture of the Day entries.
- **JPL mission data** (manifest endpoint within the Mars Photos API: `/manifests/{rover}`) — gives per-sol photo counts and total mission stats (max sol, launch/landing date, status) in one call. Useful for the sol counter and photo-volume timeline without extra scraping.
- **Rover traverse/waypoint data** — JPL publishes rover location/traverse data (e.g. via the Mars Trek / PDS Geosciences node). This is the one piece that isn't a clean simple REST call — expect to research the right source and possibly hand-transcribe or periodically fetch a CSV/KML of waypoints rather than hitting a live API. Flag this as a research task rather than assuming a ready-made endpoint exists.
- **No true live telemetry exists publicly.** "Real-time" here means "as fresh as NASA's public data gets" — new photos appear as they're downlinked and processed (often same-day but not instant), and there's no live camera feed or streaming telemetry to build against. Set that expectation up front so the "Latest" view is understood as near-real-time, not literal live data.

## Rover Scope
Start with **Curiosity and Perseverance** (both currently active, both have rich photo archives via the API). Structure the code so adding Spirit/Opportunity (retired) later is just adding another rover option, not a rework.

## Features

### Latest view
- Most recent photo(s) downlinked, with sol number and Earth date shown
- Live-computed sol counter (days since landing — this is just date math client-side, no API needed)
- Current/most recent location plotted on a Mars basemap, if traverse data is wired up
- Manifest-derived stats: total photos, max sol reached, mission status (active/complete)
- Rover selector/toggle (Curiosity vs Perseverance)

### History view
- Photo browser filterable by sol range, Earth date range, and camera type (navcam, mastcam, hazcam, etc.)
- Traverse map showing the driving path over time (stretch goal if waypoint data proves hard to source)
- Cumulative distance-driven chart over mission lifetime
- Photo-volume-per-sol/month chart (shows mission activity spikes visually)
- Sol/date scrubber — a slider/timeline control to jump to a specific day's photos
- Lightbox/full-res viewer for individual photos

### Later / stretch
- Side-by-side comparison mode: Curiosity vs Perseverance stats
- Ingenuity helicopter flight history (Perseverance-specific)
- Raspberry Pi kiosk-mode deployment

## Design Direction
Aiming for a "mission control" feel — purposeful, data-dense but not cluttered, photos as the hero content.

- **Palette**: near-black background (`#0a0a0f` / `#0e0e14`-ish) as the base, rust/Mars-red as the primary accent (`#c1440e`-ish range), a cool cyan or amber as a secondary accent for charts/highlights so it doesn't read as one-note red. Avoid pure black/pure white — soft off-black and off-white read less harsh for a dashboard you might glance at often.
- **Typography**: a monospace or semi-technical font (e.g. JetBrains Mono, IBM Plex Mono) for stats/labels/sol counters to reinforce the "telemetry readout" feel; a clean sans-serif (Inter, system-ui) for body text and photo captions so it doesn't tip into gimmicky.
- **Layout**: card-based grid for photos, generous spacing, the traverse map or hero photo as a large focal element rather than everything being equal-sized tiles.
- **Motion**: subtle — a gentle fade/slide when new photos load, a ticking sol counter, maybe a soft pulse on "live" indicators. Nothing flashy; this should feel calm and instrument-like, not gamified.
- **Data viz**: keep charts minimal — thin lines, muted gridlines, accent color reserved for the actual data series so it pops against the dark background.

## Suggested Project Structure
```
mars-rover-dashboard/
  src/
    api/            # NASA API client functions (photos, manifest, apod)
    components/
      Latest/
      History/
      shared/       # PhotoCard, Lightbox, SolCounter, RoverToggle, etc.
    hooks/          # e.g. useRoverManifest, usePhotos
    pages/          # Latest.jsx, History.jsx (or route-level views)
    styles/         # global CSS, design tokens (colors, spacing, fonts)
  .env              # NASA_API_KEY (gitignored)
```

## Open Questions to Resolve While Building
- Where exactly to source traverse/waypoint data cleanly (this needs its own research spike — don't assume it's a simple API call).
- Whether NASA's rate limits (DEMO_KEY vs a real free key) are sufficient, or whether a caching layer becomes necessary.
- Whether to use routing (multiple pages) or a single-page toggle between Latest/History — leaning toggle for simplicity given the small scope.
