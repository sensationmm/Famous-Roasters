import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { StickyBottomNavigation } from '.'

describe('StickyBottomNavigation component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<StickyBottomNavigation />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with optional props', async () => {
    const { container } = render(<StickyBottomNavigation percentage={50} isNextDisabled={true} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
