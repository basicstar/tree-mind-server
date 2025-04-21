import { NextRequest, NextResponse } from 'next/server';

/**
 * 校验 API Token 的中间件函数。
 * 用法：在 API 路由中调用，验证失败时返回 401 响应。
 * @param req NextRequest
 * @returns NextResponse | null
 */
export function verifyApiToken(req: NextRequest): NextResponse | null {
  const APITOKEN = process.env.APITOKEN;
  const reqToken = req.headers.get('x-api-token') || req.headers.get('authorization');
  if (!reqToken || reqToken !== APITOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
