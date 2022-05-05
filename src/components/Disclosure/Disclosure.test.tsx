import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { Disclosure } from '.'

describe('Disclosure component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Disclosure buttonChildren={<span>Toggle me</span>} panelChildren={<span>This is some content</span>} />,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can expand and collapse', async () => {
    render(<Disclosure buttonChildren={<span>Toggle me</span>} panelChildren={<span>This is some content</span>} />)
    const buttons = await screen.findAllByTestId('button-disclosure-toggle')
    expect(buttons[0]).toBeInTheDocument()
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[0])
  })
})
