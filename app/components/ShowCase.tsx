import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import { Mesh, Shape, BackSide, DoubleSide, ExtrudeGeometry, ShapeGeometry, MeshBasicMaterial, Scene, BoxGeometry, WebGLRenderer } from 'three';
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as THREE from 'three';
import JSONfont from "../Rubik.json";
import { userAgent } from 'next/server';
const clock = new THREE.Clock()

interface Props {
  camRotate: number
}
export const ShowCase = ({ camRotate }: Props) => {
  const angleToradians = (degAngle: number) => (Math.PI / 180) * degAngle
  const orbitControlsRef = useRef(null)
  const cameraLight = useRef(null)
  const centerShape = useRef(null)
  useFrame((state) => {
    if (orbitControlsRef.current) {
      const { x, y } = state.mouse
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToradians(90))
      // orbitControlsRef.current.setPolarAngle(-y + 0.9 * angleToradians(90 - 30))

      orbitControlsRef.current.update()
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

  const ballRef = useRef(null)
  useEffect(() => {
    if (ballRef.current) {
      const timeline = gsap.timeline({ repeat: -1, yoyo: true });

      timeline.to(ballRef.current.position, {
        y: 2,
        duration: 1,
        ease: "power1"
      });

      const secondTimeline = gsap.timeline({ repeat: -1, yoyo: true });
      secondTimeline.to(ballRef.current.position, {
        y: 0,
        duration: 1,
        ease: "none"
      });

      timeline.add(secondTimeline, ">"); // Add secondTimeline after the first animation
    }
  }, [ballRef.current]);


  const ThreeDTextComponents = () => {
    const meshRef = useRef(null);

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
    const meshRef = useRef(null);

    useEffect(() => {
      const fontLoader = new FontLoader();
      fontLoader.load('Rubik.json', function (font) {
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
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.castShadow = true; // Enable casting shadow from the text

        if (meshRef.current) {
          meshRef.current.add(textMesh);
        }
      });
    }, []);

    return <mesh ref={meshRef} position={[-1, 0, -1]} castShadow />;
  };
  const [camLookAt, setCamLookAt] = useState(new THREE.Vector3(-20, 1, 0))
  const lookAtTarget = new THREE.Vector3(60, 10, 0);
  const balltarget = new THREE.Vector3(0, 0, -0);
  const balltarget2 = new THREE.Vector3(0, 0, -10);

  const ballRef2 = useRef(undefined)
  useEffect(() => {
    isClick = true

  }, [camRotate])
  const spotlight = useMemo(() => new THREE.SpotLight('#fff'), []);
  const spotlight2 = useMemo(() => new THREE.SpotLight('#fff'), []);
  const sunSpotLight = useMemo(() => new THREE.SpotLight('#fff'), []);

  const { gl, camera } = useThree();
  let isClick = false;
  let oldPos = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }
  useFrame(() => {
    const angleInRadians = THREE.MathUtils.degToRad(camRotate);
    const radius = 50;

    if (centerShape.current){
      centerShape.current.rotation.x += 0.005;
      centerShape.current.rotation.y += 0.01;
    }

    if (isClick && cameraLight.current) {
      const target = new THREE.Vector3(
        radius * Math.sin(angleInRadians),
        2,
        radius * Math.cos(angleInRadians)
      );

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
  const texture = useTexture('./img/gomoku.jpg');
  const angle = 90
  const radius = 30
  const projects = [
    {
      name: "gomoku",
      screenshot: useTexture('./img/gomoku.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    },
    {
      name: "gomoku",
      screenshot: useTexture('./img/gomoku.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    },
    {
      name: "gomoku",
      screenshot: useTexture('./img/gomoku.jpg'),
      light: useMemo(() => new THREE.SpotLight('#fff'), [])
    }
  ]

  const colors = ['#00FF00', '#FF0000', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  return (
    <>



      <PerspectiveCamera makeDefault position={[0, 2, 50]} />
      <OrbitControls />
      {/* ball 1 */}
      {/* <mesh ref={ballRef} position={[0, 0, -50]} castShadow >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial side={DoubleSide} metalness={0.2} roughness={0.3} color="yellow" />
      </mesh> */}

      {/* ball 2 */}
      {/* <mesh ref={ballRef2} position={[0, 3, 0]} castShadow >
        <sphereGeometry args={[0.3, 32, 32]} />
roughness: 0.8,
					color: 0xffffff,
					metalness: 0.2,
					bumpScale: 0.0005

        <meshStandardMaterial side={DoubleSide} metalness={0.2} roughness={0.3} color="yellow" />
      </mesh> */}

      {/* floor */}
      <mesh rotation={[-angleToradians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial metalness={1} side={DoubleSide} roughness={0.5} color="white" />
      </mesh>

      {/* showcase frames */}
      {projects.map((project, index) => {
        return (

          <mesh key={index} rotation={[0, angleToradians(angle) * index, 0]} position={[radius * Math.sin(angleToradians(angle) * index), 4, radius * Math.cos(angleToradians(angle * index))]} castShadow>
            <boxGeometry args={[10, 10, 0.2]} />
            <meshBasicMaterial attach="material-0" color="#000000" />
            <meshBasicMaterial attach="material-1" color="#000000" />
            <meshBasicMaterial attach="material-5" color="#000000" />

            <meshStandardMaterial side={DoubleSide} attach="material-4" map={texture} metalness={0.2} roughness={0.8} bumpScale={0.0005} color="white" />
          </mesh>

        )
      })}


      {/* Ring rotation={[Math.PI / 2, 0, 0]}  */}
      <mesh ref={centerShape} receiveShadow castShadow position={[0, 10, 0]}>
        {/* <ringGeometry args={[35, 34, 32]} /> */}
        <torusKnotGeometry args={[ 4, 1.2, 100, 35 ]}/>
                {/* <torusGeometry args={[3, 0.5, 20, 2999]} /> */}
       {/* < cylinderGeometry args={[6, 6, 1.5, 64, 1, false]} /> */}
        <meshStandardMaterial   metalness={1} roughness={1}   color="blue" />

      </mesh>
      <ambientLight intensity={0.2} />
      {/* directinal light */}
      {/* <directionalLight args={["white", 1]} position={[-40,20,10]} /> */}

    
      {/* <primitive
        object={spotlight2}
        intensity={0.5}
        penumbra={1}
        castShadow
        position={[0, 20, -10]}
      />
      {


        <primitive object={spotlight2.target} position={balltarget} />
      } */}

      {/* <primitive
        object={spotlight}
        intensity={1.5}
        penumbra={0.2}
        castShadow
        position={[0, 10, -10]}
      />
      {


        <primitive object={spotlight.target} position={balltarget2} />
      } */}



      <spotLight shadow-mapSize-width={1024}
        shadow-mapSize-height={1024} castShadow penumbra={0.3} args={["white", 60, 95, 10, 10, 3]} position={[0, 80, 0]} />

<spotLight  castShadow penumbra={0.3} args={["white", 20, 12, 1]} position={[0, 8, 40]} />

      <spotLight ref={cameraLight} castShadow penumbra={0.3} args={["white", 0, 0, 0]} position={[0, 8, 32]} />
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
