// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import CryptoCard from './CryptoCard'
import { useFavouritesStore } from '../store/favoritesStore'

const bitcoin = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  price: 95000,
}

function renderCryptoCard() {
  return render(
    <MemoryRouter>
      <CryptoCard crypto={bitcoin} currency="usd" />
    </MemoryRouter>,
  )
}

describe('CryptoCard', () => {
  beforeEach(() => {
    useFavouritesStore.setState({ favouriteIds: [] })
    localStorage.clear()
  })

  it('permite marcar una criptomoneda como favorita', async () => {
    const user = userEvent.setup()

    renderCryptoCard()

    const favoriteButton = screen.getByRole('button', {
      name: '☆ Marcar favorita',
    })

    await user.click(favoriteButton)

    expect(
      screen.getByRole('button', { name: '★ Favorita' }),
    ).toHaveAttribute('aria-pressed', 'true')

    expect(
      useFavouritesStore.getState().favouriteIds,
    ).toContain('bitcoin')
  })

  it('permite quitar una criptomoneda de favoritos', async () => {
    const user = userEvent.setup()

    useFavouritesStore.setState({
      favouriteIds: ['bitcoin'],
    })

    renderCryptoCard()

    const favouriteButton = screen.getByRole('button', {
      name: '★ Favorita',
    })

    await user.click(favouriteButton)

    expect(
        screen.getByRole('button', { 
            name: '☆ Marcar favorita' 
        }),
    ).toHaveAttribute('aria-pressed', 'false')

    expect(
      useFavouritesStore.getState().favouriteIds,
    ).not.toContain('bitcoin')
  })
})


