import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'

import { TasteFinder } from '.'

describe('Taste Finder view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/taste-finder']}>
          <TasteFinder />
        </MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can navigate throughout the screens', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/taste-finder']}>
          <TasteFinder />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const startButton = await screen.findByTestId('button-start')
    expect(startButton).toBeInTheDocument()
    fireEvent.click(startButton)
    const input = await screen.findByTestId('your-name-input')
    expect(input).toBeInTheDocument()
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'Flávi' } })
    const nextButton = await screen.findByTestId('nextButton')
    expect(nextButton).toBeInTheDocument()
    fireEvent.click(nextButton)
    const prevButton = await screen.findByTestId('prevButton')
    expect(prevButton).toBeInTheDocument()
    fireEvent.click(prevButton)
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'Flávio' } })
    expect(nextButton).toBeInTheDocument()
    fireEvent.click(nextButton)
    const imageCheckboxesBitterness = await screen.findAllByTestId('image-checkbox')
    expect(imageCheckboxesBitterness[0]).toBeInTheDocument()
    fireEvent.click(imageCheckboxesBitterness[0])
    fireEvent.click(nextButton)
    const imageCheckboxesSweetness = await screen.findAllByTestId('image-checkbox')
    expect(imageCheckboxesSweetness[0]).toBeInTheDocument()
    fireEvent.click(imageCheckboxesSweetness[0])
    fireEvent.click(nextButton)
    const imageCheckboxesAcidity = await screen.findAllByTestId('image-checkbox')
    expect(imageCheckboxesAcidity[0]).toBeInTheDocument()
    fireEvent.click(imageCheckboxesAcidity[0])
    fireEvent.click(nextButton)
    const imageCheckboxesBody = await screen.findAllByTestId('image-checkbox')
    expect(imageCheckboxesBody[0]).toBeInTheDocument()
    fireEvent.click(imageCheckboxesBody[0])
    fireEvent.click(nextButton)
    const iconCheckboxBrewing = await screen.findAllByTestId('icon-checkbox')
    expect(iconCheckboxBrewing[0]).toBeInTheDocument()
    fireEvent.click(iconCheckboxBrewing[0])
    fireEvent.click(nextButton)
    const iconCheckboxAdventurous = await screen.findAllByTestId('icon-checkbox')
    expect(iconCheckboxAdventurous[0]).toBeInTheDocument()
    fireEvent.click(iconCheckboxAdventurous[0])
    fireEvent.click(nextButton)
  })
})
