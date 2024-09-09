import React from 'react';
import Link from 'next/link';
import Logo from '../../../../public/bnow-logo.jpg';
import Image from 'next/image';

const HeaderV2: React.FC = () => {
  return (
    <header className='h-[10vh] relative bg-black px-4 flex justify-between items-center'>
      {/* <div className='bg-neutral fixed top-2 left-0 right-0 z-10 flex items-center justify-between p-4 shadow-md rounded-md max-w-fit mx-auto bg-opacity-95 text-center'>
        <div>
          <h1 className='text-xl text-gray-800 uppercase font-bold text-sec'>
            Birmingham Sound Map
          </h1>
          <p className='text-sm'>SONICS of THE SECOND CITY</p>
        </div>
      </div> */}

      <div className='relative h-full w-full mr-auto'>
        <Image
          src={Logo}
          alt='Birmingham Now Logo'
          fill
          className='object-contain'
        />
      </div>
      {/* <div>
          <h1 className='text-xl text-gray-800 uppercase font-bold text-sec'>
            Birmingham Sound Map
          </h1>
          <p className='text-sm'>SONICS of THE SECOND CITY</p>
        </div> */}

      <nav className='flex gap-4'>
        <button className='btn bg-neutral'>
          <Link href='#about' className='link'>
            About
          </Link>
        </button>
      </nav>
    </header>
  );
};

export default HeaderV2;
