'use client';

import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, RefObject } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const CameraAnimator = ({
  target,
  controlsRef,
  onAnimationComplete
}: {
  target: THREE.Vector3;
  controlsRef: RefObject<OrbitControlsImpl>;
  onAnimationComplete: () => void;
}) => {
  const { camera } = useThree();
  const [progress, setProgress] = useState(0);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (progress < 1) {
      setProgress((prev) => Math.min(prev + 0.01, 1)); 

      controls.target.lerp(target, 0.05);
      camera.position.lerp(new THREE.Vector3(0, 0, 0.1), 0.05);
      controls.update();
    } else {
      controls.enabled = true;
      controls.update();
      onAnimationComplete();
    }
  });

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      controls.enabled = false; // Lock controls during anim
      setProgress(0);
    }
  }, [target, controlsRef]);

  return null;
};

function Scene({
  imageUrl,
  target,
  onFreeRoamStart
}: {
  imageUrl: string;
  target: THREE.Vector3;
  onFreeRoamStart: () => void;
}) {
  const texture = useTexture(imageUrl);
  const controlsRef = useRef<OrbitControlsImpl>(null) as RefObject<OrbitControlsImpl>;
  const [isAnimating, setIsAnimating] = useState(true);

  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  useEffect(() => {
    setIsAnimating(true);
  }, [target]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={!isAnimating}
        enablePan={!isAnimating}
        enableRotate={!isAnimating}
        minDistance={1}
        maxDistance={300}
        onStart={() => {
          setIsAnimating(false); 
          onFreeRoamStart();
        }}
      />

      <CameraAnimator target={target} controlsRef={controlsRef} onAnimationComplete={() => setIsAnimating(false)} />

      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

interface PanoViewerInterface {
  imageUrl: string;
  targetCoordinates?: number[];
  onFreeRoamStart: () => void;
}

export function PanoViewer({
  imageUrl,
  targetCoordinates = [0, 0, 0],
  onFreeRoamStart
}: PanoViewerInterface ) {
  const target = new THREE.Vector3(...targetCoordinates);

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 0.1] }}>
        <Suspense fallback={null}>
          <Scene imageUrl={imageUrl} target={target} onFreeRoamStart={onFreeRoamStart} />
        </Suspense>
      </Canvas>
    </div>
  );
}
