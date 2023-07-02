import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { Mesh, Shape, DoubleSide, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';

export const Heart = () => {
    const angleToradians = (degAngle: number) => (Math.PI / 180) * degAngle
    const orbitControlsRef = useRef(null)
    useFrame((state) => {
        if (orbitControlsRef.current) {
            const { x, y } = state.mouse
            orbitControlsRef.current.setAzimuthalAngle(-x * angleToradians(90))
            orbitControlsRef.current.setPolarAngle(-y+0.9 * angleToradians(90-30))

            orbitControlsRef.current.update()
        }
    })
    useEffect(() => {
        if (orbitControlsRef.current)
            console.log(orbitControlsRef.current)
    }, [orbitControlsRef.current])
    return (
        <>
            {/* <mesh scale={[0.4, -0.4, 0.4]} >
    <ambientLight intensity={1} />
    <directionalLight position={[3,2,1]} />
    <mesh args={[heart.shape, heart.material]}/>
    <meshStandardMaterial  color={"red"}/>
</mesh> */}
            {/* <shapeGeometry args={[heart]}/> */}
            {/* <shapeGeometry args={[new Shape()]} /> */}


            <PerspectiveCamera  makeDefault position={[0, 3, 15]} />
            <OrbitControls autoRotate ref={orbitControlsRef} maxPolarAngle={ angleToradians(80)} minPolarAngle={angleToradians(60)} />
            <mesh position={[0, 1, 0]} castShadow >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="yellow" />
            </mesh>
            <mesh rotation={[-angleToradians(90), 0, 0]} receiveShadow>
                <planeGeometry args={[7, 7]} />
                <meshStandardMaterial color="white" />

            </mesh>
            <ambientLight intensity={0.01} />
            {/* directinal light */}
            {/* <directionalLight args={["white", 1]} position={[-40,20,10]} /> */}
            <spotLight  penumbra={0.3} args={["white", 2, 20, 0.3]} castShadow position={[-5,5,0]}/>
        </>
    )
}
