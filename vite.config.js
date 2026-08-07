import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Both rovers' raw-image feeds are fetched directly from mars.nasa.gov —
// no proxy needed, both send `Access-Control-Allow-Origin: *`.
// Perseverance: mars.nasa.gov/rss/api (feed=raw_images&category=mars2020)
// Curiosity:    mars.nasa.gov/api/v1/raw_image_items (condition_1=msl:mission)
// See src/api/photos.js.
export default defineConfig({
  plugins: [react()],
});
