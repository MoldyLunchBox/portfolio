"use client"
import React, { useRef } from 'react'



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
      const scrollAmount = clientHeight / projects.length;
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

  return (
    <div className='flex items-center snap-center h-[100vh]'>
      <div className='flex justify-between items-center h-full w-full'>
        <div className='w-full my-5 py-10  relative flex justify-center max-h-[320px] '>
          <button onClick={() => handleClick('up')} className='text-white absolute h-10 top-0  bottom-0  right-0 left-0'>
            up
          </button>
          <ul ref={worksRef} className='flex flex-col overflow-y-scroll'>
            {Object.entries(projects).map(([key, value]) => (
              <div key={key}>
                <li className='my-2 inline-block text-white p-1  cursor-pointer  font-semibold text-2xl worksElements'>{key}</li>
              </div>
            ))}
          </ul>
          <button onClick={() => handleClick('down')} className='text-white absolute h-10  bottom-0  right-0 left-0'>
            down
          </button>
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
