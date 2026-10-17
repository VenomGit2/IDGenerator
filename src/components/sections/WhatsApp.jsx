import { motion } from 'framer-motion'
import { MessageCircle, Clock } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { item } from '../../animations/variants.js'
import StaggerList from '../ui/StaggerList.jsx'
import Row from '../ui/Row.jsx'
import { chatLink } from '../../utils/whatsapp.js'

// WhatsApp Business chat.
//
// How it works: a "wa.me" link opens WhatsApp (the app on a phone, WhatsApp Web on a computer)
// with a chat to your number and a message already typed. The visitor just taps Send.
// Your number and messages are set in src/data/profile.js (the "whatsapp" part).
const { whatsapp } = profile

export default function WhatsApp() {
  return (
    <StaggerList>
      {/* who you are chatting with */}
      <motion.div className="card-item" variants={item}>
        <small>WhatsApp Business</small>
        <b>{profile.company}</b>
        <p><Clock size={12} /> Replies {whatsapp.hours}</p>
      </motion.div>

      {/* the main button */}
      <motion.a className="btn primary" variants={item} href={chatLink(whatsapp.greeting)} target="_blank" rel="noreferrer">
        <MessageCircle size={18} /> Chat on WhatsApp
      </motion.a>

      <motion.p className="swipe-hint" variants={item}>Or start with a ready-made message</motion.p>

      {/* quick options: each opens the same chat with a different message typed */}
      {whatsapp.topics.map(topic => (
        <Row key={topic.label} icon={MessageCircle} label="Quick message" value={topic.label} href={chatLink(topic.message)} />
      ))}
    </StaggerList>
  )
}
