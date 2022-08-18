import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { InfoBox } from '.'

describe('InfoBox component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<InfoBox title="Title here" text="Some information goes here" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly without text', async () => {
    const { container } = render(<InfoBox title="Title here" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
