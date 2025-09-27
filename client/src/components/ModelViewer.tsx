'use client';

import { Suspense } from 'react';
import { OrbitControls, Center, Environment, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function Model() {
  const { scene } = useGLTF('/models/buddha.glb');

  return (
    <Center>
      <primitive object={scene} scale={3} />
    </Center>
  );
}

useGLTF.preload('/models/buddha.glb');

export function ModelViewer() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        
        <Suspense fallback={null}>
          <Model />
          <Environment preset="studio" background blur={0.5} />
        </Suspense>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
