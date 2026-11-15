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
});