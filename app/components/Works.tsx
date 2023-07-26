"use client"
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'
import { Heart } from './Heart';
import { ShowCase } from './ShowCase';

export const Works = () => {
  const [project, setProject] = useState(0)
  const [help, setHelp] = useState(true)
  const projects = [
    { name: 'Choose', link: null },
    { name: "Gomoku", link: "https://gomoku-reactjs.vercel.app/" },
    { name: 'PingPong', link: "https://ping-pong-matter-js.vercel.app/" },
    { name: 'N_puzzle', link: "https://n-puzzle-nm9kfedmc-moldylunchbox.vercel.app/" },

  ];
  const handleClick = (direction: string) => {
    if (project + 1 >= (projects).length)
      setProject(0)
    if (direction == "left") {
      setCamRotate(defaultAngle * (project == 0 ? (projects).length - 1 : project - 1))
      setProject(project == 0 ? (projects).length - 1 : project - 1)
    }
    else if (direction == "right") {
      setProject(project >= (projects).length - 1 ? 0 : project + 1)
      setCamRotate(defaultAngle * (project >= (projects).length - 1 ? 0 : project + 1))
    }
    if (project)
      setHelp(false)
  }
  // const handleClick = (direction: string) => {
  //   if (worksRef.current) {
  //     const { scrollLeft, clientWidth } = worksRef.current
  //     const scrollTo = direction === "left"
  //       ? scrollLeft - clientWidth/2
  //       : scrollLeft + clientWidth/2
  //       worksRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
  //   }

  // }
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


  const [camRotate, setCamRotate] = useState(0)
  const defaultAngle = 90
  const canvasRef = useRef<any>(null);

  const handleWheel = (event: any) => {
    event.preventDefault();
  };
  return (
    <div id="works" onWheel={handleWheel} className='flex items-center snap-center h-[100vh]'>
      <div className='flex flex-wrap items-center h-full w-full'>
        <div className=' flex w-full h-full max-h-[80vh] justify-center  relative'>
          <Canvas ref={canvasRef} shadows>
            <ShowCase canvasRef={canvasRef} camRotate={camRotate} />
          </Canvas>
          <div id="poop" className='w-[300px]  items-center flex  absolute justify-center max-h-[30vh] '>
            <ChevronLeft onClick={() => handleClick('left')} className='text-white  w-10 cursor-pointer hover:text-[#E3C515] text-center  left-0 h-10 top-0  bottom-0  ' />
            <div className={`tooltip ${ help ? 'tooltip-open' : 'tooltip-close'} `} data-tip="click to visit">
              {
                projects[project].link ?
                  <a href={`${projects[project].link}`}  target="_blank" rel="noopener noreferrer" className='flex worksElements flex-auto cursor-pointer hover:animate-pulse text-white justify-center md:text-lg lg:text-xl xl:text-2xl flex-row no-scrollbar overflow-x-scroll'>
                    {projects[project].name}
                  </a>
                  :
                  <a className='flex flex-auto  cursor-pointer hover:animate-pulse text-white justify-center md:text-lg lg:text-xl xl:text-2xl flex-row no-scrollbar overflow-x-scroll'>
                    {projects[project].name}
                  </a>

              }
            </div>
            <ChevronRight onClick={() => handleClick('right')} className='text-white cursor-pointer hover:text-[#E3C515]  w-10   h-10  right-0' />
          </div>
        </div>

      </div>
    </div>
  );
};
