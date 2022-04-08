import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Pagination } from '.'

describe('Pagination component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Pagination />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
