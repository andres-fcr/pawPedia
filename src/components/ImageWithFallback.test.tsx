import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageWithFallback from './ImageWithFallback'

describe('ImageWithFallback', () => {
  it('should render image when src is valid', () => {
    render(
      <ImageWithFallback
        src="https://example.com/test.jpg"
        alt="Test image"
      />
    )

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/test.jpg')
    expect(img).toHaveAttribute('alt', 'Test image')
  })

  it('should render fallback icon when image fails to load', async () => {
    render(
      <ImageWithFallback
        src="https://example.com/broken.jpg"
        alt="Broken image"
        fallbackIcon={<span data-testid="fallback">Image not available</span>}
      />
    )

    // Initially renders image
    expect(screen.getByRole('img')).toBeInTheDocument()

    // Simulate image load error and wait for state update
    const img = screen.getByRole('img')
    await vi.waitFor(async () => {
      img.dispatchEvent(new Event('error'))
      expect(screen.getByTestId('fallback')).toBeInTheDocument()
    })

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should merge custom className on image', () => {
    render(
      <ImageWithFallback
        src="https://example.com/test.jpg"
        alt="Test"
        className="custom-class"
      />
    )

    const img = screen.getByRole('img')
    expect(img).toHaveClass('custom-class')
  })

  it('should render default SVG fallback when no fallbackIcon provided', async () => {
    render(
      <ImageWithFallback
        src="https://example.com/broken.jpg"
        alt="Broken"
      />
    )

    // Trigger error and wait for state update
    const img = screen.getByRole('img')
    await vi.waitFor(async () => {
      img.dispatchEvent(new Event('error'))
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })
})
