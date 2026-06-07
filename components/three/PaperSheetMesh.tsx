'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { HotspotMarker } from './HotspotMarker';
import type { Layer, Stop } from '@/lib/types';

interface PaperSheetMeshProps {
  layer: Layer;
  baseY: number;
  selectedLayerSlug: string | null;
  onSelect: (slug: string) => void;
  stops: Stop[];
  onSelectStop: (stop: Stop) => void;
}

export function PaperSheetMesh({
  layer,
  baseY,
  selectedLayerSlug,
  onSelect,
  stops,
  onSelectStop,
}: PaperSheetMeshProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load texture using Drei's useTexture hook
  const texture = useTexture(layer.mapImage);
  
  const isSelected = selectedLayerSlug === layer.slug;
  const isAnySelected = selectedLayerSlug !== null;

  useFrame(() => {
    if (!meshRef.current) return;

    let targetY = baseY;
    let targetX = 0;
    const targetRotationX = -Math.PI / 2; // Flat on XZ plane
    const targetRotationY = 0;
    let targetRotationZ = 0;

    if (isSelected) {
      // Zoomed layer is centered and lifted slightly
      targetY = baseY + 0.2;
      targetX = 0;
    } else if (isAnySelected) {
      // Another layer is selected
      // If this layer is ABOVE the selected one in the visual stack, slide it out of the screen.
      // Top layer has higher baseY.
      const selectedLayerBaseY = isAnySelected ? (layer.slug === 'kagit-sanati' ? 1.2 : layer.slug === 'nesneyi-onaranlar' ? 0.4 : layer.slug === 'geleneksel-el-sanatlari' ? -0.4 : -1.2) : 0; // fallback, but we can compare baseY directly
      
      if (baseY > selectedLayerBaseY) {
        // Upper layer: slide completely off-screen to clear view
        targetX = 6.5;
        targetRotationZ = -0.15; // Elegant slide tilt
      } else {
        // Lower layer: sink down and stay center
        targetY = baseY - 0.5;
      }
    } else if (hovered) {
      // Hovered in overview stack: lift up slightly for tactile feel
      targetY = baseY + 0.35;
    }

    // Smooth animations using linear interpolation (lerp)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    
    // Smooth rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotationZ, 0.1);
  });

  const width = 4.4;
  const height = 3.3; // 4:3 aspect ratio scaled

  return (
    <group
      ref={meshRef}
      position={[0, baseY, 0]}
      onPointerOver={(e) => {
        if (!isAnySelected) {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      onClick={(e) => {
        if (!isAnySelected) {
          e.stopPropagation();
          onSelect(layer.slug);
        }
      }}
    >
      {/* Paper Sheet Mesh */}
      <mesh receiveShadow castShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.05}
          // Highlight active layer, slightly tint unselected ones
          color={isSelected ? '#ffffff' : hovered && !isAnySelected ? '#faf9f5' : '#f0ebd8'}
        />
      </mesh>

      {/* Decorative colored top-edge indicator tag */}
      <mesh position={[0, height / 2 - 0.04, 0.01]}>
        <planeGeometry args={[width, 0.08]} />
        <meshBasicMaterial color={layer.colorHex} />
      </mesh>

      {/* Renders Hotspots when this layer is selected (zoomed) */}
      {isSelected && (
        <group position={[0, 0, 0.02]}>
          {stops.map((stop) => {
            // Convert percentage map coordinates (0-100) to relative 3D plane coordinates
            const x = stop.mapX ? (stop.mapX / 100) * width - width / 2 : 0;
            // In Three.js PlaneGeometry, Y is up, so top of map is positive Y
            const y = stop.mapY ? (1 - stop.mapY / 100) * height - height / 2 : 0;

            return (
              <HotspotMarker
                key={stop.slug}
                stop={stop}
                position={[x, y, 0]}
                onClick={() => onSelectStop(stop)}
                layerColor={layer.colorHex}
              />
            );
          })}
        </group>
      )}
    </group>
  );
}
