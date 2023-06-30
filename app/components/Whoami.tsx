import React from 'react';
import { Navbar } from './Navbar';
import Image from 'next/image';

export const Whoami = () => {

  return (
    <div className='flex items-center snap-center h-[100vh]'>
      <div className='flex justify-between items-center h-full w-full'>
        <div className='w-full flex justify-center'>
     
        </div>
        <div className='flex w-full flex-col justify-start gap-4'>
          <h1 className='text-white text-4xl font-bold'>Feel, Think, Design</h1>
          <h1 className='text-[#E3C515] font-semibold'>-- Who am I</h1>
          <h5 className='text-sm text-gray-300'>Full stuff stuff I do this and that</h5>
          <button className='bg-[#E3C515] shadow shadow-white w-1/3 rounded p-2'>Learn more</button>
        </div>
      </div>
    </div>
  );
};
