import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { OrderMock } from 'src/_mocks'
import { i18n } from 'src/config'

import { OrderTile } from '.'

const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

describe('Order Tile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }} mocks={[]} addTypename={false}>
        <I18nextProvider i18n={i18n} data-testId="">
          <OrderTile
            productId={'111111'}
            node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node}
            showRate
          />
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for small variant', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }} mocks={[]} addTypename={false}>
        <I18nextProvider i18n={i18n} data-testId="">
          <OrderTile
            productId={'111111'}
            node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node}
            showRate
            isSmall
          />
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly without rate button', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n} data-testId="">
        <OrderTile productId={'111111'} node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly without price', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n} data-testId="">
        <OrderTile
          productId={'111111'}
          node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node}
          showPrice={false}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for multi item', async () => {
    const tile = OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node
    tile.quantity = 2
    const { container } = render(
      <I18nextProvider i18n={i18n} data-testId="">
        <OrderTile productId={'111111'} node={tile} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('handles click on image', async () => {
    render(<OrderTile productId={'111111'} node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node} />)
    const image = await screen.findByTestId('image')
    image.click()
    expect(mockUseNavigate).toHaveBeenCalledTimes(1)
  })

  it('handles click on tile', async () => {
    render(<OrderTile productId={'111111'} node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node} />)
    const tile = await screen.findByTestId('tile')
    tile.click()
    expect(mockUseNavigate).toHaveBeenCalledTimes(1)
  })
})
