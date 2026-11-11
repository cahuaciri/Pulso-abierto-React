export type Currency = 'usd' | 'eur' | 'ars'

export interface CoinGeckoPrice{
    usd?: number
    eur?: number
    ars?: number
}

export interface CoinGeckoResponse {
  bitcoin?: CoinGeckoPrice
  ethereum?: CoinGeckoPrice
  solana?: CoinGeckoPrice
}