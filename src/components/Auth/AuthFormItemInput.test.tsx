import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Form from 'rc-field-form'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Icon, IconName } from 'src/components/Icon'

import { AuthFormItemInput } from '.'

describe('ConfirmSignUp custom auth component', () => {
  const snippet = (type?: string) => (
    <Form name="testAuthFormItemInput" method="POST">
      <AuthFormItemInput name="itemName" label="itemLabel" type={type} rules={[]} placeholder="itemPlaceHolder" />
    </Form>
  )

  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>
        {snippet('password')}
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for non given type', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>
        {snippet(undefined)}
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with errors', async () => {
    // needed as async validator throws a console warning on input too short
    jest.spyOn(console, 'warn').mockImplementation(jest.fn())
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>
        {
          <Form name="testAuthFormItemInput" method="POST">
            <AuthFormItemInput
              dataTestId="input-field"
              name="itemName"
              label="itemLabel"
              type={'password'}
              rules={[{ min: 5, message: 'Not long enough' }]}
              placeholder="itemPlaceHolder"
              validateTrigger="onChange"
              icon={<Icon name={IconName.PasswordShow} />}
            />
          </Form>
        }
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const input = await screen.findByTestId('input-field')
    expect(input).toBeInTheDocument()
    await act(() => {
      fireEvent.change(input, { target: { value: 'asd' } })
    })
    expect(container).toMatchSnapshot()
    jest.spyOn(console, 'warn').mockRestore()
  })
})
