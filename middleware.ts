// import { NextResponse } from 'next/server';

export function middleware(request: Request, response: Response) {
  // eslint-disable-next-line no-console
  console.log('request', request);
  // eslint-disable-next-line no-console
  console.log('response', response);

  // return Response.json({ msg: 'Hello there' });
  // return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/about/:path*'],
};
