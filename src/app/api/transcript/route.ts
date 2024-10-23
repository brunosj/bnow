// app/api/transcript/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    const transcriptUploadFormData = new FormData();
    transcriptUploadFormData.append('title', title);
    transcriptUploadFormData.append('file', file); // Directly append the file

    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/transcript/upload`,
      {
        method: 'POST',
        body: transcriptUploadFormData, // Send as FormData
        headers: {
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Transcript upload failed');
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error uploading transcript' },
      { status: 500 }
    );
  }
}
