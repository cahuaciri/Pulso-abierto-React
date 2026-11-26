
import type { Currency } from '../types/api'

export function formatCurrency(
    amount: number, 
    currency: Currency
): string {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency.toUpperCase(),
    }).format(amount)
}