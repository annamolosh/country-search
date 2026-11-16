export function debounce(callback: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<typeof callback>) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
