import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchCryptos } from './cryptoService'

const mockFetch = vi.fn<typeof fetch>()

describe('fetchCryptos', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
    mockFetch.mockReset()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('devuelve las criptomonedas cuando la respuesta HTTP es exitosa', async () => {
    mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
            bitcoin: { usd: 95000 },
            ethereum: { usd: 3500 },
            solana: { usd: 180 },
        }),
    } as Response)

    const result = await fetchCryptos('usd')

    expect(result).toEqual([
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
    ])

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch.mock.calls[0][0]).toContain('ids=bitcoin')
    expect(mockFetch.mock.calls[0][0]).toContain('vs_currencies=usd')
})

it('lanza un error cuando la respuesta HTTP no es exitosa', async () => {
    mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        json: async () => ({}),
    } as Response)

    await expect(fetchCryptos('usd')).rejects.toThrow(
        'Error HTTP 429: no se pudieron obtener las cotizaciones',
    )
})

it('omite las criptomonedas que no tienen un precio válido', async () => {
    mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
            bitcoin: { usd: 95000 },
            ethereum: { usd: null },
            solana: {}, // Precio inválido
        }),
    } as Response)

    const result = await fetchCryptos('usd')

    expect(result).toEqual([
        {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'btc',
            price: 95000,
        },
    ])
  })
})
