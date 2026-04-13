import type { Artwork, Artist, Collection, Theme } from './types'

export const artists: Artist[] = [
  { id: 'titien', name: 'Titien', count: 130 },
  { id: 'pontormo', name: 'Pontormo', count: 63 },
  { id: 'caravage', name: 'Caravage', count: 62 },
  { id: 'bosch', name: 'Bosch', count: 48 },
  { id: 'la-tour', name: 'La Tour', count: 41 },
  { id: 'mantegna', name: 'Mantegna', count: 40 },
  { id: 'raphael', name: 'Raphaël', count: 38 },
  { id: 'botticelli', name: 'Botticelli', count: 35 },
  { id: 'leonard', name: 'Léonard de Vinci', count: 31 },
  { id: 'rubens', name: 'Rubens', count: 28 },
  { id: 'rembrandt', name: 'Rembrandt', count: 26 },
  { id: 'velazquez', name: 'Vélazquez', count: 22 },
  { id: 'vermeer', name: 'Vermeer', count: 18 },
  { id: 'poussin', name: 'Poussin', count: 14 },
]

export const collections: Collection[] = [
  {
    id: 'espagne',
    country: 'Espagne',
    count: 53,
    museums: [
      { id: 'prado', name: 'Prado', city: 'Madrid', country: 'Espagne', count: 26 },
      { id: 'escorial', name: 'San Lorenzo | Escorial', city: 'Escorial', country: 'Espagne', count: 4 },
      { id: 'thyssen', name: 'Thyssen', city: 'Madrid', country: 'Espagne', count: 2 },
      { id: 'mnac', name: 'MNAC | Barcelone', city: 'Barcelone', country: 'Espagne', count: 1 },
    ],
  },
  {
    id: 'italie',
    country: 'Italie',
    count: 21,
    museums: [
      { id: 'borghese', name: 'Gal. Borghese', city: 'Rome', country: 'Italie', count: 9 },
      { id: 'uffizi', name: 'Uffizi', city: 'Florence', country: 'Italie', count: 7 },
      { id: 'accademia', name: 'Accademia', city: 'Venise', country: 'Italie', count: 5 },
    ],
  },
  {
    id: 'autriche',
    country: 'Autriche',
    count: 18,
    museums: [
      { id: 'kunsthistorisches', name: 'Kunsthistorisches Museum', city: 'Vienne', country: 'Autriche', count: 18 },
    ],
  },
  {
    id: 'france',
    country: 'France',
    count: 16,
    museums: [
      { id: 'louvre', name: 'Louvre', city: 'Paris', country: 'France', count: 12 },
      { id: 'orsay', name: "Musée d'Orsay", city: 'Paris', country: 'France', count: 4 },
    ],
  },
  {
    id: 'royaume-uni',
    country: 'Royaume-Uni',
    count: 14,
    museums: [
      { id: 'national-gallery', name: 'National Gallery', city: 'Londres', country: 'Royaume-Uni', count: 9 },
      { id: 'victoria-albert', name: 'Victoria & Albert', city: 'Londres', country: 'Royaume-Uni', count: 5 },
    ],
  },
  {
    id: 'pays-bas',
    country: 'Pays-Bas',
    count: 11,
    museums: [
      { id: 'rijksmuseum', name: 'Rijksmuseum', city: 'Amsterdam', country: 'Pays-Bas', count: 11 },
    ],
  },
]

export const themes: Theme[] = [
  { id: 'mythologie', name: 'Mythologie', count: 87 },
  { id: 'portrait', name: 'Portrait', count: 74 },
  { id: 'religion', name: 'Religion', count: 68 },
  { id: 'nature-morte', name: 'Nature morte', count: 45 },
  { id: 'paysage', name: 'Paysage', count: 38 },
  { id: 'allegorie', name: 'Allégorie', count: 32 },
  { id: 'scene-genre', name: 'Scène de genre', count: 29 },
  { id: 'nu', name: 'Nu', count: 21 },
  { id: 'histoire', name: 'Histoire', count: 18 },
  { id: 'vanite', name: 'Vanité', count: 12 },
]

