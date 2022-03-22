import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Navigation } from '.'

describe('Navigation component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Navigation />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
