import type { Crypto } from '../types/crypto'
import CryptoCard from './CryptoCard'
import type { Currency } from '../types/api'

interface CryptoListProps {
  cryptos: Crypto[]
  onToggleFavourite: (id: string) => void
  onSelect?: (crypto: Crypto) => void
  currency: Currency
}

function CryptoList({
  cryptos,
  onToggleFavourite,
  onSelect,
  currency,
}: CryptoListProps) {
  if (cryptos.length === 0) {
    return (
      <p className="empty-message">
        No hay criptomonedas disponibles.
      </p>
    )
  }

  return (
    <div className="crypto-grid">
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          currency={currency}
          onSelect={onSelect}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  )
}

export default CryptoList