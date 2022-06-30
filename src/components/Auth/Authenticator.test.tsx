import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Authenticator } from './Authenticator'

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
