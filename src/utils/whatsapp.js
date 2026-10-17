import { profile } from '../data/profile.js'

// Builds a "wa.me" link: opens WhatsApp (the app on a phone, WhatsApp Web on a computer)
// with a chat to your number and the given message already typed.
export function chatLink(message) {
  return `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(message)}`
}
