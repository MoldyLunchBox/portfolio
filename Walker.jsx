/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/walker.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const  Woman = (props) => {
  const { nodes, materials } = useGLTF('./models/walker.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Beta_Surface.geometry} material={materials.Beta_HighLimbsGeoSG3} />
      <mesh geometry={nodes.Beta_Joints.geometry} material={materials.Beta_Joints_MAT1} />
    </group>
  )
}
export default Woman
useGLTF.preload('/walker.gltf')
