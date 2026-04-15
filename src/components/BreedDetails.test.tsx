import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import BreedDetails from './BreedDetails'
import { ThemeProviderContext } from '@/context/ThemeContext'
import { createElement } from 'react'
import type { NormalizedBreed, NormalizedCattleBreed, NormalizedHorseBreed } from '@/lib/api'

// Mock sub-components
vi.mock('./PetDetails', () => ({
  default: ({ breed }: { breed: NormalizedBreed }) => (
    <div data-testid="pet-details">
      <h1>{breed.name}</h1>
      <p>{breed.description}</p>
    </div>
  ),
}))

vi.mock('./CattleDetails', () => ({
  default: ({ breed }: { breed: NormalizedCattleBreed }) => (
    <div data-testid="cattle-details">
      <h1>{breed.name}</h1>
      <p>{breed.description}</p>
    </div>
  ),
}))

vi.mock('./HorseDetails', () => ({
  default: ({ breed }: { breed: NormalizedHorseBreed }) => (
    <div data-testid="horse-details">
      <h1>{breed.name}</h1>
      <p>{breed.description}</p>
    </div>
  ),
}))

vi.mock('./ImageModal', () => ({
  default: () => <div data-testid="image-modal" />,
}))

const mockThemeContext = {
  theme: 'dark' as const,
  setTheme: vi.fn(),
}

const wrapper = ({ children }: { children: React.ReactNode }) =>
  createElement(
    MemoryRouter,
    { initialEntries: ['/cats/1'] },
    createElement(
      ThemeProviderContext.Provider,
      { value: mockThemeContext },
      children
    )
  )

const mockPetBreed: NormalizedBreed = {
  id: '1',
  name: 'Persian',
  countryCode: 'IR',
  description: 'A gentle cat',
  origin: 'Iran',
  lifeSpan: '15',
  weight: '3-5',
  image: 'https://example.com/persian.jpg',
  temperament: ['Calm'],
}

const mockCattleBreed: NormalizedCattleBreed = {
  id: 'holstein',
  name: 'Holstein',
  species: 'Bovino',
  origin: 'Germany',
  regionColombia: 'Antioquia',
  description: 'Manso',
  image: 'https://example.com/holstein.jpg',
  productiveUsages: ['Leche'],
  productiveCharacteristics: {
    coat: 'Negro',
    coat_pattern: 'Manchas',
    horns: 'Sí',
    nature: 'Manso',
    dairy: { quality: 'Alta', quantity: '40L' },
    meat: { quality: 'Baja', quantity: 'Baja' },
    weight: { male: '600kg', female: '500kg' },
  },
}

const mockHorseBreed: NormalizedHorseBreed = {
  id: 'paso-finero',
  name: 'Paso Finero',
  image: 'https://example.com/paso.jpg',
  ears: 'Medianas',
  colors: 'Varios',
  temperament: 'Noble',
  size: 'Mediano',
  approximateWeight: '400kg',
  lifespan: '25 años',
  manes: 'Abundantes',
  aptitude: 'Paso',
  colombiaRegion: 'Antioquia',
  countryOfOrigin: 'Colombia',
  description: 'Caballo de paso',
  links: [],
}

describe('BreedDetails', () => {
  it('should render loading skeleton when isLoading is true', () => {
    render(<BreedDetails breed={null} isLoading={true} onReturn={vi.fn()} />, { wrapper })

    // Skeleton components should be present (at least some)
    expect(document.querySelectorAll('[class*="animate-pulse"]').length).toBeGreaterThan(0)
  })

  it('should render pet details for cat/dog breed', () => {
    render(<BreedDetails breed={mockPetBreed} isLoading={false} onReturn={vi.fn()} />, { wrapper })

    expect(screen.getByTestId('pet-details')).toBeInTheDocument()
    expect(screen.getByText('Persian')).toBeInTheDocument()
  })

  it('should render cattle details for cattle breed', () => {
    render(<BreedDetails breed={mockCattleBreed} isLoading={false} onReturn={vi.fn()} />, { wrapper })

    expect(screen.getByTestId('cattle-details')).toBeInTheDocument()
    expect(screen.getByText('Holstein')).toBeInTheDocument()
  })

  it('should render horse details for horse breed', () => {
    render(<BreedDetails breed={mockHorseBreed} isLoading={false} onReturn={vi.fn()} />, { wrapper })

    expect(screen.getByTestId('horse-details')).toBeInTheDocument()
    expect(screen.getByText('Paso Finero')).toBeInTheDocument()
  })

  it('should render Volver button', () => {
    const onReturn = vi.fn()
    render(<BreedDetails breed={mockPetBreed} isLoading={false} onReturn={onReturn} />, { wrapper })

    const volverButton = screen.getByText('Volver')
    expect(volverButton).toBeInTheDocument()
  })

  it('should render Comparar button', () => {
    render(<BreedDetails breed={mockPetBreed} isLoading={false} onReturn={vi.fn()} />, { wrapper })

    const compararButton = screen.getByText('Comparar')
    expect(compararButton).toBeInTheDocument()
  })

  it('should call onReturn when Volver button is clicked', async () => {
    const user = userEvent.setup()
    const onReturn = vi.fn()
    render(<BreedDetails breed={mockPetBreed} isLoading={false} onReturn={onReturn} />, { wrapper })

    await user.click(screen.getByText('Volver'))

    expect(onReturn).toHaveBeenCalled()
  })

  it('should not render buttons when breed is null and not loading', () => {
    render(<BreedDetails breed={null} isLoading={false} onReturn={vi.fn()} />, { wrapper })

    expect(screen.queryByText('Volver')).not.toBeInTheDocument()
    expect(screen.queryByText('Comparar')).not.toBeInTheDocument()
  })
})
