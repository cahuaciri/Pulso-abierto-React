import type { AppStatus } from '../types/app'

interface StatusMessageProps {
  status: AppStatus
  errorMessage?: string
  resultCount?: number
  onRetry?: () => void
}

function StatusMessage({
  status,
  errorMessage,
  resultCount = 0,
  onRetry,
}: StatusMessageProps) {
  if (status === 'initial') {
    return <p>Preparando consulta...</p>
  }

  if (status === 'loading') {
    return (
      <p role="status" aria-live="polite">
        Consultando cotizaciones...
      </p>
    )
  }

  if (status === 'error') {
    return (
      <div role="alert">
        <p>{errorMessage || 'No se pudieron cargar las cotizaciones.'}</p>
        <button type="button" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    )
  }

  if (status === 'empty') {
    return <p>No hay cotizaciones disponibles en este momento.</p>
  }

  if (status === 'success' && resultCount === 0) {
    return <p>No se encontraron cotizaciones que coincidan con los criterios de búsqueda.</p>
  }
  
  if (status === 'success') {
    return (
      <p role="status">
        Se encontraron {resultCount} criptomonedas.
      </p>
    )
  }

  return null
}

export default StatusMessage