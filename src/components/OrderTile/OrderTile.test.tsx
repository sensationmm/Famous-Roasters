import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { OrderMock } from 'src/_mocks'
import { i18n } from 'src/config'

import { OrderTile } from '.'

describe('Product Tile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <OrderTile node={OrderMock.result.data.order.lineItems.edges[0].node} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
