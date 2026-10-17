// ✏️ EDIT ME: this is the person shown on the card.
// Change these values and the whole page updates.

export const profile = {
  name: 'Alex Johnson',
  idNumber: 'IQ-000241',
  title: 'Principal Product Designer & Systems Architect',
  company: 'Apex Design Lab',
  previous: 'Formerly at Stripe',
  bio: 'I design systems that scale: from design languages used by thousands of teams to spatial computing interfaces that feel effortless. I partner with founders and product teams to turn complex ideas into clear, durable products.',
  // Your photo: a Google Drive share link (Anyone with the link can view), or a file like '/me.jpg' in the public/ folder.
  photo: 'https://i.pravatar.cc/400?img=12',
  phone: '+1 415 555 0142',
  email: 'alex@apexdesign.io',
  website: 'apexdesign.io',
  locations: ['San Francisco, CA', 'Mumbai, India'],
  url: 'https://identiq.in/u/demo', // used for the QR code and sharing

  // ✏️ The "Open for work" banner at the bottom of the page. The button opens your WhatsApp chat.
  availability: {
    label: 'Open for work',
    note: 'Taking new design projects from November',
  },

  // ✏️ WhatsApp Business chat (the WhatsApp tab)
  whatsapp: {
    // Your WhatsApp Business number: country code + number, digits only. No +, spaces or dashes.
    // Example: +1 415 555 0142  ->  '14155550142'.   (This is a sample number. Replace it with yours!)
    number: '14155550142',
    // Shown in the WhatsApp tab
    hours: 'Mon – Sat, 10:00 – 19:00',
    // The message that is typed for the visitor when they tap the main "Chat on WhatsApp" button
    greeting: 'Hi Alex, I found your digital ID card and would like to talk about a design project.',
    // Quick options. Each one opens WhatsApp with its own ready-written message.
    topics: [
      { label: 'Hire me for a project', message: 'Hi Alex, I would like to hire you for a design project. Are you available?' },
      { label: 'Ask for a quote', message: 'Hi Alex, could you share a quote for a design project? Here are the details:' },
      { label: 'Book a call', message: 'Hi Alex, I would like to book a short call to discuss my project.' },
    ],
  },
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', href: '#' },   // icon: linkedin | github | instagram | whatsapp
    // replace each '#' with your real profile link, e.g. https://instagram.com/yourname
    { label: 'GitHub', icon: 'github', href: '#' },
    { label: 'Instagram', icon: 'instagram', href: '#' },
  ],
  stats: [
    { value: '12+', label: 'Years' },
    { value: '140', label: 'Projects' },
    { value: '4.9', label: 'Rating' },
  ],
}
