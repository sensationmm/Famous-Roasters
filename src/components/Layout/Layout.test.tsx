import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Layout } from '.'

describe('Layout component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Layout>
        <span>Test</span>
      </Layout>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
