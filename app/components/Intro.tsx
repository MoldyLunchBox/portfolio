import React from 'react'
import { Navbar } from './Navbar'
import Image from 'next/image';

export const Intro = () => {
  return (
    <div className='  flex  flex-col   items-center snap-center h-[100vh]'>
      <Navbar />
      
      <div className='flex justify-between items-center h-full w-full'>
      <div className='flex basis-1/3 w-full flex-col  justify-start   gap-4 '>
        <h1 className='text-white text-4xl bold font-semibold'>Feel, Think, Design</h1>
        <h1 className='text-[#E3C515] font-semibold'> -- What i do</h1>
        <h5 className='text-sm text-gray-300'>full stuff stuff i do this and that </h5>
        <button className='bg-[#E3C515]  shadow shadow-white w-1/3 rounded p-2'>Learn more</button>
      </div>
        <div className='w-full flex  basis-2/3 justify-center '>
        <Image  className="w-1/2 ok    min-w-[300px]"  src="/pro.png" alt="My Image" width={500} height={300} 
     />
            </div>
      </div>
    </div>
  )

}