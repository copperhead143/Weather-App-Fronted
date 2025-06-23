import {useEffect, useState} from 'react'
import type { Coordinates } from '../services/types'
import { DEFAULT_LOCATION } from '../utils/constants'

interface GeolocationState {
    coordinates: Coordinates | null
    loading: boolean
    error: string | null
}

export const useGeolocation = () => {

    const [state, setState] = useState<GeolocationState>({
        coordinates: null,
        loading: false,
        error: null,
    })

    const getCurrentLocation = () => {
        if (!navigator.geolocation){
            setState({
                coordinates: DEFAULT_LOCATION,
                loading: false,
                error: 'geolocation is not supported in your browser'
            })
            return
        }

        setState(prev => ({...prev, loading: true, error: null}))

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    loading: false,
                    error: null
                })
            },
            (error) => {
                setState({
                    coordinates: DEFAULT_LOCATION,
                    loading: false,
                    error: error.message
                })
            },
            {
                enableHighAccuracy:true,
                timeout: 10000,
                maximumAge: 300000 //5 minut
            }
        )
    }


    useEffect(()=>{
        getCurrentLocation()
    }, [])

    return{
        ...state,
        getCurrentLocation
    }
}