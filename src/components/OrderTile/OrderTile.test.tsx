import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import ReactRouterDom from 'react-router-dom'
import { OrderMock } from 'src/_mocks'
import { i18n } from 'src/config'

import { OrderTile } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn,
}))

describe('Order Tile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n} data-testId="">
        <OrderTile productId={'111111'} node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('handles click', async () => {
    const mockUseNavigate = jest.spyOn(ReactRouterDom, 'useNavigate')
    render(<OrderTile productId={'111111'} node={OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node} />)
    const tile = await screen.findByTestId('wrapper')
    tile.click()
    expect(mockUseNavigate).toHaveBeenCalledTimes(1)
  })
})
