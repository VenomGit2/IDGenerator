import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from './data/profile.js'
import { container, item } from './animations/variants.js'
import { useTheme } from './hooks/useTheme.js'
import { useToast } from './hooks/useToast.js'
import { useRipple } from './hooks/useRipple.js'
import { useSectionTabs } from './hooks/useSectionTabs.js'
import { saveContactFile } from './utils/vcard.js'
import { buzz } from './utils/haptics.js'

import Background from './components/Background.jsx'
import MiniHeader from './components/MiniHeader.jsx'
import Hero from './components/Hero.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import SectionNav from './components/SectionNav.jsx'
import SectionPanel from './components/SectionPanel.jsx'
import FeaturedWork from './components/FeaturedWork.jsx'
import OpenForWork from './components/OpenForWork.jsx'
import QrSheet from './components/QrSheet.jsx'
import Toast from './components/Toast.jsx'

// App is the "page". It owns the shared state and arranges the components from top to bottom.
export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { message, showToast } = useToast()
  const tabs = useSectionTabs()
  useRipple()

  const [qrOpen, setQrOpen] = useState(false)

  const saveContact = () => { saveContactFile(); showToast('Contact saved'); buzz(18) }

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: profile.name, url: profile.url })
      else { await navigator.clipboard.writeText(profile.url); showToast('Link copied to clipboard') }
    } catch { /* the user closed the share sheet */ }
  }

  return (
    <main className="stage">
      <Background />
      <MiniHeader onSave={saveContact} />

      <motion.div className="layout" variants={container} initial="hidden" animate="show">
        {/* Top card: profile + buttons */}
        <motion.section className="profile card" variants={item}>
          <Hero theme={theme} onToggleTheme={toggleTheme} onOpenQr={() => setQrOpen(true)} />
          <ActionButtons onSave={saveContact} onShare={share} />
        </motion.section>

        {/* Below: section grid, section content, featured work, open-for-work banner */}
        <motion.section className="content" variants={item}>
          <SectionNav activeId={tabs.tab} onSelect={tabs.goTo} />
          <SectionPanel
            tab={tabs.tab} index={tabs.index} direction={tabs.direction}
            panelRef={tabs.panelRef} onStep={tabs.step} showToast={showToast}
          />
          <FeaturedWork onViewAll={() => tabs.goTo('Portfolio')} />
          <OpenForWork />
          <footer>made with ❤️ by <a href='https://www.linkedin.com/in/dnyaneshwar21'>Danny</a></footer>
        </motion.section>
      </motion.div>

      {/* Pop-ups */}
      <AnimatePresence>
        {qrOpen && <QrSheet key="qr" onClose={() => setQrOpen(false)} showToast={showToast} />}
      </AnimatePresence>
      <Toast message={message} />
    </main>
  )
}
