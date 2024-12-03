import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers"

export function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')

    if ((pathName.startsWith('/version-3/login') || pathName.startsWith('/version-3/register')) && accessToken)
        return NextResponse.redirect(new URL('/version-3', request.url))
    if (!pathName.startsWith('/version-3/login') && !pathName.startsWith('/version-3/register') && !accessToken) 
        return NextResponse.redirect(new URL('/version-3/login', request.url))
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/version-3/:path*'
    ],
}