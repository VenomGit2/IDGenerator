import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { buzz } from '../../utils/haptics.js'
import { isVideo, imageSrc, posterSrc, videoSource, videoRatio } from '../../utils/media.js'

const ZOOM = 2.4          // how much a double-tap enlarges the image
const DOUBLE_TAP_MS = 320 // two taps closer together than this count as a double-tap

// Full-screen viewer for photos AND videos, built for phones.
//   photos:  swipe left / right = next / previous, swipe down = close, double-tap = zoom
//   videos:  plays inside the viewer. Use the arrow buttons to move on (swiping would fight the video controls)
//   X, Esc or the dark area = close
//
// It is drawn with a "portal" straight into <body>, so it covers the whole screen
// even though it is opened from inside a card.
export default function Lightbox({ works, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const [direction, setDirection] = useState(1) // 1 = moved forward, -1 = moved back
  const [zoomed, setZoomed] = useState(false)
  const lastTapTime = useRef(0)
  const work = works[index]
  const showingVideo = isVideo(work)

  // The image position while dragging. Reading it lets the background fade as you pull down.
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const backdrop = useTransform(dragY, [0, 320], ['rgba(0, 0, 0, 0.94)', 'rgba(0, 0, 0, 0.35)'])

  const resetPosition = () => { animate(dragX, 0, { duration: 0.25 }); animate(dragY, 0, { duration: 0.25 }) }

  const move = change => {
    const nextIndex = index + change
    if (nextIndex < 0 || nextIndex >= works.length) return // already at the first or last item
    setDirection(change)
    setZoomed(false)
    dragX.set(0)
    dragY.set(0)
    setIndex(nextIndex)
  }

  const toggleZoom = () => {
    buzz(6)
    if (zoomed) resetPosition()
    setZoomed(!zoomed)
  }

  // A "tap" arrives from framer-motion. Two taps quickly in a row = double-tap.
  const onTap = () => {
    const now = Date.now()
    if (now - lastTapTime.current < DOUBLE_TAP_MS) { toggleZoom(); lastTapTime.current = 0 }
    else lastTapTime.current = now
  }

  // Load the next and previous photos in the background so swiping feels instant.
  useEffect(() => {
    ;[index - 1, index + 1].forEach(i => {
      const neighbour = works[i]
      if (neighbour && !isVideo(neighbour)) new Image().src = imageSrc(neighbour.image)
    })
  }, [index, works])

  // Keyboard support + stop the page behind from scrolling while the viewer is open
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') move(-1)
      if (e.key === 'ArrowRight') move(1)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  })

  // When you let go after dragging a photo: decide between "next/previous", "close" or "snap back".
  const onDragEnd = (_, info) => {
    if (zoomed) return // while zoomed, dragging just moves the image around
    const { x, y } = info.offset
    if (Math.abs(y) > Math.abs(x)) {
      if (y > 110 || info.velocity.y > 700) { buzz(6); onClose() }
      else resetPosition()
    } else if (x < -70 || info.velocity.x < -500) move(1)
    else if (x > 70 || info.velocity.x > 500) move(-1)
    else resetPosition()
  }

  const hint = showingVideo
    ? `${works.length > 1 ? 'Use the arrows to browse · ' : ''}tap the player to play`
    : `${works.length > 1 ? 'Swipe to browse · ' : ''}double-tap to zoom · pull down to close`

  return createPortal(
    <motion.div
      className="lightbox" style={{ backgroundColor: backdrop }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}
    >
      <div className="lightbox-top" onClick={e => e.stopPropagation()}>
        <span className="lightbox-count">{works.length > 1 ? `${index + 1} / ${works.length}` : ''}</span>
        <button className="lightbox-btn" onClick={onClose} aria-label="Close"><X size={20} /></button>
      </div>

      <div className="lightbox-stage">
        {/* outer layer: slides in from the side we moved towards. inner part: the photo or the video player. */}
        <motion.div
          key={work.video ?? work.image} className="lightbox-slide"
          initial={{ opacity: 0, x: direction * 50 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {showingVideo
            ? <VideoPlayer work={work} />
            : (
              <motion.img
                src={imageSrc(work.image)} alt={`${work.title} - ${work.category}`} draggable={false}
                style={{ x: dragX, y: dragY }}
                animate={{ scale: zoomed ? ZOOM : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                drag dragDirectionLock={!zoomed} dragMomentum={zoomed} dragElastic={zoomed ? 0.1 : 0.35}
                dragConstraints={zoomed ? undefined : { left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={onDragEnd} onTap={onTap}
                onClick={e => e.stopPropagation()}
                className={zoomed ? 'is-zoomed' : ''}
              />
            )}
        </motion.div>
        {!zoomed && index > 0 && (
          <button className="lightbox-btn lightbox-prev" onClick={e => { e.stopPropagation(); move(-1) }} aria-label="Previous"><ChevronLeft size={22} /></button>
        )}
        {!zoomed && index < works.length - 1 && (
          <button className="lightbox-btn lightbox-next" onClick={e => { e.stopPropagation(); move(1) }} aria-label="Next"><ChevronRight size={22} /></button>
        )}
      </div>

      <div className="lightbox-caption" onClick={e => e.stopPropagation()}>
        <small>{work.category}</small>
        <b>{work.title}</b>
        {work.description && <p>{work.description}</p>}
        <span className="lightbox-hint">{hint}</span>
      </div>
    </motion.div>,
    document.body,
  )
}

// Plays one video. Google Drive, YouTube and Vimeo links play inside an iframe;
// a plain file (for example /work/clip.mp4) uses the phone's normal video player.
function VideoPlayer({ work }) {
  const { kind, src } = videoSource(work.video)
  const ratio = videoRatio(work)
  // Keeps the player as large as fits the screen: full width for wide videos, full height for tall (vertical) ones.
  const boxStyle = { aspectRatio: ratio, maxWidth: `min(100%, calc((100dvh - 260px) * ${ratio}))` }

  return (
    <div className="lightbox-videobox" style={boxStyle} onClick={e => e.stopPropagation()}>
      {kind === 'embed' ? (
        <iframe
          src={src} title={work.title} loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen
        />
      ) : (
        <video src={src} poster={posterSrc(work, 1200)} controls playsInline preload="metadata" />
      )}
    </div>
  )
}
