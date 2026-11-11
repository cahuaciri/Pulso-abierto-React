import { z } from 'zod'

export const querySchema = z.object({
  searchTerm: z
    .string()
    .trim()
    .min(2, 'Ingresá al menos 2 caracteres para buscar.'),

  selectedCurrency: z.enum(['usd', 'eur', 'ars'], {
    message: 'Seleccioná una moneda válida.',
  }),
})

export type QueryFormData = z.infer<typeof querySchema>
