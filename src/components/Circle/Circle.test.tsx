import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Circle, CircleType } from '.'

describe('Circle component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Circle value="sweet" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value experimentell & komplex', async () => {
    const { container } = render(<Circle type={CircleType.Aroma} value="experimentell & komplex" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value fruchtig & lebhaft', async () => {
    const { container } = render(<Circle type={CircleType.Aroma} value="fruchtig & lebhaft" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value floral & leicht', async () => {
    const { container } = render(<Circle type={CircleType.Aroma} value="floral & leicht" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value nussig & schokoladig', async () => {
    const { container } = render(<Circle type={CircleType.Aroma} value="nussig & schokoladig" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value würzig & kräftig', async () => {
    const { container } = render(<Circle type={CircleType.Aroma} value="würzig & kräftig" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with a different value', async () => {
    const { container } = render(<Circle type={CircleType.Aroma} value="something else" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
