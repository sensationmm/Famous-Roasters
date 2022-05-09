import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { Dialog } from '.'

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = intersectionObserverMock

describe('Dialog component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Dialog trigger={<button>CLick me</button>} title="My dialog" body={<div>My content</div>} />,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can be triggered and dismissed', async () => {
    render(<Dialog trigger={<button>CLick me</button>} title="My dialog" body={<div>My content</div>} />)
    const buttonTrigger = await screen.findByTestId('dialog-trigger')
    expect(buttonTrigger).toBeInTheDocument()
    fireEvent.click(buttonTrigger)
    const buttonDismiss = await screen.findByTestId('dialog-dismiss')
    expect(buttonDismiss).toBeInTheDocument()
    fireEvent.click(buttonDismiss)
  })
})
