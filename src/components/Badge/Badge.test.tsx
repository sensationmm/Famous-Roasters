import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Badge } from '.'

describe('Badge component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Badge />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
