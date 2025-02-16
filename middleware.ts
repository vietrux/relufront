import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Hardcoded role for development - replace with actual auth logic later
const MOCK_USER_ROLE = 'student' // Options: 'student' | 'class-leader' | 'advisor'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware if already on correct role-based route
  if (path.includes(`/dashboard/${MOCK_USER_ROLE}`)) {
    return NextResponse.next()
  }

  // Only redirect /dashboard to role-specific route
  if (path === '/dashboard') {
    return NextResponse.redirect(new URL(`/dashboard/${MOCK_USER_ROLE}`, request.url))
  }

  // Prevent access to other role dashboards
  if (path.startsWith('/dashboard/')) {
    const requestedRole = path.split('/')[2]
    if (requestedRole !== MOCK_USER_ROLE) {
      return NextResponse.redirect(new URL(`/dashboard/${MOCK_USER_ROLE}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
