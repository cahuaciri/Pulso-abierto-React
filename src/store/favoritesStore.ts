import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface FavouritesState {
  favouriteIds: string[]
  toggleFavourite: (id: string) => void
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set) => ({
      favouriteIds: [],

      toggleFavourite: (id) =>
        set((state) => ({
          favouriteIds: state.favouriteIds.includes(id)
            ? state.favouriteIds.filter(
                (favouriteId) => favouriteId !== id,
              )
            : [...state.favouriteIds, id],
        })),
    }),
    {
      name: 'pulso-abierto-favorites',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favouriteIds: state.favouriteIds,
      }),
    },
  ),
)