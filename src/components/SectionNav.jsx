import { motion } from 'framer-motion'
import { NAV } from '../config/navigation.js'

// The grid of section buttons (3 + 3 + 1, last one centred). The coloured "pill" slides to whichever one is active.
export default function SectionNav({ activeId, onSelect }) {
  return (
    <nav className="nav card" aria-label="Sections">
      {NAV.map(({ id, icon: Icon, hue }) => {
        const active = id === activeId
        return (
          <button
            key={id}
            className={`nav-item hue-${hue} ${active ? 'on' : ''}`}
            onClick={() => onSelect(id)}
            aria-current={active}
          >
            {active && <motion.span layoutId="pill" className="pill" transition={{ type: 'spring', stiffness: 480, damping: 34 }} />}
            <Icon size={17} /><span>{id}</span>
          </button>
        )
      })}
    </nav>
  )
}
