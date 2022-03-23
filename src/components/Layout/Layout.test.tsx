import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { Layout } from '.'

describe('Layout component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <span>Test</span>
        </Layout>
      </MemoryRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
