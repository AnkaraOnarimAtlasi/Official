'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState, useMemo } from 'react';
import { OrbitControls, useTexture, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Programmatic 3D Spiral Binder Wire Rings
function SpiralBinder() {
  const ringsCount = 18;
  const height = 2.8; // Spans along the spine height
  const startY = -height / 2;
  const spacing = height / (ringsCount - 1);

  // Metallic chrome material for the binding wire
  const wireMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8a8a86',
    metalness: 0.9,
    roughness: 0.12,
  }), []);

  const rings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < ringsCount; i++) {
      arr.push(startY + i * spacing);
    }
    return arr;
  }, [ringsCount, startY, spacing]);

  // Renders a series of slightly tilted torus meshes wrapping around the left edge (x = -2.085)
  return (
    <group>
      {rings.map((y, idx) => (
        <mesh
          key={idx}
          position={[-2.085, y, 0]}
          rotation={[Math.PI / 2, 0.15, 0]} // Tilt gives helical spiral effect
          material={wireMaterial}
          castShadow
        >
          {/* radius = 0.07, tube = 0.016, radialSegments = 8, tubularSegments = 24 */}
          <torusGeometry args={[0.07, 0.016, 8, 24]} />
        </mesh>
      ))}
    </group>
  );
}

// Subassembly grouping Book and Spiral so they float and rotate together
function BookAssembly({ currentPage, onFlipPage }: { currentPage: number; onFlipPage: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load all atlas page textures (covers + maps)
  const textures = useTexture([
    '/atlas/front-cover.webp',
    '/atlas/source/katman-01-kagit-sanati.jpeg',
    '/atlas/source/katman-02-nesneyi-onaranlar.jpeg',
    '/atlas/source/katman-03-geleneksel-el-sanatlari.jpeg',
    '/atlas/source/katman-04-metal-ahsap.jpeg',
    '/atlas/source/katman-05-hafizayi-onaranlar.jpeg',
    '/atlas/back-cover.webp',
  ]);

  // Gentle auto-rotation / hover tilting using useFrame on the Group
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    if (!hovered) {
      // Idle floating and slight turning
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.22 + 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    } else {
      // Gentle follow-mouse rotation when hovered
      const targetX = (state.pointer.y * 0.4);
      const targetY = (state.pointer.x * 0.4) + 0.3;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.1;
      groupRef.current.position.y += (0 - groupRef.current.position.y) * 0.1;
    }
  });

  // Material setup for the 3D Box
  const materials = useMemo(() => {
    const pageMat = new THREE.MeshStandardMaterial({
      color: '#eae6da',
      roughness: 0.9,
      metalness: 0.05,
    });

    // Exposed paper edge materials on all 4 sides, custom textures on front and back
    return [
      pageMat,   // PosX (Right edge of pages)
      pageMat,   // NegX (Left edge of pages, under spiral)
      pageMat,   // PosY (Top edge of pages)
      pageMat,   // NegY (Bottom edge of pages)
      new THREE.MeshStandardMaterial({
        map: textures[currentPage],
        roughness: 0.42,
        metalness: 0.1,
      }), // PosZ (Front cover / Active Page)
      new THREE.MeshStandardMaterial({
        map: textures[6], // NegZ (Back cover)
        roughness: 0.42,
        metalness: 0.1,
      }),
    ];
  }, [textures, currentPage]);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Book Mesh */}
      <mesh
        castShadow
        receiveShadow
        material={materials}
        onClick={(e) => {
          e.stopPropagation();
          onFlipPage();
        }}
      >
        <boxGeometry args={[4.17, 3.0, 0.08]} />
      </mesh>

      {/* Spiral Binder Wire */}
      <SpiralBinder />
    </group>
  );
}

export default function BookCanvas({ currentPage, onFlipPage }: { currentPage: number; onFlipPage: () => void }) {
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
              <BookAssembly currentPage={currentPage} onFlipPage={onFlipPage} />
            </Center>
            
            {/* Soft contact shadow underneath the floating book assembly */}
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
        <div className="absolute bottom-3 right-3 pointer-events-none z-10 flex flex-col items-end gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-paper-light/90 px-2 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-ink/65 backdrop-blur-[1px] border border-ink/10">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3 w-3 animate-bounce">
              <path d="M8 2v12M5 11l3 3 3-3" />
            </svg>
            Çevirerek Keşfet
          </span>
          <span className="inline-flex items-center gap-1 rounded-sm bg-paper-light/95 px-2 py-0.5 text-[0.52rem] uppercase tracking-[0.16em] text-ink/50 border border-ink/10">
            Tıkla: Sayfa Çevir
          </span>
        </div>
      </div>
    </div>
  );
}
