import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to check admin role (placeholder)
const isAdmin = (req: Request) => true;

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock.supabase')) {
    return NextResponse.json([
      { id: 'DZ-1045', user: 'Mohammed Ali', type: 'Hacked Social Media', risk: 'High', status: 'pending', time: '10 mins ago' },
      { id: 'DZ-1042', user: 'Amina B.', type: 'Online Blackmail', risk: 'Critical', status: 'investigating', time: '3 hours ago' },
    ]);
  }

  const { data, error } = await supabase.from('cases').select(`
    *,
    user:users(name, phone)
  `).order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
