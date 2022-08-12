import { toRoundedValueInRealScale, toValueInHumanScale } from './attributeScaleUtils'
import { formatDate, formatPrice, getAPIProductId, getAromaKey, getSimplifiedProductId } from './formatters'
import { formatBlogHtmlElement, formatHtmlElement, isAllowedHtmlElement, parseHtmlSafely } from './htmlContentParser'
import { useLocalStorage } from './localStorage'
import { readTimeCalculator } from './readTimeCalculator'

export { formatDate as formatDate }
export { formatPrice as formatPrice }
export { getAPIProductId as getAPIProductId }
export { getAromaKey as getAromaKey }
export { getSimplifiedProductId as getSimplifiedProductId }
export { useLocalStorage as useLocalStorage }
export { parseHtmlSafely as parseHtmlSafely }
export { formatBlogHtmlElement as formatBlogHtmlElement }
export { formatHtmlElement as formatHtmlElement }
export { isAllowedHtmlElement as isAllowedHtmlElement }
export { toValueInHumanScale as toValueInHumanScale }
export { toRoundedValueInRealScale as toRoundedValueInRealScale }
export { readTimeCalculator as readTimeCalculator }
