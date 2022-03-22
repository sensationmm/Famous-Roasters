import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { Catalogue } from '.'

describe('Catalogue view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/catalogue']}>
        <Catalogue />
      </MemoryRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
