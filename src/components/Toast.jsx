import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

// The small confirmation message at the bottom ("Contact saved", "Link copied", ...).
export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div className="toast" role="status" initial={{ y: 40, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }}>
          <Check size={16} /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
