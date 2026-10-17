import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { item } from '../../animations/variants.js'
import { isVideo, posterSrc } from '../../utils/media.js'

// One tile in the portfolio grid (a photo or a video).
//
// Phone-friendly details:
//   - the tile reserves its space BEFORE the picture arrives (from width/height in content.js),
//     so the page never jumps around while pictures load
//   - videos show their cover picture with a play button on top
//   - pictures further down the page load only when you scroll near them (loading="lazy")
//   - the picture fades in when it is ready, over a soft placeholder
export default function WorkTile({ work, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const imageRef = useRef(null)
  const video = isVideo(work)
  const poster = posterSrc(work, 700)
  const knowsItsSize = Boolean(work.width && work.height)

  // If the browser already has the picture cached, it is "complete" before React can listen for onLoad.
  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) setLoaded(true)
  }, [])

  // Shape reserved for the tile: your width/height, else 16:9 for a video, else a 4:5 placeholder until the picture loads.
  const reservedShape = knowsItsSize
    ? `${work.width} / ${work.height}`
    : video ? '16 / 9' : loaded ? undefined : '4 / 5'
  const fillsTile = knowsItsSize || video

  return (
    <motion.button
      className={`tile ${loaded || !poster ? 'loaded' : ''} ${fillsTile ? 'sized' : ''} ${video ? 'is-video' : ''}`}
      variants={item}
      style={{ aspectRatio: reservedShape }}
      onClick={() => onOpen(index)}
      aria-label={`${video ? 'Play' : 'Open'} ${work.title}`}
    >
      {poster && (
        <img
          ref={imageRef}
          src={poster}
          alt={`${work.title} - ${work.category}`}
          width={work.width} height={work.height}
          loading={index < 2 ? 'eager' : 'lazy'}   // the first two load straight away, the rest wait until near the screen
          decoding="async"
          referrerPolicy="no-referrer"             // lets Google Drive pictures load without being blocked
          onLoad={() => setLoaded(true)}
          draggable={false}
        />
      )}
      {video && <span className="play-badge" aria-hidden><Play size={18} fill="currentColor" /></span>}
      <span className="tile-caption">
        <small>{work.category}{video ? ' · Video' : ''}</small>
        <b>{work.title}</b>
      </span>
    </motion.button>
  )
}
