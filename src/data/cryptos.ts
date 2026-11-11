import type { Crypto } from '../types/crypto'

export const initialCryptos: Crypto[] = [
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        price: 95000,
        isFavourite: false,
    },
    {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
        price: 3500,
        isFavourite: false,
    },
    {
        id: 'solana',
        name: 'Solana',
        symbol: 'sol',
        price: 180,
        isFavourite: false,
    }
]