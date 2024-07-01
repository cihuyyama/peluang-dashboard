import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const userToken = request.cookies.get('token')?.value;

    if (!userToken) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }
}

export const config = {
    matcher: ['/', '/dashboard'],
}