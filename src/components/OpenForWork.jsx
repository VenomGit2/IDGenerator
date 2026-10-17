import { MessageCircle } from 'lucide-react'
import { profile } from '../data/profile.js'
import { chatLink } from '../utils/whatsapp.js'

// The "Open for work" banner: your availability + a button that opens a WhatsApp chat.
// The wording is in src/data/profile.js ("availability"), the number too ("whatsapp").
export default function OpenForWork() {
  const { label, note } = profile.availability

  return (
    <section className="open card" aria-label={label}>
      <div className="open-text">
        <span className="open-pill"><i /> {label}</span>
        <p>{note}</p>
      </div>
      <a className="btn primary" href={chatLink(profile.whatsapp.greeting)} target="_blank" rel="noreferrer">
        <MessageCircle size={18} /> Message on WhatsApp
      </a>
    </section>
  )
}
