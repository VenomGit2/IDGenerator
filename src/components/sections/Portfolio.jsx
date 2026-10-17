import { useState } from 'react'
import { Image, Clapperboard, FolderOpen, ArrowUpRight } from 'lucide-react'
import { portfolioImages, portfolioVideos, portfolioFolders } from '../../data/content.js'
import { buzz } from '../../utils/haptics.js'
import StaggerList from '../ui/StaggerList.jsx'
import WorkTile from '../ui/WorkTile.jsx'
import Lightbox from '../ui/Lightbox.jsx'

const ALL = 'All'

// The two sections of the Portfolio tab. Each has its own list in src/data/content.js.
// A section with nothing in it is hidden automatically.
const SECTIONS = [
  { id: 'images', label: 'Images', icon: Image, works: portfolioImages, folderUrl: portfolioFolders.images, folderText: 'See all images on Drive' },
  { id: 'videos', label: 'Videos', icon: Clapperboard, works: portfolioVideos, folderUrl: portfolioFolders.videos, folderText: 'See all videos on Drive' },
].filter(section => section.works.length > 0)

// Your design work. An "Images | Videos" switch, filter buttons for the open section,
// a grid of tiles, and the full-screen viewer.
export default function Portfolio() {
  const [sectionId, setSectionId] = useState(SECTIONS[0]?.id)
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [openIndex, setOpenIndex] = useState(null) // which tile is open in the viewer (null = closed)

  if (SECTIONS.length === 0) return <p className="bio">Add your work in src/data/content.js.</p>

  const section = SECTIONS.find(s => s.id === sectionId) ?? SECTIONS[0]

  // One filter button per category in the open section, plus "All".
  const categories = [ALL, ...new Set(section.works.map(work => work.category))]
  const visibleWorks = activeCategory === ALL
    ? section.works
    : section.works.filter(work => work.category === activeCategory)

  const chooseSection = id => { setSectionId(id); setActiveCategory(ALL); setOpenIndex(null) }

  const chooseCategory = (category, event) => {
    setActiveCategory(category)
    // keep the chosen button fully visible when the row is scrolled sideways
    event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const openViewer = index => { buzz(8); setOpenIndex(index) }

  return (
    <>
      {/* Images | Videos switch (only shown when both sections have something in them) */}
      {SECTIONS.length > 1 && (
        <div className="segment" role="tablist" aria-label="Portfolio section">
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
      <StaggerList key={`${section.id}-${activeCategory}`} className="gallery">
        {visibleWorks.map((work, index) => (
          <WorkTile key={work.video ?? work.image} work={work} index={index} onOpen={openViewer} />
        ))}
      </StaggerList>

      {/* link to the full collection in Google Drive (only shown when a folder link is set in content.js) */}
      {section.folderUrl && (
        <a className="btn ghost drive-link" href={section.folderUrl} target="_blank" rel="noreferrer" onClick={() => buzz(8)}>
          <FolderOpen size={17} /> {section.folderText} <ArrowUpRight size={16} />
        </a>
      )}

      {/* no fade-out on purpose: it closes instantly, so the page can never get stuck behind an invisible layer */}
      {openIndex !== null && (
        <Lightbox works={visibleWorks} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  )
}
