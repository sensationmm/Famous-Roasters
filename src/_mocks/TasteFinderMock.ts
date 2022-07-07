import { loader } from 'graphql.macro'

const GET_TASTE_FINDER_RECOMMENDATION = loader('src/graphql/queries/tasteFinderRecommendation.query.graphql')

export const TasteFinderMockEspresso = [
  {
    name: 'name',
    value: 'Juan',
  },
  {
    name: 'bitterness',
    value: '2',
  },
  {
    name: 'sweetness',
    value: '2',
  },
  {
    name: 'acidity',
    value: '2',
  },
  {
    name: 'body',
    value: '2',
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
  ...TasteFinderMockEspresso.filter((x) => x.name !== 'grindType'),
  {
    name: 'grindType',
    value: 'Aeropress',
  },
]

export const TasteFinderMockQueryEspresso = {
  request: {
    query: GET_TASTE_FINDER_RECOMMENDATION,
    variables: {
      profile: {
        acidity: 5,
        bitterness: 5,
        body: 5,
        coffeeType: 'ESPRESSO',
        sweetness: 5,
      },
    },
  },
  result: {
    data: {
      tasteFinderRecommendation: {
        recommendations: [
          {
            shopifyId: '7655228866776',
            score: 0.9814814814814815,
            acidity: 4,
            bitterness: 1,
            sweetness: 2,
            body: 3,
          },
        ],
      },
    },
  },
}

export const TasteFinderMockQueryFilter = {
  request: {
    query: GET_TASTE_FINDER_RECOMMENDATION,
    variables: {
      profile: {
        acidity: 5,
        bitterness: 5,
        body: 5,
        coffeeType: 'FILTER',
        sweetness: 5,
      },
    },
  },
  result: {
    data: {
      tasteFinderRecommendation: {
        recommendations: [
          {
            shopifyId: '7655228866776',
            score: 0.9814814814814815,
            acidity: 4,
            bitterness: 1,
            sweetness: 2,
            body: 3,
          },
        ],
      },
    },
  },
}
