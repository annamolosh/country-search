import { describe, it, expect, vi } from 'vitest'
import { searchCountries } from '../../src/logic/searchCountries.js'

describe('searchCountries', () => {
  it('should return countries when response is successful', async () => {
    // Создаём mock fetch
    const mockFetch = vi.fn()
    vi.stubGlobal('fetch', mockFetch)

    // Создаём сигнал отмены запроса
    const controller = new AbortController()
    const signal = controller.signal

    // Тестовые данные
    const mockCountries = [
      {
        name: 'Poland',
        flag: '🇵🇱',
        capital: 'Warsaw',
      },
    ]

    // Имитируем успешный ответ сервера
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockCountries,
    })

    // Вызываем тестируемую функцию
    const result = await searchCountries('poland', signal)

    // Проверяем вызов fetch
    expect(mockFetch).toHaveBeenCalledWith(
      'https://countries.dev/name/poland',
      { signal: expect.any(AbortSignal) },
    )

    // Проверяем полученные данные
    expect(result).toEqual(mockCountries)
  })

  it('should return an empty array when response status is 404', async () => {
    const mockFetch = vi.fn()
    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()
    const signal = controller.signal

    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    })

    const result = await searchCountries('unknown', signal)

    expect(result).toEqual([])
  })

  it('should throw HttpError when response status is 500', async () => {
    const mockFetch = vi.fn()
    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()
    const signal = controller.signal

    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    await expect(searchCountries('poland', signal)).rejects.toMatchObject({
      status: 500,
    })
  })

  it('should throw TimeoutError when request takes too long', async () => {
    const mockFetch = vi.fn()

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()
    const signal = controller.signal

    mockFetch.mockImplementation((_url, { signal }) => {
      return new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
          reject(signal.reason)
        })
      })
    })

    await expect(searchCountries('poland', signal)).rejects.toMatchObject({
      name: 'TimeoutError',
    })
  }, 7000)

  it('should throw AbortError when request is aborted', async () => {
    const mockFetch = vi.fn()

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()
    const signal = controller.signal

    mockFetch.mockImplementation((_url, { signal }) => {
      return new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
          reject(signal.reason)
        })
      })
    })

    const request = searchCountries('poland', signal)

    controller.abort()

    await expect(request).rejects.toMatchObject({
      name: 'AbortError',
    })
  })
})
