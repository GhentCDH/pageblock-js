import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PageblocksVue',
      fileName: 'vue',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'marked', '@pageblocks/core'],
    },
  },
})
