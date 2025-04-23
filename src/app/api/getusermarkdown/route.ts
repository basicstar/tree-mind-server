import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const { quary } = body.data || {}; // 按照你的需求字段名为 quary
    if (!quary) {
      return NextResponse.json({ error: 'Missing quary' }, { status: 400 });
    }
    const record = await prisma.usermarkdown.findUnique({ where: { crticalID: quary } });
    if (!record) {
      return NextResponse.json({ error: 'Not found' }, { status: 200 });
    }
    return NextResponse.json({ userid: record.userid, markdown: record.markdown, crticalID: record.crticalID }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
