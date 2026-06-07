'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState, useMemo } from 'react';
import { OrbitControls, useTexture, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BookMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load optimized front and back cover textures (WebP)
  const [frontTex, backTex] = useTexture([
    '/atlas/front-cover.webp',
    '/atlas/back-cover.webp',
  ]);

  // Gentle auto-rotation / hover tilting using useFrame
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    if (!hovered) {
      // Idle floating and slight turning
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.22 + 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    } else {
      // Gentle follow-mouse rotation when hovered
      const targetX = (state.pointer.y * 0.4);
      const targetY = (state.pointer.x * 0.4) + 0.3;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.1;
      meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.1;
    }
  });

  // Wrap materials in useMemo to prevent re-creation on every render frame
  const materials = useMemo(() => {
    const pageMat = new THREE.MeshStandardMaterial({
      color: '#eae6da',
      roughness: 0.9,
      metalness: 0.05,
    });

    const spineMat = new THREE.MeshStandardMaterial({
      color: '#242422',
      roughness: 0.6,
    });

    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.42,
      metalness: 0.1,
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.42,
      metalness: 0.1,
    });

    return [
      pageMat,   // PosX (Right edge of pages)
      spineMat,  // NegX (Spine)
      pageMat,   // PosY (Top edge of pages)
      pageMat,   // NegY (Bottom edge of pages)
      frontMat,  // PosZ (Front cover)
      backMat,   // NegZ (Back cover)
    ];
  }, [frontTex, backTex]);

  // Based on PDF dimensions: Rect(0, 0, 742, 532) -> aspect ratio is ~1.39
  // We use Width = 4.17, Height = 3.0, Thickness = 0.08 (sleek booklet/brochure style)
  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      material={materials}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[4.17, 3.0, 0.08]} />
    </mesh>
  );
}

export default function BookCanvas() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm border border-ink/15 bg-paper shadow-sheet overflow-hidden select-none cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          className="w-full h-full bg-[#ebdcb7]/20"
        >
          {/* Studio lighting setup */}
          <ambientLight intensity={1.1} />
          
          <directionalLight
            position={[4, 6, 5]}
            intensity={1.6}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0005}
          />
          
          <directionalLight
            position={[-4, 3, -4]}
            intensity={0.6}
          />

          <Suspense fallback={null}>
            <Center>
              <BookMesh />
            </Center>
            
            {/* Soft contact shadow underneath the floating book */}
            <ContactShadows
              position={[0, -1.55, 0]}
              opacity={0.45}
              scale={7}
              blur={1.6}
              far={1.2}
            />
          </Suspense>

          {/* User manual rotation control - enableZoom is false to allow page scroll */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 3 / 4}
            makeDefault
          />
        </Canvas>

        {/* 3D interaction guide tag */}
        <div className="absolute bottom-3 right-3 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-paper-light/90 px-2 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-ink/65 backdrop-blur-[1px] border border-ink/10">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3 w-3 animate-bounce">
              <path d="M8 2v12M5 11l3 3 3-3" />
            </svg>
            Çevirerek Keşfet
          </span>
        </div>
      </div>
    </div>
  );
}
