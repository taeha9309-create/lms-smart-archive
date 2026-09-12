import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from "./manifest.config.ts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
