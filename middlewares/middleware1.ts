import { NextRequest, NextResponse } from 'next/server';

export function middleware1(request: NextRequest, response: NextResponse) {
  // eslint-disable-next-line no-console
  console.log('request', request);
  // eslint-disable-next-line no-console
  console.log('response', response);

  // return Response.json({ msg: 'Hello there' });
  // return NextResponse.redirect(new URL('/', request.url));
  return undefined;
}
