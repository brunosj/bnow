// app/api/audio/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    const audioUploadFormData = new FormData();
    audioUploadFormData.append('title', title);
    audioUploadFormData.append('file', file); // Directly append the file

    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/audio/upload`,
      {
        method: 'POST',
        body: audioUploadFormData, // Send as FormData
        headers: {
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Audio file upload failed');
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error uploading audio file' },
      { status: 500 }
    );
  }
}
