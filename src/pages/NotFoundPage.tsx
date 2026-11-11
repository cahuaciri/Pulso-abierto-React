import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <main className="container main-content">
            <section className="intro">
                <p className="eyebrow">ERROR 404</p>

                <h1>Página no encontrada</h1>

                <p className="intro-text">
                    La dirección que estás buscando no existe
                </p>

                <Link to="/" className="secondary-button">
                    Volver al inicio
                </Link>
            </section>
        </main>
    )
}

export default NotFoundPage