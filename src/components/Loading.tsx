import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  centered?: boolean
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  centered = true
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  const containerClasses = centered 
    ? 'flex flex-col items-center justify-center p-8' 
    : 'flex items-center'

  return (
    <div className={containerClasses}>
      <FontAwesomeIcon 
        icon="spinner" 
        className={`animate-spin text-primary-600 ${sizeClasses[size]} ${text ? 'mb-2' : ''}`}
      />
      {text && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {text}
        </p>
      )}
    </div>
  )
}