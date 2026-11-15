import { mapCountryResponse } from '../../src/logic/mapCountryResponse.js';
import { describe, it, expect } from 'vitest';

describe('mapCountryResponse', () => {
    it('should return country name', () => {
        const rawCountry = {
            name: {
            common: 'Poland'
        }
    };
    
    const result = mapCountryResponse(rawCountry);

    expect(result.name).toBe('Poland');

    });
    it('should return country flag URL', () => {
        const rawCountry = {
            name: {
                common: 'Poland'
            },
         flags: {
                png: 'https://example.com/poland.png'
            }
        };

        const result = mapCountryResponse(rawCountry);

        expect(result.flag).toBe('https://example.com/poland.png');
    });
    it('should return country capital', () => {
        const rawCountry = {
            name: {
                common: 'Poland'
            },
            flags: {
                png: 'https://example.com/poland.png'
            },
            capital: ['Warsaw']
        };

        const result = mapCountryResponse(rawCountry);

        expect(result.capital).toBe('Warsaw');
    });
    it('should return country region', () => {
        const rawCountry = {
            name: {
                common: 'Poland'
            },
            flags: {
                png: 'https://example.com/poland.png'
            },
            capital: ['Warsaw'],
            region: 'Europe'
        };

        const result = mapCountryResponse(rawCountry);

        expect(result.region).toBe('Europe');
    });
    it('should return country population', () => {
        const rawCountry = {
            name: {
                common: 'Poland'
            },
            flags: {
                png: 'https://example.com/poland.png'
            },
            capital: ['Warsaw'],
            region: 'Europe',
            population: 37600000
        };

        const result = mapCountryResponse(rawCountry);

        expect(result.population).toBe(37600000);
    });
    it('should return country languages', () => {
        const rawCountry = {
            name: {
                common: 'Poland'
            },
            flags: {
                png: 'https://example.com/poland.png'
            },
            capital: ['Warsaw'],
            region: 'Europe',
            population: 37600000,
            languages: {
                pol: 'Polish',
                eng: 'English'
            }
        };

        const result = mapCountryResponse(rawCountry);

        expect(result.languages).toEqual(['Polish', 'English']);
    });
});