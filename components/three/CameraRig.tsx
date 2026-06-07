'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  selectedLayerSlug: string | null;
  layerPositions: Record<string, number>;
}

export function CameraRig({ selectedLayerSlug, layerPositions }: CameraRigProps) {
  const { camera } = useThree();
  
  // Track lookAt target using ref to animate it smoothly
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  
  const targetPosition = useRef(new THREE.Vector3(0, 5, 8));

  useFrame((state) => {
    const step = 0.08; // Lerp speed factor

    if (selectedLayerSlug) {
      // Focus Mode (Top-down view centered on the selected sheet)
      const layerY = layerPositions[selectedLayerSlug] ?? 0;
      targetPosition.current.set(0, layerY + 3.2, 0.01); // 0.01 z-offset avoids gimbal lock
      lookAtTargetRef.current.set(0, layerY, 0);
    } else {
      // Overview Mode (Parallax + isometric stacked overview)
      const mouseX = state.pointer.x * 0.8;
      const mouseY = state.pointer.y * 0.5;
      
      targetPosition.current.set(mouseX, 4.5 + mouseY, 7.5 - mouseY * 0.2);
      lookAtTargetRef.current.set(0, 0, 0);
    }

    // Linearly interpolate camera position
    camera.position.lerp(targetPosition.current, step);

    // Linearly interpolate look-at target
    currentLookAtRef.current.lerp(lookAtTargetRef.current, step);
    camera.lookAt(currentLookAtRef.current);
  });

  return null;
}
