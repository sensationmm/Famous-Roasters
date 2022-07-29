import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { UserProfileMock } from 'src/_mocks'
import { i18n } from 'src/config'
import { awsconfig } from 'src/config/cognito/auth.hook'

import { Profile } from '.'

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
        mocks={[UserProfileMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/profile']}>
            <Profile />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
