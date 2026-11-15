import { describe, it, expect, vi } from 'vitest';
import { searchCountries, HttpError } from '../../src/logic/searchCountries.js';

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

    it('should return an empty array when response status is 404', async () => {
        const mockFetch = vi.fn();
        vi.stubGlobal('fetch', mockFetch);

        const controller = new AbortController();
        const signal = controller.signal;

        mockFetch.mockResolvedValue({
            ok: false,
            status: 404
        });

        const result = await searchCountries('unknown', signal);

        expect(result).toEqual([]);
    });

    it('should throw HttpError when response status is 500', async () => {
        const mockFetch = vi.fn();
        vi.stubGlobal('fetch', mockFetch);

        const controller = new AbortController();
        const signal = controller.signal;

        mockFetch.mockResolvedValue({
            ok: false,
            status: 500
        });

        await expect(searchCountries('poland', signal)).rejects.toMatchObject({status: 500});
    });


});