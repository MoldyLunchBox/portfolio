import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three'; // Import the entire THREE library

export const MyModel = () => {
  const group = useRef<any>();
  const animationAction = useRef<any>();
  const animationMixer = useRef<any>();
  const [isWalking, setIsWalking] = useState(true);

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load('./models/walk.fbx', (fbxModel) => {
      // Create an animation mixer
      const mixer = new THREE.AnimationMixer(fbxModel);

      // Play the first animation clip
      const action = mixer.clipAction(fbxModel.animations[0]);
      action.setLoop(THREE.LoopRepeat, Infinity); // Set animation to repeat
      // action.clampWhenFinished = true; // Ensure animation doesn't blend into the next one
      action.play();

      fbxModel.scale.set(0.01, 0.01, 0.01);
      // Add the fbxModel to the group, not the scene
      group.current.add(fbxModel);

      // Assign the mixer and animation action to the group's current property
      animationMixer.current = mixer;
      animationAction.current = action;
      animationAction.current.timeScale = 1
    });
  }, []);

  const [angle, setAngle] = useState(0)
  const prevAngle = useRef(0);
  const prevTimeRef = useRef(0);
  useFrame((state, delta) => {
    // Update the animation mixer on each frame
    if (animationMixer.current) {
      animationMixer.current.update(delta);
    }
    // Control the model's walking animation
    if (isWalking && animationAction.current) {
      // Move the model forward in the circle path
      // Calculate the rotation angle based on the difference in positions

      // Set the position and rotation of the group


      // Check if the animation loop has restarted
      const currentTime = animationAction.current.time;
      const prevTime = prevTimeRef.current;
      if (currentTime < prevTime) {
        setAngle((prev) => prev + 2.1);

        // Calculate new position in the circle path
        const angleInRadians = THREE.MathUtils.degToRad(angle);
        const x = 40 * Math.sin(angleInRadians);
        const z = 40 * Math.cos(angleInRadians);
        const rotationAngle = Math.atan2(x - group.current.position.x, z - group.current.position.z);

        // Animation loop has restarted, do something here
        console.log('Animation loop has restarted.');
        group.current.position.x = x;
        group.current.position.z = z;
        group.current.position.y = 1;

        group.current.rotation.y = rotationAngle;
        prevAngle.current = rotationAngle;
      }
      prevTimeRef.current = currentTime;


    }
  });

  const startWalking = () => {
    setIsWalking(true);
    if (animationAction.current) {
      animationAction.current.paused = false;
      animationAction.current.timeScale = 1; // Set timeScale to 1 to forward play the animation
    }
  };

  const stopWalking = () => {
    setIsWalking(false);
    if (animationAction.current) {
      animationAction.current.paused = true;
      animationAction.current.timeScale = 0; // Set timeScale to 0 to pause the animation
    }
  };

  return (
    <group ref={group}>
      {/* The group itself does not need to render anything */}
      {/* Example buttons to control walking */}
    </group>
  );
};
