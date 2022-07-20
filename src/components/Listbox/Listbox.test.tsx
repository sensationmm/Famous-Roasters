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

  it('Renders correctly with none item', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox items={items} translationPrefix="pages.catalogue.filters.sort" hasNoneItem={true} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with no translated values', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox
          items={items}
          translationPrefix="pages.catalogue.filters.sort"
          value={[{ name: 'option1' }]}
          hasTranslatedValues={false}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with initial value', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox items={items} value={[items[1]]} translationPrefix="pages.catalogue.filters.sort" />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly multiple', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox items={items} value={[items[1]]} multiple={true} translationPrefix="pages.catalogue.filters.sort" />
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
    const button = await screen.findByTestId('button-listbox')
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

  it('Every option can be clicked on multiple', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Listbox
          items={items}
          multiple={true}
          hasNoneItem={true}
          hasTranslatedValues={false}
          onChange={(v) => alert(v)}
          translationPrefix="pages.catalogue.filters.sort"
        />
      </I18nextProvider>,
    )
    const button = await screen.findByTestId('button-listbox')
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
  })

  it('An option can be removed on multiple', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Listbox
          items={items}
          multiple={true}
          hasNoneItem={false}
          value={[{ name: 'option1' }]}
          hasTranslatedValues={false}
          onChange={(v) => alert(v)}
          translationPrefix="pages.catalogue.filters.sort"
        />
      </I18nextProvider>,
    )
    const button = await screen.findByTestId('button-listbox')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      const option0 = screen.getByTestId('option-0')
      expect(option0).toBeInTheDocument()
      fireEvent.click(option0)
    })
  })

  it('Renders with spacing items correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox items={items} translationPrefix="pages.catalogue.filters.sort" hasSpacerAfterItem={['option-2']} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders with disabled items correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox
          items={[{ name: 'option1', disabled: true }, { name: 'option2' }, { name: 'option3' }]}
          translationPrefix="pages.catalogue.filters.sort"
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders with selected disabled items correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Listbox
          items={[{ name: 'option1', disabled: true }, { name: 'option2' }, { name: 'option3' }]}
          value={[{ name: 'option1', disabled: true }]}
          translationPrefix="pages.catalogue.filters.sort"
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
