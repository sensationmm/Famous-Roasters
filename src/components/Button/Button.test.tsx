import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { Button } from '.'

global.alert = jest.fn()

describe('Button component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Button onClick={() => alert('click')}>CTA</Button>)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can be clicked', async () => {
    render(<Button onClick={() => alert('click')}>CTA</Button>)
    const outerContent = await screen.findByText('CTA')
    expect(outerContent).toBeInTheDocument()
    fireEvent.click(outerContent)
  })
})
