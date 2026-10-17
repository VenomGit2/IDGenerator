// ✏️ EDIT ME: this is the person shown on the card.
// Change these values and the whole page updates.

export const profile = {
  name: 'Yash Dahiwal',
  // idNumber: 'IQ-000241',
  title: 'Graphic Designer & Motion Video Editor',
  company: 'Creative Flow',

  bio: 'Creative Designer Specializing in Branding, Printing and Social Media With a background in 3 years of design, I bring a blend of creativity and strategic thinking to every project. My expertise in branding, logo creation, print design, and social media allows me to craft cohesive visual narratives that resonate with audiences and fulfill business goals.',
  // Your photo: a Google Drive share link (Anyone with the link can view), or a file like '/me.jpg' in the public/ folder.
  photo: '/profile.jpeg',
  cover:'/cover.png',
  phone: '+918482863150',
  email: 'creativeflow3563@gmail.com',
  website: 'https://idgenerator.insanedk46.workers.dev',
  locations: ['Hyderabad, India'],
  url: 'https://idgenerator.insanedk46.workers.dev', // used for the QR code and sharing

  // ✏️ The "Open for work" banner at the bottom of the page. The button opens your WhatsApp chat.
  availability: {
    label: 'Open for work',
    note: 'Want to create something ?',
  },

  // ✏️ WhatsApp Business chat (the WhatsApp tab)
  whatsapp: {
    // Your WhatsApp Business number: country code + number, digits only. No +, spaces or dashes.
    // Example: +1 415 555 0142  ->  '14155550142'.   (This is a sample number. Replace it with yours!)
    number: '+918482863150',
    // Shown in the WhatsApp tab
    hours: 'Mon – Sat, 10:00 – 19:00',
    // The message that is typed for the visitor when they tap the main "Chat on WhatsApp" button
    greeting: 'Hi Yash, I found your digital ID card and would like to talk about a design project.',
    // Quick options. Each one opens WhatsApp with its own ready-written message.
    topics: [
      { label: 'Hire me for a project', message: 'Hi Yash, I would like to hire you for a design project. Are you available?' },
      { label: 'Ask for a quote', message: 'Hi Yash, could you share a quote for a design project? Here are the details:' },
      { label: 'Book a call', message: 'Hi Yash, I would like to book a short call to discuss my project.' },
    ],
  },
  socials: [
    // { label: 'LinkedIn', icon: 'linkedin', href: '#' },   // icon: linkedin | github | instagram | behance | pinterest | whatsapp
    // replace each '#' with your real profile link, e.g. https://instagram.com/yourname
    // { label: 'GitHub', icon: 'github', href: '#' },
    { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/creative_flow_official' },
    { label: 'Behance', icon: 'behance', href: 'https://behance.net/yashdahiwal' },
    { label: 'Pinterest', icon: 'pinterest', href: 'https://in.pinterest.com/Creative_Flow_07' },
  ],
  stats: [
    { value: '3.5+', label: 'Years' },
    { value: '100+', label: 'Projects' },
    { value: '4.9', label: 'Rating' },
  ],
}
