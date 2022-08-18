import { ApolloProvider } from '@apollo/client'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { famousRoastersClient, hygraphClient, storeFrontClient } from './index'

describe('Apollo clients', () => {
  it('Renders storefrontClient correctly', async () => {
    const { container } = render(
      <ApolloProvider client={storeFrontClient()}>
        <span />
      </ApolloProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders famousRoastersClient correctly', async () => {
    const { container } = render(
      <ApolloProvider client={famousRoastersClient()}>
        <span />
      </ApolloProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders hygraphClient correctly', async () => {
    const { container } = render(
      <ApolloProvider client={hygraphClient()}>
        <span />
      </ApolloProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
