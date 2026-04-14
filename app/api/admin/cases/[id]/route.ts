import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to check admin role (placeholder)
const isAdmin = (req: Request) => true;

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Next.js App Router 15+ needs await params
  const { id } = await context.params;

  try {
    const body = await request.json();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock.supabase')) {
      return NextResponse.json({ success: true, message: `Mock updated case ${id}`, data: body });
    }

    const { data, error } = await supabase
      .from('cases')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, case: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
