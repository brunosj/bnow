import { revalidateTag, revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<Response> {
  const collection = request.nextUrl.searchParams.get('collection');
  const slug = request.nextUrl.searchParams.get('slug');
  const pathToRevalidate = request.nextUrl.searchParams.get('revalidatePath');
  const secret = request.nextUrl.searchParams.get('secret');

  if (!secret || secret !== process.env.REVALIDATION_KEY) {
    return new Response('Invalid secret', { status: 401 });
  }

  try {
    // Revalidate by collection and slug (for tags)
    if (collection && slug) {
      revalidateTag(`${collection}_${slug}`);
      revalidateTag('soundbites'); // Always revalidate soundbites
      return NextResponse.json({
        revalidated: true,
        message: `Revalidated ${collection}/${slug}`,
      });
    }

    // Revalidate by path
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
      return NextResponse.json({
        revalidated: true,
        message: `Revalidated path ${pathToRevalidate}`,
      });
    }

    return NextResponse.json({
      revalidated: false,
      message: 'No valid revalidation target',
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
