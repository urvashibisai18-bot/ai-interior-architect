import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { handleGetSession, addDesign, getUserDesigns, deleteUserDesign } from '@/lib/auth-lib';

const SESSION_COOKIE = 'session_token';

function getUserId(cookieStore: Awaited<ReturnType<typeof cookies>>): string | null {
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = handleGetSession(token);
  return session?.user.id || null;
}

export async function GET() {
  const cookieStore = await cookies();
  const userId = getUserId(cookieStore);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const designs = getUserDesigns(userId);
  return NextResponse.json({ designs });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const userId = getUserId(cookieStore);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const design = await request.json();
  const saved = addDesign(userId, design);
  return NextResponse.json({ design: saved });
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const userId = getUserId(cookieStore);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const designId = searchParams.get('id');
  if (!designId) {
    return NextResponse.json({ error: 'Design ID required' }, { status: 400 });
  }
  deleteUserDesign(userId, designId);
  return NextResponse.json({ success: true });
}
