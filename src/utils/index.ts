import { toRoundedValueInRealScale, toValueInHumanScale } from './attributeScaleUtils'
import { formatPrice, getAPIProductId, getAromaKey, getSimplifiedProductId } from './formatters'
import { formatHtmlElement, isAllowedHtmlElement, parseHtmlSafely } from './htmlContentParser'
import { useLocalStorage } from './localStorage'

export { formatPrice as formatPrice }
export { getAPIProductId as getAPIProductId }
export { getAromaKey as getAromaKey }
export { getSimplifiedProductId as getSimplifiedProductId }
export { useLocalStorage as useLocalStorage }
export { parseHtmlSafely as parseHtmlSafely }
export { formatHtmlElement as formatHtmlElement }
export { isAllowedHtmlElement as isAllowedHtmlElement }
export { toValueInHumanScale as toValueInHumanScale }
export { toRoundedValueInRealScale as toRoundedValueInRealScale }
