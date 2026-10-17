import { motion } from 'framer-motion'
import { container } from '../../animations/variants.js'

// Wraps a list so its children animate in one by one. `className` picks the layout (e.g. "rows", "socials").
export default function StaggerList({ children, className = 'rows' }) {
  return (
    <motion.div className={className} variants={container} initial="hidden" animate="show">
      {children}
    </motion.div>
  )
}
