import { useEffect } from 'react'

const themeSelector = 'link[data-theme-for]'

export function useTheme(race: string) {
  useEffect(() => {
    document.head.querySelectorAll(themeSelector).forEach((el: Element) => {
      const link = el as HTMLLinkElement

      if (link.dataset.themeFor === race) {
        link.parentElement?.appendChild(link)
      }
    })
  }, [race])
}
