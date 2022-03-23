import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Footer } from '.'

describe('Footer component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Footer />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
