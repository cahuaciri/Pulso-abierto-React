// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import HomePage from './HomePage'
import { fetchCryptos } from '../services/cryptoService'
import { useFavouritesStore } from '../store/favoritesStore'

vi.mock('../services/cryptoService', () => ({
  fetchCryptos: vi.fn(),
}))

vi.mock('../components/QueryControls', () => ({
  default: () => <div>Controles de búsqueda</div>,
}))

vi.mock('../components/CryptoList', () => ({
  default: ({ cryptos }: { cryptos: { name: string }[] }) => (
    <ul>
      {cryptos.map((crypto) => (
        <li key={crypto.name}>{crypto.name}</li>
      ))}
    </ul>
  ),
}))

const mockFetchCryptos = vi.mocked(fetchCryptos)

const mockCryptos = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    price: 95000,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    price: 3500,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'sol',
    price: 180,
  },
]

describe('HomePage', () => {
  beforeEach(() => {
    mockFetchCryptos.mockReset()
    useFavouritesStore.setState({ favouriteIds: [] })
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el estado de carga mientras consulta las cotizaciones', () => {
    mockFetchCryptos.mockReturnValue(new Promise(() => {}))

    render(<HomePage />)

    expect(
      screen.getByRole('status'),
    ).toHaveTextContent('Consultando cotizaciones...')
  })

  it('muestra las criptomonedas cuando la consulta es exitosa', async () => {
    mockFetchCryptos.mockResolvedValue(mockCryptos)

    render(<HomePage />)

    expect(
      await screen.findByText('Bitcoin'),
    ).toBeInTheDocument()

    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('Solana')).toBeInTheDocument()

    expect(
      screen.getByRole('status'),
    ).toHaveTextContent('Se encontraron 3 criptomonedas.')
  })

  it('muestra un error y permite reintentar la consulta', async () => {
    const user = userEvent.setup()

    mockFetchCryptos
      .mockRejectedValueOnce(new Error('Error de conexión'))
      .mockResolvedValueOnce(mockCryptos)

    render(<HomePage />)

    expect(
      await screen.findByRole('alert'),
    ).toHaveTextContent('Error de conexión')

    await user.click(
      screen.getByRole('button', { name: 'Reintentar' }),
    )

    expect(
      await screen.findByText('Bitcoin'),
    ).toBeInTheDocument()

    expect(mockFetchCryptos).toHaveBeenCalledTimes(2)
    })
})