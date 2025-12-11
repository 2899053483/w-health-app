import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/w-health-app/', // 这里是你的仓库名，一定要写对
  plugins: [react()],
})