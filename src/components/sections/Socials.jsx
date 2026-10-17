import { motion } from 'framer-motion'
import { Linkedin, Github, Instagram, MessageCircle } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { item } from '../../animations/variants.js'
import StaggerList from '../ui/StaggerList.jsx'

// Which icon each "icon" word in profile.js uses
const ICONS = { linkedin: Linkedin, github: Github, instagram: Instagram, whatsapp: MessageCircle }

// Colours for the icon circles, repeating if you add more apps
const HUES = ['hue-yellow', 'hue-amber', 'hue-gold']

// One tile per app: a still icon in a coloured circle, with the app name underneath.
// The hover effect (mouse only) is in styles/panel.css.
export default function Socials() {
  return (
    <StaggerList className="socials">
      {profile.socials.map((social, index) => {
        const Icon = ICONS[social.icon] ?? MessageCircle
        return (
          <motion.a
            key={social.label} className={`social ${HUES[index % HUES.length]}`} variants={item}
            href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}
          >
            <span className="social-chip"><Icon size={24} /></span>
            <span className="social-name">{social.label}</span>
          </motion.a>
        )
      })}
    </StaggerList>
  )
}
