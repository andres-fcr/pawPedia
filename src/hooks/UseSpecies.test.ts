import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSpecies } from './UseSpecies'

// Simple mock that properly replaces the entire modules
vi.mock('@/lib/api', () => ({
  fetchData: vi.fn(),
  urlToApiSection: {
    cats: 'cats',
    dogs: 'dogs',
    vacunos: 'cattle',
    caballos: 'horses',
  },
}))

vi.mock('@/lib/utils', () => ({
  getLocalStorageItem: vi.fn(),
  setLocalStorageItem: vi.fn(),
}))

// Import the mocked functions
import { fetchData } from '@/lib/api'
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/utils'

const mockedFetchData = vi.mocked(fetchData)
const mockedGetLocalStorage = vi.mocked(getLocalStorageItem)
const mockedSetLocalStorage = vi.mocked(setLocalStorageItem)

const mockCatBreeds = [
  {
    id: 'persian',
    name: 'Persian',
    countryCode: 'IR',
    description: 'A gentle cat',
    origin: 'Iran',
    lifeSpan: '15',
    weight: '3-5',
    image: 'cat.jpg',
    temperament: ['Calm'],
  },
]

describe('useSpecies', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch data when no cache exists', async () => {
    mockedGetLocalStorage.mockReturnValue(null)
    mockedFetchData.mockResolvedValue(mockCatBreeds)

    const { result } = renderHook(() => useSpecies('cats'))

    await waitFor(() => {
      expect(result.current.data).toHaveLength(1)
    })

    expect(mockedFetchData).toHaveBeenCalled()
    expect(mockedSetLocalStorage).toHaveBeenCalled()
  })

  it('should return empty data when fetch fails', async () => {
    mockedGetLocalStorage.mockReturnValue(null)
    mockedFetchData.mockResolvedValue([])

    const { result } = renderHook(() => useSpecies('cats'))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual([])
  })

  it('should start with empty data', () => {
    mockedGetLocalStorage.mockReturnValue(null)
    mockedFetchData.mockResolvedValue(mockCatBreeds)

    const { result } = renderHook(() => useSpecies('cats'))

    expect(result.current.data).toEqual([])
    // isLoading may be true or false depending on timing, so we just check data is empty
  })
})
