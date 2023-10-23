import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      {
        find: "@assets",
        replacement: resolve(__dirname, "src/assets"),
      },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      {
        find: "@helpers",
        replacement: resolve(__dirname, "src/helpers"),
      },
      {
        find: "@pages",
        replacement: resolve(__dirname, "src/pages"),
      },
    ],
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}) // add options if needed
      ],
    }
  }
})