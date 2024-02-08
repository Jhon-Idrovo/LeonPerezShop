import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log('HEEEREEE');

  return NextResponse.json({
    a: 'a'
  });
}
