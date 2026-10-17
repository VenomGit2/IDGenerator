import { Download, Share2 } from 'lucide-react'

// "Save Contact" (downloads a .vcf file) and the share button.
export default function ActionButtons({ onSave, onShare }) {
  return (
    <div className="actions">
      <button className="btn primary" onClick={onSave}><Download size={18} /> Save Contact</button>
      <button className="btn icon" onClick={onShare} aria-label="Share"><Share2 size={18} /></button>
    </div>
  )
}
