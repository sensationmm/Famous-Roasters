import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { Button, ButtonColor, ButtonEmphasis, ButtonSize } from '.'

global.alert = jest.fn()

describe('Button component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Button onClick={() => alert('click')}>CTA</Button>)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly secondary', async () => {
    const { container } = render(
      <Button emphasis={ButtonEmphasis.Contained} color={ButtonColor.Secondary} onClick={() => alert('click')}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly size sm', async () => {
    const { container } = render(
      <Button size={ButtonSize.sm} onClick={() => alert('click')}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly size lg', async () => {
    const { container } = render(
      <Button size={ButtonSize.lg} onClick={() => alert('click')}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly outlined', async () => {
    const { container } = render(
      <Button emphasis={ButtonEmphasis.Outlined} onClick={() => alert('click')}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly text', async () => {
    const { container } = render(
      <Button emphasis={ButtonEmphasis.Text} onClick={() => alert('click')}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with extra classes', async () => {
    const { container } = render(
      <Button className="anotherClass" onClick={() => alert('click')}>
        CTA
      </Button>,
    )
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
