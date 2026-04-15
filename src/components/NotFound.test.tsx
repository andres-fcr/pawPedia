import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import NotFound from './NotFound'

const wrapper = ({ children }: { children: React.ReactNode }) =>
  <MemoryRouter>{children}</MemoryRouter>

describe('NotFound', () => {
  it('should render 404 heading', () => {
    render(<NotFound />, { wrapper })

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('should render "Página No Encontrada" heading', () => {
    render(<NotFound />, { wrapper })

    expect(screen.getByText('Página No Encontrada')).toBeInTheDocument()
  })

  it('should render default message', () => {
    render(<NotFound />, { wrapper })

    expect(screen.getByText('La página que buscas no existe.')).toBeInTheDocument()
  })

  it('should render custom message when provided', () => {
    render(<NotFound message="Custom error message" />, { wrapper })

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('should show home button by default', () => {
    render(<NotFound />, { wrapper })

    expect(screen.getByText('Volver al Inicio')).toBeInTheDocument()
  })

  it('should not show home button when showHomeButton is false', () => {
    render(<NotFound showHomeButton={false} />, { wrapper })

    expect(screen.queryByText('Volver al Inicio')).not.toBeInTheDocument()
  })

  it('should render paw print icons', () => {
    render(<NotFound />, { wrapper })

    // The component renders multiple PawPrint icons
    const pawIcons = document.querySelectorAll('svg')
    expect(pawIcons.length).toBeGreaterThan(0)
  })
})
