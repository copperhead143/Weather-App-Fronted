import React from 'react'
import { useGeolocation } from '../../hooks/useLocation'
import { useWeatherData } from '../../hooks/useWeatherData'
import { useLanguage } from '../../context/LanguageContext'
import { Loading } from '../Loading'
import { ErrorMessage } from '../ErrorMsg'
import { Button } from '../Button'
import { WeatherTable } from './WeatherTable'
import { WeatherSummary } from './WeatherSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const WeatherDashboard: React.FC = () => {
  const { coordinates, loading: locationLoading, error: locationError, getCurrentLocation } = useGeolocation()
  const { forecast, summary, loading: weatherLoading, error: weatherError, retry } = useWeatherData(coordinates)
  const { t } = useLanguage()

  const isLoading = locationLoading || weatherLoading
  const hasError = locationError || weatherError

  if (isLoading) {
    return <Loading text={t.weather.loading} size="lg" />
  }

  if (hasError) {
    return (
      <ErrorMessage
        message={weatherError || locationError || t.common.error}
        onRetry={() => {
          if (weatherError) {
            retry()
          } else if (locationError) {
            getCurrentLocation()
          }
        }}
        retryText={t.weather.retry}
      />
    )
  }

  if (!forecast || !summary) {
    return (
      <div className="text-center py-8">
        <Button onClick={getCurrentLocation} icon="location-dot" variant="primary">
          {t.weather.getLocation}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Location info */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <FontAwesomeIcon icon="location-dot" className="mr-1" />
        {forecast.location.latitude.toFixed(4)}, {forecast.location.longitude.toFixed(4)}
        <Button 
          onClick={getCurrentLocation} 
          variant="ghost" 
          size="sm" 
          icon="redo"
          className="ml-2"
        />
      </div>

      {/* Weather forecast table */}
      <WeatherTable forecasts={forecast.forecast} />

      {/* Weather summary */}
      <WeatherSummary summary={summary} />
    </div>
  )
}

export default WeatherDashboard