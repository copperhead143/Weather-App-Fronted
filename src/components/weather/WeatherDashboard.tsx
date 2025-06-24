import React, { useState } from 'react'
import { useGeolocation } from '../../hooks/useLocation'
import { useWeatherData } from '../../hooks/useWeatherData'
import { useLanguage } from '../../context/LanguageContext'
import { Loading } from '../Loading'
import { ErrorMessage } from '../ErrorMsg'
import { Button } from '../Button'
import { WeatherTable } from './WeatherTable'
import { WeatherSummary } from './WeatherSummary'
import { LocationSelector } from './LocationSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Coordinates } from '../../services/types'

export const WeatherDashboard: React.FC = () => {
  const { coordinates, loading: locationLoading, error: locationError, getCurrentLocation } = useGeolocation()
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null)
  const { forecast, summary, loading: weatherLoading, error: weatherError, retry } = useWeatherData(selectedLocation || coordinates)
  const { t } = useLanguage()
  const [showLocationSelector, setShowLocationSelector] = useState(false)

  const isLoading = locationLoading || weatherLoading
  const hasError = locationError || weatherError
  const activeLocation = selectedLocation || coordinates

  const handleLocationSelect = (location: Coordinates) => {
    setSelectedLocation(location)
    setShowLocationSelector(false)
  }

  const handleGetCurrentLocation = () => {
    setSelectedLocation(null)
    getCurrentLocation()
  }

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
            handleGetCurrentLocation()
          }
        }}
        retryText={t.weather.retry}
      />
    )
  }

  if (!forecast || !summary) {
    return (
      <div className="text-center py-8">
        <Button onClick={handleGetCurrentLocation} icon="location-dot" variant="primary">
          {t.weather.getLocation}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Location controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <FontAwesomeIcon icon="location-dot" className="mr-1" />
          {activeLocation?.latitude.toFixed(4)}, {activeLocation?.longitude.toFixed(4)}
        </div>
        <Button 
          onClick={() => setShowLocationSelector(!showLocationSelector)} 
          variant="outline" 
          size="sm" 
          icon={showLocationSelector ? "times" : "map-marker-alt"}
        >
          {showLocationSelector ? t.weather.hideMap : t.weather.changeLocation}
        </Button>
      </div>

      {/* Location selector - use the new handler function */}
      {showLocationSelector && (
        <LocationSelector 
          onSelectLocation={handleLocationSelect} 
          onGetCurrentLocation={handleGetCurrentLocation}
          currentLocation={activeLocation}
          isLoading={locationLoading}
        />
      )}

      <WeatherTable forecasts={forecast.forecast} />

      <WeatherSummary summary={summary} />
    </div>
  )
}

export default WeatherDashboard