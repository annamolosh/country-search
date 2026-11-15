export class HttpError extends Error {
    status: number;

    constructor(status: number) {
        super(`HTTP error: ${status}`);
        this.status = status;
    }
}

export async function searchCountries(
    query: string,
    signal: AbortSignal
) {
    const url = `https://countries.dev/name/${query}`;

    const response = await fetch(url, { signal });

    if (response.status === 404) {
        return [];
    }

    if (!response.ok) {
        throw new HttpError(response.status);
    }

    const data = await response.json();

    return data;
}