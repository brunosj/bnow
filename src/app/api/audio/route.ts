// app/api/audio/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds the 50MB limit' },
        { status: 400 }
      );
    }

    const audioUploadFormData = new FormData();
    audioUploadFormData.append('title', title);
    audioUploadFormData.append('file', file);

    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/audio/upload`,
      {
        method: 'POST', // Send as FormData
        headers: {
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Audio - Audio file upload failed');
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error uploading audio file' },
      { status: 500 }
    );
  }
}
