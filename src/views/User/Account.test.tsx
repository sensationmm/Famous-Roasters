import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import ReactRouterDom, { LinkProps } from 'react-router-dom'
import { i18n } from 'src/config'
import * as cognito from 'src/config/cognito'
import { awsconfig } from 'src/config/cognito/auth.hook'

import { Account } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockCognito = cognito as { useAuth: () => [{ isValid: boolean }, () => void] }

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
  __esModule: true,
  ...jest.requireActual('src/config/cognito'),
  useAuth: () => [{ isValid: true }, jest.fn],
}))

const mockSignOut = jest.fn().mockImplementation(() => {
  return true
})
jest.mock('aws-amplify', () => ({
  ...jest.requireActual('aws-amplify'),
  __esModule: true,
  Auth: {
    ...jest.requireActual('aws-amplify').Auth,
    currentAuthenticatedUser: () => Promise.resolve({ attributes: { 'custom:first_name': 'asdd' } }),
    currentSession: () => Promise.resolve(),
    signOut: () => {
      mockSignOut()
    },
  },
}))

Amplify.configure(awsconfig)

describe('Account view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ReactRouterDom.MemoryRouter initialEntries={['/account']}>
          <Account />
        </ReactRouterDom.MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('redirects if not authed', async () => {
    mockCognito.useAuth = () => [{ isValid: false }, jest.fn]
    render(
      <I18nextProvider i18n={i18n}>
        <ReactRouterDom.MemoryRouter initialEntries={['/account']}>
          <Account />
        </ReactRouterDom.MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(mockUseNavigate).toHaveBeenCalledWith('/login')
  })

  it('calls sign out', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ReactRouterDom.MemoryRouter initialEntries={['/account']}>
          <Account />
        </ReactRouterDom.MemoryRouter>
      </I18nextProvider>,
    )
    const logoutBtn = await screen.findByTestId('account-logout')
    expect(logoutBtn).toBeInTheDocument()
    fireEvent.click(logoutBtn)
    await waitFor(() => new Promise((res) => setTimeout(res, 100)))
    expect(mockSignOut).toHaveBeenCalledTimes(1)
    expect(mockUseNavigate).toHaveBeenCalledWith('/login')
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
