import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { handleSignUp, handleSignIn, handleGetSession, handleSignOut } from '@/lib/auth-lib';

const SESSION_COOKIE = 'session_token';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    const cookieStore = await cookies();

    if (action === 'signup') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }
      const { user, token } = handleSignUp(email, password);
      cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true, secure: true, sameSite: 'lax',
        path: '/', maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ success: true, user });
    }

    if (action === 'signin') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }
      const { user, token } = handleSignIn(email, password);
      cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true, secure: true, sameSite: 'lax',
        path: '/', maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ success: true, user });
    }

    if (action === 'session') {
      const token = cookieStore.get(SESSION_COOKIE)?.value;
      if (!token) return NextResponse.json({ user: null });
      const session = handleGetSession(token);
      if (!session) return NextResponse.json({ user: null });
      return NextResponse.json(session);
    }

    if (action === 'signout') {
      const token = cookieStore.get(SESSION_COOKIE)?.value;
      if (token) handleSignOut(token);
      cookieStore.delete(SESSION_COOKIE);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 400 });
  }
}
