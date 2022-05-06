import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { TasteProfile } from '.'

describe('TasteProfile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<TasteProfile sweetness={2} body={3} bitterness={1} acidity={2} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
