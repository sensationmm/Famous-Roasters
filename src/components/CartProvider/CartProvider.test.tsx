import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { CartProvider } from '.'

describe('Cart provider component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <CartProvider>
        <span />
      </CartProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
