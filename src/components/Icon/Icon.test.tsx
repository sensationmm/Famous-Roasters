import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Icon, IconName, IconSize } from '.'

describe('Icon component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Icon name={IconName.BeanFill} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly extra small icon', async () => {
    const { container } = render(<Icon name={IconName.BeanFill} size={IconSize.xs} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly small icon', async () => {
    const { container } = render(<Icon name={IconName.BeanFill} size={IconSize.sm} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly base icon', async () => {
    const { container } = render(<Icon name={IconName.BeanFill} size={IconSize.pb} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly medium icon', async () => {
    const { container } = render(<Icon name={IconName.BeanFill} size={IconSize.md} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly large icon', async () => {
    const { container } = render(<Icon name={IconName.BeanFill} size={IconSize.lg} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly extra large icon', async () => {
    const { container } = render(<Icon name={IconName.Variety} size={IconSize.xl} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
