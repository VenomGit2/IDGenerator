import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BadgeCheck, QrCode, ShieldCheck, Sun, Moon } from 'lucide-react'
import { profile } from '../data/profile.js'
import { buzz } from '../utils/haptics.js'
import { imageSrc } from '../utils/media.js'
import CountUp from './ui/CountUp.jsx'
import Lightbox from './ui/Lightbox.jsx'

// The photo as a one-item "portfolio", so the full-screen viewer can show it large.
const photoAsWork = [{ image: profile.photo, title: profile.name, category: profile.title }]

// The top of the card: cover image, avatar, name, title and the three stat numbers.
export default function Hero({ theme, onToggleTheme, onOpenQr }) {
  const [photoOpen, setPhotoOpen] = useState(false)

  // Parallax: the cover moves slower than the page, and stretches when you pull down at the top.
  const { scrollY } = useScroll()
  const coverY = useTransform(scrollY, [0, 220], [0, 70])
  const coverScale = useTransform(scrollY, [-120, 0], [1.35, 1])

  return (
    <header className="hero">
      <div className="cover">
        <motion.div className="cover-bg" style={{ y: coverY, scale: coverScale }} />
        <span className="idno"><ShieldCheck size={13} /> {profile.idNumber}</span>
        <div className="cover-actions">
          <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-btn" onClick={onOpenQr} aria-label="Show QR code"><QrCode size={17} /></button>
        </div>
      </div>

      <div className="hero-body">
        {/* the photo fades in and settles slowly; tapping it opens it large */}
        <motion.div
          className="avatar-wrap"
          initial={{ scale: 0.88, y: 10, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <button className="avatar-btn" onClick={() => { buzz(8); setPhotoOpen(true) }} aria-label={`View ${profile.name}'s photo`}>
            <div className="avatar-ring"><img src={imageSrc(profile.photo, 400)} alt={profile.name} draggable={false} referrerPolicy="no-referrer" /></div>
          </button>
          <motion.span className="tick" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.7, stiffness: 300 }}>
            <BadgeCheck size={18} />
          </motion.span>
        </motion.div>

        <div className="verified"><i /> Verified identity</div>
        <h1>{profile.name}</h1>
        <p className="role">{profile.title}</p>
        <p className="org">{profile.company} <span>· {profile.previous}</span></p>

        <div className="stats">
          {profile.stats.map(s => <div key={s.label}><CountUp to={s.value} /><small>{s.label}</small></div>)}
        </div>
      </div>

      {photoOpen && <Lightbox works={photoAsWork} startIndex={0} onClose={() => setPhotoOpen(false)} />}
    </header>
  )
}
