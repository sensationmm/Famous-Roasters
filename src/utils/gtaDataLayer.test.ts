import { dataLayerEvent } from './'

const mockDataLayer = jest.fn()
window.dataLayer = []
window.dataLayer.push = mockDataLayer

describe('GTA DataLayer utils', () => {
  const ecommerceObject = {
    impressions: [
      {
        name: 'Triblend Android T-Shirt', // Name or ID is required.
        id: '12345',
        price: '15.25',
        brand: 'Google',
        category: 'Apparel',
        variant: 'Gray',
        list: 'Search Results',
        position: 1,
      },
    ],
  }
  it('executes successfully', () => {
    dataLayerEvent(ecommerceObject)
    expect(mockDataLayer).toHaveBeenCalledWith({ ecommerce: ecommerceObject })
  })
  it('executes successfully with custom event', () => {
    dataLayerEvent(ecommerceObject, 'addToCart')
    expect(mockDataLayer).toHaveBeenCalledWith({ event: 'addToCart', ecommerce: ecommerceObject })
  })
})
