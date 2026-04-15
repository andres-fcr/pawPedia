import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import BreedCard from './BreedCard'
import { ThemeProviderContext } from '@/context/ThemeContext'
import { createElement } from 'react'
import type { NormalizedBreed, NormalizedCattleBreed, NormalizedHorseBreed } from '@/lib/api'

const mockThemeContext = {
  theme: 'dark' as const,
  setTheme: vi.fn(),
}

const wrapper = ({ children }: { children: React.ReactNode }) =>
  createElement(
    MemoryRouter,
    {},
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
  temperament: ['Calm', 'Gentle'],
}

const mockCattleBreed: NormalizedCattleBreed = {
  id: 'holstein',
  name: 'Holstein',
  species: 'Bovino',
  origin: 'Germany',
  regionColombia: 'Antioquia',
  description: 'Manso',
  image: 'https://example.com/holstein.jpg',
  productiveUsages: ['Leche', 'Carne'],
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

describe('BreedCard', () => {
  it('should render pet breed card with name and temperament', () => {
    const onClick = vi.fn()
    render(<BreedCard breed={mockPetBreed} onClick={onClick} />, { wrapper })

    expect(screen.getByText('Persian')).toBeInTheDocument()
    expect(screen.getByText('Calm • Gentle')).toBeInTheDocument()
    expect(screen.getByText('Iran')).toBeInTheDocument()
  })

  it('should render cattle breed card with productive usages', () => {
    const onClick = vi.fn()
    render(<BreedCard breed={mockCattleBreed} onClick={onClick} />, { wrapper })

    expect(screen.getByText('Holstein')).toBeInTheDocument()
    expect(screen.getByText('Leche • Carne')).toBeInTheDocument()
  })

  it('should render horse breed card with temperament', () => {
    const onClick = vi.fn()
    render(<BreedCard breed={mockHorseBreed} onClick={onClick} />, { wrapper })

    expect(screen.getByText('Paso Finero')).toBeInTheDocument()
    expect(screen.getByText('Noble')).toBeInTheDocument()
    expect(screen.getByText('Colombia')).toBeInTheDocument()
  })

  it('should call onClick with breed id when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<BreedCard breed={mockPetBreed} onClick={onClick} />, { wrapper })

    await user.click(screen.getByText('Persian'))

    expect(onClick).toHaveBeenCalledWith('1')
  })
})
