import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { StickyBottomNavigation } from '.'

global.alert = jest.fn()

describe('StickyBottomNavigation component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <StickyBottomNavigation />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with optional props', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <StickyBottomNavigation percentage={50} isNextDisabled={true} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can click on prev', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <StickyBottomNavigation percentage={50} isNextDisabled={true} prevClicked={() => alert('prev!')} />
      </I18nextProvider>,
    )
    const prevButton = await screen.findByTestId('prevButton')
    expect(prevButton).toBeInTheDocument()
    fireEvent.click(prevButton)
  })

  it('The user can click on next if not disabled', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <StickyBottomNavigation percentage={50} isNextDisabled={false} nextClicked={() => alert('next!')} />
      </I18nextProvider>,
    )
    const nextButton = await screen.findByTestId('nextButton')
    expect(nextButton).toBeInTheDocument()
    fireEvent.click(nextButton)
  })
})
