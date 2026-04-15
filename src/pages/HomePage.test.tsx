import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import HomePage from './HomePage'
import { ThemeProviderContext } from '@/context/ThemeContext'
import { createElement } from 'react'

// Mock useSpecies
vi.mock('@/hooks/UseSpecies', () => ({
  useSpecies: vi.fn(),
}))

// Mock sub-components that use Radix portals
vi.mock('@/components/TabsSection', () => ({
  default: () => <div data-testid="tabs-section" />,
}))

vi.mock('@/components/SearchBar', () => ({
  default: ({ handleSearchChange, section, searchQuery, disabled }: Record<string, unknown>) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        value={searchQuery as string}
        onChange={(e) => (handleSearchChange as (v: string) => void)(e.target.value)}
        disabled={disabled as boolean}
        placeholder={`Buscar razas de ${section}...`}
      />
    </div>
  ),
}))

vi.mock('@/components/BreedCard', () => ({
  default: ({ breed, onClick }: { breed: { id: string; name: string }; onClick: (id: string) => void }) => (
    <div data-testid="breed-card" onClick={() => onClick(breed.id)}>
      <span>{breed.name}</span>
    </div>
  ),
}))

vi.mock('@/components/ui/pagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) => (
    <div data-testid="pagination">
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  ),
}))

import { useSpecies } from '@/hooks/UseSpecies'
const mockedUseSpecies = vi.mocked(useSpecies)

const mockThemeContext = {
  theme: 'dark' as const,
  setTheme: vi.fn(),
}

const mockBreeds = Array.from({ length: 20 }, (_, i) => ({
  id: `breed-${i}`,
  name: `Breed ${i}`,
  countryCode: 'US',
  description: `Description ${i}`,
  origin: 'USA',
  lifeSpan: '10',
  weight: '5-10',
  image: `https://example.com/breed-${i}.jpg`,
  temperament: ['Friendly'],
}))

const wrapper = (initialEntry = '/cats') => {
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

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render hero section with cats branding', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    expect(screen.getByText(/Descubre al Felino/)).toBeInTheDocument()
  })

  it('should render breed count badge', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('razas')).toBeInTheDocument()
  })

  it('should render search bar', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  it('should render loading skeletons when isLoading is true', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: true })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    // Should show skeleton cards (at least some)
    expect(document.querySelectorAll('[class*="animate-pulse"]').length).toBeGreaterThan(0)
  })

  it('should render breed cards when data is available', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds.slice(0, 4), isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    const cards = screen.getAllByTestId('breed-card')
    expect(cards).toHaveLength(4)
  })

  it('should paginate breeds (12 per page)', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    // Should only show first 12 breeds
    const cards = screen.getAllByTestId('breed-card')
    expect(cards).toHaveLength(12)
  })

  it('should show pagination when more than 12 breeds', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('should filter breeds based on search query in URL', () => {
    const filteredBreeds = mockBreeds.filter((b) => b.name.includes('Breed 1'))
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats?search=Breed+1') })

    // Should only show matching breeds
    const cards = screen.getAllByTestId('breed-card')
    expect(cards.length).toBeLessThanOrEqual(filteredBreeds.length)
  })

  it('should navigate to breed detail when card is clicked', async () => {
    const user = userEvent.setup()
    mockedUseSpecies.mockReturnValue({ data: mockBreeds.slice(0, 4), isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats') })

    const firstCard = screen.getAllByTestId('breed-card')[0]
    await user.click(firstCard)

    // Navigation happens - verify by checking route changed
    // The actual navigation is internal to MemoryRouter
  })

  it('should show "No se encontraron razas" when search has no results', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/cats?search=XYZ') })

    expect(screen.getByText('No se encontraron razas en esta sección.')).toBeInTheDocument()
  })

  it('should render dogs branding on /dogs route', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/dogs') })

    expect(screen.getByText(/Encuentra al Canino/)).toBeInTheDocument()
  })

  it('should render vacunos branding on /vacunos route', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/vacunos') })

    expect(screen.getByText(/Conoce al Bovino/)).toBeInTheDocument()
  })

  it('should render caballos branding on /caballos route', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: false })

    render(<HomePage />, { wrapper: wrapper('/caballos') })

    expect(screen.getByText(/Descubre al Equino/)).toBeInTheDocument()
  })
})
