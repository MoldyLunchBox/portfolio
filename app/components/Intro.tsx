"use client"
import React from 'react'
import { Navbar } from './Navbar'
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshDistortMaterial, OrbitControls, PerspectiveCamera, Sphere } from '@react-three/drei'
import { Mesh, Shape, BackSide, DoubleSide, ExtrudeGeometry, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';


export const Intro = () => {
  return (
    <div className='  flex  flex-col   items-center snap-center h-[100vh]'>
      <Navbar />

      <div className='flex justify-between  items-center min-h-[50vh] h-full w-full'>
        <div className='flex w-full flex-col  justify-start   gap-4 '>
          <h1 className='text-white text-4xl bold font-semibold'>Think outside the box</h1>
          <h1 className='text-[#E3C515] font-semibold'> -- What i do</h1>
          <h5 className='text-sm text-gray-300'>full stuff stuff i do this and that </h5>
          <button className='bg-[#E3C515]  shadow shadow-white w-1/3 rounded p-2'>Learn more</button>
        </div>
        <div className='w-full h-full max-h-[80vh] flex justify-center relative '>
          <Canvas  >
            <PerspectiveCamera makeDefault position={[0, 3, 3.8]} />
            <OrbitControls  />
            <mesh>
              <Sphere args={[2, 32, 32]} >

              <MeshDistortMaterial color={"#500b9f"} attach="material" distort={0.25} speed={1}/>
              </Sphere>
            </mesh>
            <spotLight penumbra={0.3} args={["white", 2, 20, 0.3]} castShadow position={[-5, 5, 5]} />
            <ambientLight intensity={0.03} />

          </Canvas>
          <Image className="w-1/2 ok m-auto absolute top-0 bottom-0 left-0 right-0   max-w-[400px]  min-w-[300px]" src="/pro.png" alt="My Image" width={500} height={300}
          />
        </div>
      </div>
    </div>
  )

}