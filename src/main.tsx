// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App/index.tsx'

console.log('git branch:', GIT_BRANCH)
console.log('git commit:', GIT_COMMIT)

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
