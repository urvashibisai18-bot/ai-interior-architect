import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json();

    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    if (action === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return NextResponse.json({ success: true, user: data.user });
    }

    if (action === 'signin') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return NextResponse.json({ success: true, user: data.user });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
