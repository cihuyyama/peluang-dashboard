import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { BASE_URL } from './types/BaseURL';

export function middleware(request: NextRequest) {
    const userToken = request.cookies.get('token')?.value;
    const exp = request.cookies.get('exp')?.value;

    if (!userToken) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (exp && new Date().getTime() < Number(exp)) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/auth', request.url))
    }
}

export const config = {
    matcher: ['/', '/dashboard', '/dashboard/merchant'],
}