import 'dotenv/config'
// For the default version
import algoliasearch from 'algoliasearch'

const attributesForFaceting = [
  'collections',
  'vendor',
  'meta.my_fields.coffee_type',
  'meta.my_fields.bean_type',
  'meta.my_fields.aroma',
  'meta.my_fields.decaf',
  'meta.my_fields.origin',
  'meta.my_fields.price_per_kg',
  'meta.my_fields.acidity',
  'meta.my_fields.bitterness',
  'meta.my_fields.sweetness',
  'meta.my_fields.body',
  'meta.my_fields.publishedToFrontend',
  'meta.my_fields.accessory_type'
]

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex('products')

index.setSettings({
  attributesForFaceting,
}, {
  forwardToReplicas: true
}).then(() => {
  console.log("Settings successfully updated.")
});
