import {WEATHER_CODES} from './constants'

export const getWeatherIcon = (code: number): string => {
    return WEATHER_CODES[code as keyof typeof WEATHER_CODES]?.icon || 'question'
}

export const getWeatherDesc = (code: number): string => {
    return WEATHER_CODES[code as keyof typeof WEATHER_CODES]?.description || 'unknown'
}

export const formatTemperature = (temp: number): string => {
    return `${Math.round(temp)}°C`
}

export const formatEnergy = (energy: number): string => {
    return `${(energy).toFixed(2)} kWh`
}

export const formatHours = (hours: number): string => {
    return `${hours.toFixed(1)}h`
}

export const formatPressure = (pressure: number): string => {
    return `${pressure.toFixed(0)}hPa`
}