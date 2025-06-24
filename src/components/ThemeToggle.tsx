import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'
import { Button } from '../components/Button'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      icon={theme === 'light' ? 'moon' : 'sun'}
      className="text-gray-600 dark:text-gray-400"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    />
  )
}