import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session if expired
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // Protect /admin routes (except /admin/login)
    if (pathname.startsWith('/admin')) {
      if (pathname === '/admin/login') {
        // If user is already authenticated as admin, redirect to dashboard
        if (user) {
          const role = user.app_metadata?.role || user.user_metadata?.role;
          if (role === 'admin') {
            url.pathname = '/admin/dashboard';
            return NextResponse.redirect(url);
          }
        }
        return supabaseResponse;
      }

      // For all other /admin/* routes, require authentication & admin role
      if (!user) {
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }

      const role = user.app_metadata?.role || user.user_metadata?.role;
      if (role !== 'admin') {
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
    }

    return supabaseResponse;
  } catch (error) {
    // In case of any errors (e.g. invalid URL from missing env vars), prevent the entire app from crashing
    // Ensure protected routes remain inaccessible
    const url = request.nextUrl.clone();
    if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    
    return supabaseResponse;
  }
}
