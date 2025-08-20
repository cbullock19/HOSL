import { NextRequest, NextResponse } from 'next/server'
import { validateUser } from '@/app/actions/validate-user'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await validateUser(body)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
