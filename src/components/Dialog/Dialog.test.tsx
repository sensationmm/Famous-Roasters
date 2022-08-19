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
      <Dialog trigger={<button>CLick me</button>} title="My dialog" overline="title" body={<div>My content</div>} />,
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
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(buttonDismiss).not.toBeInTheDocument()
  })

  it('Can render without headers', async () => {
    const { container } = render(<Dialog trigger={<button>CLick me</button>} body={<div>My content</div>} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can be dismissed with custom button', async () => {
    render(
      <Dialog
        trigger={<button>CLick me</button>}
        title="My dialog"
        body={<div>My content</div>}
        closeButton={(func) => (
          <button data-testid="dialog-dismiss-custom" onClick={func}>
            CLick me
          </button>
        )}
        showCloseButton
      />,
    )
    const buttonTrigger = await screen.findByTestId('dialog-trigger')
    expect(buttonTrigger).toBeInTheDocument()
    fireEvent.click(buttonTrigger)
    const buttonDismiss = await screen.findByTestId('dialog-dismiss-custom')
    expect(buttonDismiss).toBeInTheDocument()
    fireEvent.click(buttonDismiss)
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(buttonDismiss).not.toBeInTheDocument()
  })
})
