import { act, renderHook } from '@testing-library/react'

import { useLocalStorage } from './localStorage'

describe('Localstorage utils', () => {
  it('Localstorage hook works', () => {
    const { result } = renderHook(() => useLocalStorage('testLocalStorage', true))
    expect(result.current[0]).toBe(true)
    act(() => {
      result.current[1](false)
    })
    expect(result.current[0]).toBe(false)
  })

  it('Localstorage hook handles errors', () => {
    const originalLog = console.log
    console.log = jest.fn()
    window.localStorage.setItem('testLocalStorage2', 'wrong')
    const { result } = renderHook(() => useLocalStorage('testLocalStorage2', true))
    expect(result.current[0]).toBe(true)
    console.log = originalLog
  })
})
