interface RawCountry {
  name: {
    common: string
  }
  flags?: {
    png?: string
  }
  capital?: string[]
  region?: string
  population: number
  languages?: Record<string, string>
}

export function mapCountryResponse(rawCountry: RawCountry) {
  return {
    name: rawCountry.name.common,
    flag: rawCountry.flags?.png ?? '',
    capital: rawCountry.capital?.[0] ?? '',
    region: rawCountry.region ?? '',
    population: rawCountry.population,
    languages: Object.values(rawCountry.languages ?? {}),
  }
}
