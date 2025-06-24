import React from 'react'


interface CardProps {
    children: React.ReactNode
    className? : string
    padding?: 'none' | 'sm' | 'md' | 'lg'
    hover?: boolean
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    hover = false
}) => {
    const paddingClasses = {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6'
    }

    const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'
    const hoverClasses = hover ? 'hover:shadow-md trasition-shadow duration-200' : ''

    return (
        <div className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}>
            {children}
        </div>
    )
}