export function mapCountryResponse(rawCountry: any) {
    return {
        name: rawCountry.name.common,
        flag: rawCountry.flags?.png ?? '',
        capital: rawCountry.capital?.[0] ?? '',
        region: rawCountry.region ?? '',
        population: rawCountry.population
    };
}