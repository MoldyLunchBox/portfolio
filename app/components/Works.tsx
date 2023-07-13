"use client"
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ChevronUp, ChevronDown } from 'react-feather'
import { Heart } from './Heart';
import { ShowCase } from './ShowCase';

export const Works = () => {
  const projects = {
    Gomoku: 'link',
    N_puzzle: 'link',
    pingpong: 'link',
    something: 'link',
    one: 'link',
    tzo: 'link',
    three: 'link',
    four: 'link',
  };
  const worksRef = useRef<HTMLDivElement>(null);

  const handleClick = (scrollDirection: string) => {
    if (worksRef.current) {
      const { scrollTop, clientHeight } = worksRef.current;
      const scrollAmount = clientHeight / (Object.keys(projects).length / 4);
      let scrollPosition = scrollTop;

      const scrollAnimation = () => {
        if (scrollDirection === 'up') {
          scrollPosition -= 10; // Adjust the scroll speed here
          if (scrollPosition > scrollTop - scrollAmount) {
            worksRef.current.scrollTo({ top: scrollPosition });
            requestAnimationFrame(scrollAnimation);
          } else {
            worksRef.current.scrollTo({ top: scrollTop - scrollAmount });
          }
        } else if (scrollDirection === 'down') {
          scrollPosition += 10; // Adjust the scroll speed here
          if (scrollPosition < scrollTop + scrollAmount) {
            worksRef.current.scrollTo({ top: scrollPosition });
            requestAnimationFrame(scrollAnimation);
          } else {
            worksRef.current.scrollTo({ top: scrollTop + scrollAmount });
          }
        }
      };

      scrollAnimation();
    }
  };

  const [camRotate, setCamRotate] = useState(0)
const rotateCamera = ()=>{
  console.log("clicked", camRotate)
  const rotat = camRotate + 15
  setCamRotate(rotat)
}
  return (
    <div className='flex items-center snap-center h-[100vh]'>
      <div className='flex justify-between items-center h-full w-full'>
        <div className='w-1/4 my-5 py-10  border  relative flex justify-center max-h-[320px] '>
      
          <ChevronUp onClick={() => handleClick('up')} className='text-white cursor-pointer hover:text-[#E3C515] text-center absolute h-10 top-0  bottom-0  ' />
          <ul ref={worksRef} className='flex flex-col  no-scrollbar overflow-y-scroll'>
            {Object.entries(projects).map(([key, value]) => (
              <div key={key} className='flex justify-center'>
                <li className='my-2 inline-block text-white p-1   cursor-pointer  font-semibold text-2xl worksElements'>{key}</li>
              </div>
            ))}
          </ul>
          <ChevronDown onClick={() => handleClick('down')} className='text-white cursor-pointer hover:text-[#E3C515]  absolute h-10  bottom-0' />

        </div>
        <div className='flex justify-between flex-col   items-center h-full w-full lg:flex-row'>
        <div className='w-full h-full max-h-[50vh]'>
          <Canvas shadows>
            <ShowCase camRotate={camRotate} />
          </Canvas>
        </div>
        <div onClick={()=>rotateCamera()} className='text-black bg-white'>cam</div>
    
      </div>
        {/* <div className='flex w-full flex-col justify-start gap-4'>
          <h1 className='text-white text-4xl font-bold'>Feel, Think, Design</h1>
          <h1 className='text-[#E3C515] font-semibold'>-- Who am I</h1>
          <h5 className='text-sm text-gray-300'>Full stuff stuff I do this and that</h5>
          <button className='bg-[#E3C515] shadow shadow-white w-1/3 rounded p-2'>Learn more</button>
        </div> */}
      </div>
    </div>
  );
};
