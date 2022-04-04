import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { ProductMock } from 'src/_mocks'

import { ProductTile } from '.'

describe('Product Tile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<ProductTile productNode={ProductMock} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
