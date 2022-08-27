export const readTimeCalculator = (text: string | null | undefined): number => {
  if (typeof text !== 'string' || text === '') return 0

  const wpm = 238 // https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786#:~:text=Abstract,and%20260%20wpm%20for%20fiction.
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return time
}
