"use client"
import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshDistortMaterial, OrbitControls, PerspectiveCamera, Sphere } from '@react-three/drei'
import { Mesh, Shape, BackSide, DoubleSide, ExtrudeGeometry, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';
import SplitType from 'split-type';
import { gsap } from 'gsap';

export const Intro = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      // This code will run every 2 seconds
      let text = new SplitType('#title1');
      let text2 = new SplitType('#title2');

      let chars = document.querySelectorAll('.char');
      for (let i = 0; i < chars.length; i++) {
        chars[i].classList.add('translate-y-full');
      }
      gsap.to('.char', {
        y: 0,
        stagger: 0.05,
        delay: 0.02,
        duration: 0.5,
      });
    }, 5000);

    // Cleanup function to stop the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='  flex  flex-col   items-center snap-center h-[100vh]'>
      <Navbar />

      <div className='flex flex-col md:flex-row justify-center items-center h-full w-full'>
        <div className='flex w-full flex-col min-w-[280px] max-w-[500px] justify-center text-center md:text-left gap-4 '>
          <h1 className='text-white text-4xl bold font-semibold' id="title1" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>Think outside the box</h1>
          <h1 className='text-[#E3C515] md:text-xl font-semibold'> -- who am i</h1>
          <h5 className='text-sm text-gray-300 md:text-lg'>Hey there! I'm Mya abdu, a passionate web developer with a flair for creating clean and user-friendly websites. With over 3 years of experience in front-end and back-end development, I thrive on turning complex ideas into elegant solutions. </h5>
          {/* <button className='bg-[#E3C515]  shadow shadow-white w-1/3 rounded p-2'>Learn more</button> */}
        </div>


        <div  className='max-w-[500px] max-h-[500px] w-[300px] h-[300px] md:h-full md:w-full flex justify-center relative '>
          <Canvas >
            <PerspectiveCamera makeDefault position={[0, 3, 5]} />
            <OrbitControls  enableZoom={false}/>
            <mesh>
              <Sphere args={[2, 32, 32]} >

                <MeshDistortMaterial color={"#500b9f"} attach="material" distort={0.25} speed={1} />
              </Sphere>
            </mesh>
            <spotLight penumbra={0.3} args={["white", 2, 20, 0.3]} castShadow position={[-5, 5, 5]} />
            <ambientLight intensity={0.03} />

          </Canvas>
          {/* <Image className="w-1/2 ok m-auto absolute top-0 bottom-0 left-0 right-0   max-w-[400px]  min-w-[300px]" src="/pro.png" alt="My Image" width={500} height={300}
          /> */}
        </div>
      </div>
    </div>
  )

}