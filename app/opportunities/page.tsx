'use client'

import { Suspense } from 'react'
import { OpportunitiesList } from '@/components/opportunities-list'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { GuestVsAccount } from '@/components/guest-vs-account'
import { getOrgDisplayName } from '@/lib/org'

export default function OpportunitiesPage() {
  // Filter state management
  const [filters, setFilters] = useState({
    day: 'all',
    type: 'all',
    location: 'all'
  })

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      day: 'all',
      type: 'all',
      location: 'all'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Available Opportunities"
        description="Sign up for pick up and delivery tasks. Tap any task to claim it instantly."
      />
      
      <div className="container mx-auto px-4 py-6">
        {/* Guest User Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-100 p-6 mb-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">👋 Welcome to {getOrgDisplayName()}!</h3>
            <p className="text-blue-800 mb-4">
              You can sign up for tasks instantly without an account, or create a free profile to track your impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="inline-flex items-center gap-2 text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Quick signup - No account needed
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Free account - Track your progress
              </div>
            </div>
          </div>
        </div>
        
        <FilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
        
        <GuestVsAccount />
        
        <Suspense fallback={<OpportunitiesSkeleton />}>
          <OpportunitiesList filters={filters} />
        </Suspense>
      </div>
    </div>
  )
}

function OpportunitiesSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  )
}
