import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Download } from 'lucide-react'
import { documentLinks } from '../../utils/media.js'
import { buzz } from '../../utils/haptics.js'
import PdfViewer from './PdfViewer.jsx'

// Full-screen reader for one brochure.
//   - a Google Drive PDF is shown with Google's own preview (it also scrolls and zooms)
//   - a PDF in the project is drawn page by page with the PDF viewer. Tap a page to zoom in.
//   - Download saves the file. X or Esc closes.
//
// It is drawn with a "portal" straight into <body>, so it covers the whole screen.
export default function BrochureReader({ brochure, onClose }) {
  const { downloadUrl, embedUrl } = documentLinks(brochure.pdf)

  // Esc closes, and the page behind stops scrolling while the reader is open
  useEffect(() => {
    const onKeyDown = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return createPortal(
    <motion.div className="reader" role="dialog" aria-modal="true" aria-label={brochure.title}
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="reader-top">
        <div className="reader-title">
          <small>{brochure.category}</small>
          <b>{brochure.title}</b>
        </div>
        <a className="reader-btn" href={downloadUrl} download={`${brochure.title}.pdf`} onClick={() => buzz(8)} aria-label="Download PDF"><Download size={18} /></a>
        <button className="reader-btn" onClick={onClose} aria-label="Close"><X size={20} /></button>
      </div>

      <div className={`reader-body ${embedUrl ? 'is-embed' : ''}`}>
        {embedUrl
          ? <iframe src={embedUrl} title={brochure.title} />
          : <PdfViewer url={brochure.pdf} title={brochure.title} kind="brochure" />}
        {brochure.description && !embedUrl && <p className="reader-note">{brochure.description}</p>}
      </div>
    </motion.div>,
    document.body,
  )
}
