import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './components/Layout'
import WeatherDashboard from './components/weather/WeatherDashboard'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout>
          <WeatherDashboard />
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App