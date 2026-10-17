import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { pdfCoverSrc } from '../../utils/media.js'
import { loadPdfJs } from '../../utils/pdf.js'

// Pictures of first pages we have already drawn, so a card does not redraw when you switch tabs.
const firstPageCache = new Map()

// The cover picture of a brochure card.
//   1) your own  thumb  picture, or Google's picture of a Drive PDF's first page
//   2) otherwise the first page of the PDF is drawn here with the PDF reader
//   3) if nothing works, a plain PDF icon is shown
export default function PdfCover({ brochure }) {
  const readyMadeCover = pdfCoverSrc(brochure, 600)
  const [drawnCover, setDrawnCover] = useState(firstPageCache.get(brochure.pdf) ?? null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (readyMadeCover || drawnCover) return
    let cancelled = false

    async function drawFirstPage() {
      try {
        const pdfjs = await loadPdfJs()
        const pdf = await pdfjs.getDocument({ url: brochure.pdf }).promise
        const page = await pdf.getPage(1)
        const natural = page.getViewport({ scale: 1 })
        const viewport = page.getViewport({ scale: (420 * Math.min(window.devicePixelRatio || 1, 2)) / natural.width })

        const canvas = document.createElement('canvas')
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        await page.render({ canvasContext: canvas.getContext('2d'), canvas, viewport }).promise

        const picture = canvas.toDataURL('image/jpeg', 0.85)
        firstPageCache.set(brochure.pdf, picture)
        if (!cancelled) setDrawnCover(picture)
      } catch (error) {
        console.error('Could not draw the brochure cover:', error)
        if (!cancelled) setFailed(true)
      }
    }

    drawFirstPage()
    return () => { cancelled = true }
  }, [brochure.pdf, readyMadeCover, drawnCover])

  const picture = readyMadeCover ?? drawnCover

  if (picture && !failed) {
    return <img className="brochure-cover" src={picture} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" draggable={false} onError={() => setFailed(true)} />
  }
  return (
    <span className={`brochure-placeholder ${failed ? '' : 'is-loading'}`} aria-hidden>
      <FileText size={34} />
    </span>
  )
}
