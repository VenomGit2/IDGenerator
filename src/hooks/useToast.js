import { useEffect, useState } from 'react'

// A small message at the bottom of the screen that hides itself after 2.2 seconds.
export function useToast() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(''), 2200)
    return () => clearTimeout(timer)
  }, [message])
  return { message, showToast: setMessage }
}
