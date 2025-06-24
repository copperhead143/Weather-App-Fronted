import React from 'react'
import type { WeatherForecast } from '../../services/types'
import { WeatherCard } from './WeatherCard'
import { useLanguage } from '../../context/LanguageContext'

interface WeatherTableProps {
  forecasts: WeatherForecast[]
}

export const WeatherTable: React.FC<WeatherTableProps> = ({ forecasts }) => {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
        {t.weather.forecast}
      </h2>
      
      {/* scrollowanie horyzontalne */}
      <div className="hidden md:block">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {forecasts.map((forecast, index) => (
            <div key={index} className="flex-shrink-0 w-48">
              <WeatherCard forecast={forecast} />
            </div>
          ))}
        </div>
      </div>

      {/* widok na telefonie */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {forecasts.map((forecast, index) => (
            <WeatherCard key={index} forecast={forecast} compact />
          ))}
        </div>
      </div>
    </div>
  )
}