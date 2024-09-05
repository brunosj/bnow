import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    // Log received form data
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const payloadData = new FormData();
    payloadData.append('title', formData.get('title') as string);
    payloadData.append('description', formData.get('description') as string);
    payloadData.append('year', formData.get('year') as string);
    payloadData.append('category', formData.get('category') as string);
    payloadData.append('license', formData.get('license') as string);
    payloadData.append('tags', formData.get('tags') as string);
    payloadData.append(
      'contributorName',
      formData.get('contributorName') as string
    );
    payloadData.append('latitude', formData.get('latitude') as string);
    payloadData.append('longitude', formData.get('longitude') as string);
    payloadData.append('status', 'draft'); // Default status
    payloadData.append('file', file as any, (file as File).name);

    // Log payload data
    payloadData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

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
      const errorText = await response.text();
      console.error('Response error text:', errorText);
      throw new Error('Soundbite creation failed');
    }

    const newSoundbite = await response.json();
    console.log('New soundbite:', newSoundbite);
    return NextResponse.json(newSoundbite, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating soundbite' },
      { status: 500 }
    );
  }
}
