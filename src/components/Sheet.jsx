import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SPRING } from '../animations/variants.js'
import { buzz } from '../utils/haptics.js'

// A bottom sheet: slides up, tap the dark area or drag it down to close.
//
// Two nested layers on purpose:
//   outer .sheet-slide  -> handles sliding in and out
//   inner .sheet        -> handles the finger drag
// (keeping them separate lets framer-motion finish the "slide out" and remove the sheet)
export default function Sheet({ title, onClose, children }) {
  const onDragEnd = (_, info) => {
    if (info.offset.y > 110 || info.velocity.y > 600) { buzz(6); onClose() }
  }

  return (
    <motion.div className="modal" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="sheet-slide" onClick={e => e.stopPropagation()}
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={SPRING}
      >
        <motion.div
          className="sheet" role="dialog" aria-modal="true"
          drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0.02, bottom: 0.7 }}
          onDragEnd={onDragEnd}
        >
          <span className="grab" aria-hidden />
          <button className="close" onClick={onClose} aria-label="Close"><X size={18} /></button>
          <h3>{title}</h3>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
