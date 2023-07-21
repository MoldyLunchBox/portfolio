"use client"
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'
import { Heart } from './Heart';
import { ShowCase } from './ShowCase';

export const Works = () => {
  const projects = {
    Gomoku: 'link',
    N_puzzle: 'link',
    pingpong: 'link',
    something: 'link',
  };
  const worksRef = useRef<HTMLDivElement>(null);
  const handleClick = (direction: string) => {
    if (worksRef.current) {
      const { scrollLeft, clientWidth } = worksRef.current
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth/2
        : scrollLeft + clientWidth/2
        worksRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }

  }
  // const handleClick = (scrollDirection: string) => {
  //   if (worksRef.current) {
  //     const { scrollTop, clientHeight } = worksRef.current;
  //     const scrollAmount = clientHeight / (Object.keys(projects).length / 4);
  //     let scrollPosition = scrollTop;

  //     const scrollAnimation = () => {
  //       if (scrollDirection === 'up') {
  //         scrollPosition -= 10; // Adjust the scroll speed here
  //         if (scrollPosition > scrollTop - scrollAmount) {
  //           worksRef.current.scrollTo({ top: scrollPosition });
  //           requestAnimationFrame(scrollAnimation);
  //         } else {
  //           worksRef.current.scrollTo({ top: scrollTop - scrollAmount });
  //         }
  //       } else if (scrollDirection === 'down') {
  //         scrollPosition += 10; // Adjust the scroll speed here
  //         if (scrollPosition < scrollTop + scrollAmount) {
  //           worksRef.current.scrollTo({ top: scrollPosition });
  //           requestAnimationFrame(scrollAnimation);
  //         } else {
  //           worksRef.current.scrollTo({ top: scrollTop + scrollAmount });
  //         }
  //       }
  //     };

  //     scrollAnimation();
  //   }
  // };


  const rotateCamera = () => {
    let camRotation = 0
    const intervalId = setInterval(() => {
 
      console.log(camRotation)
        setCamRotate((prevVal) => prevVal + 1 )
  
        camRotation++
      if (camRotation === 90) {
        clearInterval(intervalId); // Stop the interval after it has executed 5 times
        camRotation = 0
      }
    }, 10);


  }

  const [camRotate, setCamRotate] = useState(0)
  const defaultAngle = 90
  // const rotateCamera = () => {
  //   console.log("clicked", camRotate)
  //   const rotat = camRotate + defaultAngle
  //   setCamRotate(rotat)
  // }
  return (
    <div className='flex items-center snap-center h-[100vh]'>
      <div className='flex flex-wrap items-center h-full w-full'>
          <div className=' flex w-full h-full max-h-[80vh] justify-center  relative'>
            <Canvas shadows>
              <ShowCase camRotate={camRotate} />
            </Canvas>
            <div id="poop" className='w-[300px]  items-center flex  absolute justify-center max-h-[30vh] '>
              <ChevronLeft onClick={() => handleClick('left')} className='text-white  w-10 cursor-pointer hover:text-[#E3C515] text-center  left-0 h-10 top-0  bottom-0  ' />
              <ul ref={worksRef} className='flex flex-auto flex-row no-scrollbar overflow-x-scroll'>
                {Object.entries(projects).map(([key, value], index) => (
                  <div key={key} className='flex justify-center'>
                    <li onMouseOver={()=>setCamRotate(defaultAngle * index)} className=' inline-block text-white p-1   cursor-pointer  font-semibold text-sm worksElements md:text-2xl'>{key}</li>
                  </div>
                ))}
              </ul>
              <ChevronRight onClick={() => handleClick('right')} className='text-white cursor-pointer hover:text-[#E3C515]  w-10   h-10  right-0' />

            </div>
          </div>
          <div onClick={() => rotateCamera()} className='text-black bg-white'>cam</div>
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
