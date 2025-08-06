import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import inspect from 'vite-plugin-inspect'
import compression from 'vite-plugin-compression'


// https://vite.dev/config/



export default defineConfig({
  plugins: [
    react(),
    svgr(),
    inspect(),
    compression({
      ext: '.gz',
      algorithm: 'gzip',
      verbose: true,
      filter: /\.(js|css|json|html|svg)$/
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
})