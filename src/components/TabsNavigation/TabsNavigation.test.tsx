import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'

import { i18n } from '../../config'
import { TabsNavigation } from './TabsNavigation'

global.alert = jest.fn()

const tabsData = [
  { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
  { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
]

describe('Tabs Navigation component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TabsNavigation tabsData={tabsData} setParentActiveTab={(key) => alert(key)} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can navigate across tabs', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TabsNavigation tabsData={tabsData} setParentActiveTab={(key) => alert(key)} />
      </I18nextProvider>,
    )
    const tabForYou = await screen.findByTestId('tab-forYou')
    const tabDiscover = await screen.findByTestId('tab-discover')
    expect(tabForYou).toBeInTheDocument()
    expect(tabDiscover).toBeInTheDocument()
    fireEvent.click(tabForYou)
    fireEvent.click(tabDiscover)
  })
})
