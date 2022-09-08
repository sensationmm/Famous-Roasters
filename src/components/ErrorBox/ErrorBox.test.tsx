import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { Typography } from 'src/components'

import { ErrorBox } from '.'

describe('ErrorBox component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <ErrorBox>
        <Typography>Text goes here</Typography>
      </ErrorBox>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with className override', async () => {
    const { container } = render(
      <ErrorBox className="text-bold">
        <Typography>Text goes here</Typography>
      </ErrorBox>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
