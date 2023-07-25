import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, OrbitControlsChangeEvent, PerspectiveCamera } from '@react-three/drei'
import { Mesh, Shape, BackSide, DoubleSide, ExtrudeGeometry, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as THREE from 'three';
import JSONfont from "../Rubik.json";


export const Heart = () => {
  const angleToradians = (degAngle: number) => (Math.PI / 180) * degAngle
  const orbitControlsRef = useRef<any>(null)
  const lightRef = useRef<THREE.SpotLight>(null)

  let angle = 0;
  let lightRadius = 8
  let camerAngle = 0
  let camerAngleSign = 1

  useFrame((state) => {
    // console.log( lightRef.current , lightRef.current.position)
    if (orbitControlsRef.current && ballRef.current && ballRef.current.position &&  lightRef.current && lightRef.current.position) {
      // const { x, y } = state.mouse

      // const y = angle
      orbitControlsRef.current.setAzimuthalAngle(-camerAngle / 100 * angleToradians(90))
      // const azimuthalAngle = -camerAngle / 100 * angleToradians(90);
      // orbitControlsRef.current.position.setFromSphericalCoords(10, azimuthalAngle, 0); // Change the azimuthal angle
      // orbitControlsRef.current.setPolarAngle(-y + 0.9 * angleToradians(90 - 30))
      // orbitControlsRef.current.position.
      // orbitControlsRef.current.update()

      const angleInRadians = THREE.MathUtils.degToRad(angle);
      const x = 40 * Math.sin(angleInRadians);
      const z = 40 * Math.cos(angleInRadians);
      // orbitControlsRef.current.position.x = x;
      // orbitControlsRef.current.position.z = z;

      lightRef.current.position.x = lightRadius * Math.sin(angleInRadians);
      lightRef.current.position.z = lightRadius * Math.cos(angleInRadians);


      ballRef.current.position.x = (-0.2 ) * 1.5  * Math.sin(angleInRadians) + 1.5;
      ballRef.current.position.y = (-0.5 ) * 1.5  * Math.cos(angleInRadians) + 1.2
      ballRef.current.position.z = (0.9  ) * 1.5 * Math.cos(angleInRadians);

      // rotate light
      console.log("light")
      if (camerAngle == 100)
      camerAngleSign  *= -1
      else if (camerAngle == -100)
      camerAngleSign  *= -1
        camerAngle += camerAngleSign
      angle++
      // setAngle((prev) => (prev + 0.001))
    }
  })

  // const Myself = () => {
  //     const loader = new FontLoader();
  //     const geoRef = useRef(null);

  //     useEffect(() => {
  //       loader.load('./Rubik.json', function (font: Font) {
  //         const geometry = new TextGeometry('MYA', {
  //           font: font,
  //           size: 80,
  //           height: 5,
  //           curveSegments: 12,
  //           bevelEnabled: true,
  //           bevelThickness: 10,
  //           bevelSize: 8,
  //           bevelOffset: 0,
  //           bevelSegments: 5,
  //         });
  //         geoRef.current.geometry = geometry;
  //       });
  //     }, []);

  //     return <primitive object={geoRef.current} />;
  //   };
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
  // const TextGeometry = () => {
  //     const loader = new FontLoader();

  //     const textRef = useRef(null);

  //     useEffect(() => {
  //       loader.load('./Rubik.json', function (font: Font) {
  //         const geometry = new TextGeometry('MYA', {
  //           font: font,
  //           size: 80,
  //           height: 5,
  //           curveSegments: 12,
  //           bevelEnabled: true,
  //           bevelThickness: 10,
  //           bevelSize: 8,
  //           bevelOffset: 0,
  //           bevelSegments: 5,
  //         });

  //         if (textRef.current) {
  //           textRef.current.geometry = geometry;
  //         }
  //       });
  //     }, []);

  //     return textRef.current ? <primitive object={textRef.current} /> : null;
  //   };
  const textGeo = () => {
    const loader = new FontLoader();
    loader.load('Rubik.json', function (font: Font) {
      const geometry = new TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });
    });

  }
  const font = new FontLoader().parse(JSONfont);
  // configure font mesh
  const textOptions = {
    font,
    size: 5,
    height: 1
  };

  const ballRef = useRef<THREE.Mesh>(null)
  // useEffect(() => {
  //   if (ballRef.current) {
  //     const timeline = gsap.timeline({ repeat: -1, yoyo: true });

  //     timeline.to(ballRef.current.position, {
  //       y: 2,
  //       duration: 1,
  //       ease: "power1"
  //     });

  //     const secondTimeline = gsap.timeline({ repeat: -1, yoyo: true });
  //     secondTimeline.to(ballRef.current.position, {
  //       y: 0,
  //       duration: 1,
  //       ease: "none"
  //     });

  //     timeline.add(secondTimeline, ">"); // Add secondTimeline after the first animation
  //   }
  // }, [ballRef.current]);


  const ThreeDTextComponents = () => {
    const meshRef = useRef<Mesh>(null);

    useEffect(() => {
      const fontLoader = new FontLoader();
      fontLoader.load(
        'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json',
        (font) => {
          const textGeometry = new TextGeometry('MYA', {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelSegments: 5,
          });

          const textMaterial = new THREE.MeshStandardMaterial({
            color: 'white',
            metalness: 0.2,
            roughness: 0.3,
            side: DoubleSide,
          });

          const textMesh = new THREE.Mesh(textGeometry, textMaterial);

          if (meshRef.current) {
            meshRef.current.add(textMesh);
          }
        }
      );
    }, []);

    return <mesh ref={meshRef} position={[-1, 0, -1]} castShadow />;
  };

  const ThreeDTextComponent = () => {
    const meshRef = useRef<Mesh>(null);

    useEffect(() => {
      const fontLoader = new FontLoader();
      fontLoader.load('Rubik.json', function (font) {
        const textGeometry = new TextGeometry('1337', {
          font: font,
          size: 1,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelSegments: 5,
        });

        const textMaterial = new THREE.MeshStandardMaterial({
          color: 'white',
          metalness: 0.2,
          roughness: 0.3,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.castShadow = true; // Enable casting shadow from the text

        if (meshRef.current) {
          meshRef.current.add(textMesh);
        }
      });
      console.log("put text")
    }, []);

    return <mesh ref={meshRef} position={[-1.3, 0, 0]} castShadow />;
  };

  const lookAtTarget = new THREE.Vector3(0, 1, 0);
  return (
    <>



      <PerspectiveCamera makeDefault position={[0, 3, 8]} />
      <OrbitControls  enableZoom={false} ref={orbitControlsRef} maxPolarAngle={angleToradians(80)} minPolarAngle={angleToradians(60)} />
      <ThreeDTextComponent />
      <mesh ref={ballRef} position={[-1.2, 0, -0.9]} castShadow >
        <sphereGeometry args={[0.3, 32, 32]} />
        {/* <HeartGeometry /> scale={[0.2, -0.2, 0.2]} */}
        <meshStandardMaterial side={DoubleSide} metalness={0.2} roughness={0.3} color="yellow" />
      </mesh>
      <mesh rotation={[-angleToradians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial side={BackSide} color="green" />
        <meshStandardMaterial metalness={1} roughness={0.5} color="white" />

      </mesh>
      <ambientLight intensity={0.03} />
      {/* directinal light */}
      {/* <directionalLight args={["white", 1]} position={[-40,20,10]} /> */}



      <spotLight ref={lightRef} penumbra={0.3} args={["white", 2, 20, 0.3]} castShadow position={[-5, 5, 2]} />
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
