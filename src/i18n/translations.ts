export interface Translation {
    app: {
      title: string
      subtitle: string
    }
    weather: {
      forecast: string
      summary: string
      temperature: string
      maxTemp: string
      minTemp: string
      energy: string
      sunshineHours: string
      pressure: string
      avgPressure: string
      avgSunshine: string
      extremeTemps: string
      weatherSummary: string
      rainyDays: string
      withPrecipitation: string
      noPrecipitation: string
      loading: string
      error: string
      retry: string
      getLocation: string
      locationError: string
    }
    days: {
      monday: string
      tuesday: string
      wednesday: string
      thursday: string
      friday: string
      saturday: string
      sunday: string
    }
    common: {
      loading: string
      error: string
      retry: string
      close: string
      ok: string
      cancel: string
    }
  }
  
  export const translations: Record<'en' | 'pl', Translation> = {
    en: {
      app: {
        title: 'Weather Forecast',
        subtitle: '7-day weather forecast with solar energy estimation'
      },
      weather: {
        forecast: 'Weather Forecast',
        summary: 'Weekly Summary',
        temperature: 'Temperature',
        maxTemp: 'Max',
        minTemp: 'Min',
        energy: 'Solar Energy',
        sunshineHours: 'Sunshine Hours',
        pressure: 'Pressure',
        avgPressure: 'Average Pressure',
        avgSunshine: 'Average Sunshine',
        extremeTemps: 'Temperature Range',
        weatherSummary: 'Weather Summary',
        rainyDays: 'Rainy Days',
        withPrecipitation: 'Week with precipitation',
        noPrecipitation: 'Week without precipitation',
        loading: 'Loading weather data...',
        error: 'Failed to load weather data',
        retry: 'Retry',
        getLocation: 'Get Current Location',
        locationError: 'Failed to get location'
      },
      days: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
      },
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        retry: 'Try Again',
        close: 'Close',
        ok: 'OK',
        cancel: 'Cancel'
      }
    },
    pl: {
      app: {
        title: 'Prognoza Pogody',
        subtitle: '7-dniowa prognoza pogody z oszacowaniem energii słonecznej'
      },
      weather: {
        forecast: 'Prognoza Pogody',
        summary: 'Podsumowanie Tygodnia',
        temperature: 'Temperatura',
        maxTemp: 'Maks',
        minTemp: 'Min',
        energy: 'Energia Słoneczna',
        sunshineHours: 'Godziny Słońca',
        pressure: 'Ciśnienie',
        avgPressure: 'Średnie Ciśnienie',
        avgSunshine: 'Średnie Nasłonecznienie',
        extremeTemps: 'Zakres Temperatur',
        weatherSummary: 'Podsumowanie Pogody',
        rainyDays: 'Dni Deszczowe',
        withPrecipitation: 'Tydzień z opadami',
        noPrecipitation: 'Tydzień bez opadów',
        loading: 'Ładowanie danych pogodowych...',
        error: 'Nie udało się załadować danych pogodowych',
        retry: 'Spróbuj ponownie',
        getLocation: 'Pobierz Aktualną Lokalizację',
        locationError: 'Nie udało się pobrać lokalizacji'
      },
      days: {
        monday: 'Poniedziałek',
        tuesday: 'Wtorek',
        wednesday: 'Środa',
        thursday: 'Czwartek',
        friday: 'Piątek',
        saturday: 'Sobota',
        sunday: 'Niedziela'
      },
      common: {
        loading: 'Ładowanie...',
        error: 'Wystąpił błąd',
        retry: 'Spróbuj Ponownie',
        close: 'Zamknij',
        ok: 'OK',
        cancel: 'Anuluj'
      }
    }
  }