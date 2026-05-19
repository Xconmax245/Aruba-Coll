import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Collections API GET endpoint' });
}

export async function POST() {
  return NextResponse.json({ message: 'Collections API POST endpoint' });
}
