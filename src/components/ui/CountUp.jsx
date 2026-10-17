import { useEffect } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'

// Counts a number up from 0 ("12+" -> 0, 1, 2 ... 12+). Keeps any suffix like "+".
export default function CountUp({ to }) {
  const target = parseFloat(to)
  const suffix = String(to).replace(/[0-9.]/g, '')
  const value = useMotionValue(0)
  const text = useTransform(value, v => (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + suffix)

  useEffect(() => {
    const controls = animate(value, target, { duration: 1.6, ease: 'easeOut', delay: 0.5 })
    return controls.stop
  }, [target, value])

  return <motion.b>{text}</motion.b>
}
