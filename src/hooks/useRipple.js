import { useEffect } from 'react'
import { buzz } from '../utils/haptics.js'

// Every element matching this selector gets a ripple + tiny vibration when touched.
const PRESSABLE = '.btn, .nav-item, .row, .social, .icon-btn, .mini-save'

export function useRipple() {
  useEffect(() => {
    const onPointerDown = e => {
      const el = e.target.closest?.(PRESSABLE)
      if (!el) return
      const box = el.getBoundingClientRect()
      const size = Math.max(box.width, box.height) * 1.6
      const ripple = document.createElement('span')
      ripple.className = 'ripple' // animated in styles/motion.css
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - box.left - size / 2}px;top:${e.clientY - box.top - size / 2}px`
      el.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
      buzz(6)
    }
    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])
}
