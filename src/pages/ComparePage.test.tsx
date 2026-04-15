import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import ComparePage from './ComparePage'
import { ThemeProviderContext } from '@/context/ThemeContext'
import { createElement } from 'react'

// Mock useSpecies
vi.mock('@/hooks/UseSpecies', () => ({
  useSpecies: vi.fn(),
}))

// Mock CompareView
vi.mock('@/components/CompareView', () => ({
  default: ({ breed1, breed2, onReturn }: { breed1: { id: string; name: string } | null; breed2: { id: string; name: string } | null; onReturn: () => void }) => (
    <div data-testid="compare-view">
      {breed1 ? <span data-testid="breed-1">{breed1.name}</span> : <span>No breed 1</span>}
      {breed2 ? <span data-testid="breed-2">{breed2.name}</span> : <span>No breed 2</span>}
      <button onClick={onReturn}>Return</button>
    </div>
  ),
}))

// Mock BreedSelector
vi.mock('@/components/BreedSelector', () => ({
  default: () => <div data-testid="breed-selector" />,
}))

// Mock ImageModal
vi.mock('@/components/ImageModal', () => ({
  default: () => <div data-testid="image-modal" />,
}))

// Mock NotFound
vi.mock('@/components/NotFound', () => ({
  default: ({ message }: { message?: string }) => (
    <div data-testid="not-found">
      <p>{message}</p>
    </div>
  ),
}))

import { useSpecies } from '@/hooks/UseSpecies'
const mockedUseSpecies = vi.mocked(useSpecies)

const mockThemeContext = {
  theme: 'dark' as const,
  setTheme: vi.fn(),
}

const mockBreeds = [
  {
    id: 'persian',
    name: 'Persian',
    countryCode: 'IR',
    description: 'A gentle cat',
    origin: 'Iran',
    lifeSpan: '15',
    weight: '3-5',
    image: 'https://example.com/persian.jpg',
    temperament: ['Calm'],
  },
  {
    id: 'siamese',
    name: 'Siamese',
    countryCode: 'TH',
    description: 'A talkative cat',
    origin: 'Thailand',
    lifeSpan: '18',
    weight: '4-6',
    image: 'https://example.com/siamese.jpg',
    temperament: ['Vocal'],
  },
]

const wrapper = (initialEntry: string) => {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return createElement(
      MemoryRouter,
      { initialEntries: [initialEntry] },
      createElement(
        ThemeProviderContext.Provider,
        { value: mockThemeContext },
        children
      )
    )
  }
}

describe('ComparePage', () => {
  it('should show NotFound when no breeds selected and data loaded', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<ComparePage />, { wrapper: wrapper('/cats/compare') })

    expect(screen.getByTestId('not-found')).toBeInTheDocument()
    expect(screen.getByText(/Selecciona al menos una raza para comparar/)).toBeInTheDocument()
  })

  it('should render CompareView with breed1 when breed1 param is set', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<ComparePage />, { wrapper: wrapper('/cats/compare?breed1=persian') })

    expect(screen.getByTestId('compare-view')).toBeInTheDocument()
    expect(screen.getByTestId('breed-1')).toHaveTextContent('Persian')
  })

  it('should render CompareView with both breeds when both params are set', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(
      <ComparePage />,
      { wrapper: wrapper('/cats/compare?breed1=persian&breed2=siamese') }
    )

    expect(screen.getByTestId('breed-1')).toHaveTextContent('Persian')
    expect(screen.getByTestId('breed-2')).toHaveTextContent('Siamese')
  })

  it('should render BreedSelector component', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<ComparePage />, { wrapper: wrapper('/cats/compare?breed1=persian') })

    expect(screen.getByTestId('breed-selector')).toBeInTheDocument()
  })

  it('should render ImageModal component', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<ComparePage />, { wrapper: wrapper('/cats/compare?breed1=persian') })

    expect(screen.getByTestId('image-modal')).toBeInTheDocument()
  })

  it('should render Return button in CompareView', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<ComparePage />, { wrapper: wrapper('/cats/compare?breed1=persian') })

    expect(screen.getByText('Return')).toBeInTheDocument()
  })

  it('should show loading state while fetching', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: true })

    render(<ComparePage />, { wrapper: wrapper('/cats/compare') })

    // While loading, neither NotFound nor CompareView should show final content
    expect(screen.queryByTestId('not-found')).not.toBeInTheDocument()
  })
})
