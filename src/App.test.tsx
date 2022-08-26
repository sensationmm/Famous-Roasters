import { render, waitFor } from '@testing-library/react'
import React from 'react'

import App from './App'

window.scrollTo = jest.fn()

describe('App', () => {
  it.skip('Renders correctly', async () => {
    const { container } = render(<App />)
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
