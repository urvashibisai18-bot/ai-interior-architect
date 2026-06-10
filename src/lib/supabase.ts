export function getSupabase() {
  if (typeof window === 'undefined') return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  const { createClient } = require('@supabase/supabase-js');
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}

export async function saveDesign(designData: any) {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from('designs').insert([designData]).select();
  if (error) throw error;
  return data;
}

export async function getUserDesigns(userId: string) {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveChatMessage(message: any) {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from('chat_messages').insert([message]).select();
  if (error) throw error;
  return data;
}