// Images du design Figma avec leurs ratios exacts (width/height)
const FIGMA_IMAGES = [
  { url: 'https://www.figma.com/api/mcp/asset/bb3210c7-6889-4a72-aeee-6a9891e2570a', ratio: 1200 / 506 },  // 0 — paysage large
  { url: 'https://www.figma.com/api/mcp/asset/83583fc6-8d3b-494e-9f98-73a7c6139063', ratio: 1200 / 545 },  // 1 — paysage
  { url: 'https://www.figma.com/api/mcp/asset/ec800a66-a392-4092-a30e-c89b18744a69', ratio: 1200 / 552 },  // 2 — paysage
  { url: 'https://www.figma.com/api/mcp/asset/53a77627-9131-4195-a7fa-57aa85c129b5', ratio: 1200 / 597 },  // 3 — paysage carré-ish
  { url: 'https://www.figma.com/api/mcp/asset/bdfe28ea-5851-4235-baf7-fe2a467dac18', ratio: 1200 / 981 },  // 4 — quasi-carré
  { url: 'https://www.figma.com/api/mcp/asset/27c95bf3-8078-4218-8b39-eb49f6325c80', ratio: 1200 / 974 },  // 5 — quasi-carré
  { url: 'https://www.figma.com/api/mcp/asset/025a8525-b7d8-4621-9576-983463f87284', ratio: 1200 / 966 },  // 6 — quasi-carré
  { url: 'https://www.figma.com/api/mcp/asset/062e25bc-686a-48a7-9c98-b5e9f6fb0faf', ratio: 235 / 272 },   // 7 — portrait léger
  { url: 'https://www.figma.com/api/mcp/asset/a358442e-69c2-4cc8-b879-fbdce52a1e1d', ratio: 235 / 275 },   // 8 — portrait
  { url: 'https://www.figma.com/api/mcp/asset/530f36a2-a5e0-4d45-a4cf-508ec184c56e', ratio: 235 / 275 },   // 9 — portrait
  { url: 'https://www.figma.com/api/mcp/asset/976aa480-c911-4fc2-921a-6c0ae364cfb2', ratio: 2252 / 2906 }, // 10 — portrait allongé
  { url: 'https://www.figma.com/api/mcp/asset/17322eb7-18ab-4d4e-8dfe-11a58e1bea0d', ratio: 1532 / 1969 }, // 11 — portrait allongé
  { url: 'https://www.figma.com/api/mcp/asset/193fa4b7-510e-4fb2-a493-4471a9edfb62', ratio: 2547 / 3283 }, // 12 — portrait allongé
  { url: 'https://www.figma.com/api/mcp/asset/c57f79ea-db18-445e-abce-97c07c1b8c15', ratio: 489 / 1500 },  // 13 — portrait très étroit
  { url: 'https://www.figma.com/api/mcp/asset/11877330-86d8-492d-a7c3-04ce7d1c562d', ratio: 1781 / 4096 }, // 14 — portrait très étroit
]

function img(index: number) {
  return FIGMA_IMAGES[index % FIGMA_IMAGES.length]
}

