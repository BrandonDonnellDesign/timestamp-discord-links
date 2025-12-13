import { NextResponse } from 'next/server';

export async function proxy(req) {
    const { supabase } = require("@supabase/auth-helpers-nextjs").getMiddlewareClient(req);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (user?.user_metadata?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
