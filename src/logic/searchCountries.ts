export class HttpError extends Error {
  status: number

  constructor(status: number) {
    super(`HTTP error: ${status}`)
    this.status = status
  }
}

export async function searchCountries(query: string, signal: AbortSignal) {
  const url = `https://countries.dev/name/${query}`
  const timeoutSignal = AbortSignal.timeout(5000)
  const combinedSignal = AbortSignal.any([signal, timeoutSignal])

  const response = await fetch(url, { signal: combinedSignal })

  if (response.status === 404) {
    return []
  }

  if (!response.ok) {
    throw new HttpError(response.status)
  }

  const data = await response.json()

  return data
}
