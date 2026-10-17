// A tiny vibration on touch. Works on Android; iPhones ignore it safely.
export function buzz(ms = 8) {
  try { navigator.vibrate?.(ms) } catch { /* not supported */ }
}
