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
        aroma: null,
        newsletterSignup: false,
        tasteFinderProfile: {
          acidity: 1,
          bitterness: 2,
          body: 3,
          sweetness: 4,
          coffeeType: 'ESPRESSO',
        },
      },
    },
  },
}
