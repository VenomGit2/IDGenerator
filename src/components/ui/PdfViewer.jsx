import { useEffect, useRef, useState } from 'react'
import { FileWarning } from 'lucide-react'
import Lightbox from './Lightbox.jsx'
import { loadPdfJs } from '../../utils/pdf.js'

// Shows a PDF directly inside the page, so nobody is sent to another tab.
//
// Why not just an <iframe>? Many phones (Android Chrome especially) cannot show a PDF inside a page.
// So each PDF page is drawn as a picture with the pdf.js library, which works on every phone.
//   - the library is only downloaded when this component is first used (the Resume tab or a brochure)
//   - pages appear one by one as soon as they are ready
//   - tap a page to open it full screen, where you can double-tap to zoom in and read the small text
// kind = the word used in the messages: 'resume' shows "Loading resume…", 'brochure' shows "Loading brochure…".
export default function PdfViewer({ url, title, kind = 'resume' }) {
  const boxRef = useRef(null)
  const [pages, setPages] = useState([])            // finished pages: { image, ratio }
  const [status, setStatus] = useState('loading')   // 'loading' | 'ready' | 'error'
  const [openIndex, setOpenIndex] = useState(null)  // which page is open full screen (null = closed)

  useEffect(() => {
    let cancelled = false

    async function drawPages() {
      try {
        const pdfjs = await loadPdfJs()

        const pdf = await pdfjs.getDocument({ url }).promise

        // Draw each page a bit larger than it is shown, so it stays sharp and can be zoomed.
        const displayWidth = boxRef.current?.clientWidth || 320
        const sharpness = Math.min(window.devicePixelRatio || 1, 2) * 1.5

        const finished = []
        for (let number = 1; number <= pdf.numPages; number++) {
          const page = await pdf.getPage(number)
          const natural = page.getViewport({ scale: 1 })
          const viewport = page.getViewport({ scale: (displayWidth * sharpness) / natural.width })

          const canvas = document.createElement('canvas')
          canvas.width = Math.floor(viewport.width)
          canvas.height = Math.floor(viewport.height)
          await page.render({ canvasContext: canvas.getContext('2d'), canvas, viewport }).promise

          if (cancelled) return
          finished.push({ image: canvas.toDataURL('image/jpeg', 0.92), ratio: natural.width / natural.height })
          setPages([...finished]) // show this page right away, then carry on with the next
        }
        if (!cancelled) setStatus('ready')
      } catch (error) {
        console.error('Could not show the PDF:', error)
        if (!cancelled) setStatus('error')
      }
    }

    drawPages()
    return () => { cancelled = true }
  }, [url])

  if (status === 'error') {
    return (
      <div className="card-item pdf-error">
        <FileWarning size={22} />
        <div>
          <b>The {kind} could not be shown here.</b>
          <p>Check that the file exists and the link in content.js is correct. You can still download it below.</p>
        </div>
      </div>
    )
  }

  // The same pages, in the shape the full-screen viewer expects.
  const pagesForViewer = pages.map((page, index) => ({
    image: page.image, title, category: `Page ${index + 1} of ${pages.length}`,
  }))

  return (
    <div className="pdf" ref={boxRef}>
      {pages.map((page, index) => (
        <button key={index} className="pdf-page" onClick={() => setOpenIndex(index)} aria-label={`Open page ${index + 1} full screen`}>
          <img src={page.image} alt={`${title}, page ${index + 1}`} draggable={false} style={{ aspectRatio: page.ratio }} />
        </button>
      ))}

      {status === 'loading' && <div className="pdf-loading">Loading {kind}…</div>}
      {status === 'ready' && <p className="pdf-hint">Tap a page to read it full screen and zoom in</p>}

      {openIndex !== null && (
        <Lightbox works={pagesForViewer} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  )
}
