import React from 'react'
import { Card } from '../Card'
import { WeatherIcon } from './WeatherIcon'
import type { WeatherForecast } from '../../services/types'
import { formatDate, formatShortDate } from '../../utils/dateUtils'
import { formatTemperature, formatEnergy, formatHours } from '../../utils/weatherUtils'
import { useLanguage } from '../../context/LanguageContext'

interface WeatherCardProps {
  forecast: WeatherForecast
  compact?: boolean
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  forecast,
  compact = false
}) => {
  const { language, t } = useLanguage()

  if (compact) {
    return (
      <Card className="text-center min-w-32" hover>
        <div className="space-y-2">
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {formatShortDate(forecast.date, language)}
          </div>
          <WeatherIcon 
            weatherCode={forecast.weather_code} 
            size="lg"
            className="text-primary-600 dark:text-primary-400"
          />
          <div className="space-y-1">
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {formatTemperature(forecast.temperature_max)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatTemperature(forecast.temperature_min)}
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              {formatEnergy(forecast.generated_energy_kWh)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatHours(forecast.sunshine_time_hours)}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card hover className="h-full">
      <div className="space-y-4">

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {formatDate(forecast.date, language)}
          </h3>
        </div>


        <div className="text-center">
          <WeatherIcon 
            weatherCode={forecast.weather_code} 
            size="xl"
            className="text-primary-600 dark:text-primary-400 mb-2"
          />
        </div>


        <div className="text-center space-y-1">
          <div className="flex justify-center items-center space-x-4">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatTemperature(forecast.temperature_max)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                {t.weather.maxTemp}
              </span>
            </div>
            <div>
              <span className="text-xl text-gray-600 dark:text-gray-400">
                {formatTemperature(forecast.temperature_min)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                {t.weather.minTemp}
              </span>
            </div>
          </div>
        </div>


        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t.weather.energy}:
            </span>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              {formatEnergy(forecast.generated_energy_kWh)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t.weather.sunshineHours}:
            </span>
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              {formatHours(forecast.sunshine_time_hours)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}