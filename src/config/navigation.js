// The 7 buttons in the section grid, in display order: 3 + 3 + 1 (the last one is centred, see styles/nav.css).
// id   -> the label AND the key used to find the section component
// icon -> a lucide-react icon
// hue  -> icon colour (see styles/tokens.css)

import { User, Images, Layers, GraduationCap, Share, MessageCircle } from 'lucide-react'

export const NAV = [
  { id: 'Contact Info', icon: User, hue: 'yellow' },
  { id: 'About Me', icon: User, hue: 'amber' },
  { id: 'Portfolio', icon: Images, hue: 'gold' },
  { id: 'Services', icon: Layers, hue: 'cream' },
  { id: 'Resume', icon: GraduationCap, hue: 'lemon' },
  { id: 'Socials', icon: Share, hue: 'amber' },
  { id: 'WhatsApp', icon: MessageCircle, hue: 'yellow' },
]
