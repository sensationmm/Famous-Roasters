export const TasteFinderMockEspresso = [
  {
    name: 'name',
    value: 'Juan',
  },
  {
    name: 'bitterness',
    value: '3',
  },
  {
    name: 'sweetness',
    value: '3',
  },
  {
    name: 'acidity',
    value: '3',
  },
  {
    name: 'body',
    value: '3',
  },
  {
    name: 'grindType',
    value: 'Espresso',
  },
  {
    name: 'adventurous',
    value: 'conservative',
  },
]

export const TasteFinderMockFilter = [
  ...TasteFinderMockEspresso,
  {
    name: 'grindType',
    value: 'Aeropress',
  },
]
