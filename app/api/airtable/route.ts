import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  res: NextResponse,
  next: NextRequest
): Promise<NextResponse> {
  console.log('HEEEREEE');

  return res.json();
}
