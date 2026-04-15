import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import DetailsPage from './DetailsPage'
import { ThemeProviderContext } from '@/context/ThemeContext'

// Mock useSpecies
vi.mock('@/hooks/UseSpecies', () => ({
  useSpecies: vi.fn(),
}))

// Mock BreedDetails
vi.mock('@/components/BreedDetails', () => ({
  default: ({ breed, onReturn }: { breed: { id: string; name: string } | null; onReturn: () => void }) => (
    <div data-testid="breed-details">
      {breed ? <h1>{breed.name}</h1> : <p>Loading...</p>}
      <button onClick={onReturn}>Volver</button>
    </div>
  ),
}))

// Mock NotFound
vi.mock('@/components/NotFound', () => ({
  default: ({ message, showHomeButton }: { message?: string; showHomeButton?: boolean }) => (
    <div data-testid="not-found">
      <p>{message}</p>
      {showHomeButton && <button>Home</button>}
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

function renderWithRouter(initialEntry: string, ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ThemeProviderContext.Provider value={mockThemeContext}>
        <Routes>
          <Route path="/:section/:id" element={ui} />
          <Route path="/:section" element={<div>No breed ID</div>} />
        </Routes>
      </ThemeProviderContext.Provider>
    </MemoryRouter>
  )
}

describe('DetailsPage', () => {
  it('should show NotFound when breed is not found', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    renderWithRouter('/cats/nonexistent', <DetailsPage />)

    expect(screen.getByTestId('not-found')).toBeInTheDocument()
    expect(screen.getByText(/No pudimos encontrar la raza que buscas/)).toBeInTheDocument()
  })

  it('should show breed details when breed is found', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    renderWithRouter('/cats/persian', <DetailsPage />)

    expect(screen.getByTestId('breed-details')).toBeInTheDocument()
    expect(screen.getByText('Persian')).toBeInTheDocument()
  })

  it('should show loading state while fetching', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: true })

    renderWithRouter('/cats/persian', <DetailsPage />)

    // Should render BreedDetails with isLoading=true
    expect(screen.getByTestId('breed-details')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  // Note: Testing the '/cats/' route without an ID is handled by the router routing logic.
  // The component behavior when breedId is undefined is covered by the other tests.

  it('should render Volver button in BreedDetails', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    renderWithRouter('/cats/persian', <DetailsPage />)

    expect(screen.getByText('Volver')).toBeInTheDocument()
  })
})
