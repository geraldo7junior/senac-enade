import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// SINGLEFILE=1 gera um único index.html (usado para a prévia); o build normal é para a Vercel.
export default defineConfig({
  plugins: [react(), ...(process.env.SINGLEFILE ? [viteSingleFile()] : [])],
  build: process.env.SINGLEFILE ? { outDir: 'dist-single' } : {},
});
