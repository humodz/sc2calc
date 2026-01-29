import 'react'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare global {
  const GIT_BRANCH: string
  const GIT_COMMIT: string
}
