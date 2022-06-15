import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { Checkbox } from '.'

global.alert = jest.fn()

describe('Checkbox component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Checkbox name="test" text="Dieser Kaffee ist lekka" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for selected', async () => {
    const { container } = render(<Checkbox name="test" text="Dieser Kaffee ist lekka" selected={true} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can toggle the state by clicking', async () => {
    render(<Checkbox name="test" text="Dieser Kaffee ist lekka" toggleSelected={() => alert('works')} />)
    const checkbox = await screen.findByTestId('checkbox')
    expect(checkbox).toBeInTheDocument()
    fireEvent.click(checkbox)
    fireEvent.click(checkbox)
  })
})
