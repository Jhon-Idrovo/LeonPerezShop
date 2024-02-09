import Airtable from 'airtable';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log('HEEEREEE');
  const records = await Airtable.base('appB7bTjDzi0P35eQ')
    .table('tblgsHZR5GnT0Y9SS')
    .select()
    .firstPage();
  for (const record of records) {
    console.log(record.fields);
  }
  // Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
  return NextResponse.json({
    a: 'a'
  });
}
