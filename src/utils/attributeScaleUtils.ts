export const toValueInHumanScale = (aromaAttributeValue: number): number => {
  if (aromaAttributeValue <= 3) {
    return 1
  }
  if (aromaAttributeValue > 7) {
    return 3
  }
  return 2
}

export const toRoundedValueInRealScale = (aromaAttributeValue: number): number => {
  switch (aromaAttributeValue) {
    case 1:
      return 2
    case 3:
      return 8
    default:
      return 5
  }
}
