import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProviderContext } from '@/context/ThemeContext'
import { createElement } from 'react'
import BreedSelector from './BreedSelector'

// Mock useSpecies hook
vi.mock('@/hooks/UseSpecies', () => ({
  useSpecies: vi.fn(),
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
    description: 'A cat',
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
  {
    id: 'mainecoon',
    name: 'Maine Coon',
    countryCode: 'US',
    description: 'A large cat',
    origin: 'USA',
    lifeSpan: '14',
    weight: '5-10',
    image: 'https://example.com/mainecoon.jpg',
    temperament: ['Friendly'],
  },
]

const wrapper = ({ children }: { children: React.ReactNode }) =>
  createElement(
    ThemeProviderContext.Provider,
    { value: mockThemeContext },
    children
  )

const defaultProps = {
  isOpen: true,
  onOpenChange: vi.fn(),
  currentBreedId: 'persian',
  section: 'cats' as const,
  onSelect: vi.fn(),
}

describe('BreedSelector', () => {
  it('should render dialog title when open', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: false })

    render(<BreedSelector {...defaultProps} />, { wrapper })

    expect(screen.getByText('Seleccionar raza para comparar')).toBeInTheDocument()
  })

  it('should render search input', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: false })

    render(<BreedSelector {...defaultProps} />, { wrapper })

    expect(screen.getByPlaceholderText('Buscar raza...')).toBeInTheDocument()
  })

  it('should render loading state when isLoading is true', () => {
    mockedUseSpecies.mockReturnValue({ data: [], isLoading: true })

    render(<BreedSelector {...defaultProps} />, { wrapper })

    expect(screen.getByText('Cargando razas...')).toBeInTheDocument()
  })

  it('should render breeds list', () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<BreedSelector {...defaultProps} />, { wrapper })

    // Should filter out current breed (persian)
    expect(screen.getByText('Siamese')).toBeInTheDocument()
    expect(screen.getByText('Maine Coon')).toBeInTheDocument()
    expect(screen.queryByText('Persian')).not.toBeInTheDocument()
  })

  it('should filter breeds based on search query', async () => {
    const user = userEvent.setup()
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<BreedSelector {...defaultProps} />, { wrapper })

    const searchInput = screen.getByPlaceholderText('Buscar raza...')
    await user.type(searchInput, 'Siam')

    expect(screen.getByText('Siamese')).toBeInTheDocument()
    expect(screen.queryByText('Maine Coon')).not.toBeInTheDocument()
  })

  it('should show "No se encontraron razas" when no results', async () => {
    const user = userEvent.setup()
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<BreedSelector {...defaultProps} />, { wrapper })

    const searchInput = screen.getByPlaceholderText('Buscar raza...')
    await user.type(searchInput, 'XYZ')

    expect(screen.getByText('No se encontraron razas')).toBeInTheDocument()
  })

  it('should select a breed when clicked', async () => {
    const user = userEvent.setup()
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<BreedSelector {...defaultProps} />, { wrapper })

    await user.click(screen.getByText('Siamese'))

    // After selection, confirm button should be enabled
    const confirmButton = screen.getByText('Comparar')
    expect(confirmButton).not.toBeDisabled()
  })

  it('should call onSelect with selected breed id when confirmed', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onOpenChange = vi.fn()
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(
      <BreedSelector
        {...defaultProps}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      />,
      { wrapper }
    )

    await user.click(screen.getByText('Siamese'))
    await user.click(screen.getByText('Comparar'))

    expect(onSelect).toHaveBeenCalledWith('siamese')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should call onOpenChange when Cancel is clicked', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    render(<BreedSelector {...defaultProps} onOpenChange={onOpenChange} />, { wrapper })

    await user.click(screen.getByText('Cancelar'))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should reset search and selection when dialog reopens', async () => {
    mockedUseSpecies.mockReturnValue({ data: mockBreeds, isLoading: false })

    const { rerender } = render(
      <BreedSelector {...defaultProps} isOpen={false} />,
      { wrapper }
    )

    // Open the dialog
    rerender(<BreedSelector {...defaultProps} isOpen={true} />)

    // Search and selection should be reset
    const searchInput = screen.getByPlaceholderText('Buscar raza...')
    expect(searchInput).toHaveValue('')
  })
})
