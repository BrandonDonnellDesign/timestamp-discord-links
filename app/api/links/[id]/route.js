import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { userId, timestamps } = await request.json();

    const { data, error } = await supabase
      .from('saved_links')
      .update({ timestamps })
      .match({ id, user_id: userId })
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error updating timestamps:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}