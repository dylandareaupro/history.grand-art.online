'use client'

import { useFilters } from '@/hooks/useFilters'
import { Header } from '@/components/header/Header'
import { MasonryGallery } from '@/components/gallery/MasonryGallery'

export default function GalleriePage() {
  const {
    filters,
    openPanels,
    filteredArtworks,
    availableArtists,
    availableCollections,
    availableThemes,
    selectedArtist,
    selectedCollection,
    selectedMuseum,
    selectedTheme,
    toggleArtist,
    toggleCollection,
    toggleTheme,
    resetFilter,
    togglePanel,
    closeAllPanels,
  } = useFilters()

  return (
    <main className="flex flex-col items-center px-[clamp(40px,7.3vw,94px)] bg-[#fafafa] min-h-screen">
      <Header
        artworkCount={filteredArtworks.length}
        openPanels={openPanels}
        artists={availableArtists}
        collections={availableCollections}
        themes={availableThemes}
        selectedArtistId={filters.artistId}
        selectedCollectionId={filters.collectionId}
        selectedThemeId={filters.themeId}
        selectedArtistLabel={selectedArtist?.name ?? null}
        selectedCollectionLabel={selectedMuseum?.name ?? selectedCollection?.country ?? null}
        selectedThemeLabel={selectedTheme?.name ?? null}
        onTogglePanel={togglePanel}
        onCloseAllPanels={closeAllPanels}
        onToggleArtist={toggleArtist}
        onToggleCollection={toggleCollection}
        onToggleTheme={toggleTheme}
        onResetFilter={resetFilter}
      />
      <MasonryGallery
        artworks={filteredArtworks}
        dimmed={!!(filters.artistId || filters.collectionId || filters.themeId)}
      />
    </main>
  )
}
