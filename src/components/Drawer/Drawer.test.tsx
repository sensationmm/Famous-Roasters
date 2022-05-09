import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { Drawer } from '.'

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = intersectionObserverMock

describe('Drawer component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Drawer trigger={<button>CLick me</button>} title="My drawer" body={<div>My content</div>} />,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can be triggered and dismissed', async () => {
    render(<Drawer trigger={<button>CLick me</button>} title="My drawer" body={<div>My content</div>} />)
    const buttonTrigger = await screen.findByTestId('drawer-trigger')
    expect(buttonTrigger).toBeInTheDocument()
    fireEvent.click(buttonTrigger)
    const buttonDismiss = await screen.findByTestId('drawer-dismiss')
    expect(buttonDismiss).toBeInTheDocument()
    fireEvent.click(buttonDismiss)
  })
})
