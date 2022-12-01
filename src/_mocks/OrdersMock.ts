import { loader } from 'graphql.macro'
const ORDERS = loader('src/graphql/queries/orders.query.graphql')
const ORDER = loader('src/graphql/queries/order.query.graphql')

export const OrderMock = {
  request: {
    query: ORDER,
  },
  result: {
    data: {
      orders: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Order/895370',
              name: '#131197',
              createdAt: '2022-08-11T13:37:56Z',
              displayFulfillmentStatus: 'FULFILLED',
              displayFinancialStatus: 'PAID',
              totalPriceSet: {
                shopMoney: {
                  amount: '3.9',
                  currencyCode: 'EUR',
                },
              },
              discountCode: 'BCG_DV',
              lineItems: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12770454372618',
                      title: 'Cycle Blend',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/specialty-coffee-espresso-cycle-blend-cycle-roasters-lubeck_20copy.webp?v=1655307920',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7655228899544',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655916421386',
                        title: '250g / Ganze Bohne',
                        price: '7.20',
                        weight: 250.0,
                        product: {
                          id: 'gid://shopify/Product/7655228899544',
                        },
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/LineItem/12766730879242',
                      title: 'Santiago',
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/SANTIAGO_Filter.webp?v=1657875982',
                      },
                      quantity: 1,
                      product: {
                        id: 'gid://shopify/Product/7659914100952',
                      },
                      variant: {
                        id: 'gid://shopify/ProductVariant/43655917502730',
                        title: '250g / Ganze Bohne',
                        price: '9.50',
                        weight: 0.3,
                        product: {
                          id: 'gid://shopify/Product/7659914100952',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
}

export const OrdersMock = {
  request: {
    query: ORDERS,
  },
  result: {
   data: {
      orders: {
         edges: [
            {
               node: {
                  id: "gid://shopify/Order/4391324024915",
                  name: "#60beans-1056",
                  createdAt: "2022-08-29T17:02:04Z",
                  displayFulfillmentStatus: "FULFILLED",
                  displayFinancialStatus: "PAID",
                  totalPriceSet: {
                     shopMoney: {
                        amount: "44.87",
                        currencyCode: "EUR"
                     }
                  },
                  discountCode: "ROB",
                  lineItems: {
                     edges: [
                        {
                           node: {
                              id: "gid://shopify/LineItem/11156395098195",
                              title: "Lord Voldemort",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/E.CO_.LORD_-1_a42893e8-5aac-4fc9-a320-fa9c68406524copy.webp?v=1662365500"
                              },
                              quantity:2,
                              product: {
                                 id: "gid://shopify/Product/6837561000019"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40194621767763",
                                 title: "Café en Grano / 250gr",
                                 price: "24.09",
                                 weight:250.0,
                                 inventoryQuantity:1,
                                 product: {
                                    id: "gid://shopify/Product/6837561000019"
                                 }
                              }
                           }
                        },
                        {
                           node: {
                              id: "gid://shopify/LineItem/11156395130963",
                              title: "Primavera Family",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/E.GU_.PRIM.webp?v=1662477989"
                              },
                              quantity:1,
                              product: {
                                 id: "gid://shopify/Product/6837562376275"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40194630910035",
                                 title: "Café en Grano / 250gr",
                                 price: "20.45",
                                 weight:250.0,
                                 inventoryQuantity:98,
                                 product: {
                                    id: "gid://shopify/Product/6837562376275"
                                 }
                              }
                           }
                        },
                        {
                           node: {
                              id: "gid://shopify/LineItem/11156395163731",
                              title: "Entre Ríos",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/E.CR_.ERW-1_a32c2e28-6725-4292-9438-7ec9fd598423.webp?v=1662477945"
                              },
                              quantity:1,
                              product: {
                                 id: "gid://shopify/Product/6837548580947"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40194558853203",
                                 title: "Café en Grano / 250gr",
                                 price: "19.55",
                                 weight:250.0,
                                 inventoryQuantity:0,
                                 product: {
                                    id: "gid://shopify/Product/6837548580947"
                                 }
                              }
                           }
                        }
                     ]
                  }
               }
            },
            {
               node: {
                  id: "gid://shopify/Order/4386125873235",
                  name: "#60beans-1004",
                  createdAt: "2022-08-25T13:53:23Z",
                  displayFulfillmentStatus: "FULFILLED",
                  displayFinancialStatus: "PAID",
                  totalPriceSet: {
                     shopMoney: {
                        amount: "3.9",
                        currencyCode: "EUR"
                     }
                  },
                  discountCode: "BCG_DV",
                  lineItems: {
                     edges: [
                        {
                           node: {
                              id: "gid://shopify/LineItem/11145829056595",
                              title: "Álfrún Blend",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/beans31199.webp?v=1662477481"
                              },
                              quantity:1,
                              product: {
                                 id: "gid://shopify/Product/6837428617299"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40194047049811",
                                 title: "1 kg",
                                 price: "35.90",
                                 weight:1000.0,
                                 inventoryQuantity:95,
                                 product: {
                                    id: "gid://shopify/Product/6837428617299"
                                 }
                              }
                           }
                        },
                        {
                           node: {
                              id: "gid://shopify/LineItem/11145829089363",
                              title: "Roadster's",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/Roadsters_250_52f3f12d-2796-442c-9388-99f33d4f8ef6.webp?v=1662478272"
                              },
                              quantity:1,
                              product: {
                                 id: "gid://shopify/Product/6837726052435"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40195698098259",
                                 title: "Beutel / 1kg / Beutel / Ganze Bohne",
                                 price: "36.00",
                                 weight:1030.0,
                                 inventoryQuantity:39997,
                                 product: {
                                    id: "gid://shopify/Product/6837726052435"
                                 }
                              }
                           }
                        }
                     ]
                  }
               }
            },
            {
               node: {
                  id: "gid://shopify/Order/4386021998675",
                  name: "#60beans-1003",
                  createdAt: "2022-08-25T11:56:26Z",
                  displayFulfillmentStatus: "UNFULFILLED",
                  displayFinancialStatus: "REFUNDED",
                  totalPriceSet: {
                     shopMoney: {
                        amount: "31.85",
                        currencyCode: "EUR"
                     }
                  },
                  discountCode: "ROB",
                  lineItems: {
                     edges: [
                        {
                           node: {
                              id: "gid://shopify/LineItem/11145611837523",
                              title: "Roadster's",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/Roadsters_250_52f3f12d-2796-442c-9388-99f33d4f8ef6.webp?v=1662478272"
                              },
                              quantity:1,
                              product: {
                                 id: "gid://shopify/Product/6837726052435"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40195698098259",
                                 title: "Beutel / 1kg / Beutel / Ganze Bohne",
                                 price: "36.00",
                                 weight:1030.0,
                                 inventoryQuantity:39997,
                                 product: {
                                    id: "gid://shopify/Product/6837726052435"
                                 }
                              }
                           }
                        },
                        {
                           node: {
                              id: "gid://shopify/LineItem/11145611870291",
                              title: "Álfrún Blend",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/beans31199.webp?v=1662477481"
                              },
                              quantity:1,
                              product: {
                                 id: "gid://shopify/Product/6837428617299"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40194051375187",
                                 title: "250 g",
                                 price: "9.50",
                                 weight:265.0,
                                 inventoryQuantity:90,
                                 product: {
                                    id: "gid://shopify/Product/6837428617299"
                                 }
                              }
                           }
                        }
                     ]
                  }
               }
            },
            {
               node: {
                  id: "gid://shopify/Order/4382313480275",
                  name: "#60beans-1001",
                  createdAt: "2022-08-22T12:46:22Z",
                  displayFulfillmentStatus: "UNFULFILLED",
                  displayFinancialStatus: "VOIDED",
                  totalPriceSet: {
                     shopMoney: {
                        amount: "24.55",
                        currencyCode: "EUR"
                     }
                  },
                  discountCode:null,
                  lineItems: {
                     edges: [
                        {
                           node: {
                              id: "gid://shopify/LineItem/11137895432275",
                              title: "The Lady",
                              image: {
                                 src: "https://cdn.shopify.com/s/files/1/0571/6036/8211/products/F.MY_.LADY_e0a9fb12-d5cb-4d7a-8245-d3b2961b3216.webp?v=1662477994"
                              },
                              quantity:1,
                              product: {
                                 id: "gid://shopify/Product/6837562671187"
                              },
                              variant: {
                                 id: "gid://shopify/ProductVariant/40194636316755",
                                 title: "Espresso / 250gr",
                                 price: "24.55",
                                 weight:250.0,
                                 inventoryQuantity:99,
                                 product: {
                                    id: "gid://shopify/Product/6837562671187"
                                 }
                              }
                           }
                        }
                     ]
                  }
               }
            }
         ]
      }
   },
   extensions: {
      cost: {
         requestedQueryCost:542,
         actualQueryCost:58,
         throttleStatus: {
            maximumAvailable:1000.0,
            currentlyAvailable:887,
            restoreRate:50.0
         }
      }
   }
}
}
