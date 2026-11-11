import type { Crypto } from '../types/crypto'
import type { CoinGeckoResponse, Currency } from '../types/api'

const API_URL = 'https://api.coingecko.com/api/v3/simple/price'

const cryptoMetadata = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'eth' },
    { id: 'solana', name: 'Solana', symbol: 'sol' },
] as const

export async function fetchCryptos(
    currency: Currency,
    signal?: AbortSignal,
): Promise<Crypto[]> {
    const params = new URLSearchParams({
        ids: cryptoMetadata.map((crypto) => crypto.id).join(','),
        vs_currencies: currency,
    })

    const response = await fetch(`${API_URL}?${params.toString()}`, {
      signal,
    })

    if (!response.ok) {
      throw new Error(
        `Error HTTP ${response.status}: no se pudieron obtener las cotizaciones.`,
      )
    }

    const data = (await response.json()) as CoinGeckoResponse

    return cryptoMetadata.flatMap((crypto) => {
      const price = data[crypto.id]?.[currency]

      if (typeof price !== 'number' || !Number.isFinite(price)) {
        return []
      }

      return [
        {
          ...crypto,
          price,
          isFavourite: false,
        },
    ]
  })
}