import { Suspense } from 'react'
import { OpportunitiesList } from '@/components/opportunities-list'
import { PageHeader } from '@/components/page-header'
import { FilterBar } from '@/components/filter-bar'
import { getOrgDisplayName } from '@/lib/org'

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Available Opportunities"
        description="Sign up for pick up and delivery tasks. Tap any task to claim it instantly."
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <p className="text-lg text-gray-700 text-center">
            Welcome to {getOrgDisplayName()} volunteer sign ups. Choose a task below to help move food from local stores to families in need.
          </p>
        </div>
        
        <FilterBar />
        
        <Suspense fallback={<OpportunitiesSkeleton />}>
          <OpportunitiesList />
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
