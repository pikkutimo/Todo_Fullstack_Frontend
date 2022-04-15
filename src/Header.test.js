import { fireEvent, render, screen } from '@testing-library/react';
import AppHeader from './components/Header';

describe('#1 - AppHeader renders', () => {

//   beforeAll(() => {

//   })
  
  it('renders', () => {
    render(<AppHeader />)
    
     expect(screen.getByText('To-do App')).toBeInTheDocument()
  })
  
  it('renders log in button', () => {
    render(<AppHeader />)
    const button = screen.getByText(/Log in/i)
    expect(button).toBeInTheDocument()
  })
  
  it('renders register button', () => {
    render(<AppHeader />)
    const button = screen.getByText(/Register/i)
    expect(button).toBeInTheDocument()
  })

  it('Login button calls "onClick" prop on button click', () => {
    // Render new instance in every test to prevent leaking state
    const onClick = jest.fn();
    render(<AppHeader setLoginModalShow={onClick} />)
    fireEvent.click(screen.getByRole('button', {name: /Log in/i}));
    expect(onClick).toHaveBeenCalled();
    onClick.mockClear()
  })

  it('Register button calls "onClick" prop on button click', () => {
    // Render new instance in every test to prevent leaking state
    const onClick = jest.fn();
    render(<AppHeader setRegisterModalShow={onClick} />)
    fireEvent.click(screen.getByRole('button', {name: /Register/i}));
    expect(onClick).toHaveBeenCalled();
    onClick.mockClear()
  })
 
  
})