import { useState } from 'react'
import { Sparkles, ArrowRight, Play } from 'lucide-react'
import { portfolio } from '../data/content.js'
import { buzz } from '../utils/haptics.js'
import { isVideo, posterSrc } from '../utils/media.js'
import Lightbox from './ui/Lightbox.jsx'

// Pieces you marked with  featured: true  in src/data/content.js
const featuredWorks = portfolio.filter(work => work.featured)

// A swipeable strip of your best work (photos and videos), shown under the section panel.
// Tapping a card opens the full-screen viewer. "View all" jumps to the Portfolio tab.
export default function FeaturedWork({ onViewAll }) {
  const [openIndex, setOpenIndex] = useState(null) // which card is open in the viewer (null = closed)

  if (featuredWorks.length === 0) return null // nothing marked as featured, so show nothing

  const openViewer = index => { buzz(8); setOpenIndex(index) }

  return (
    <>
      <div className="featured-head">
        <div className="section-title"><Sparkles size={14} /> Featured work</div>
        <button className="link-btn" onClick={onViewAll}>View all <ArrowRight size={14} /></button>
      </div>

      <div className="featured" role="list">
        {featuredWorks.map((work, index) => {
          const poster = posterSrc(work, 700)
          const video = isVideo(work)
          return (
            <button key={work.video ?? work.image} className="featured-card" role="listitem" onClick={() => openViewer(index)} aria-label={`${video ? 'Play' : 'Open'} ${work.title}`}>
              {poster && (
                <img
                  src={poster} alt={`${work.title} - ${work.category}`}
                  loading={index < 2 ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" draggable={false}
                />
              )}
              {video && <span className="play-badge" aria-hidden><Play size={18} fill="currentColor" /></span>}
              <span className="tile-caption">
                <small>{work.category}{video ? ' · Video' : ''}</small>
                <b>{work.title}</b>
              </span>
            </button>
          )
        })}
      </div>

      {openIndex !== null && (
        <Lightbox works={featuredWorks} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  )
}
