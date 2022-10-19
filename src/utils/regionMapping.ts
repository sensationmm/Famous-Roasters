import CoffeeRegionAfrican from 'src/assets/images/regions/coffee-region-african.webp'
import CoffeeRegionAsian from 'src/assets/images/regions/coffee-region-asian.webp'
import CoffeeRegionBrazilian from 'src/assets/images/regions/coffee-region-brazilian.webp'
import CoffeeRegionCaribbean from 'src/assets/images/regions/coffee-region-caribbean.webp'
import CoffeeRegionLatin from 'src/assets/images/regions/coffee-region-latin.webp'

type Region = 'caribbean' | 'brazilian' | 'african' | 'asian' | 'latin'

interface CountryRegionMappingType {
  [key: string]: Region
}

const countryRegionMapping: CountryRegionMappingType = {
  BI: 'african',
  BO: 'latin',
  BR: 'brazilian',
  BU: 'asian',
  CN: 'asian',
  CO: 'latin',
  CR: 'caribbean',
  EC: 'latin',
  ET: 'african',
  GT: 'latin',
  HN: 'latin',
  ID: 'asian',
  IN: 'asian',
  KE: 'african',
  MM: 'asian',
  MX: 'latin',
  NI: 'latin',
  PA: 'latin',
  PE: 'latin',
  RW: 'african',
  SV: 'latin',
  TZ: 'african',
  UG: 'african',
  VN: 'asian',
}

export const regionImages: { [key: string]: string } = {
  caribbean: CoffeeRegionCaribbean,
  brazilian: CoffeeRegionBrazilian,
  african: CoffeeRegionAfrican,
  asian: CoffeeRegionAsian,
  latin: CoffeeRegionLatin,
}

export const getRegion = (countryCode: keyof typeof countryRegionMapping): Region => {
  return countryRegionMapping[countryCode]
}
