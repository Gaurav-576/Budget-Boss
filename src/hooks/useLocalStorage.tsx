import { useEffect, useState } from "react"

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    if(item!=null) return JSON.parse(item)
    if(initialValue instanceof Function) return initialValue()
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage