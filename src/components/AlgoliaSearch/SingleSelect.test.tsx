import { render, waitFor } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import { i18n } from 'src/config'

import SingleSelect from './SingleSelect'

const items = [
  { label: 'Alle Kaffees', value: '' },
  { label: 'Espresso', value: 'espresso' },
  { label: 'Filter', value: 'filter' },
  { label: 'Omni', value: 'omni' },
]

describe('SingleSelect component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <SingleSelect items={items} value={items[0]} onChange={jest.fn()} />
        </I18nextProvider>
      </Router>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
