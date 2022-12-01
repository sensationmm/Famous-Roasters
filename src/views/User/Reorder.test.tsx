import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import ReactRouterDom, { LinkProps } from 'react-router-dom'
import { OrderMock, OrdersMock } from 'src/_mocks'
import { CartContext } from 'src/components'
import { i18n } from 'src/config'

import { Reorder } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* eslint-disable  @typescript-eslint/no-explicit-any */
const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useHref: jest.fn,
  Link: (props: LinkProps) => {
    return (
      <a className={props.className} href={props.to as string}>
        {props.children}
      </a>
    )
  },
}))

describe('Reorder button', () => {
  it('renders correctly', async () => {
    const { container } = render(
      <CartContext.Provider value={{ cartId: undefined, cartSize: 1 }}>
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/account']}>
            <Reorder order={OrderMock.result.data.orders.edges[0]} loading={false} setLoading={jest.fn} />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </CartContext.Provider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('handles reorder', async () => {
    const addToCartMock = jest.fn()
    render(
      <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1, addToCart: addToCartMock }}>
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Reorder order={OrdersMock.result.data.orders.edges[1]} loading={false} setLoading={jest.fn} />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </CartContext.Provider>,
    )
    const button = await screen.queryAllByTestId('reorder-btn')[0]
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))

    expect(addToCartMock).toHaveBeenCalledTimes(
      OrdersMock.result.data.orders.edges[1].node.lineItems.edges.filter(
        (edge) => edge.node.variant.inventoryQuantity > 0,
      ).length,
    )
    expect(mockUseNavigate).toHaveBeenCalledWith('/cart')
  })

  it('Handles reorder with missing items', async () => {
    const addToCartMock = jest.fn()
    render(
      <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1, addToCart: addToCartMock }}>
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Reorder order={OrdersMock.result.data.orders.edges[0]} loading={false} setLoading={jest.fn} />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </CartContext.Provider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    const button = await screen.queryAllByTestId('reorder-btn')[0]
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))

    expect(addToCartMock).toHaveBeenCalledTimes(
      OrdersMock.result.data.orders.edges[0].node.lineItems.edges.filter(
        (edge) => edge.node.variant.inventoryQuantity > 0,
      ).length,
    )
    expect(mockUseNavigate).toHaveBeenCalledWith('/cart?missingItems=true')
  })

  it('handles mising addToCart', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ReactRouterDom.MemoryRouter initialEntries={['/account']}>
          <Reorder order={OrderMock.result.data.orders.edges[0]} loading={false} setLoading={jest.fn} />
        </ReactRouterDom.MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
