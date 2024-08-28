import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  server: {
    port: 8000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'path/to/your/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'path/to/your/cert.pem')),
    }
  }
})
