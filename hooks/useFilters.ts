'use client'

import { useState, useMemo } from 'react'
import type { FilterState, FilterType } from '@/lib/types'
import { artworks } from '@/lib/mock-data'
import {
  getFilteredArtworks,
  getAvailableArtists,
  getAvailableCollections,
  getAvailableThemes,
} from '@/lib/filter-utils'

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    artistId: null,
    collectionId: null,
    themeId: null,
  })

  const [openPanels, setOpenPanels] = useState<FilterType[]>([])

  const filteredArtworks = useMemo(
    () => getFilteredArtworks(artworks, filters),
    [filters]
  )

  const availableArtists = useMemo(
    () => getAvailableArtists(artworks, filters),
    [filters]
  )

  const availableCollections = useMemo(
    () => getAvailableCollections(artworks, filters),
    [filters]
  )

  const availableThemes = useMemo(
    () => getAvailableThemes(artworks, filters),
    [filters]
  )

  function toggleArtist(id: string) {
    setFilters((f) => ({ ...f, artistId: f.artistId === id ? null : id }))
  }

  function toggleCollection(id: string) {
    setFilters((f) => ({ ...f, collectionId: f.collectionId === id ? null : id }))
  }

  function toggleTheme(id: string) {
    setFilters((f) => ({ ...f, themeId: f.themeId === id ? null : id }))
  }

  function resetFilter(type: FilterType) {
    if (type === 'artistes') setFilters((f) => ({ ...f, artistId: null }))
    if (type === 'collections') setFilters((f) => ({ ...f, collectionId: null }))
    if (type === 'themes') setFilters((f) => ({ ...f, themeId: null }))
  }

  function togglePanel(type: FilterType) {
    setOpenPanels((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  function closeAllPanels() {
    setOpenPanels([])
  }

  const selectedArtist = availableArtists.find((a) => a.id === filters.artistId) ?? null
  const selectedCollection = availableCollections.find((c) => c.id === filters.collectionId) ?? null
  const selectedTheme = availableThemes.find((t) => t.id === filters.themeId) ?? null

  return {
    filters,
    openPanels,
    filteredArtworks,
    availableArtists,
    availableCollections,
    availableThemes,
    selectedArtist,
    selectedCollection,
    selectedTheme,
    toggleArtist,
    toggleCollection,
    toggleTheme,
    resetFilter,
    togglePanel,
    closeAllPanels,
  }
}
