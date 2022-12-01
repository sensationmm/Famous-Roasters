import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { Notification } from '.'

describe('Notification component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Notification heading="Title" body="Content" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly in fail state', async () => {
    const { container } = render(<Notification heading="Title" body="Content" status="fail" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can be dismissed', async () => {
    render(<Notification heading="Title" body="Content" />)
    await act(async () => {
      const buttonDismiss = await screen.findByTestId('notification-dismiss')
      expect(buttonDismiss).toBeInTheDocument()
      fireEvent.click(buttonDismiss)
    })
  })
})
