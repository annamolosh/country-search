import { describe, it, expect, vi } from 'vitest';
import { searchCountries } from '../../src/logic/searchCountries.js';

describe('searchCountries', () => {
    it('should return countries when response is successful', async () => {
        // Создаём mock fetch
        const mockFetch = vi.fn();
        vi.stubGlobal('fetch', mockFetch);

        // Создаём сигнал отмены запроса
        const controller = new AbortController();
        const signal = controller.signal;

        // Тестовые данные
        const mockCountries = [
            {
                name: 'Poland',
                flag: '🇵🇱',
                capital: 'Warsaw'
            }
        ];

        // Имитируем успешный ответ сервера
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockCountries
        });

        // Вызываем тестируемую функцию
        const result = await searchCountries('poland', signal);

        // Проверяем вызов fetch
        expect(mockFetch).toHaveBeenCalledWith(
            'https://countries.dev/name/poland',
            { signal }
        );

        // Проверяем полученные данные
        expect(result).toEqual(mockCountries);
    });
});