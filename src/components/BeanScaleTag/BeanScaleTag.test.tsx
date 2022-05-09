import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { BeanScaleTag } from '.'

describe('BeanScaleTag component', () => {
  it('Renders correctly for low scale', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <BeanScaleTag value={2} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for mid scale', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <BeanScaleTag value={6} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for high scale', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <BeanScaleTag value={10} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
