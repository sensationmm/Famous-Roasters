import { FilterAttributesMock } from 'src/_mocks'

import { getFilterData, sortParamsToListBoxItem } from '.'

describe('Catalogue helper', () => {
  describe('Sort params to listbox item helper', () => {
    it('Works for price asc', () => {
      expect(sortParamsToListBoxItem({ sortKey: 'PRICE' })).toEqual([
        {
          name: 'priceAsc',
        },
      ])
    })

    it('Works for price desc', () => {
      expect(sortParamsToListBoxItem({ sortKey: 'PRICE', reverse: true })).toEqual([
        {
          name: 'priceDesc',
        },
      ])
    })

    it('Works for created', () => {
      expect(sortParamsToListBoxItem({ sortKey: 'CREATED' })).toEqual([
        {
          name: 'newDesc',
        },
      ])
    })

    it('Works for default', () => {
      expect(sortParamsToListBoxItem({ sortKey: 'OTHER' })).toEqual(undefined)
    })
  })

  describe('Filter data helper', () => {
    it('Works without values', () => {
      expect(
        getFilterData(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          FilterAttributesMock.result.data.filterDictionaries,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ),
      ).toEqual([
        {
          key: 'coffeeType',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Espresso', 'Filter'],
          filterValuesSelected: [],
        },
        {
          key: 'accessoryType',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Filters', 'Refills'],
          filterValuesSelected: [],
        },
        {
          key: 'decaf',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['false', 'true'],
          filterValuesSelected: [],
        },
        {
          key: 'beanType',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Arabica'],
          filterValuesSelected: [],
        },
        {
          key: 'vendor',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['60beans', 'Cycle Roasters'],
          filterValuesSelected: [],
        },
        {
          key: 'origin',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['BR', 'CO'],
          i18nValues: true,
          filterValuesSelected: [],
        },
        {
          key: 'packageSize',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['250g', '500g', '1000g'],
          filterValuesSelected: [],
        },
        {
          key: 'aroma',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Floral & leicht', 'Fruchtig & lebhaft'],
          filterValuesSelected: [],
        },
      ])
    })

    it('Works with values', () => {
      expect(
        getFilterData(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          FilterAttributesMock.result.data.filterDictionaries,
          ['Filter'],
          ['Refills'],
          ['true'],
          ['Arabica'],
          ['Cycle Roasters'],
          ['BR'],
          ['500g'],
          ['Floral & leicht'],
        ),
      ).toEqual([
        {
          key: 'coffeeType',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Espresso', 'Filter'],
          filterValuesSelected: ['Filter'],
        },
        {
          key: 'accessoryType',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Filters', 'Refills'],
          filterValuesSelected: ['Refills'],
        },
        {
          key: 'decaf',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['false', 'true'],
          filterValuesSelected: ['true'],
        },
        {
          key: 'beanType',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Arabica'],
          filterValuesSelected: ['Arabica'],
        },
        {
          key: 'vendor',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['60beans', 'Cycle Roasters'],
          filterValuesSelected: ['Cycle Roasters'],
        },
        {
          key: 'origin',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['BR', 'CO'],
          i18nValues: true,
          filterValuesSelected: ['BR'],
        },
        {
          key: 'packageSize',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['250g', '500g', '1000g'],
          filterValuesSelected: ['500g'],
        },
        {
          key: 'aroma',
          isOpen: false,
          filterType: 'enum',
          filterValues: ['Floral & leicht', 'Fruchtig & lebhaft'],
          filterValuesSelected: ['Floral & leicht'],
        },
      ])
    })
  })
})
