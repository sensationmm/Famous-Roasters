import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { IconName } from 'src/components/Icon'

import { Input } from '.'
import { Mode } from './Input'

describe('Badge component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Input labelText="Name" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders dark mode correctly', async () => {
    const { container } = render(<Input labelText="Name" mode={Mode.dark} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders small version correctly', async () => {
    const { container } = render(<Input labelText="Name" isSmall={true} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders icon version correctly', async () => {
    const { container } = render(<Input labelText="Name" icon={IconName.Account} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
