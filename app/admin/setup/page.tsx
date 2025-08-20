import { AdminGuard } from '@/components/admin-guard'
import { AdminSetupForm } from '@/components/admin-setup-form'
import { PageHeader } from '@/components/page-header'

export default function AdminSetupPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Admin Setup"
          description="Invite new administrators to the Hands of St. Luke Pantry system"
        />
        
        <div className="container mx-auto px-4 py-6">
          <AdminSetupForm />
        </div>
      </div>
    </AdminGuard>
  )
}
