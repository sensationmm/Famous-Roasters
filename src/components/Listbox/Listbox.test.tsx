import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { Listbox, ListBoxItem } from '.'

const items: ListBoxItem[] = [{ name: 'option1' }, { name: 'option2' }, { name: 'option3' }]

global.alert = jest.fn()

describe('Listbox component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox items={items} translationPrefix="pages.catalogue.filters.sort" />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with initial value', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox items={items} value={items[1]} translationPrefix="pages.catalogue.filters.sort" />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Every option can be clicked', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Listbox
          items={items}
          hasNoneItem={true}
          onChange={(v) => alert(v)}
          translationPrefix="pages.catalogue.filters.sort"
        />
      </I18nextProvider>,
    )
    const button = await screen.findByTestId('button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      const option = screen.getByTestId('option-0')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    fireEvent.click(button)
    await waitFor(() => {
      const option = screen.getByTestId('option-1')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    fireEvent.click(button)
    await waitFor(() => {
      const option = screen.getByTestId('option-2')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    fireEvent.click(button)
    await waitFor(() => {
      const option = screen.getByTestId('option-3')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
  })
})
