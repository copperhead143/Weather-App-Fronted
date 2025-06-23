import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { Button } from '../components/Button'

export const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme()
    const { language, setLanguage, t } = useLanguage()
  
    return (
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <FontAwesomeIcon 
                icon="cloud-sun" 
                className="text-2xl text-primary-600 mr-3"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {t.app.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  {t.app.subtitle}
                </p>
              </div>
            </div>
  
            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Language Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === 'en'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('pl')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === 'pl'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  PL
                </button>
              </div>
  
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                icon={theme === 'light' ? 'moon' : 'sun'}
                className="text-gray-600 dark:text-gray-400"
              />
            </div>
          </div>
        </div>
      </header>
    )
  }