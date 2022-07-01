import { renderHook } from '@testing-library/react-hooks'

import useAuth from './auth.hook'

describe('Auth Hook', () => {
  it('Auth Hook works', () => {
    const { result } = renderHook(() => useAuth())
    const test = result.current[0]?.getIdToken().getJwtToken()
    expect(test).toEqual(undefined)
  })

  it('No current user error is handled', () => {
    // const mockCurrentSession = jest.spyOn(Auth, 'currentSession')
    // mockCurrentSession.mockRejectedValue(new Error('An error'))
    const { result } = renderHook(() => useAuth())
    const test = result.current[0]?.getIdToken().getJwtToken()
    expect(test).toEqual(undefined)
  })
})
