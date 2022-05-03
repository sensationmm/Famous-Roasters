import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { ProductMock, ProductMockNoImage } from 'src/_mocks'

import { ProductTile } from '.'

describe('Product Tile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<ProductTile productNode={{ ...ProductMock, pricePerKg: { value: '10.0' } }} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders as expected for missing images', async () => {
    const { container } = render(<ProductTile productNode={{ ...ProductMockNoImage, pricePerKg: { value: '10.0' } }} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders as expected for missing attributes', async () => {
    const { container } = render(<ProductTile productNode={{ ...ProductMock }} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
