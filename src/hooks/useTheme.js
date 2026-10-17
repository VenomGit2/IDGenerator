import { useEffect, useState } from 'react'

// Dark/light theme. Starts from the phone's setting, and writes it to <html data-theme="...">
// so the CSS in styles/tokens.css can switch colours.
export function useTheme() {
  const [theme, setTheme] = useState(() => (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'))
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggleTheme }
}
