import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Card } from '../Card'
import { Button } from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLanguage } from '../../context/LanguageContext'
import type { Coordinates } from '../../services/types'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface LocationSelectorProps {
  onSelectLocation: (location: Coordinates) => void
  onGetCurrentLocation: () => void
  currentLocation?: Coordinates | null
  isLoading?: boolean
}

const MapClickHandler: React.FC<{
  onMapClick: (coords: Coordinates) => void
}> = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      })
    }
  })
  return null
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
    onSelectLocation,
    onGetCurrentLocation,
    currentLocation,
    isLoading = false
  }) => {
    const { t } = useLanguage()
    const [viewMode, setViewMode] = useState<'map' | 'manual'>('map')
    const [position, setPosition] = useState<Coordinates>({
      latitude: currentLocation?.latitude || 50.0614,
      longitude: currentLocation?.longitude || 19.9366
    })
    const [manualLatitude, setManualLatitude] = useState(position.latitude.toString())
    const [manualLongitude, setManualLongitude] = useState(position.longitude.toString())


  useEffect(() => {
    if (currentLocation) {
      setPosition(currentLocation)
      setManualLatitude(currentLocation.latitude.toString())
      setManualLongitude(currentLocation.longitude.toString())
    }
  }, [currentLocation])

  const handleMapClick = (coords: Coordinates) => {
    setPosition(coords)
    setManualLatitude(coords.latitude.toFixed(4))
    setManualLongitude(coords.longitude.toFixed(4))
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const lat = parseFloat(manualLatitude)
      const lng = parseFloat(manualLongitude)
      
      if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error('Invalid coordinates')
      }
      
      const newPosition = {
        latitude: lat,
        longitude: lng
      }
      
      setPosition(newPosition)
      onSelectLocation(newPosition)
    } catch (error) {
      alert('Please enter valid coordinates')
    }
  }

  const handleApplyLocation = () => {
    onSelectLocation(position)
  }

  return (
    <Card className="mb-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t.weather.selectLocation}
          </h3>
          
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <FontAwesomeIcon icon="map" className="mr-1" />
              {t.weather.map}
            </button>
            <button
              onClick={() => setViewMode('manual')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                viewMode === 'manual'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <FontAwesomeIcon icon="edit" className="mr-1" />
              {t.weather.manual}
            </button>
          </div>
        </div>
        
        {viewMode === 'map' ? (
          <>
            <div className="h-80 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <MapContainer
                    key={`${position.latitude}-${position.longitude}`}
                    center={[position.latitude, position.longitude]}
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[position.latitude, position.longitude]} />
                    <MapClickHandler onMapClick={handleMapClick} />
                  </MapContainer>
                </div>
                <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                  {t.weather.clickMapToSelect}
            </div>
          </>
        ) : (
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.weather.latitude}
                </label>
                <input
                  type="text"
                  id="latitude"
                  value={manualLatitude}
                  onChange={(e) => setManualLatitude(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. 50.0614"
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.weather.longitude}
                </label>
                <input
                  type="text"
                  id="longitude"
                  value={manualLongitude}
                  onChange={(e) => setManualLongitude(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. 19.9366"
                />
              </div>
            </div>
            <Button type="submit" icon="check" variant="primary">
              {t.weather.applyCoordinates}
            </Button>
          </form>
        )}
        
        <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onGetCurrentLocation}
            icon="location-dot"
            variant="outline"
            loading={isLoading}
          >
            {t.weather.getLocation}
          </Button>
          
          {viewMode === 'map' && (
            <Button
              onClick={handleApplyLocation}
              icon="check"
              variant="primary"
            >
              {t.weather.useThisLocation}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}