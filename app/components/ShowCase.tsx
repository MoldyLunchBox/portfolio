import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import { Mesh, Shape, BackSide, DoubleSide, ExtrudeGeometry, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as THREE from 'three';
import JSONfont from "../Rubik.json";
import { userAgent } from 'next/server';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useLoader } from '@react-three/fiber'
import { MyModel } from './MyModel';
import { ReactModel } from './ReactModel';

interface Props {
  camRotate: number
  canvasRef: any
}
export const ShowCase = ({ canvasRef, camRotate }: Props) => {
  const { gl } = useThree();

  useEffect(() => {
    const handleTouchMove = (e:any) => {
      e.preventDefault();
    };

    gl.domElement.style.touchAction = 'none';
    gl.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      gl.domElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gl]);
  
  const angleToradians = (degAngle: number) => (Math.PI / 180) * degAngle
  const orbitControlsRef = useRef<any>(null)
  const cameraLight = useRef<any>(null)
  const centerShape = useRef<any>(null)
  useFrame((state) => {
    if (orbitControlsRef.current) {
      const { x, y } = state.mouse
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToradians(90))
      orbitControlsRef.current.update()
    }
  })


  const font = new FontLoader().parse(JSONfont);
  // configure font mesh
  const textOptions = {
    font,
    size: 5,
    height: 1
  };



  useEffect(() => {
    isClick = true

  }, [camRotate])

  const { camera } = useThree();
  let isClick = false;
  let oldPos = {
    x: camera.position.x,
    y: 200,
    z: camera.position.z
  }
  useFrame(() => {
    const angleInRadians = THREE.MathUtils.degToRad(camRotate);
    const radius = 50;

    if (centerShape.current) {
      centerShape.current.rotation.x += 0.005;
      centerShape.current.rotation.y += 0.01;
    }

    if (isClick) {
      const target = new THREE.Vector3(
        radius * Math.sin(angleInRadians),
        2,
        radius * Math.cos(angleInRadians)
      );
      if (cameraLight.current)
        gsap.to(cameraLight.current.position, {
          x: target.x,
          y: target.y + 5,
          z: target.z,
          duration: 0.2,
          ease: "power2.inOut" // Use a curved easing function for a smoother animation
        });

      gsap.to(camera.position, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 0.2,
        ease: "power2.inOut" // Use a curved easing function for a smoother animation
      });
    }

    if (!isClick) {
      if (cameraLight.current)
        gsap.to(cameraLight.current.position, {
          x: oldPos.x,
          y: oldPos.y + 5,
          z: oldPos.z,
          duration: 0.5,
          ease: "power2.inOut" // Use a curved easing function for a smoother animation
        });

      gsap.to(camera.position, {
        x: oldPos.x,
        y: oldPos.y,
        z: oldPos.z,
        duration: 0.5,
        ease: "power2.inOut" // Use a curved easing function for a smoother animation
      });
    }
  });


  // project showcase info
  const angle = 90
  const radius = 30
  const projects = [
    {
      name: null,
      screenshot: useTexture('./img/gomoku.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    },
    {
      name: "gomoku",
      screenshot: useTexture('./img/gomoku.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    },
    {
      name: "pingpong",
      screenshot: useTexture('./img/pingpong.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    },
    {
      name: "gomoku",
      screenshot: useTexture('./img/npuzzle.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    },
    {
      name: "Landing Page",
      screenshot: useTexture('./img/landingPageFlat.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    }
  ]
  const loader = new FBXLoader();
  loader.load('models/fbx/Samba Dancing.fbx', function (object) {

    const mixer = new THREE.AnimationMixer(object);

    const action = mixer.clipAction(object.animations[0]);
    action.play();

    object.traverse(function (child: any) {

      if (child.isMesh) {

        child.castShadow = true;
        child.receiveShadow = true;

      }

    });


  });

  const meshProjects = projects.map((project, index) => {
    if (project.name) {
      return (

        <mesh key={index} rotation={[0, angleToradians(angle) * index, 0]}
          position={[radius * Math.sin(angleToradians(angle) * index), 4.6, radius * Math.cos(angleToradians(angle * index))]}

          castShadow>

          <boxGeometry args={[10, 10, 0.2]} />
          <meshBasicMaterial attach="material-0" color="#000000" />
          <meshBasicMaterial attach="material-1" color="#000000" />
          <meshBasicMaterial attach="material-5" color="#000000" />

          <primitive
            castShadow penumbra={0.3}
            intensity={30}
            distance={40}
            angle={0.25}
            color={"white"}
            position={[0, 5, 36]}
            object={project.light}

          />
          {
            <primitive object={project.light.target}
            />
          }

          <meshStandardMaterial side={DoubleSide} attach="material-4" map={project.screenshot} metalness={1} roughness={0.8} bumpScale={0.0005} color="white" />
        </mesh>
      )
    }
  })


  const controlRef = useRef<any>(null);
  return (
    <>



      <PerspectiveCamera makeDefault position={[0, 2, 50]} />
      <OrbitControls ref={controlRef} domElement={canvasRef.current} enablePan={false} enableZoom={false} />

      <MyModel />
      <ReactModel />

      {/* floor */}
      <mesh rotation={[-angleToradians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial map={useTexture('./img/road.jpg')} metalness={1} side={DoubleSide} roughness={0.5} color="white" />
      </mesh>


      <mesh rotation={[-angleToradians(90), 0, 0]} position={[0, 1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={useTexture('./img/road2.jpg')} metalness={1} side={DoubleSide} roughness={0.5} color="white" />
      </mesh>

      {/* showcase frames */}
      <group>
        {meshProjects.map((mesh, index) => (
          <React.Fragment key={index}>
            {mesh}
          </React.Fragment>
        ))}
      </group>

      <mesh ref={centerShape} receiveShadow castShadow position={[0, 10, 0]}>
        <torusKnotGeometry args={[4, 1.2, 100, 35]} />
        <meshStandardMaterial metalness={1} roughness={1} color="blue" />

      </mesh>
      <ambientLight intensity={0.1} />



      <spotLight shadow-mapSize-width={1024}
        shadow-mapSize-height={1024} castShadow penumbra={0.3} args={["white", 60, 95, 10, 10, 3]} position={[0, 80, 0]} />

    </>
  )
}
