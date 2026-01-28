import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString()
const gitCommit = execSync('git rev-parse --short HEAD').toString()


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sc2calc',
  define: {
    GIT_BRANCH: JSON.stringify(gitBranch),
    GIT_COMMIT: JSON.stringify(gitCommit),
  }
})
