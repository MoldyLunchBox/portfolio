import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three'; // Import the entire THREE library


export const ReactModel = () => {
  const group = useRef<any>();
useFrame(()=>{

})
    useEffect(() => {
        const loader = new FBXLoader();
        loader.load('./models/react.fbx', (fbxModel) => {
          fbxModel.scale.set(0.01, 0.01, 0.01);
          group.current.position.x = 0;
          group.current.position.z = 0;
          group.current.position.y = 3;
          // Add the fbxModel to the group, not the scene
          group.current.add(fbxModel);
          // Assign the mixer and animation action to the group's current property
        });
      }, []);

  return (
    <group ref={group}>
    {/* The group itself does not need to render anything */}
    {/* Example buttons to control walking */}
  </group>
  )
}
