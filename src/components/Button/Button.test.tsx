import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IconName } from 'src/components'

import { Button, ButtonEmphasis, ButtonSize } from '.'

global.alert = jest.fn()

describe('Button component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Button onClick={() => alert('click')}>CTA</Button>)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly secondary', async () => {
    const { container } = render(
      <Button emphasis={ButtonEmphasis.Secondary} onClick={() => alert('click')}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly tertiary', async () => {
    const { container } = render(
      <Button emphasis={ButtonEmphasis.Tertiary} onClick={() => alert('click')}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly size xs', async () => {
    const { container } = render(
      <Button size={ButtonSize.xs} onClick={() => alert('click')}>
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

  it('Renders correctly size xl', async () => {
    const { container } = render(
      <Button size={ButtonSize.xl} onClick={() => alert('click')}>
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

  it('renders center', async () => {
    const { container } = render(
      <Button className="anotherClass" onClick={() => alert('click')} center>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders disabled', async () => {
    const { container } = render(
      <Button className="anotherClass" onClick={() => alert('click')} disabled>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with arrow', async () => {
    const { container } = render(
      <Button className="anotherClass" onClick={() => alert('click')} hasArrow>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with arrow xs', async () => {
    const { container } = render(
      <Button size={ButtonSize.xs} className="anotherClass" onClick={() => alert('click')} hasArrow>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with arrow sm', async () => {
    const { container } = render(
      <Button size={ButtonSize.sm} className="anotherClass" onClick={() => alert('click')} hasArrow>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with arrow md', async () => {
    const { container } = render(
      <Button size={ButtonSize.md} className="anotherClass" onClick={() => alert('click')} hasArrow>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with arrow lg', async () => {
    const { container } = render(
      <Button size={ButtonSize.lg} className="anotherClass" onClick={() => alert('click')} hasArrow>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with arrow xl', async () => {
    const { container } = render(
      <Button size={ButtonSize.xl} className="anotherClass" onClick={() => alert('click')} hasArrow>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with icon', async () => {
    const { container } = render(
      <Button className="anotherClass" onClick={() => alert('click')} icon={IconName.Account}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders with icon small', async () => {
    const { container } = render(
      <Button size={ButtonSize.xs} className="anotherClass" onClick={() => alert('click')} icon={IconName.Account}>
        CTA
      </Button>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('renders fullWidth', async () => {
    const { container } = render(
      <Button className="anotherClass" onClick={() => alert('click')} fullWidth>
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
