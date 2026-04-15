import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProviderContext } from '@/context/ThemeContext'
import { createElement, useState } from 'react'

function createWrapper(initialTheme: 'dark' | 'light' = 'dark') {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme)
    return createElement(
      ThemeProviderContext.Provider,
      { value: { theme, setTheme } },
      children
    )
  }
}

describe('ThemeToggle', () => {
  it('should show sun icon when theme is dark', () => {
    const Wrapper = createWrapper('dark')
    render(<ThemeToggle />, { wrapper: Wrapper })

    // Sun icon is shown when theme is dark (to indicate switching to light)
    expect(screen.getByLabelText('Cambiar a modo claro')).toBeInTheDocument()
  })

  it('should show moon icon when theme is light', () => {
    const Wrapper = createWrapper('light')
    render(<ThemeToggle />, { wrapper: Wrapper })

    expect(screen.getByLabelText('Cambiar a modo oscuro')).toBeInTheDocument()
  })

  it('should toggle theme when clicked', async () => {
    const user = userEvent.setup()
    let currentTheme: 'dark' | 'light' = 'dark'
    const setThemeMock = vi.fn((t: 'dark' | 'light') => { currentTheme = t })

    const Wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(
        ThemeProviderContext.Provider,
        { value: { theme: currentTheme, setTheme: setThemeMock } },
        children
      )

    render(<ThemeToggle />, { wrapper: Wrapper })

    const button = screen.getByRole('button')
    await user.click(button)

    expect(setThemeMock).toHaveBeenCalledWith('light')
  })

  it('should have rounded-full class', () => {
    const Wrapper = createWrapper('dark')
    render(<ThemeToggle />, { wrapper: Wrapper })

    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-full')
  })
})
