import { renderHook } from '@testing-library/react-hooks'

import useBreakpoint from './useBreakpoint'

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x
  window.innerHeight = y
  window.dispatchEvent(new Event('resize'))
}

describe('useBreakpoint', () => {
  it('should return breakpoint sm', () => {
    resizeWindow(500, 300)

    const breakpoint = renderHook(() => useBreakpoint())
    expect(breakpoint.result.current).toEqual('sm')
  })

  it('should return breakpoint md', () => {
    resizeWindow(700, 300)

    const breakpoint = renderHook(() => useBreakpoint())
    expect(breakpoint.result.current).toEqual('md')
  })

  it('should return breakpoint lg', () => {
    resizeWindow(1200, 300)

    const breakpoint = renderHook(() => useBreakpoint())
    expect(breakpoint.result.current).toEqual('lg')
  })
})
