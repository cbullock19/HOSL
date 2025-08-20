import { Suspense } from 'react'
import { PageHeader } from '@/components/page-header'
import { AdminReports } from '@/components/admin-reports'
import { AdminGuard } from '@/components/admin-guard'

export default function AdminReportsPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Hands of St. Luke Pantry – Reports"
          description="Track food collection, delivery, and volunteer impact"
        />
        
        <div className="container mx-auto px-4 py-6">
          <Suspense fallback={<ReportsSkeleton />}>
            <AdminReports />
          </Suspense>
        </div>
      </div>
    </AdminGuard>
  )
}

function ReportsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
