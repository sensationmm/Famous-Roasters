import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Listbox, ListBoxItem } from '.'

const items: ListBoxItem[] = [{ name: 'option 1' }, { name: 'option 2' }, { name: 'option 3' }]

describe('Listbox component', () => {
  it('Renders correctly', async () => {
    const { container } = render(<Listbox items={items} label="please select" />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
