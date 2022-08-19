import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { I18nextProvider } from 'react-i18next'
import { OrderMock as MockOrder } from 'src/_mocks'
import { i18n } from 'src/config'
import { getSimplifiedProductId } from 'src/utils'

import { RateYourCoffee } from '.'

// const mockQuery = jest.fn().mockImplementation(() => Promise.resolve({ data: {} }))
const mockQuery = jest.fn()

// act(() => {
jest.mock('src/config', () => ({
  ...jest.requireActual('src/config'),
  storeFrontClient: () => ({
    query: () =>
      Promise.resolve({
        data: { product: { id: MockOrder.result.data.orders.edges[0].node.lineItems.edges[0].node.product.id } },
      }),
  }),
}))
// })

jest.mock('@apollo/client', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@apollo/client'),
    // useLazyQuery: jest.fn().mockReturnValue([jest.fn().mockImplementation((args: any) => mockQuery(args))]),
    useLazyQuery: () => [mockQuery.mockImplementation(() => Promise.resolve({ data: {} }))],
  }
})

describe('RateYourCoffee component', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n} data-testId="">
        <RateYourCoffee
          productOrderTile={{
            productId: MockOrder.result.data.orders.edges[0].node.lineItems.edges[0].node.product.id,
            node: MockOrder.result.data.orders.edges[0].node.lineItems.edges[0].node,
          }}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('can submit rating', async () => {
    const productId = MockOrder.result.data.orders.edges[0].node.lineItems.edges[0].node.product.id
    render(
      <I18nextProvider i18n={i18n} data-testId="">
        <RateYourCoffee
          productOrderTile={{
            productId: productId,
            node: MockOrder.result.data.orders.edges[0].node.lineItems.edges[0].node,
          }}
        />
      </I18nextProvider>,
    )
    await act(async () => {
      const trigger = await screen.findByTestId('dialog-trigger')
      expect(trigger).toBeInTheDocument()
      fireEvent.click(trigger)
    })
    await act(async () => {
      const rate3 = await screen.findByTestId('rating-3')
      expect(rate3).toBeInTheDocument()
      fireEvent.click(rate3)
    })
    await act(async () => {
      const submit = await screen.findByTestId('btn-submit-rating')
      expect(submit).toBeInTheDocument()
      fireEvent.click(submit)
    })
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(mockQuery).toHaveBeenCalledWith({
      variables: {
        productID: getSimplifiedProductId(productId),
        rating: 3,
        comment: '',
      },
    })
    await act(async () => {
      const closeBtn = await screen.findByTestId('custom-close-btn')
      expect(closeBtn).toBeInTheDocument()
      fireEvent.click(closeBtn)
    })
  })

  it('can submit rating and comment', async () => {
    const productId = MockOrder.result.data.orders.edges[0].node.lineItems.edges[0].node.product.id
    render(
      <I18nextProvider i18n={i18n} data-testId="">
        <RateYourCoffee
          productOrderTile={{
            productId: productId,
            node: MockOrder.result.data.orders.edges[0].node.lineItems.edges[0].node,
          }}
        />
      </I18nextProvider>,
    )
    await act(async () => {
      const trigger = await screen.findByTestId('dialog-trigger')
      expect(trigger).toBeInTheDocument()
      fireEvent.click(trigger)
    })
    await act(async () => {
      const rate3 = await screen.findByTestId('rating-3')
      expect(rate3).toBeInTheDocument()
      fireEvent.click(rate3)
    })
    await act(async () => {
      const comment = await screen.findByTestId('component-textarea')
      expect(comment).toBeInTheDocument()
      fireEvent.change(comment, {
        target: { value: 'comment goes here' },
      })
    })
    await act(async () => {
      const submit = await screen.findByTestId('btn-submit-rating')
      expect(submit).toBeInTheDocument()
      fireEvent.click(submit)
    })
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(mockQuery).toHaveBeenCalledWith({
      variables: {
        productID: getSimplifiedProductId(productId),
        rating: 3,
        comment: 'comment goes here',
      },
    })
  })

  afterEach(() => {
    // jest.resetAllMocks()
  })
})
