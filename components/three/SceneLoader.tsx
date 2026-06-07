'use client';

import { useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { cn } from '@/lib/utils/cn';

interface SceneLoaderProps {
  onComplete?: () => void;
}

export function SceneLoader({ onComplete }: SceneLoaderProps) {
  const { active, progress } = useProgress();
  const isLoaded = !active || progress === 100;

  // Render sırasında değil, effect içinde çağır → React kuralına uygun
  useEffect(() => {
    if (isLoaded && onComplete) {
      onComplete();
    }
  }, [isLoaded, onComplete]);

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center bg-paper-grain bg-paper z-20 transition-all duration-700 ease-atlas',
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      <div className="text-center space-y-4">
        <span className="archive-label text-ink/40 tracking-[0.2em] animate-pulse block">
          Atlas Yükleniyor
        </span>
        <div className="h-[1.5px] w-48 bg-ink/15 mx-auto relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 bottom-0 left-0 bg-ink transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="hand-note text-sm text-ink/65 block">
          Arşiv masası hazırlanıyor... %{Math.round(progress)}
        </p>
      </div>
    </div>
  );
}
