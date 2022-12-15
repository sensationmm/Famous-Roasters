import { toRoundedValueInRealScale, toValueInHumanScale } from './attributeScaleUtils'
import { formatDate, formatPrice, getAPIId, getAromaKey, getSimplifiedId, normalizeString } from './formatters'
import {
  formatBlogHtmlElement,
  formatCategoryHtmlElement,
  formatHtmlElement,
  isAllowedHtmlElement,
  parseHtmlSafely,
} from './htmlContentParser'
import { useLocalStorage } from './localStorage'
import { readTimeCalculator } from './readTimeCalculator'

export { formatDate as formatDate }
export { formatPrice as formatPrice }
export { getAPIId as getAPIId }
export { getAromaKey as getAromaKey }
export { getSimplifiedId as getSimplifiedId }
export { useLocalStorage as useLocalStorage }
export { parseHtmlSafely as parseHtmlSafely }
export { formatBlogHtmlElement as formatBlogHtmlElement }
export { formatCategoryHtmlElement }
export { formatHtmlElement as formatHtmlElement }
export { isAllowedHtmlElement as isAllowedHtmlElement }
export { toValueInHumanScale as toValueInHumanScale }
export { toRoundedValueInRealScale as toRoundedValueInRealScale }
export { readTimeCalculator as readTimeCalculator }
export { normalizeString }
