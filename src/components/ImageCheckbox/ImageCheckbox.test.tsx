import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { ImageCheckbox } from '.'

global.alert = jest.fn()

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

  it('The user can toggle the state by clicking', async () => {
    render(
      <ImageCheckbox
        name="test"
        imageSrc="https://cdn.shopify.com/s/files/1/0632/7251/7848/products/19grams_Wild_At_Heart_copy.webp?v=1652256584"
        text="Dieser Kaffee ist lekka"
        selectedText="Sehr lekka"
        toggleSelected={() => alert('works')}
      />,
    )
    const imageCheckbox = await screen.findByTestId('image-checkbox')
    expect(imageCheckbox).toBeInTheDocument()
    fireEvent.click(imageCheckbox)
    fireEvent.click(imageCheckbox)
  })
})
