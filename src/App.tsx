import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import CryptoDetailPage from './pages/CryptoDetailPage'
import NotFoundPage from './pages/NotFoundPage'

import './index.css'

function App() {
  return (
      <BrowserRouter>
          <header className="site-header">
              <div className="container header-content">
                  <Link to="/" className="brand">
                      <span className="brand-icon" aria-hidden="true">
                          ₿
                      </span>
                      <span>Pulso Abierto</span>
                  </Link>

                  <p className="header-label">
                      Cotizaciones del mercado cripto
                  </p>
              </div>
          </header>

          <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                  path="/criptomonedas/:id"
                  element={<CryptoDetailPage />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <footer className="site-footer">
              <div className="container footer-content">
                <p>© {new Date().getFullYear()} Pulso Abierto.</p>
                <p>Datos proporcionados por CoinGecko.</p>
              </div>
            </footer>
        </BrowserRouter>
    )
}

export default App