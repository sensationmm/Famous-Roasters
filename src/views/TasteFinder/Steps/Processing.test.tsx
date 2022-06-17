import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { TasteFinderMockEspresso, TasteFinderMockFilter } from 'src/_mocks'
import { i18n } from 'src/config'

import { Processing } from '.'

global.alert = jest.fn()

describe('Sweetness partial view', () => {
  it('Renders correctly for expresso', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Processing data={TasteFinderMockEspresso} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for filter', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Processing data={TasteFinderMockFilter} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
