'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './Navbar';
import Image from 'next/image';
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import { PerspectiveCamera } from 'three';

import {Mesh, Shape,DoubleSide , ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry } from 'three';

export const Whoami = () => {
  const [heart , setHeart] = useState({shape:new ShapeGeometry(), material: new MeshBasicMaterial()})


useEffect(()=>{
  const x = 0, y = 0;

const heartShape = new Shape();

heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);


const geometry = new ShapeGeometry( heartShape );
const material = new MeshBasicMaterial( { color: 0x00ff00,side: DoubleSide  } );
// Center the mesh
geometry.center();
const mesh = new Mesh( geometry, material ) ;
const camera = new PerspectiveCamera(100, 5, 0.1, 1000);
mesh.scale.set(0.5, 0.5, 0.5); // Adjust the scale to make it smaller

const scene = new Scene();
scene.add( mesh );
scene.add(camera);
setHeart({shape: geometry, material: material})
})
  return (
    <div className='flex items-center snap-center h-[100vh]'>
      <div className='flex justify-between items-center h-full w-full'>
        <div className='w-full flex justify-center'>
     <Canvas>
        <OrbitControls autoRotate />
      <mesh scale={[0.4, -0.4, 0.4]} >
        {/* <shapeGeometry args={[heart]}/> */}
        <mesh args={[heart.shape, heart.material]}/>
        {/* <shapeGeometry args={[new Shape()]} /> */}
      </mesh>
     </Canvas>
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
