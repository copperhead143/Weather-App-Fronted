import type { WeatherForecastResponse, WeatherSummary, ApiError, Coordinates } from "./types";
import { env } from "../utils/env";

export class WeatherApiService {
    
    private async makeRequest<T>(endpoint: string, params: URLSearchParams): Promise<T> {
        const url = `${env.API_URL}${endpoint}?${params.toString()}`;

        try{
            const response = await fetch(url)
            const data = await response.json();

            if(!response.ok) {
                throw new Error((data as ApiError).error || 'API request fail');
            }
            return data as T;
        }catch (error){
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('Unknown error, start praying')
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