import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// set host = true

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()]
    , server: {
    host: true
    },
    base: '/hsc-res-frontend',
})