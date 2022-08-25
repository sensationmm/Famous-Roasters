import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { I18nextProvider } from 'react-i18next'
import ReactRouterDom, { LinkProps } from 'react-router-dom'
import { OrdersMock, UserProfileMock } from 'src/_mocks'
import { i18n } from 'src/config'
import { awsconfig } from 'src/config/cognito/auth.hook'

import { Orders } from '.'

const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useHref: jest.fn,
  Link: (props: LinkProps) => {
    return (
      <a className={props.className} href={props.to as string}>
        {props.children}
      </a>
    )
  },
}))

jest.mock('src/config/cognito', () => ({
  ...jest.requireActual('src/config/cognito'),
  useAuth: () => [{ isValid: true }, jest.fn],
}))

jest.mock('aws-amplify', () => ({
  ...jest.requireActual('aws-amplify'),
  __esModule: true,
  Auth: {
    ...jest.requireActual('aws-amplify').Auth,
    currentAuthenticatedUser: () => Promise.resolve({ attributes: { 'custom:first_name': 'asdd' } }),
    currentSession: () => Promise.resolve(),
  },
}))

// const fetchSpy = jest.spyOn(global, 'fetch')

Amplify.configure(awsconfig)

// jest.mock('src/config', () => ({
//   ...jest.requireActual('src/config'),
//   storeFrontClient: () => ({
//     query: () => Promise.resolve({ data: mockCatalogueAccessories.result.data, loading: false, error: null }),
//   }),
// }))

describe('Orders view', () => {
  it('Renders correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: OrdersMock.result.data }),
      }),
    ) as jest.Mock

    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock, OrdersMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Orders />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('Renders correctly with no orders', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { orders: { edges: [] } } }),
      }),
    ) as jest.Mock
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Orders />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('sets filter value', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: OrdersMock.result.data }),
      }),
    ) as jest.Mock

    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Orders />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    await act(async () => {
      const input = await screen.findByTestId('filter-ids')
      expect(input).toBeInTheDocument()
      fireEvent.change(input, { target: { value: '8953' } })
    })
    expect(container).toMatchSnapshot()
  })

  it('sets sort oldest first', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: OrdersMock.result.data }),
      }),
    ) as jest.Mock

    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Orders />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )

    const button = await screen.findByTestId('button-listbox')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      const option = screen.getByTestId('option-0')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('sets sort newest first', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: OrdersMock.result.data }),
      }),
    ) as jest.Mock

    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Orders />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )

    const button = await screen.findByTestId('button-listbox')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      const option = screen.getByTestId('option-1')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with no orders and filter set', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { orders: { edges: [] } } }),
      }),
    ) as jest.Mock
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Orders />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    await act(async () => {
      const input = await screen.findByTestId('filter-ids')
      fireEvent.change(input, { target: { value: '12345' } })
    })
    expect(container).toMatchSnapshot()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('Handles error call', async () => {
    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile/orders']}>
            <Orders />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
