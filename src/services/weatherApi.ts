import type { WeatherForecastResponse, WeatherSummary, ApiError, Coordinates } from "./types";

const API_URL = 'https://localhost:8000/api'

export class WeatherApiService {
    
    private async makeRequest<T>(endpoint: string, params: URLSearchParams): Promise<T> {
        const url = `${API_URL}${endpoint}?${params.toString()}`;

        try{
            const response = await fetch(url)
            const data = await response.json();

            if(!response.ok) {
                throw new Error((data as ApiError).error || 'API requst fail');
            }
            return data as T;
        }catch (error){
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('Unknown error, stary praying')
        }
    }

    async getWeatherForecast(coordinates: Coordinates): Promise<WeatherForecastResponse> {
        const params = new URLSearchParams({
            latitude: coordinates.latitude.toString(),
            longitude: coordinates.longitude.toString(),
        })

        return this.makeRequest<WeatherForecastResponse>('/forecast/', params)
    }

    async getWeatherSummary(coordinates: Coordinates): Promise<WeatherSummary> {
        const params = new URLSearchParams({
            latitude: coordinates.latitude.toString(),
            longitude: coordinates.longitude.toString(),
        })

        return this.makeRequest<WeatherSummary>('/summary/', params)
    }

}

export const weatherApi = new WeatherApiService()