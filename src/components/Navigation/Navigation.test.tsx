import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { Navigation } from '.'

describe('Navigation component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can expand and collapse mobile menu', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>,
    )
    const buttonOpen = await screen.findByTestId('button-open')
    expect(buttonOpen).toBeInTheDocument()
    fireEvent.click(buttonOpen)
    const buttonClose = await screen.findByTestId('button-close')
    expect(buttonClose).toBeInTheDocument()
    fireEvent.click(buttonClose)
  })
})
