import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import biomePlugin from 'vite-plugin-biome'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    biomePlugin({
      mode: 'check',
      files: './src',
      applyFixes: true,
    }),
  ],
})
