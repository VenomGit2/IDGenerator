import { useRef, useState } from 'react'
import { NAV } from '../config/navigation.js'
import { buzz } from '../utils/haptics.js'

// Keeps track of which section tab is open, and which way we moved (for the slide animation).
export function useSectionTabs() {
  const [tab, setTab] = useState(NAV[0].id)
  const [direction, setDirection] = useState(1) // 1 = moving forward, -1 = moving back
  const panelRef = useRef(null)
  const index = NAV.findIndex(n => n.id === tab)

  // Jump straight to a section (tapping a nav button) and scroll the panel into view.
  const goTo = id => {
    setDirection(NAV.findIndex(n => n.id === id) >= index ? 1 : -1)
    setTab(id)
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  // Move one section left (-1) or right (+1): used by swipe and the arrow buttons.
  const step = delta => {
    const next = index + delta
    if (next < 0 || next >= NAV.length) { buzz(14); return } // already at the edge
    setDirection(delta)
    setTab(NAV[next].id)
  }

  return { tab, index, direction, panelRef, goTo, step }
}
