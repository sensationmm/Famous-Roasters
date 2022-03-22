import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { Checkout } from '.'

describe('Checkout view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/checkout']}>
        <Checkout />
      </MemoryRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
