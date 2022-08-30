import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import ReactRouterDom, { LinkProps } from 'react-router-dom'
import {
  CatalogueMockAccessoriesYouMightLike as mockCatalogueAccessories,
  OrderMock,
  OrdersMock,
  UserProfileMock,
} from 'src/_mocks'
import { i18n } from 'src/config'
import { awsconfig } from 'src/config/cognito/auth.hook'

import { Profile } from '.'

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
    currentAuthenticatedUser: () =>
      Promise.resolve({ attributes: { 'custom:first_name': 'asdd', 'custom:aroma': null } }),
    currentSession: () => Promise.resolve(),
  },
}))

const fetchSpy = jest.spyOn(global, 'fetch')

Amplify.configure(awsconfig)

jest.mock('src/components/Carousel/Carousel', () => ({
  Carousel: () => {
    return <div>Carousel here</div>
  },
}))

jest.mock('src/config', () => ({
  ...jest.requireActual('src/config'),
  storeFrontClient: () => ({
    query: () => Promise.resolve({ data: mockCatalogueAccessories.result.data, loading: false, error: null }),
  }),
}))

describe('Profile view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock, OrdersMock, OrderMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile']}>
            <Profile />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('handles click on profile taste-profile', async () => {
    jest.mock('@apollo/client/react/hooks', () => ({
      ...jest.requireActual('@apollo/client/react/hooks'),
      useLazyQuery: () => [{}],
    }))
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock, OrdersMock]}
        addTypename={false}
      >
        <Profile />
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const button = await screen.findByTestId(`button-taste-profile`)
    button.click()
    expect(mockUseNavigate).toHaveBeenCalledWith(`/taste-finder?step=bearbeiten`)
  })

  it.each(['vendor=Nomad', 'origin=ET'])('handles click on catalogue %s', async (btn) => {
    jest.mock('@apollo/client/react/hooks', () => ({
      ...jest.requireActual('@apollo/client/react/hooks'),
      useLazyQuery: () => [{}],
    }))
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock, OrdersMock]}
        addTypename={false}
      >
        <Profile />
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const button = await screen.findByTestId(`button-${btn}`)
    button.click()
    expect(mockUseNavigate).toHaveBeenCalledWith(`/catalogue?${btn}`)
  })

  it('handles click on blog button', async () => {
    jest.mock('@apollo/client/react/hooks', () => ({
      ...jest.requireActual('@apollo/client/react/hooks'),
      useLazyQuery: () => [{}],
    }))
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock, OrdersMock]}
        addTypename={false}
      >
        <Profile />
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const button = await screen.findByTestId(`button-blog`)
    button.click()
    expect(mockUseNavigate).toHaveBeenCalledWith(`${process.env.REACT_APP_DOMAIN_BLOG}/de/Zubereitungstipps`)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
