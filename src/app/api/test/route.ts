import { NextResponse } from 'next/server';

export function GET() {
    //测试git仓库
    return NextResponse.json({ port: process.env.PORT }, { status: 200 });
}