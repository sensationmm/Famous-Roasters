import { render, waitFor } from '@testing-library/react'
import Amplify from 'aws-amplify'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'
import { awsconfig } from 'src/config/cognito/auth.hook'

import { Auth } from '.'

Amplify.configure(awsconfig)

describe('Auth view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/login']}>
          <Auth authState={'signIn'} />
        </MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
