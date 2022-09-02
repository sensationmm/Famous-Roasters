import { CurrentRefinementsConnectorParamsItem, getActiveFiltersCount } from './searchUtils'

describe('searchUtils', () => {
  describe('getActiveFiltersCount', () => {
    it('counts active filters', () => {
      const attributes = ['filter1', 'filter2']
      const items: CurrentRefinementsConnectorParamsItem[] = [
        { attribute: 'filter1', refinements: [{ value: '1' }, { value: '2' }] },
        { attribute: 'filter2', refinements: [{ value: '3' }] },
      ]

      expect(getActiveFiltersCount(attributes, items)).toEqual({
        activeFiltersCount: 2,
        activeFilters: {
          filter1: 2,
          filter2: 1,
        },
      })
    })

    it('counts active filters with tasteProfile filter', () => {
      const attributes = ['filter1', 'filter2', 'tasteProfile']
      const items: CurrentRefinementsConnectorParamsItem[] = [
        { attribute: 'filter1', refinements: [{ value: '1' }, { value: '2' }] },
        { attribute: 'filter2', refinements: [{ value: '3' }] },
        { attribute: 'meta.my_fields.acidity', refinements: [{ value: '7' }, { value: '8' }, { value: '9' }] },
        { attribute: 'meta.my_fields.bitterness', refinements: [{ value: '1' }, { value: '2' }, { value: '3' }] },
        { attribute: 'meta.my_fields.body', refinements: [{ value: '1' }, { value: '2' }, { value: '3' }] },
      ]

      expect(getActiveFiltersCount(attributes, items)).toEqual({
        activeFiltersCount: 3,
        activeFilters: {
          filter1: 2,
          filter2: 1,
          tasteProfile: 3,
        },
      })
    })
  })
})
