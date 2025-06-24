import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getWeatherIcon } from '../../utils/weatherUtils'

interface WeatherIconProps {
    weatherCode: number
    size? : 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
    weatherCode,
    size = 'md',
    className =''
}) => {
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl'
    }

    const iconName = getWeatherIcon(weatherCode)

    return (
        <FontAwesomeIcon
            icon={iconName as any}
            className={`${sizeClasses[size]} ${className}`}
        />
    )
}