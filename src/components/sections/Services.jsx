import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { services } from '../../data/content.js'
import { item } from '../../animations/variants.js'
import StaggerList from '../ui/StaggerList.jsx'

export default function Services() {
  return (
    <StaggerList>
      {services.map(s => (
        <motion.div className="card-item inline" key={s} variants={item}><Check size={16} />{s}</motion.div>
      ))}
    </StaggerList>
  )
}
