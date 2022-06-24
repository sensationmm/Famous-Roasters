import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import {
  TasteFinderMockEspresso,
  TasteFinderMockFilter,
  TasteFinderMockQueryEspresso,
  TasteFinderMockQueryFilter,
} from 'src/_mocks'
import { i18n } from 'src/config'

import { Processing } from '.'

global.alert = jest.fn()
jest.mock('lottie-react')

describe('Processing partial view', () => {
  it('Renders correctly for expresso', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[TasteFinderMockQueryEspresso]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <Processing currentData={TasteFinderMockEspresso} updateData={() => null} />
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for filter', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[TasteFinderMockQueryFilter]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <Processing currentData={TasteFinderMockFilter} updateData={() => null} />
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
