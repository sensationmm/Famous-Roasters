import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { Placeholder } from '.'

global.alert = jest.fn()

describe('Placeholder view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Placeholder />
      </MemoryRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  // temporary
  it('Can click on every button', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Placeholder />
      </MemoryRouter>,
    )
    const buttons = await screen.findAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
  })
})
