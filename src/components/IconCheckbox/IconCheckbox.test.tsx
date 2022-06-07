import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IconName } from 'src/components/Icon'
import { TasteScreenItemSize } from 'src/views/TasteFinder/Steps'

import { IconCheckbox } from '.'

global.alert = jest.fn()

describe('ImageCheckbox component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <IconCheckbox name="test" iconName={IconName.Espresso} text="Dieser Kaffee ist lekka" />,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for selected', async () => {
    const { container } = render(
      <IconCheckbox name="test" iconName={IconName.Espresso} text="Dieser Kaffee ist lekka" selected={true} />,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can toggle the state by clicking', async () => {
    render(
      <IconCheckbox
        name="test"
        iconName={IconName.Espresso}
        text="Dieser Kaffee ist lekka"
        toggleSelected={() => alert('works')}
      />,
    )
    const iconCheckbox = await screen.findByTestId('icon-checkbox')
    expect(iconCheckbox).toBeInTheDocument()
    fireEvent.click(iconCheckbox)
    fireEvent.click(iconCheckbox)
  })

  it('The user can toggle the state by clicking with large itemsize', async () => {
    render(
      <IconCheckbox
        name="test"
        iconName={IconName.Espresso}
        itemSize={TasteScreenItemSize.Large}
        text="Dieser Kaffee ist lekka"
        toggleSelected={() => alert('works')}
      />,
    )
    const iconCheckbox = await screen.findByTestId('icon-checkbox')
    expect(iconCheckbox).toBeInTheDocument()
    fireEvent.click(iconCheckbox)
    fireEvent.click(iconCheckbox)
  })
})
