import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { ProductMockData } from 'src/_mocks'

import { Carousel } from '.'

describe('Carousel component', () => {
  it('Renders correctly', async () => {
    render(<Carousel images={ProductMockData.images.nodes} />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
  })

  it('The user can click on the thumbnails', async () => {
    render(<Carousel images={ProductMockData.images.nodes} />)
    const thumbnail0 = await screen.findByTestId('carousel-image-tn-0')
    const thumbnail1 = await screen.findByTestId('carousel-image-tn-0')
    expect(thumbnail0).toBeInTheDocument()
    expect(thumbnail1).toBeInTheDocument()
    fireEvent.click(thumbnail1)
    fireEvent.click(thumbnail0)
  })
})
