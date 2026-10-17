import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { item } from '../../animations/variants.js'

// One tappable line: icon chip + small label + value (used for phone, email, website, location).
export default function Row({ icon: Icon, label, value, href }) {
  const opensNewTab = href?.startsWith('http')
  return (
    <motion.a
      className="row" variants={item} href={href}
      target={opensNewTab ? '_blank' : undefined} rel="noreferrer"
    >
      <span className="row-icon"><Icon size={18} /></span>
      <span className="row-text"><small>{label}</small><b>{value}</b></span>
      <ExternalLink size={14} className="row-arrow" />
    </motion.a>
  )
}
