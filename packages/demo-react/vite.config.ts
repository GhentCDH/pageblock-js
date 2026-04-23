import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: '../demo-vue/assets',
  resolve: {
    alias: {
      '@pageblocks/react': resolve(__dirname, '../react/src/index.ts'),
      '@pageblocks/core': resolve(__dirname, '../core/src/index.ts'),
    },
  },
})
