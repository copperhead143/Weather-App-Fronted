import {useState, useEffect} from 'react'
import {weatherApi} from '../services/weatherApi'
import type { WeatherForecastResponse, WeatherSummary, Coordinates } from '../services/types'

interface WeatherDataState{
    forecast: WeatherForecastResponse | null
    summary: WeatherSummary | null
    loading: boolean
    error: string | null
}

export const useWeatherData = (coordinates: Coordinates | null) => {
    const [state, setState] = useState<WeatherDataState>({
        forecast: null,
        summary: null,
        loading: false,
        error: null
    })


    const fetchWeatherData = async (coords: Coordinates) => {
        setState(prev => ({...prev, loading: true, error: null}))

        try{
            const [forecast, summary] = await Promise.all([
                weatherApi.getWeatherForecast(coords),
                weatherApi.getWeatherSummary(coords),
            ])

            setState({
                forecast,
                summary,
                loading: false,
                error: null
            })
        }catch(error){
            setState({
                forecast: null,
                summary: null,
                loading: false,
                error: error instanceof Error ? error.message : 'unknown error'
            })
        }
    }


    const retry = () => {
        if (coordinates) {
            fetchWeatherData(coordinates)
        }
    }


    useEffect(() => {
        if(coordinates){
            fetchWeatherData(coordinates)
        }
    },[coordinates])

    return {
        ...state,
        retry
    }
}