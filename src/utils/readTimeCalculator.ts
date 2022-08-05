export const readTimeCalculator = (text: string | null | undefined): number => {
  if (typeof text !== 'string') return 0

  const wpm = 200 // arbitrary word read speed per
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return time
}
