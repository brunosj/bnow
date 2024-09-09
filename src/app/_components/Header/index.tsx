import React from 'react';
import Link from 'next/link';
import Logo from '../../../../public/bnow-logo.jpg';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className=''>
      <div className='bg-neutral fixed top-2 left-0 right-0 z-10 flex items-center justify-between p-4 shadow-md rounded-md max-w-fit mx-auto bg-opacity-95 text-center'>
        <div>
          <h1 className='text-xl text-gray-800 uppercase font-bold text-sec'>
            Birmingham Sound Map
          </h1>
          <p className='text-sm'>SONICS of THE SECOND CITY</p>
        </div>
      </div>
      {/* <div className='fixed top-2 left-0 right-0 z-10 flex items-center justify-between p-4 rounded-md  h-[10vh] mx-auto bg-opacity-95 text-center opacity-80'>
        <div className='h-full'>
          <Image
            src={Logo}
            alt='Birmingham Now Logo'
            fill
            className='object-contain h-full'
          />
        </div>
      </div> */}
      <div className='bg-neutral fixed top-2 right-4 z-10 shadow-md rounded-md max-w-fit mx-auto bg-opacity-95 text-center'>
        <nav className='flex gap-4'>
          <button className='btn bg-neutral'>
            <Link href='#about' className='link'>
              About
            </Link>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
