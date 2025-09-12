import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch one API key with usage_count < 50
    const { data: keyData, error: keyError } = await supabase
      .from('removebg_keys')
      .select('*')
      .lt('usage_count', 50)
      .order('usage_count', { ascending: true })
      .limit(1);

    if (keyError || !keyData || keyData.length === 0) {
      return NextResponse.json({ error: 'No available remove.bg API key.' }, { status: 500 });
    }
    const apiKeyRow = keyData[0];
    const apiKey = apiKeyRow.api_key;

    // Call remove.bg API
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: (() => {
        const form = new FormData();
        form.append('image_file', new Blob([buffer]), 'kolam.png');
        form.append('size', 'auto');
        return form;
      })(),
    });

    // Increment usage_count
    await supabase
      .from('removebg_keys')
      .update({ usage_count: apiKeyRow.usage_count + 1 })
      .eq('id', apiKeyRow.id);

    // Delete key if usage_count reaches 50
    if (apiKeyRow.usage_count + 1 >= 50) {
      await supabase
        .from('removebg_keys')
        .delete()
        .eq('id', apiKeyRow.id);
    }

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    return new NextResponse(resultBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="removed.png"',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 });
  }
}

