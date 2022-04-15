import { render, screen } from '@testing-library/react';
import App from './App';

describe('#1 - App renders', () => {
  
  it('renders Importance dropdown', () => {
    render(<App />)
    const button = screen.getByText(/Importance/i)
    expect(button).toBeInTheDocument()
  })
  
  it('renders Save dropdown', () => {
    render(<App />)
    const button = screen.getByText(/Importance/i)
    expect(button).toBeInTheDocument()
  })
})


