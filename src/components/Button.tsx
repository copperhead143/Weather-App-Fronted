import React from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {IconName} from '@fortawesome/fontawesome-svg-core'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    icon?: IconName
    loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    loading = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-gray-400',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
  
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
    return (
      <button
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <FontAwesomeIcon 
            icon="spinner" 
            className="animate-spin mr-2" 
          />
        )}
        {icon && !loading && (
          <FontAwesomeIcon 
            icon={icon} 
            className={children ? 'mr-2' : ''} 
          />
        )}
        {children}
      </button>
    )
}