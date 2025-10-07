import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
      if (!isAdminRoute) return true
      return !!token && token.email === 'nhungconsultancy@gmail.com'
    },
  },
})

export const config = {
  matcher: ['/admin/:path*'],
}


