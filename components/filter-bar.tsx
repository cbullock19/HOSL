'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, Calendar, MapPin } from 'lucide-react'

export function FilterBar() {
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')

  const days = [
    { value: 'all', label: 'All Days' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ]

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'delivery', label: 'Delivery' },
  ]

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'shoprite', label: 'ShopRite – Chester' },
    { value: 'weis', label: 'Weis – Hackettstown' },
    { value: 'stopandshop', label: 'Stop & Shop – Mansfield' },
    { value: 'pantry', label: 'Hands of St. Luke Pantry' },
    { value: 'community', label: 'Long Valley Community Assistance' },
    { value: 'foodbank', label: 'Mt. Olive Food Bank' },
  ]

  const clearFilters = () => {
    setSelectedDay('all')
    setSelectedType('all')
    setSelectedLocation('all')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter by:</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="whitespace-nowrap"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
