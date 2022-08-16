import { FilterData, ListBoxItem } from 'src/components'

import { FilterResponse } from './Catalogue'

interface QueryFilterResult {
  queryFilter: object[]
  vendor: string[]
  coffeeType: string[]
  accessoryType: string[]
  decaf: string[]
  beanType: string[]
  origin: string[]
  packageSize: string[]
  aroma: string[]
}

interface SortParams {
  sortKey?: string
  reverse?: boolean
}

export const getQueryFilter = (fData: FilterResponse, f: FilterData[]): QueryFilterResult => {
  const queryFilter: object[] = []
  const vendor: string[] = []
  const coffeeType: string[] = []
  const accessoryType: string[] = []
  const decaf: string[] = []
  const beanType: string[] = []
  const origin: string[] = []
  const packageSize: string[] = []
  const aroma: string[] = []
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
          filter.filterValuesSelected.forEach((filterValue) => {
            coffeeType.push(filterValue)
            queryFilter.push({
              productMetafield: { namespace: 'my_fields', key: 'coffee_type', value: `${filterValue}` },
            })
          })
          break
        case 'accessoryType':
          filter.filterValuesSelected.forEach((filterValue) => {
            accessoryType.push(filterValue)
            queryFilter.push({
              productMetafield: { namespace: 'my_fields', key: 'accessoryType', value: `${filterValue}` },
            })
          })
          break
        case 'decaf':
          filter.filterValuesSelected.forEach((filterValue) => {
            decaf.push(filterValue)
            queryFilter.push({
              productMetafield: { namespace: 'my_fields', key: 'decaf', value: `${filterValue}` },
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
          filter.filterValuesSelected.forEach((filterValue) => {
            origin.push(filterValue)
            queryFilter.push({
              productMetafield: { namespace: 'my_fields', key: 'origin', value: `${filterValue}` },
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
        case 'aroma':
          filter.filterValuesSelected.forEach((filterValue) => {
            aroma.push(filterValue)
            queryFilter.push({
              productMetafield: { namespace: 'my_fields', key: 'aroma', value: `${filterValue}` },
            })
          })
          break
      }
    }
  })

  return { queryFilter, vendor, coffeeType, accessoryType, decaf, beanType, origin, packageSize, aroma }
}

export const getFilterData = (
  filterInput: FilterResponse,
  coffeeType?: string[],
  accessoryType?: string[],
  decaf?: string[],
  beanType?: string[],
  vendor?: string[],
  origin?: string[],
  packageSize?: string[],
  aroma?: string[],
): FilterData[] => {
  const sortPackageSizes = (data: FilterResponse['packageSizes']) => {
    const preSort = data?.slice()
    const getSize = (size: string) => {
      return parseInt(size.replace('g', ''))
    }
    return preSort.sort((a, b) => (getSize(a) > getSize(b) ? 1 : -1))
  }

  return [
    {
      key: 'coffeeType',
      isOpen: false,
      filterType: 'enum',
      filterValues: filterInput.coffeeTypes,
      filterValuesSelected: coffeeType ? coffeeType : [],
    },
    {
      key: 'accessoryType',
      isOpen: false,
      filterType: 'enum',
      filterValues: filterInput.accessoryTypes,
      filterValuesSelected: accessoryType ? accessoryType : [],
    },
    {
      key: 'decaf',
      isOpen: false,
      filterType: 'enum',
      filterValues: ['false', 'true'],
      filterValuesSelected: decaf && decaf[0] === 'true' ? ['true'] : [],
    },
    {
      key: 'beanType',
      isOpen: false,
      filterType: 'enum',
      filterValues: filterInput.beanTypes,
      filterValuesSelected: beanType ? beanType : [],
    },
    {
      key: 'vendor',
      isOpen: false,
      filterType: 'enum',
      filterValues: filterInput.vendors,
      filterValuesSelected: vendor ? vendor : [],
    },
    {
      key: 'origin',
      isOpen: false,
      filterType: 'enum',
      filterValues: filterInput.origins,
      i18nValues: true,
      filterValuesSelected: origin ? origin : [],
    },
    {
      key: 'packageSize',
      isOpen: false,
      filterType: 'enum',
      filterValues: sortPackageSizes(filterInput.packageSizes),
      filterValuesSelected: packageSize ? packageSize : [],
    },
    {
      key: 'aroma',
      isOpen: false,
      filterType: 'enum',
      filterValues: filterInput.aromas,
      filterValuesSelected: aroma ? aroma : [],
    },
  ]
}

export const sortParamsToListBoxItem = (sortParamsValue: SortParams): ListBoxItem[] | undefined => {
  switch (sortParamsValue.sortKey) {
    case 'PRICE':
      return [
        {
          name: sortParamsValue.reverse ? 'priceDesc' : 'priceAsc',
          value: sortParamsValue.reverse ? 'priceDesc' : 'priceAsc',
        },
      ]
    case 'CREATED':
      return [
        {
          name: 'newDesc',
          value: 'newDesc',
        },
      ]
    default:
      return undefined
  }
}
