import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	// If no token is found, redirect to login
	if (!token) {
		return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin))
	}

	// Allow the request to continue if the user is authenticated
	return NextResponse.next()
}

// Apply middleware to routes under /dashboard/*
export const config = {
	matcher: ['/dashboard/:path*', '/dashboard'] // Simplified matcher
}
