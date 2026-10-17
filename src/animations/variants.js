// Shared animation settings for framer-motion. Change numbers here to tune the feel of the whole app.

// Spring used by sheets and the mini header (higher stiffness = snappier)
export const SPRING = { type: 'spring', damping: 30, stiffness: 320 }

// "container" makes its children appear one after another
export const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

// "item" is one child that fades in and slides up
export const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
}
