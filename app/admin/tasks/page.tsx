import { Suspense } from 'react'
import { PageHeader } from '@/components/page-header'
import { AdminTasksManager } from '@/components/admin-tasks-manager'
import { AdminInvite } from '@/components/admin-invite'

export default function AdminTasksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Task Management"
        description="Create and manage weekly volunteer schedules"
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<AdminTasksSkeleton />}>
              <AdminTasksManager />
            </Suspense>
          </div>
          
          <div className="space-y-6">
            <AdminInvite currentAdminId="admin-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminTasksSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
