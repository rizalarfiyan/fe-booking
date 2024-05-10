import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import biomePlugin from 'vite-plugin-biome'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from "vite-plugin-svgr";

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
    svgr(),
  ],
  esbuild: {
    legalComments: 'none',
  },
})
