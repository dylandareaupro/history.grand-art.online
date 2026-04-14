import type { Artwork, Artist, Collection, Theme, FilterState } from './types'
import { artists, collections, themes } from './mock-data'

// Normalise une chaîne pour la comparaison : minuscules + suppression des diacritiques
function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// Map nom normalisé → id pour la résolution artiste
const artistByNormalizedName = new Map<string, string>()
artists.forEach((a) => artistByNormalizedName.set(normalize(a.name), a.id))

export function getFilteredArtworks(artworks: Artwork[], filters: FilterState): Artwork[] {
  return artworks.filter((artwork) => {
    if (filters.artistId) {
      const artist = artists.find((a) => a.id === filters.artistId)
      if (!artist || normalize(artwork.artist) !== normalize(artist.name)) return false
    }
    if (filters.collectionId) {
      const parentCollection = collections.find((c) => c.id === filters.collectionId)
      if (parentCollection) {
        // Country-level filter: match any museum in that country
        const museumIds = new Set(parentCollection.museums.map((m) => m.id))
        if (!museumIds.has(artwork.collectionId)) return false
      } else {
        // Museum-level filter: exact match
        if (artwork.collectionId !== filters.collectionId) return false
      }
    }
    if (filters.themeId && !artwork.themeIds.includes(filters.themeId)) {
      return false
    }
    return true
  })
}

// Recompute counts based on active filters (for cross-filtering)
export function getAvailableArtists(artworks: Artwork[], filters: FilterState): Artist[] {
  const activeFilters = { ...filters, artistId: null }
  const filtered = getFilteredArtworks(artworks, activeFilters)

  const counts = new Map<string, number>()
  filtered.forEach((artwork) => {
    const artistId = artistByNormalizedName.get(normalize(artwork.artist))
    if (artistId) counts.set(artistId, (counts.get(artistId) ?? 0) + 1)
  })

  return artists
    .map((a) => ({ ...a, count: counts.get(a.id) ?? 0 }))
    .filter((a) => a.count > 0)
    .sort((a, b) => b.count - a.count)
}

export function getAvailableCollections(artworks: Artwork[], filters: FilterState): Collection[] {
  const activeFilters = { ...filters, collectionId: null }
  const filtered = getFilteredArtworks(artworks, activeFilters)

  const collectionCounts = new Map<string, number>()
  filtered.forEach((artwork) => {
    collectionCounts.set(artwork.collectionId, (collectionCounts.get(artwork.collectionId) ?? 0) + 1)
  })

  return collections
    .map((col) => {
      const count = collectionCounts.get(col.id) ?? 0
      const colFiltered = filtered.filter((a) => a.collectionId === col.id)

      const museumCounts = new Map<string, number>()
      colFiltered.forEach((a) => {
        museumCounts.set(a.location, (museumCounts.get(a.location) ?? 0) + 1)
      })

      const museums = col.museums
        .map((m) => ({ ...m, count: museumCounts.get(m.name) ?? 0 }))
        .filter((m) => m.count > 0)
        .sort((a, b) => b.count - a.count)

      return { ...col, count, museums }
    })
    .filter((col) => col.count > 0)
    .sort((a, b) => b.count - a.count)
}

export function getAvailableThemes(artworks: Artwork[], filters: FilterState): Theme[] {
  const activeFilters = { ...filters, themeId: null }
  const filtered = getFilteredArtworks(artworks, activeFilters)

  const counts = new Map<string, number>()
  filtered.forEach((artwork) => {
    artwork.themeIds.forEach((tid) => {
      counts.set(tid, (counts.get(tid) ?? 0) + 1)
    })
  })

  return themes
    .map((t) => ({ ...t, count: counts.get(t.id) ?? 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)
}
