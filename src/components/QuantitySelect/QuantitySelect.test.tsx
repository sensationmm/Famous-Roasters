import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { QuantitySelect } from '.'

global.alert = jest.fn()

describe('QuantitySelect component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<QuantitySelect min={1} max={10} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can increment if is not yet on max', async () => {
    render(<QuantitySelect min={1} max={10} value={1} onChange={(v) => alert(v)} />)
    const button = await screen.findByTestId('quantity-plus')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    const quantity = await screen.findByTestId('quantity-value')
    expect(quantity).toBeInTheDocument()
    expect(quantity.textContent).toBe('2')
  })

  it('The user cannot increment if max reached', async () => {
    render(<QuantitySelect min={1} max={10} value={10} onChange={(v) => alert(v)} />)
    const button = await screen.findByTestId('quantity-plus')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    const quantity = await screen.findByTestId('quantity-value')
    expect(quantity).toBeInTheDocument()
    expect(quantity.textContent).toBe('10')
  })

  it('The user can decrement if is not yet on min', async () => {
    render(<QuantitySelect min={1} max={10} value={5} onChange={(v) => alert(v)} />)
    const button = await screen.findByTestId('quantity-minus')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    const quantity = await screen.findByTestId('quantity-value')
    expect(quantity).toBeInTheDocument()
    expect(quantity.textContent).toBe('4')
  })

  it('The user cannot decrement if min reached', async () => {
    render(<QuantitySelect min={1} max={10} value={1} onChange={(v) => alert(v)} />)
    const button = await screen.findByTestId('quantity-minus')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    const quantity = await screen.findByTestId('quantity-value')
    expect(quantity).toBeInTheDocument()
    expect(quantity.textContent).toBe('1')
  })
})
