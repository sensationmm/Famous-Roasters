import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { Processing } from '.'

global.alert = jest.fn()

describe('Sweetness partial view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Processing
          data={[
            {
              name: 'name',
              value: 'Juan',
            },
            {
              name: 'bitterness',
              value: '3',
            },
            {
              name: 'sweetness',
              value: '3',
            },
            {
              name: 'acidity',
              value: '3',
            },
            {
              name: 'body',
              value: '3',
            },
            {
              name: 'grindType',
              value: 'espresso',
            },
            {
              name: 'adventurous',
              value: 'conservative',
            },
          ]}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
