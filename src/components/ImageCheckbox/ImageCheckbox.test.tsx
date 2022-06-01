import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { ImageCheckbox } from '.'

describe('ImageCheckbox component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <ImageCheckbox
        name="test"
        imageSrc="https://cdn.shopify.com/s/files/1/0632/7251/7848/products/19grams_Wild_At_Heart_copy.webp?v=1652256584"
        text="Dieser Kaffee ist lekka"
      />,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
