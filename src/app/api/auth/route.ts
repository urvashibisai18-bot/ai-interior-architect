import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function getSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;
    const supabase = getSupabase();

    // Session check
    if (action === 'session') {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ user: null });
      return NextResponse.json({
        user: { id: user.id, email: user.email, createdAt: user.created_at },
      });
    }

    // Sign out
    if (action === 'signout') {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    if (action === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return NextResponse.json({
        success: true,
        user: data.user ? { id: data.user.id, email: data.user.email, createdAt: data.user.created_at } : null,
      });
    }

    if (action === 'signin') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return NextResponse.json({
        success: true,
        user: data.user ? { id: data.user.id, email: data.user.email, createdAt: data.user.created_at } : null,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
