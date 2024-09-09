import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    console.log('Form Data:', formData.entries()); // Log form data entries

    // Upload the audio file
    const audioUploadResponse = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/audio`,
      {
        method: 'POST',
        body: JSON.stringify({ title: formData.get('title') }),
        headers: {
          'Content-Type': 'application/json', // Corrected header
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!audioUploadResponse.ok) {
      throw new Error('Audio upload failed');
    }

    const { fileId } = await audioUploadResponse.json();
    console.log('Audio Upload Response:', { fileId }); // Log fileId

    // Create the soundbite with the uploaded audio file
    const payloadData = new FormData();
    payloadData.append('title', formData.get('title') as string);
    payloadData.append('description', formData.get('description') as string);
    payloadData.append('year', formData.get('year') as string);
    payloadData.append('category', formData.get('category') as string);
    payloadData.append('license', formData.get('license') as string);
    // payloadData.append('tags', formData.get('tags') as string);
    payloadData.append(
      'contributorName',
      formData.get('contributorName') as string
    );
    payloadData.append(
      'coordinates[latitude]',
      formData.get('latitude') as string
    );
    payloadData.append(
      'coordinates[longitude]',
      formData.get('longitude') as string
    );
    payloadData.append('status', 'draft');
    payloadData.append('audioGroup[audioUpload]', fileId);
    payloadData.append('audioGroup[audioFile]', fileId);

    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/soundbites`,
      {
        method: 'POST',
        body: payloadData,
        headers: {
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Soundbite creation failed');
    }

    const newSoundbite = await response.json();
    console.log('New Soundbite Response:', newSoundbite); // Log the new soundbite response
    return NextResponse.json(newSoundbite, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating soundbite' },
      { status: 500 }
    );
  }
}
