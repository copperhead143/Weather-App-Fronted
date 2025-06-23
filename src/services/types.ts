export interface WeatherForecast { //pogoda na jeden dzień
    date: string
    weather_code: number
    temperature_max: number
    temperature_min: number
    gen_energry_kWh: number
    sunshine_time_hours: number
  }
  
  export interface WeatherForecastResponse { //odpowiedz z api
    forecast: WeatherForecast[]
    location: {
      latitude: number
      longitude: number
    }
  }
  
  export interface WeatherSummary { //podsumowanie pogody
    average_pressure: number
    average_sunshine_hours: number
    extreme_temperatures: {
      max: number
      min: number
    }
    weather_summary: string
    rainy_days_count: number
  }
  
  export interface ApiError { // obsługa błędów z backendu
    error: string
  }
  
  export interface Coordinates { // współrzędne
    latitude: number
    longitude: number
  }