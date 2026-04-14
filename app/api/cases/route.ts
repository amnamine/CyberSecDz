import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  // In a real app we derive userId from the session token
  // const { data: { session } } = await supabase.auth.getSession();
  
  // Try to use Supabase if real keys are provided, otherwise return mock data
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock.supabase')) {
    return NextResponse.json([
      { id: 'DZ-1044', type: 'Hacked Social Media', date: new Date().toISOString(), status: 'pending', risk: 'High' }
    ]);
  }

  const { data, error } = await supabase.from('cases').select('*').order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app we validate body schema and attach user_id from auth session
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock.supabase')) {
      return NextResponse.json({ success: true, caseId: `DZ-${Math.floor(1000 + Math.random() * 9000)}` });
    }

    const { data, error } = await supabase
      .from('cases')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, case: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
