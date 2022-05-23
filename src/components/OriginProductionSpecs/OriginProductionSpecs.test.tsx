import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { OriginProductionSpecs } from '.'

describe('OriginProductionSpecs component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <OriginProductionSpecs
          flavourNotes="Mango, Passionfruit, Honey"
          origin="BR,CO"
          altitude="500m"
          processing="Gewaschen"
          producer="Famous Roasters"
          variety="Ethiopian Heirloom"
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
