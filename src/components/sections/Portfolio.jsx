import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image, Clapperboard, BookOpen, FolderOpen, ArrowUpRight } from 'lucide-react'
import { portfolioImages, portfolioVideos, portfolioBrochures, portfolioFolders } from '../../data/content.js'
import { buzz } from '../../utils/haptics.js'
import { item } from '../../animations/variants.js'
import StaggerList from '../ui/StaggerList.jsx'
import WorkTile from '../ui/WorkTile.jsx'
import Lightbox from '../ui/Lightbox.jsx'
import PdfCover from '../ui/PdfCover.jsx'
import BrochureReader from '../ui/BrochureReader.jsx'

const ALL = 'All'

// The sections of the Portfolio tab (Images, Videos, Brochures). Each has its own list in src/data/content.js.
// A section with nothing in it is hidden automatically.
const SECTIONS = [
  { id: 'images', label: 'Images', icon: Image, works: portfolioImages, folderUrl: portfolioFolders.images, folderText: 'See all images on Drive' },
  { id: 'videos', label: 'Videos', icon: Clapperboard, works: portfolioVideos, folderUrl: portfolioFolders.videos, folderText: 'See all videos on Drive' },
  // brochures are PDFs: shown as cover cards, and opened in the full-screen reader (BrochureReader)
  { id: 'brochures', label: 'Brochures', icon: BookOpen, works: portfolioBrochures, kind: 'brochures', folderUrl: portfolioFolders.brochures, folderText: 'See all brochures on Drive' },
].filter(section => section.works.length > 0)

// Your design work. An "Images | Videos | Brochures" switch, filter buttons for the open section,
// a grid of tiles (or brochure covers), and the full-screen viewer / reader.
export default function Portfolio() {
  const [sectionId, setSectionId] = useState(SECTIONS[0]?.id)
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [openIndex, setOpenIndex] = useState(null)       // which tile is open in the viewer (null = closed)
  const [openBrochure, setOpenBrochure] = useState(null) // which brochure is open in the reader (null = closed)

  if (SECTIONS.length === 0) return <p className="bio">Add your work in src/data/content.js.</p>

  const section = SECTIONS.find(s => s.id === sectionId) ?? SECTIONS[0]
  const isBrochures = section.kind === 'brochures'

  // One filter button per category in the open section, plus "All".
  const categories = [ALL, ...new Set(section.works.map(work => work.category))]
  const visibleWorks = activeCategory === ALL
    ? section.works
    : section.works.filter(work => work.category === activeCategory)

  const chooseSection = id => { setSectionId(id); setActiveCategory(ALL); setOpenIndex(null); setOpenBrochure(null) }

  const chooseCategory = (category, event) => {
    setActiveCategory(category)
    // keep the chosen button fully visible when the row is scrolled sideways
    event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const openViewer = index => { buzz(8); setOpenIndex(index) }
  const openReader = brochure => { buzz(8); setOpenBrochure(brochure) }

  return (
    <>
      {/* Images | Videos | Brochures switch (only shown when more than one section has something in it) */}
      {SECTIONS.length > 1 && (
        <div className={`segment ${SECTIONS.length > 2 ? 'three' : ''}`} role="tablist" aria-label="Portfolio section">
          {SECTIONS.map(({ id, label, icon: Icon, works }) => (
            <button
              key={id} role="tab" aria-selected={id === section.id}
              className={`segment-btn ${id === section.id ? 'on' : ''}`}
              onClick={() => chooseSection(id)}
            >
              <Icon size={16} /> {label} <span className="segment-count">{works.length}</span>
            </button>
          ))}
        </div>
      )}

      {/* The section can be swiped left/right. Stopping the touch here lets this row scroll sideways
          on its own instead of switching to another section. */}
      <div className="filters" role="tablist" aria-label="Filter by category" onPointerDown={e => e.stopPropagation()}>
        {categories.map(category => (
          <button
            key={category}
            role="tab" aria-selected={category === activeCategory}
            className={`filter ${category === activeCategory ? 'on' : ''}`}
            onClick={e => chooseCategory(category, e)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* key replays the entrance animation each time you change section or filter */}
      <StaggerList key={`${section.id}-${activeCategory}`} className={isBrochures ? 'brochures' : 'gallery'}>
        {isBrochures
          ? visibleWorks.map(brochure => (
              <motion.button
                key={brochure.pdf} className="brochure" variants={item}
                onClick={() => openReader(brochure)} aria-label={`Open ${brochure.title}`}
              >
                <PdfCover brochure={brochure} />
                <span className="brochure-badge">PDF</span>
                <span className="tile-caption">
                  <small>{brochure.category}</small>
                  <b>{brochure.title}</b>
                </span>
              </motion.button>
            ))
          : visibleWorks.map((work, index) => (
              <WorkTile key={work.video ?? work.image} work={work} index={index} onOpen={openViewer} />
            ))}
      </StaggerList>

      {/* link to the full collection in Google Drive (only shown when a folder link is set in content.js) */}
      {section.folderUrl && (
        <a className="btn ghost drive-link" href={section.folderUrl} target="_blank" rel="noreferrer" onClick={() => buzz(8)}>
          <FolderOpen size={17} /> {section.folderText} <ArrowUpRight size={16} />
        </a>
      )}

      {/* the brochure reader: full screen, shows the PDF */}
      {openBrochure && <BrochureReader brochure={openBrochure} onClose={() => setOpenBrochure(null)} />}

      {/* no fade-out on purpose: it closes instantly, so the page can never get stuck behind an invisible layer */}
      {openIndex !== null && !isBrochures && (
        <Lightbox works={visibleWorks} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  )
}
