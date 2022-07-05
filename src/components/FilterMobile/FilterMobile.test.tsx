import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'

import { FilterMobile } from '.'

global.alert = jest.fn()

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = intersectionObserverMock

describe('Filter Mobile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <div className="w-80 h-48">
          <FilterMobile
            filter={{
              key: 'vendor',
              filterType: 'enum',
              filterValues: ['Roaster A', 'Roaster B'],
              isOpen: true,
            }}
            show={true}
            back={() => alert('back!')}
            update={() => null}
          />
        </div>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can remove and apply', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FilterMobile
            filter={{ key: 'filter-key', isOpen: true }}
            show={true}
            back={() => alert('back!')}
            update={() => alert('update!')}
          />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const buttonRemoveFilter = await screen.findByTestId('button-filter-mobile-remove')
    expect(buttonRemoveFilter).toBeInTheDocument()
    fireEvent.click(buttonRemoveFilter)
    const buttonApplyFilter = await screen.findByTestId('button-filter-mobile-apply')
    expect(buttonApplyFilter).toBeInTheDocument()
    fireEvent.click(buttonApplyFilter)
  })

  it('Can select, unselect and remove filter options', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FilterMobile
            filter={{ key: 'filter-key', isOpen: true, filterType: 'enum', filterValues: ['1', '2'] }}
            show={true}
            back={() => alert('back!')}
            update={() => alert('update!')}
          />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const buttonFilterOption1 = await screen.findByTestId('button-filter-mobile-filter-key-option-0')
    expect(buttonFilterOption1).toBeInTheDocument()
    fireEvent.click(buttonFilterOption1)
    const buttonFilterOption2 = await screen.findByTestId('button-filter-mobile-filter-key-option-1')
    expect(buttonFilterOption2).toBeInTheDocument()
    fireEvent.click(buttonFilterOption2)
    fireEvent.click(buttonFilterOption1)
    const buttonRemoveFilter = await screen.findByTestId('button-filter-mobile-remove')
    expect(buttonRemoveFilter).toBeInTheDocument()
    fireEvent.click(buttonRemoveFilter)
    const buttonFilterClose = await screen.findByTestId('button-filter-mobile-close')
    expect(buttonFilterClose).toBeInTheDocument()
    fireEvent.click(buttonFilterClose)
  })

  it('show TagSwatch if aroma', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FilterMobile
            filter={{ key: 'aroma', isOpen: true, filterType: 'enum', filterValues: ['1', '2'] }}
            show={true}
            back={() => alert('back!')}
            update={() => alert('update!')}
          />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const TagSwatch = await screen.findAllByTestId('filter-option-tagSwatch')
    expect(TagSwatch).toHaveLength(2)
  })

  it('show Tag if aroma and selected', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FilterMobile
            filter={{
              key: 'aroma',
              isOpen: true,
              filterType: 'enum',
              filterValues: ['1', '2'],
              filterValuesSelected: ['1'],
            }}
            show={true}
            back={() => alert('back!')}
            update={() => alert('update!')}
          />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const Tag = await screen.findByTestId('filter-selected-tag')
    expect(Tag).toBeInTheDocument()
  })

  it('renders spacer', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FilterMobile
            filter={{ key: 'filter-key', isOpen: true, filterType: 'enum', filterValues: ['1', '2'] }}
            show={true}
            back={() => alert('back!')}
            update={() => alert('update!')}
            hasSpacerAfterItem={['1']}
          />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const Spacer = await screen.findByTestId('filter-option-spacer')
    expect(Spacer).toBeInTheDocument()
  })

  it('Can be closed', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FilterMobile
            filter={{ key: 'filter-key', isOpen: true }}
            show={true}
            back={() => alert('back!')}
            update={() => alert('update!')}
          />
        </MemoryRouter>
      </I18nextProvider>,
    )
    fireEvent.keyDown(window, { key: 'Escape', code: '27' })
  })
})
