import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateCriticalID(length = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: NextRequest) {
  // API Token 验证
  // 使用中间件进行API Token校验
  const { verifyApiToken } = await import('@/middleware/authToken');
  const authResp = verifyApiToken(req);
  if (authResp) return authResp;

  try {
    const body = await req.json();
    const data = body.data || {};
    const userid = data.userid || '';
    const markdown = data.markdown || '';
    if (typeof userid !== "string" || userid.trim() === "" ||
        typeof markdown !== "string" || markdown.trim() === "") {
      return NextResponse.json({ error: 'Missing userid or markdown' }, { status: 400 });
    }

    // 生成唯一 crticalID
    let crticalID = '';
    let exists = true;
    while (exists) {
      crticalID = generateCriticalID();
      exists = (await prisma.usermarkdown.findUnique({ where: { crticalID } })) !== null;
    }

    // 存储到数据库
    await prisma.usermarkdown.create({
      data: { userid, markdown, crticalID },
    });
    // 获取完整URL
    const origin = new URL(req.url).origin;  
    const linkId = `${origin}/index.html?linkId=${crticalID}`;
    return NextResponse.json({ linkId }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
