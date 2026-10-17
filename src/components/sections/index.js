// Maps each nav id (see config/navigation.js) to the component that shows its content.
// To add a new section: create the component, then add a line here and in navigation.js.

import ContactInfo from './ContactInfo.jsx'
import About from './About.jsx'
import Portfolio from './Portfolio.jsx'
import Services from './Services.jsx'
import Resume from './Resume.jsx'
import Socials from './Socials.jsx'
import WhatsApp from './WhatsApp.jsx'

export const SECTIONS = {
  'Contact Info': ContactInfo,
  'About Me': About,
  Portfolio,
  Services,
  Resume,
  Socials,
  WhatsApp,
}
