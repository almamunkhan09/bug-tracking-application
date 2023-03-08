import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<{ status: string }>> {
  return await NextResponse.json({ status: 'ok' });
}
