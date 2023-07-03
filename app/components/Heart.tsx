import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as THREE from 'three';

import { Mesh, Shape, BackSide, DoubleSide, ExtrudeGeometry, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';

export const Heart = () => {
    const angleToradians = (degAngle: number) => (Math.PI / 180) * degAngle
    const orbitControlsRef = useRef(null)
    useFrame((state) => {
        if (orbitControlsRef.current) {
            const { x, y } = state.mouse
            orbitControlsRef.current.setAzimuthalAngle(-x * angleToradians(90))
            orbitControlsRef.current.setPolarAngle(-y + 0.9 * angleToradians(90 - 30))

            orbitControlsRef.current.update()
        }
    })
    useEffect(() => {
        if (orbitControlsRef.current)
            console.log(orbitControlsRef.current)
    }, [orbitControlsRef.current])

    const Myself = () => {
        const loader = new FontLoader();
        const geoRef = useRef(null);
    
        useEffect(() => {
          loader.load('./Rubik.json', function (font: Font) {
            const geometry = new TextGeometry('MYA', {
              font: font,
              size: 80,
              height: 5,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 10,
              bevelSize: 8,
              bevelOffset: 0,
              bevelSegments: 5,
            });
            geoRef.current.geometry = geometry;
          });
        }, []);
    
        return <primitive object={geoRef.current} />;
      };
    const HeartGeometry = () => {
        const heartShape = new Shape();
        const x = 0, y = 0;

        heartShape.moveTo(x + 5, y + 5);
        heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
        heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
        heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
        heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
        heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
        heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
        const extrudeSettings = {
            depth: 10, // Adjust the thickness here
            bevelEnabled: false,
        };
        const heartGeometry = new ExtrudeGeometry(heartShape, extrudeSettings);

        return (
            <primitive object={heartGeometry} />
        );
    };
    const TextGeometry = () => {
        const loader = new FontLoader();
    
        const textRef = useRef(null);
    
        useEffect(() => {
          loader.load('./Rubik.json', function (font: Font) {
            const geometry = new TextGeometry('MYA', {
              font: font,
              size: 80,
              height: 5,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 10,
              bevelSize: 8,
              bevelOffset: 0,
              bevelSegments: 5,
            });
    
            if (textRef.current) {
              textRef.current.geometry = geometry;
            }
          });
        }, []);
    
        return textRef.current ? <primitive object={textRef.current} /> : null;
      };

    const ballRef = useRef(null)
    useEffect(() => {
        if (ballRef.current) {
            console.log(ballRef.current)
            const timeline = gsap.timeline({ repeat: -1, yoyo: true })
            timeline.to(ballRef.current.position, {
                y: 3,
                duration: 1,
                ease: "power1"

            })
            timeline.to(ballRef.current.position, {
                y: 1,
                duration: 1,
                ease: "none"
            }, ">")
        }
    }, [ballRef.current])
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


            <PerspectiveCamera makeDefault position={[0, 3, 15]} />
            <OrbitControls autoRotate ref={orbitControlsRef} maxPolarAngle={angleToradians(80)} minPolarAngle={angleToradians(60)} />
            <mesh ref={ballRef} position={[0, 1, 0]} castShadow >
                {/* <sphereGeometry args={[1, 32, 32]} /> */}
                <Myself />
                {/* <HeartGeometry /> scale={[0.2, -0.2, 0.2]} */}
                <meshStandardMaterial side={DoubleSide} metalness={0.2} roughness={0.3} color="yellow" />
            </mesh>
            <mesh rotation={[-angleToradians(90), 0, 0]} receiveShadow>
                <planeGeometry args={[7, 7]} />
                <meshBasicMaterial side={BackSide} color="green" />
                <meshStandardMaterial metalness={1} roughness={0.5} color="white" />

            </mesh>
            <ambientLight intensity={0.03} />
            {/* directinal light */}
            {/* <directionalLight args={["white", 1]} position={[-40,20,10]} /> */}
            <spotLight penumbra={0.3} args={["white", 2, 20, 0.3]} castShadow position={[-5, 5, 0]} />
            {/* environement */}
            {/* <Environment background>
            <mesh>

            <sphereGeometry args={[50,100,100]}/>
            <meshBasicMaterial side={BackSide} color="green"/>
            </mesh>
        </Environment> */}


        </>
    )
}
