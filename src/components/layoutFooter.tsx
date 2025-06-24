import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FontAwesomeIcon 
              icon="leaf" 
              className="text-green-600 mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Solar energy calculations for sustainable future
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center">
              <FontAwesomeIcon icon="database" className="mr-1" />
              <span>Open-Meteo API</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon="code" className="mr-1" />
              <span>Django + React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}