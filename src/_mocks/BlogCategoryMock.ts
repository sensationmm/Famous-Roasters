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
          summary:
            'Lever up your coffee-culture. Our expert will touch different topics: beans types, origins, cupping and many more...',
          tags: ['Nachhaltigkeit', 'SpecialityCoffee'],
        },
        {
          __typename: 'Category',
          name: 'Kaffeeequipment',
          summary:
            'Here our coffee experts test and review different equipment. They aim to cover from basic to more niche equipment.',
          tags: ['Handfiltervergleich', 'Grundausstattung'],
        },
        {
          __typename: 'Category',
          name: 'Kaffeetrends',
          summary:
            'Here our coffee experts test and review different equipment. They aim to cover from basic to more niche equipment.',
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
