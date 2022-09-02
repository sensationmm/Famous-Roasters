import intersection from 'lodash/intersection'

import { tasteProfileAttributes } from './AromaFilter'

/**
 * Simplified model of the type with the same name in `react-instantsearch-hooks` which isn't exported.
 * Represents a filter and its refinements
 */
export type CurrentRefinementsConnectorParamsItem = {
  attribute: string
  refinements: CurrentRefinementsConnectorParamsRefinement[]
}

/**
 * Simplified model of the type with the same name in `react-instantsearch-hooks` which isn't exported.
 * Represents a filter value
 */
export type CurrentRefinementsConnectorParamsRefinement = {
  value: string | number
}

export type ActiveFiltersCount = {
  activeFiltersCount: number
  activeFilters: Record<string, number>
}

/**
 * Counts the number of active values for each filter
 */
export const getActiveFiltersCount = (
  attributes: string[],
  items: CurrentRefinementsConnectorParamsItem[],
): ActiveFiltersCount => {
  const res: ActiveFiltersCount = {
    activeFiltersCount: 0,
    activeFilters: {},
  }

  attributes.forEach((attribute) => {
    if (attribute === 'tasteProfile') {
      const activeFilters = items.map((item) => item.attribute)
      const tasteProfileCount = intersection(activeFilters, tasteProfileAttributes).length
      if (tasteProfileCount) res.activeFilters.tasteProfile = tasteProfileCount
    } else {
      const filter = items.find((item) => item.attribute === attribute)
      const count = filter?.refinements.length
      if (count) res.activeFilters[attribute] = count
    }
  })
  res.activeFiltersCount = Object.values(res.activeFilters).length
  return res
}
