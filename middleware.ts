import { NextRequest, NextResponse } from 'next/server';

import { middleware1 } from './middlewares';

export async function middleware(request: NextRequest, response: NextResponse) {
  const response1 = await middleware1(request, response);

  if (response1) {
    return response1;
  }
}

export const config = {
  matcher: ['/about/:path*'],
};
