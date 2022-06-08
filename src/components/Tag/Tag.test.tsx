import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Tag, TagType } from '.'

describe('Tag component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Tag value="sweet" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value experimentell & komplex', async () => {
    const { container } = render(<Tag type={TagType.Aroma} value="experimentell & komplex" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value fruchtig & lebhaft', async () => {
    const { container } = render(<Tag type={TagType.Aroma} value="fruchtig & lebhaft" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value floral & leicht', async () => {
    const { container } = render(<Tag type={TagType.Aroma} value="floral & leicht" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value nussig & schokoladig', async () => {
    const { container } = render(<Tag type={TagType.Aroma} value="nussig & schokoladig" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with value würzig & kräftig', async () => {
    const { container } = render(<Tag type={TagType.Aroma} value="würzig & kräftig" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for aroma tag with a different value', async () => {
    const { container } = render(<Tag type={TagType.Aroma} value="something else" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for type taste finder', async () => {
    const { container } = render(<Tag type={TagType.TasteFinder} value="100% matching" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
