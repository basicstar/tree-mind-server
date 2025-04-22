import { NextResponse } from 'next/server';

export function GET() {
    return NextResponse.json({ port: process.env.PORT }, { status: 200 });
}