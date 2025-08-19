import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(time: string): string {
  return time
}

export function formatDateTime(date: Date | string, time: string): string {
  const d = new Date(date)
  const dateStr = d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
  return `${dateStr} at ${time}`
}

export function getDayOfWeek(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { weekday: 'long' })
}

export function isToday(date: Date | string): boolean {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

export function isThisWeek(date: Date | string): boolean {
  const d = new Date(date)
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  
  return d >= startOfWeek && d <= endOfWeek
}
