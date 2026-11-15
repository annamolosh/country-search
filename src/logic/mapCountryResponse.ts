export function mapCountryResponse(rawCountry: any) {
    return {
        name: rawCountry.name.common
    };
}