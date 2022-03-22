import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { Product } from '.'

describe('Product view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/product/:id']}>
        <Product />
      </MemoryRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
