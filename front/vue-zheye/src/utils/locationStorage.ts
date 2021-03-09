export const setLocalStorage = (key: string, value: any) => {
  try {
    value = JSON.stringify(value)
    window.localStorage.setItem(key, value)
  } catch {
    window.localStorage.setItem(key, value)
  }
}

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key) || ''
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export const removeLocalStorage = (key: string) => {
  window.localStorage.removeItem(key)
}
