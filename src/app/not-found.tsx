import Link from 'next/link';
import Image from 'next/image';
import LogoFull from './_assets/birmingham-now-logo-full.svg';

export default function NotFound() {
  return (
    <article className='flex flex-col items-center justify-center min-h-screen p-4 text-center bg-black text-white'>
      {/* Logo */}
      <Image
        src={LogoFull}
        alt='Birmingham NOW Logo'
        className='w-48 mb-12 object-contain'
      />

      <h1 className='text-4xl font-bold mb-4'>404</h1>
      <p className='text-xl mb-8'>This page could not be found.</p>
      <Link
        href='/'
        className='px-6 py-3 bg-bnowPurple text-white rounded-lg duration-300 hover:bg-opacity-90 transition-colors'
      >
        Return to Map
      </Link>
    </article>
  );
}
