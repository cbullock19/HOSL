import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { getOrgDisplayName, getParishName, getPublicUrl } from '@/lib/org'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="About Our Pantry"
        description="Learn more about our mission and how we serve the community"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {getOrgDisplayName()}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                {getOrgDisplayName()} is a vital ministry of {getParishName()}, serving families in need throughout the Long Valley area. 
                Our dedicated volunteers collect food donations from local stores and deliver them to families who need assistance.
              </p>
              
              <p className="text-gray-700 mb-6">
                We operate on a simple but effective model: volunteers sign up for weekly pick up and delivery tasks, 
                ensuring that fresh food reaches those who need it most. Our system makes it easy for volunteers to 
                contribute their time and effort to this important work.
              </p>
              
              <p className="text-gray-700 mb-8">
                To learn more about our pantry's history, mission, and how you can get involved, please visit our parish website.
              </p>
              
              <div className="text-center">
                <Link href={getPublicUrl()}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Visit Parish Website
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
