import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Visitors API GET endpoint' });
}

export async function POST() {
  return NextResponse.json({ message: 'Visitors API POST endpoint' });
}
