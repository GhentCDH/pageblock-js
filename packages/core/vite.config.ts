import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PageblocksCore',
      fileName: 'core',
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
    },
  },
})
