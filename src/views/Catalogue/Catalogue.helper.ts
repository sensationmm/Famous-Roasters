import { Collection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { FilterData, ListBoxItem } from 'src/components'

interface QueryFilterResult {
  queryFilter: object[]
  vendor: string[]
  coffeeType: string[]
  beanType: string[]
  origin: string[]
  packageSize: string[]
}

interface SortParams {
  sortKey?: string
  reverse?: boolean
}

export const getQueryFilter = (fData: Collection, f: FilterData[]): QueryFilterResult => {
  const queryFilter: object[] = []
  const vendor: string[] = []
  const coffeeType: string[] = []
  const beanType: string[] = []
  const origin: string[] = []
  const packageSize: string[] = []
  f.forEach((filter) => {
    if (filter.filterValuesSelected && filter.filterValuesSelected?.length > 0) {
      switch (filter.key) {
        case 'vendor':
          filter.filterValuesSelected.forEach((filterValue) => {
            vendor.push(filterValue)
            queryFilter.push({ productVendor: `${filterValue}` })
          })
          break
        case 'coffeeType':
          filter.filterValuesSelected[0] !== 'none' &&
            filter.filterValuesSelected.forEach((filterValue) => {
              coffeeType.push(filterValue)
              queryFilter.push({
                productMetafield: { namespace: 'my_fields', key: 'coffee_type', value: `${filterValue}` },
              })
            })
          break
        case 'beanType':
          filter.filterValuesSelected.forEach((filterValue) => {
            beanType.push(filterValue)
            queryFilter.push({
              productMetafield: { namespace: 'my_fields', key: 'bean_type', value: `${filterValue}` },
            })
          })
          break
        case 'origin': {
          const originValues = Array.from(
            new Set(
              fData.products.nodes
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .map((productNode) => productNode['origin']?.value.replace(', ', ','))
                .flat()
                .filter((x) => x !== undefined)
                .sort(),
            ),
          )
          filter.filterValuesSelected.forEach((filterValue) => {
            origin.push(filterValue)
            originValues
              .filter((x) => x.indexOf(filterValue) !== -1)
              .forEach((fv) => {
                queryFilter.push({
                  productMetafield: { namespace: 'my_fields', key: 'origin', value: `${fv}` },
                })
              })
          })
          break
        }
        case 'packageSize':
          filter.filterValuesSelected.forEach((filterValue) => {
            packageSize.push(filterValue)
            queryFilter.push({
              variantMetafield: { namespace: 'my_fields', key: 'package_size', value: `${filterValue}` },
            })
          })
          break
      }
    }
  })

  return { queryFilter, vendor, coffeeType, beanType, origin, packageSize }
}

export const getFilterValues = (fData: Collection, key: string) => {
  switch (key) {
    case 'vendor':
      return Array.from(
        new Set(
          fData.products.nodes
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .map((productNode) => productNode.vendor)
            .flat()
            .filter((x) => x !== undefined)
            .sort(),
        ),
      )
    case 'origin': {
      const originMapping = Array.from(
        new Set(
          fData.products.nodes
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .map((productNode) => productNode['origin']?.value.replace(', ', ','))
            .flat()
            .filter((x) => x !== undefined)
            .sort(),
        ),
      )
      return Array.from(new Set(originMapping.map((value) => value.split(',')).flat())).sort()
    }
    case 'coffee_type':
      return Array.from(
        new Set(
          fData.products.nodes
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .map((productNode) => productNode['coffee_type']?.value)
            .flat()
            .filter((x) => x !== undefined)
            .sort(),
        ),
      )
    case 'bean_type':
      return Array.from(
        new Set(
          fData.products.nodes
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .map((productNode) => productNode['bean_type']?.value)
            .flat()
            .filter((x) => x !== undefined)
            .sort(),
        ),
      )
    case 'package_size':
      return Array.from(
        new Set(
          fData.products.nodes
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .map((productNode) => productNode.variants.nodes.map((variantNode) => variantNode['package_size']?.value))
            .flat()
            .sort((a, b) => (parseFloat(a) > parseFloat(b) ? 1 : -1)),
        ),
      )
  }
}

export const getFilterData = (
  filterInput: Collection,
  coffeeType?: string[],
  beanType?: string[],
  vendor?: string[],
  origin?: string[],
  packageSize?: string[],
): FilterData[] => {
  return [
    {
      key: 'coffeeType',
      isOpen: false,
      filterType: 'enum',
      filterValues: getFilterValues(filterInput, 'coffee_type'),
      filterValuesSelected: coffeeType ? coffeeType : [],
    },
    {
      key: 'beanType',
      isOpen: false,
      filterType: 'enum',
      filterValues: getFilterValues(filterInput, 'bean_type'),
      filterValuesSelected: beanType ? beanType : [],
    },
    {
      key: 'vendor',
      isOpen: false,
      filterType: 'enum',
      filterValues: getFilterValues(filterInput, 'vendor'),
      filterValuesSelected: vendor ? vendor : [],
    },
    {
      key: 'origin',
      isOpen: false,
      filterType: 'enum',
      filterValues: getFilterValues(filterInput, 'origin'),
      i18nValues: true,
      filterValuesSelected: origin ? origin : [],
    },
    {
      key: 'packageSize',
      isOpen: false,
      filterType: 'enum',
      filterValues: getFilterValues(filterInput, 'package_size'),
      filterValuesSelected: packageSize ? packageSize : [],
    },
  ]
}

export const sortParamsToListBoxItem = (sortParamsValue: SortParams): ListBoxItem[] | undefined => {
  switch (sortParamsValue.sortKey) {
    case 'PRICE':
      return [
        {
          name: sortParamsValue.reverse ? 'priceDesc' : 'priceAsc',
        },
      ]
    case 'CREATED':
      return [
        {
          name: 'newDesc',
        },
      ]
    default:
      return undefined
  }
}
