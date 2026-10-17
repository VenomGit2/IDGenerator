// ✏️ EDIT ME: this is the person shown on the card.
// Change these values and the whole page updates.

export const profile = {
  name: 'Yash Dahiwal',
  idNumber: 'IQ-000241',
  title: 'Graphic Designer & Motion Video Editor',
  company: 'Creative Flow',

  bio: 'Creative Designer Specializing in Branding, Printing and Social Media With a background in 3 years of design, I bring a blend of creativity and strategic thinking to every project. My expertise in branding, logo creation, print design, and social media allows me to craft cohesive visual narratives that resonate with audiences and fulfill business goals.',
  // Your photo: a Google Drive share link (Anyone with the link can view), or a file like '/me.jpg' in the public/ folder.
  photo: 'https://i.pravatar.cc/400?img=12',
  phone: '+1 415 555 0142',
  email: 'alex@apexdesign.io',
  website: 'apexdesign.io',
  locations: ['Hyderabad, India'],
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
