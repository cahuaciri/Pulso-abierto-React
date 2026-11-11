import { useEffect, useState } from 'react'
import QueryControls from '../components/QueryControls'
import StatusMessage from '../components/StatusMessage'
import CryptoList from '../components/CryptoList'
import { fetchCryptos } from '../services/cryptoService'
import type { Crypto } from '../types/crypto'
import type { Currency } from '../types/api'

function HomePage() {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('usd')
  const [onlyFavourites, setOnlyFavourites] = useState(false)

  const [status, setStatus] = useState<
    'initial' | 'loading' | 'success' | 'empty' | 'error'
  >('initial')

  const [errorMessage, setErrorMessage] = useState('')
  const [requestKey, setRequestKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
     
    async function loadCryptos() {
      setStatus('loading')
      setErrorMessage('')

    try {
    const result = await fetchCryptos(
      selectedCurrency,
      controller.signal,
    )

    setCryptos((previousCryptos) =>
      result.map((crypto) => ({
        ...crypto,
        isFavourite:
          previousCryptos.find((previous) => previous.id === crypto.id)
            ?.isFavourite ?? false,
      })),
    )

    setStatus(result.length > 0 ? 'success' : 'empty')
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return
    }

    setErrorMessage(
      error instanceof Error
        ? error.message
        : 'Ocurrió un error inesperado al consultar las cotizaciones.',
    )

    setStatus('error')
  }
}

loadCryptos()

return () => {
  controller.abort()
}
}, [selectedCurrency, requestKey])

const handleSearch = () => {
  setSubmittedSearch(searchTerm.trim())
  setRequestKey((previous) => previous + 1)
}

const handleRetry = () => {
  setRequestKey((previous) => previous + 1)
}

const handleToggleFavourite = (id: string) => {
  setCryptos((previousCryptos) =>
    previousCryptos.map((crypto) =>
      crypto.id === id
        ? { ...crypto, isFavourite: !crypto.isFavourite }
        : crypto,
    ),
  )
}

const filteredCryptos = cryptos.filter((crypto) => {
  const matchesSearch = crypto.name
    .toLowerCase()
    .includes(submittedSearch.toLowerCase())

  const matchesFavourites = !onlyFavourites || crypto.isFavourite

  return matchesSearch && matchesFavourites
  })

  return (
    <main className="container">
      <section className="hero-section">
        <h1>Explorá el mercado de criptomonedas</h1>
        <p>
          Consultá las cotizaciones de Bitcoin, Ethereum y Solana
          en tiempo real, según la moneda seleccionada.
        </p>
      </section>

      <QueryControls
        searchTerm={searchTerm}
        selectedCurrency={selectedCurrency}
        onlyFavourites={onlyFavourites}
        onSearchChange={setSearchTerm}
        onCurrencyChange={setSelectedCurrency}
        onFavouritesChange={setOnlyFavourites}
        onSearch={handleSearch}
      />

      <section className="results-section">
        <StatusMessage
          status={status}
          errorMessage={errorMessage}
          resultCount={filteredCryptos.length}
          onRetry={handleRetry}
        />

        {status === 'success' && (
          <CryptoList
            cryptos={filteredCryptos}
            currency={selectedCurrency}
            onToggleFavourite={handleToggleFavourite}
          />
        )}
      </section>
    </main>
  )
}

export default HomePage