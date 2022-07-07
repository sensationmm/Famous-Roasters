import { render, waitFor } from '@testing-library/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { awsconfig } from 'src/config/cognito/auth.hook'

import { Authenticator } from './Authenticator'

Amplify.configure(awsconfig)

describe('Authenticator wrapper', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Authenticator hideDefault={true} authState="signIn" onStateChange={() => null}>
        <div>Custom</div>
      </Authenticator>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
