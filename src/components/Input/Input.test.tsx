import { render, waitFor } from '@testing-library/react'
import React from 'react'

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
})
