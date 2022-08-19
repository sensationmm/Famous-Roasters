import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_BLOG_CATEGORY_LIST = loader('src/graphql/queries/blogCategoryListDetails.query.graphql')

export const BlogCategoryListMock = {
  request: {
    query: GET_BLOG_CATEGORY_LIST,
  },
  result: {
    data: {
      categoryList: [
        {
          __typename: 'Category',
          name: 'Kaffeewissen',
          summary: 'Werde zum Kaffee-Nerd. Unsere Experten erklären alles: Von Aroma bis Zubereitungsmethode.',
          tags: ['Nachhaltigkeit', 'SpecialityCoffee'],
        },
        {
          __typename: 'Category',
          name: 'Kaffeeequipment',
          summary:
            'Unsere Experten testen und bewerten das beste Kaffeeequipment. Wir wollen sicherstellen, dass du die beste Hardware für einen exzellenten Kaffee hast.',
          tags: ['Handfiltervergleich', 'Grundausstattung'],
        },
        {
          __typename: 'Category',
          name: 'Kaffeetrends',
          summary: 'Die aktuellsten Trends über die Kaffeewelt.',
          tags: ['Gadgets', 'Roestungen'],
        },
        {
          __typename: 'Category',
          name: 'Zubereitungstipps',
          summary:
            'Mach mehr aus deinem Kaffee: our experts prepared a few brewing guides to help you enjoy always the best coffee.',
          tags: ['Aeropress', 'Siebtraeger', 'ColdDrip'],
        },
      ],
    },
  },
}

export const BlogCategoryListMockError = {
  request: {
    query: GET_BLOG_CATEGORY_LIST,
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}
