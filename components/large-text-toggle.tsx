'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Text, TextIcon } from 'lucide-react'

export function LargeTextToggle() {
  const [isLargeText, setIsLargeText] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('largeTextMode')
      return saved ? JSON.parse(saved) : true // Default to true for first-time visitors
    }
    return true
  })

  const toggleLargeText = () => {
    const newValue = !isLargeText
    setIsLargeText(newValue)
    document.body.classList.toggle('large-text-mode')
    
    // Persist in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('largeTextMode', JSON.stringify(newValue))
    }
  }

  // Apply large text mode on mount if enabled
  useEffect(() => {
    if (isLargeText) {
      document.body.classList.add('large-text-mode')
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleLargeText}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
        title={isLargeText ? "Switch to normal text size" : "Switch to large text size"}
      >
        {isLargeText ? <TextIcon className="w-4 h-4" /> : <Text className="w-4 h-4" />}
        <span className="ml-2 hidden sm:inline">
          {isLargeText ? "Normal Text" : "Large Text"}
        </span>
      </Button>
    </div>
  )
}
