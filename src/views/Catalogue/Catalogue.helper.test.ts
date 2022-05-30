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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(getFilterData(FilterAttributesMock.result.data, undefined, undefined, undefined, undefined)).toEqual([
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
          filterValues: ['Cycle Roasters', 'WeBean'],
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
      ])
    })

    it('Works with values', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(
        getFilterData(FilterAttributesMock.result.data, ['Arabica'], ['Cycle Roasters'], ['BR'], ['500g']),
      ).toEqual([
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
          filterValues: ['Cycle Roasters', 'WeBean'],
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
      ])
    })
  })
})
