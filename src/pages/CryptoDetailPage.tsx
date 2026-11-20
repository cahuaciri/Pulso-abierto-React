import { Link, useParams } from 'react-router-dom'
import { initialCryptos } from '../data/cryptos'
import { useFavouritesStore } from '../store/favoritesStore'

function CryptoDetailPage() {
    const { id } = useParams()

    const crypto = initialCryptos.find(
        (item) => item.id === id,
    )

    const isFavourite = useFavouritesStore((state) =>
        crypto ? state.favouriteIds.includes(crypto.id) : false,
    )

    const toggleFavourite = useFavouritesStore(
        (state) => state.toggleFavourite,
    )

    if (!crypto) {
        return (
            <main className="container main-content">
                <section className="query-panel">
                    <h1>Criptomoneda no encontrada</h1>
                    <p>
                        No encontramos una criptomoneda con el identificador solicitado.
                    </p>

                    <Link to="/" className="secondary-button">
                        Volver a cotizaciones
                    </Link>
                </section>
            </main>
        )
    }

    return (
      <main className="container main-content">
        <section className="intro">
            <p className="eyebrow">DETALLE DE COTIZACIÓN</p>
            <h1>{crypto.name}</h1>
            <p className="intro-text">
                Información de la criptomoneda seleccionada.
            </p>
        </section>

        <section className="query-panel">
            <h2>{crypto.name}</h2>

            <p>
              <strong>Identificador:</strong> {crypto.id}
            </p>

            <p>
              <strong>Símbolo:</strong> {crypto.symbol.toUpperCase()}
            </p>

            <p>
              <strong>Precio:</strong>{' '}
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'USD',
              }).format(crypto.price)}
            </p>

            <p>
              <strong>Favorita:</strong>{' '}
              {isFavourite ? 'Sí' : 'No'}
            </p>

            <button
                type="button"
                className="secondary-button"
                onClick={() => toggleFavourite(crypto.id)}
                aria-pressed={isFavourite}
            >
                {isFavourite ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
            </button>

            <Link to="/" className="secondary-button">
                Volver a cotizaciones
            </Link>
        </section>
    </main>
  )
}

export default CryptoDetailPage