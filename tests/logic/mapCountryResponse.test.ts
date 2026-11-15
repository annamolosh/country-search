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
});