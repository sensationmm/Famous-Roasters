import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Loader } from '.'

describe('Loader component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Loader />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly in small', async () => {
    const { container } = render(<Loader isSmall />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with center false', async () => {
    const { container } = render(<Loader center={false} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
