import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from '../Card'
import type { WeatherSummary as WeatherSummaryType } from '../../services/types'
import { formatTemperature, formatPressure, formatHours } from '../../utils/weatherUtils'
import { useLanguage } from '../../context/LanguageContext'

interface WeatherSummaryProps {
  summary: WeatherSummaryType
}

export const WeatherSummary: React.FC<WeatherSummaryProps> = ({ summary }) => {
  const { t } = useLanguage()

  const summaryItems = [
    {
      icon: 'thermometer-half',
      label: t.weather.extremeTemps,
      value: `${formatTemperature(summary.extreme_temperatures.min)} - ${formatTemperature(summary.extreme_temperatures.max)}`,
      color: 'text-red-600 dark:text-red-400'
    },
    {
      icon: 'gauge',
      label: t.weather.avgPressure,
      value: formatPressure(summary.average_pressure),
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: 'sun',
      label: t.weather.avgSunshine,
      value: formatHours(summary.average_sunshine_hours),
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: 'cloud-rain',
      label: t.weather.rainyDays,
      value: `${summary.rainy_days_count}/7`,
      color: 'text-gray-600 dark:text-gray-400'
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
        {t.weather.summary}
      </h2>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryItems.map((item, index) => (
            <div key={index} className="text-center space-y-2">
              <FontAwesomeIcon
                icon={item.icon as any}
                className={`text-2xl ${item.color}`}
              />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {t.weather.weatherSummary}
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <FontAwesomeIcon
                icon={summary.weather_summary === 'with precipitation' ? 'cloud-rain' : 'sun'}
                className={summary.weather_summary === 'with precipitation' 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-yellow-600 dark:text-yellow-400'
                }
              />
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {summary.weather_summary === 'with precipitation' 
                  ? t.weather.withPrecipitation 
                  : t.weather.noPrecipitation
                }
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}