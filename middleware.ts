import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add caching to API requests, specifically product feeds
  if (request.nextUrl.pathname.startsWith('/api/products') || request.nextUrl.pathname.startsWith('/api/categories')) {
    const response = NextResponse.next();
    
    // Edge cache: 60s, stale-while-revalidate for 1 day
    // This allows CDNs/Edge nodes to cache the initial feed response
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=86400');
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  // Only apply this middleware to api routes that are safe to cache
  matcher: ['/api/products/:path*', '/api/categories/:path*'],
};
