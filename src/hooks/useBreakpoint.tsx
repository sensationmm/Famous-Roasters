import { useEffect, useState } from 'react'

export const breakpoints = {
  0: 'sm',
  640: 'md',
  1024: 'lg',
}

export const breakpointSizes = Object.keys(breakpoints)

type Breakpoint = 'sm' | 'md' | 'lg'
type windowSize = {
  width: number
  height: number
}

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<Breakpoint>('sm')
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: 0,
    height: 0,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    if (windowSize.width) {
      if (0 <= windowSize.width && windowSize.width < 640) {
        setBreakPoint(breakpoints[0] as Breakpoint)
      }
      if (640 <= windowSize.width && windowSize.width < 1024) {
        setBreakPoint(breakpoints[640] as Breakpoint)
      }
      if (windowSize.width >= 1024) {
        setBreakPoint(breakpoints[1024] as Breakpoint)
      }
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize.width])
  return breakpoint
}

export default useBreakpoint
