import { ApolloProvider } from '@apollo/client'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { storeFrontClient } from './index'

describe('Apollo client', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <ApolloProvider client={storeFrontClient()}>
        <span />
      </ApolloProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
