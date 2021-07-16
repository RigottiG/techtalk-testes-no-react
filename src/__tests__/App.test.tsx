import { render, screen } from '@testing-library/react'

import App from '../App'

describe('Testing App.jsx', () => {
  it('should be able to show the h1 element', () => {
    render(<App />)
    const h1 = screen.getByText(/to do list/i)

    expect(h1).toBeInTheDocument()
  })
})
