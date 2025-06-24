import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
          language === 'en'
            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('pl')}
        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
          language === 'pl'
            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
      >
        Polski
      </button>
    </div>
  )
}