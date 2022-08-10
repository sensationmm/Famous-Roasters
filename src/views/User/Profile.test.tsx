import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import ReactRouterDom from 'react-router-dom'
import { OrdersMock, UserProfileMock } from 'src/_mocks'
import { i18n } from 'src/config'
import { awsconfig } from 'src/config/cognito/auth.hook'

import { Profile } from '.'

const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useHref: jest.fn,
  Link: (props: any) => {
    return (
      <a className={props.class} href={props.to}>
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

const fetchSpy = jest.spyOn(global, 'fetch')

Amplify.configure(awsconfig)

jest.mock('src/components/Carousel/Carousel', () => ({
  Carousel: () => {
    return <div>Carousel here</div>
  },
}))

describe('Profile view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[UserProfileMock, OrdersMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <ReactRouterDom.MemoryRouter initialEntries={['/profile']}>
            <Profile />
          </ReactRouterDom.MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it.each(['orders', 'account', 'taste-profile', 'my-coffee'])('handles click on profile %s', async (btn) => {
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
    const button = await screen.findByTestId(`button-${btn}`)
    button.click()
    expect(mockUseNavigate).toHaveBeenCalledWith(`/profile/${btn}`)
  })

  it.each(['vendor=Nomad', 'origin=BU'])('handles click on catalogue %s', async (btn) => {
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
    const button = await screen.findByTestId(`button-${btn}`)
    button.click()
    expect(mockUseNavigate).toHaveBeenCalledWith(`/catalogue?${btn}`)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
