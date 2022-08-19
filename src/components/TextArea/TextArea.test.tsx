import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { TextArea } from '.'

describe('Rating component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n} data-testId="">
        <TextArea id="sdasd" value={'sasdad'} setValue={jest.fn} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('fires change event', async () => {
    const mockSetValue = jest.fn()
    render(
      <I18nextProvider i18n={i18n} data-testId="">
        <TextArea id="sdasd" value="sdasd" setValue={mockSetValue} />
      </I18nextProvider>,
    )

    const comment = await screen.findByTestId('component-textarea')
    expect(comment).toBeInTheDocument()
    fireEvent.change(comment, {
      target: { value: 'comment goes here' },
    })
  })

  it('handles text length less than limit', async () => {
    const mockSetValue = jest.fn()
    render(
      <I18nextProvider i18n={i18n} data-testId="">
        <TextArea id="sdasd" value="sdasd" setValue={mockSetValue} limit={50} />
      </I18nextProvider>,
    )

    const comment = await screen.findByTestId('component-textarea')
    expect(comment).toBeInTheDocument()
    fireEvent.change(comment, {
      target: { value: 'comment goes here' },
    })
  })

  it('handles text length greater than limit', async () => {
    const mockSetValue = jest.fn()
    render(
      <I18nextProvider i18n={i18n} data-testId="">
        <TextArea id="sdasd" value="sdasd" setValue={mockSetValue} limit={5} />
      </I18nextProvider>,
    )

    const comment = await screen.findByTestId('component-textarea')
    expect(comment).toBeInTheDocument()
    fireEvent.change(comment, {
      target: { value: 'comment goes here' },
    })
  })
})
