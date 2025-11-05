import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/MaThanhNhi/WAD-IA03-Sum-Calculator-App-Using-React.git',
})
