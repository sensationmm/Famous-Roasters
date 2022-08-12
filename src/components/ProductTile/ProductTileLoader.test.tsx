import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { ProductTileLoader } from '.'

describe('ProductTileLoader component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<ProductTileLoader />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