export const artworks: Artwork[] = [
  // Ligne 1 de chaque colonne
  { id: '1',  artist: 'Titien',          title: 'Amour sacré, amour profane',   location: 'Gal. Borghese', city: 'Rome',      date: '1515-16', imageUrl: img(0).url,  aspectRatio: img(0).ratio,  collectionId: 'italie',      themeIds: ['mythologie', 'allegorie'] },
  { id: '2',  artist: 'Titien',          title: 'La Vénus d\'Urbin',            location: 'Uffizi',        city: 'Florence',  date: '1538',    imageUrl: img(4).url,  aspectRatio: img(4).ratio,  collectionId: 'italie',      themeIds: ['nu', 'mythologie'] },
  { id: '3',  artist: 'Caravage',        title: 'Judith et Holopherne',         location: 'Gal. Borghese', city: 'Rome',      date: '1598-99', imageUrl: img(7).url,  aspectRatio: img(7).ratio,  collectionId: 'italie',      themeIds: ['religion', 'histoire'] },
  { id: '4',  artist: 'Titien',          title: 'Charles Quint à Mühlberg',     location: 'Prado',         city: 'Madrid',    date: '1548',    imageUrl: img(10).url, aspectRatio: img(10).ratio, collectionId: 'espagne',     themeIds: ['portrait', 'histoire'] },
  { id: '5',  artist: 'Velazquez',       title: 'Las Meninas',                  location: 'Prado',         city: 'Madrid',    date: '1656',    imageUrl: img(13).url, aspectRatio: img(13).ratio, collectionId: 'espagne',     themeIds: ['portrait', 'scene-genre'] },

  // Ligne 2
  { id: '6',  artist: 'Titien',          title: 'Bacchus et Ariane',            location: 'National Gallery', city: 'Londres', date: '1520-23', imageUrl: img(1).url,  aspectRatio: img(1).ratio,  collectionId: 'royaume-uni', themeIds: ['mythologie'] },
  { id: '7',  artist: 'Bosch',           title: 'Le Jardin des délices',        location: 'Prado',         city: 'Madrid',    date: '1490-1510', imageUrl: img(5).url, aspectRatio: img(5).ratio,  collectionId: 'espagne',     themeIds: ['religion', 'allegorie'] },
  { id: '8',  artist: 'Pontormo',        title: 'Déposition de croix',          location: 'Santa Felicita',city: 'Florence',  date: '1525-28', imageUrl: img(8).url,  aspectRatio: img(8).ratio,  collectionId: 'italie',      themeIds: ['religion'] },
  { id: '9',  artist: 'Rembrandt',       title: 'La Ronde de nuit',             location: 'Rijksmuseum',   city: 'Amsterdam', date: '1642',    imageUrl: img(11).url, aspectRatio: img(11).ratio, collectionId: 'pays-bas',    themeIds: ['portrait', 'histoire'] },
  { id: '10', artist: 'Vermeer',         title: 'La Jeune Fille à la perle',    location: 'Mauritshuis',   city: 'La Haye',   date: '1665',    imageUrl: img(14).url, aspectRatio: img(14).ratio, collectionId: 'pays-bas',    themeIds: ['portrait'] },

  // Ligne 3
  { id: '11', artist: 'Titien',          title: 'La Piétà',                     location: 'Accademia',     city: 'Venise',    date: '1576',    imageUrl: img(2).url,  aspectRatio: img(2).ratio,  collectionId: 'italie',      themeIds: ['religion'] },
  { id: '12', artist: 'Mantegna',        title: 'Le Christ mort',               location: 'Brera',         city: 'Milan',     date: '1480',    imageUrl: img(6).url,  aspectRatio: img(6).ratio,  collectionId: 'italie',      themeIds: ['religion'] },
  { id: '13', artist: 'Raphaël',         title: 'La Fornarina',                 location: 'Gal. Borghese', city: 'Rome',      date: '1519-20', imageUrl: img(9).url,  aspectRatio: img(9).ratio,  collectionId: 'italie',      themeIds: ['portrait'] },
  { id: '14', artist: 'Caravage',        title: 'Saint Matthieu et l\'Ange',    location: 'San Luigi',     city: 'Rome',      date: '1599-1600', imageUrl: img(12).url, aspectRatio: img(12).ratio, collectionId: 'italie',   themeIds: ['religion'] },
  { id: '15', artist: 'La Tour',         title: 'La Madeleine à la veilleuse',  location: 'Louvre',        city: 'Paris',     date: '1640-45', imageUrl: img(0).url,  aspectRatio: img(0).ratio,  collectionId: 'france',      themeIds: ['religion', 'allegorie'] },

  // Ligne 4
  { id: '16', artist: 'Botticelli',      title: 'La Naissance de Vénus',        location: 'Uffizi',        city: 'Florence',  date: '1484-86', imageUrl: img(3).url,  aspectRatio: img(3).ratio,  collectionId: 'italie',      themeIds: ['mythologie', 'nu'] },
  { id: '17', artist: 'Rubens',          title: 'Les Trois Grâces',             location: 'Prado',         city: 'Madrid',    date: '1635',    imageUrl: img(4).url,  aspectRatio: img(4).ratio,  collectionId: 'espagne',     themeIds: ['mythologie', 'nu'] },
  { id: '18', artist: 'Léonard de Vinci', title: 'La Vierge aux rochers',      location: 'Louvre',        city: 'Paris',     date: '1483-86', imageUrl: img(7).url,  aspectRatio: img(7).ratio,  collectionId: 'france',      themeIds: ['religion'] },
  { id: '19', artist: 'Titien',          title: 'L\'Assomption',               location: 'Accademia',     city: 'Venise',    date: '1516-18', imageUrl: img(10).url, aspectRatio: img(10).ratio, collectionId: 'italie',      themeIds: ['religion'] },
  { id: '20', artist: 'Poussin',         title: 'Les Bergers d\'Arcadie',       location: 'Louvre',        city: 'Paris',     date: '1637-38', imageUrl: img(13).url, aspectRatio: img(13).ratio, collectionId: 'france',      themeIds: ['allegorie', 'paysage'] },

  // Ligne 5
  { id: '21', artist: 'Caravage',        title: 'La Vocation de Saint Matthieu',location: 'San Luigi',     city: 'Rome',      date: '1600',    imageUrl: img(1).url,  aspectRatio: img(1).ratio,  collectionId: 'italie',      themeIds: ['religion'] },
  { id: '22', artist: 'Pontormo',        title: 'Portrait de Cosme l\'Ancien',  location: 'Uffizi',        city: 'Florence',  date: '1518',    imageUrl: img(5).url,  aspectRatio: img(5).ratio,  collectionId: 'italie',      themeIds: ['portrait'] },
  { id: '23', artist: 'Mantegna',        title: 'Triomphe de César',            location: 'Hampton Court', city: 'Londres',   date: '1484-92', imageUrl: img(8).url,  aspectRatio: img(8).ratio,  collectionId: 'royaume-uni', themeIds: ['histoire'] },
  { id: '24', artist: 'Raphaël',         title: 'L\'École d\'Athènes',          location: 'Vatican',       city: 'Rome',      date: '1509-11', imageUrl: img(11).url, aspectRatio: img(11).ratio, collectionId: 'italie',      themeIds: ['histoire', 'allegorie'] },
  { id: '25', artist: 'Velazquez',       title: 'La Reddition de Breda',        location: 'Prado',         city: 'Madrid',    date: '1635',    imageUrl: img(14).url, aspectRatio: img(14).ratio, collectionId: 'espagne',     themeIds: ['histoire'] },
]
