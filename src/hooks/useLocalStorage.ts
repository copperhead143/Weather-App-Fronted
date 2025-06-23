import {useState, useEffect} from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        }catch(error){
            console.warn(`error reading "${key}":`, error)
            return initialValue
        }
    })


    const setValue = (value: T | ((val: T) => T)) => {
        try{
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }catch(error){
            console.warn(`error setting "${key}":`, error)
        }
    }


    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if(e.key === key && e.newValue !== null){
                try{
                    setStoredValue(JSON.parse(e.newValue))
                }catch(error){
                    console.warn(`error parsing "${key}"`, error)
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [key])

    return [storedValue, setValue] as const
}