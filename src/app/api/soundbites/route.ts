import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audioFile') as File; // Get the audio file
    const transcriptFile = formData.get('transcriptFile') as File; // Get the transcript file

    // console.log('Form Data:', formData.entries());

    // Create a new FormData instance for audio upload
    const audioUploadFormData = new FormData();
    audioUploadFormData.append('title', formData.get('title') as string); // Append title
    audioUploadFormData.append('file', audioFile); // Append audio file

    // Upload the audio file
    const audioUploadResponse = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/audio`,
      {
        method: 'POST',
        body: audioUploadFormData, // Use FormData
        headers: {
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!audioUploadResponse.ok) {
      throw new Error('Audio upload failed');
    }

    const { fileId } = await audioUploadResponse.json();
    // console.log('Audio Upload Response:', { fileId });

    // Create a new FormData instance for transcript upload
    const transcriptUploadFormData = new FormData();
    transcriptUploadFormData.append(
      'title',
      formData.get('transcriptTitle') as string
    ); // Append transcript title
    transcriptUploadFormData.append('file', transcriptFile); // Append transcript file

    // Upload the transcript file
    const transcriptUploadResponse = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/transcript`,
      {
        method: 'POST',
        body: transcriptUploadFormData, // Use FormData
        headers: {
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!transcriptUploadResponse.ok) {
      throw new Error('Transcript upload failed');
    }

    const { transcriptId } = await transcriptUploadResponse.json();
    // console.log('Transcript Upload Response:', { transcriptId });

    // Create the soundbite with the uploaded audio file and transcript
    const payloadData = new FormData();
    payloadData.append('title', formData.get('title') as string);
    payloadData.append('description', formData.get('description') as string);
    payloadData.append('year', formData.get('year') as string);
    payloadData.append('category', formData.get('category') as string);
    payloadData.append('license', formData.get('license') as string);
    payloadData.append('author', formData.get('author') as string);
    payloadData.append(
      'coordinates[latitude]',
      formData.get('latitude') as string
    );
    payloadData.append(
      'coordinates[longitude]',
      formData.get('longitude') as string
    );
    payloadData.append('status', 'draft');
    payloadData.append('audioGroup[audioUpload]', fileId); // Set the audio upload ID
    payloadData.append('audioGroup[audioFile]', fileId); // Set the audio file ID
    payloadData.append('uploadedTranscript', transcriptId); // Set the transcript ID

    // Create the soundbite
    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/soundbites`,
      {
        method: 'POST',
        body: payloadData, // Use FormData for the soundbite
        headers: {
          Authorization: `Bearer ${process.env.PAYLOAD_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Soundbite creation failed');
    }

    const newSoundbite = await response.json();
    // console.log('New Soundbite Response:', newSoundbite);
    return NextResponse.json(newSoundbite, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating soundbite' },
      { status: 500 }
    );
  }
}
