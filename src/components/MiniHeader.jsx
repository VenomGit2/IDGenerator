import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Download } from 'lucide-react'
import { profile } from '../data/profile.js'
import { imageSrc } from '../utils/media.js'
import { SPRING } from '../animations/variants.js'

// A compact bar that slides down from the top once you scroll past the profile.
export default function MiniHeader({ onSave }) {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', y => setVisible(y > 330))

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="mini" initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={SPRING}>
          <img src={imageSrc(profile.photo, 120)} alt="" referrerPolicy="no-referrer" />
          <div><b>{profile.name}</b><small>{profile.company}</small></div>
          <button className="mini-save" onClick={onSave} aria-label="Save contact"><Download size={16} /> Save</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
