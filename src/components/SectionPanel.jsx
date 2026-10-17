import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NAV } from '../config/navigation.js'
import { SECTIONS } from './sections/index.js'

// The card that shows the open section. You can swipe it left/right or use the arrows.
export default function SectionPanel({ tab, index, direction, panelRef, onStep, showToast }) {
  const Section = SECTIONS[tab]

  // Slide in from the side we are moving towards, slide out the other way.
  const slide = {
    enter: dir => ({ opacity: 0, x: dir * 44 }),
    center: { opacity: 1, x: 0 },
    exit: dir => ({ opacity: 0, x: dir * -44 }),
  }

  const onDragEnd = (_, info) => {
    if (info.offset.x < -70 || info.velocity.x < -500) onStep(1)
    else if (info.offset.x > 70 || info.velocity.x > 500) onStep(-1)
  }

  return (
    <div className="panel card" ref={panelRef}>
      <div className="panel-head">
        <h2>{tab}</h2>
        <div className="pager">
          <button onClick={() => onStep(-1)} disabled={index === 0} aria-label="Previous section"><ChevronLeft size={18} /></button>
          <span>{index + 1}<i>/{NAV.length}</i></span>
          <button onClick={() => onStep(1)} disabled={index === NAV.length - 1} aria-label="Next section"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="swipe-area">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={tab} custom={direction} variants={slide}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            drag="x" dragDirectionLock dragConstraints={{ left: 0, right: 0 }} dragElastic={0.22}
            onDragEnd={onDragEnd}
          >
            <Section showToast={showToast} />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="swipe-hint">Swipe left or right to switch sections</p>
    </div>
  )
}
