import { loader } from 'graphql.macro'
const USER_PROFILE = loader('src/graphql/queries/userProfile.query.graphql')

export const UserProfileMock = {
  request: {
    query: USER_PROFILE,
  },
  result: {
    data: {
      userProfile: {
        id: '123456789',
        email: 'test@test.com',
        aroma: '',
        newsletterSignup: false,
        tasteFinderProfile: {
          acidity: 1,
          bitterness: 2,
          body: 3,
          sweetness: 4,
          coffeeType: 'ESPRESSO',
        },
        ratedProducts: [{ shopifyId: '7655228899544', rating: 4 }],
        shipping: {
          firstName: 'adsdas',
          lastName: 'adsdas',
          company: 'adsdas',
          street: 'adsdas',
          additionalInfo: 'adsdas',
          zipCode: 'adsdas',
          city: 'adsdas',
          country: 'adsdas',
        }
      },
    },
  },
}
