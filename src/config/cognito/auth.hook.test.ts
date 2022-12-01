import { renderHook } from '@testing-library/react'
import Amplify from 'aws-amplify'
import { awsconfig } from 'src/config/cognito/auth.hook'

import useAuth from './auth.hook'

Amplify.configure(awsconfig)

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
