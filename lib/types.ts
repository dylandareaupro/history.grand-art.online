export interface Artwork {
  id: string
  artist: string
  title: string
  location: string
  city: string
  date: string
  imageUrl: string
  aspectRatio: number // width / height
  collectionId: string
  themeIds: string[]
}

export interface Artist {
  id: string
  name: string
  count: number
}

export interface Museum {
  id: string
  name: string
  city: string
  country: string
  count: number
}

export interface Collection {
  id: string
  country: string
  count: number
  museums: Museum[]
}

export interface Theme {
  id: string
  name: string
  count: number
}

export interface FilterState {
  artistId: string | null
  collectionId: string | null
  themeId: string | null
}

export type FilterType = 'artistes' | 'collections' | 'themes'
