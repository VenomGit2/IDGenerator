import { QRCodeSVG } from 'qrcode.react'
import { Copy } from 'lucide-react'
import { profile } from '../data/profile.js'
import Sheet from './Sheet.jsx'

// Shows the QR code for the card link so someone can scan it with their camera.
export default function QrSheet({ onClose, showToast }) {
  const copyLink = () => { navigator.clipboard?.writeText(profile.url); showToast('Link copied') }
  return (
    <Sheet title="Scan to connect" onClose={onClose}>
      <div className="qr"><QRCodeSVG value={profile.url} size={196} level="M" fgColor="#0b1020" bgColor="#ffffff" /></div>
      <p>{profile.url}</p>
      <button className="btn ghost" onClick={copyLink}><Copy size={16} /> Copy link</button>
    </Sheet>
  )
}
