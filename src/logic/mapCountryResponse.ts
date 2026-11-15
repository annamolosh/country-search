export function mapCountryResponse(rawCountry: any) {
    return {
        name: rawCountry.name.common,
        flag: rawCountry.flags?.png ?? ''
    };
}