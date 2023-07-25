'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './Navbar';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { Mesh, Shape, DoubleSide, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';
import { Heart } from './Heart';
import SplitType from 'split-type';

export const Whoami = () => {
  const [heart, setHeart] = useState({ shape: new ShapeGeometry(), material: new MeshBasicMaterial() })

  // useEffect(()=>{
  //   const x = 0, y = 0;

  // const heartShape = new Shape();

  // heartShape.moveTo(x + 5, y + 5);
  // heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  // heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  // heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  // heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  // heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  // heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);


  // const geometry = new ShapeGeometry( heartShape );
  // const material = new MeshBasicMaterial( { color: 0x00ff00,side: DoubleSide  } );
  // // Center the mesh
  // const scene = new Scene();
  // geometry.center();
  // const mesh = new Mesh( geometry, material ) ;
  // mesh.scale.set(0.5, 0.5, 0.5); // Adjust the scale to make it smaller


  //     // Adjust camera position and field of view
  //     const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //     camera.position.z = 10;

  //     scene.add(mesh);
  //     scene.add(camera);





  // scene.add( mesh );
  // setHeart({shape: geometry, material: material})
  // })
 
  return (
    <div className='flex items-center snap-center h-[100vh]'>


<div className='flex flex-col md:flex-row justify-center items-center h-full w-full'>
        <div className='flex w-full flex-col min-w-[280px] max-w-[500px] justify-center text-center md:text-left gap-4 '>
          <h1 className='text-white text-4xl bold font-semibold' id="title2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} >Boundary-Pushing Techie</h1>
          <h1 className='text-[#E3C515] md:text-xl font-semibold'> -- professional history</h1>
          <h5 className='text-sm text-gray-300 md:text-lg'>As a dedicated and passionate professional in the field of computer science, I have built a strong foundation in networking with a diploma from the esteemed Institute of Technologies. Additionally, my journey led me to graduate from the prestigious 1337 School of Computer Science, where I honed my skills and expanded my knowledge in the domain. </h5>
          {/* <button className='bg-[#E3C515]  shadow shadow-white w-1/3 rounded p-2'>Learn more</button> */}
        </div>


        <div className='max-w-[500px] max-h-[500px] w-[300px] h-[300px] md:h-full md:w-full flex justify-center relative '>
        <Canvas shadows>
            <Heart />
          </Canvas>
 
        </div>
      </div>

 
    </div>
  );
};
