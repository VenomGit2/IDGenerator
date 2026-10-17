import { motion } from 'framer-motion'
import { profile } from '../../data/profile.js'

export default function About() {
  return (
    <motion.p className="bio" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {profile.bio}
    </motion.p>
  )
}
