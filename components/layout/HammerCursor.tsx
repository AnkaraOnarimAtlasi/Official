'use client';

import { useEffect, useState } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
}

export function HammerCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isStriking, setIsStriking] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    // Mobil veya dokunmatik ekranlarda fare imlecini devre dışı bırak
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      // Fare ucunun çekicin vuran kısmı (sol üst) ile hizalanması için hafif offset
      setPosition({ x: e.clientX - 10, y: e.clientY - 10 });
    };

    const handleMouseDown = () => {
      setIsStriking(true);
    };

    const handleMouseUp = () => {
      setIsStriking(false);
    };

    const handleClick = (e: MouseEvent) => {
      const newSpark: Spark = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setSparks((prev) => [...prev, newSpark]);

      // Animasyon bittikten sonra DOM'dan temizle (300ms)
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        /* Çekiç vuruş ve kıvılcım efektleri */
        #cekic-cursor {
          position: fixed;
          width: 42px;
          height: 42px;
          pointer-events: none;
          z-index: 10000;
          transform-origin: 100% 100%;
          transition: transform 0.06s ease-in-out;
          will-change: left, top, transform;
        }

        #cekic-cursor.vurdu {
          transform: rotate(-35deg);
        }

        .click-effect {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 80px;
          height: 80px;
          transform: translate(-50%, -50%);
        }

        .doodle-spark {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke="%23141414" stroke-width="5" fill="none" stroke-linecap="round"><path d="M50,25 L50,5 M50,75 L50,95 M25,50 L5,50 M75,50 L95,50 M32,32 L15,15 M68,68 L85,85 M32,68 L15,85 M68,32 L85,15"/></g></svg>');
          animation: sparks-bum 0.3s ease-out forwards;
        }

        @keyframes sparks-bum {
          0% { transform: scale(0.3); opacity: 1; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
      `}</style>

      {/* Çekiç İmleç SVG */}
      <div
        id="cekic-cursor"
        className={isStriking ? 'vurdu' : ''}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <svg
          fill="#141414"
          version="1.1"
          id="Icons"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(1px 2px 2px rgba(20,20,20,0.15))' }}
        >
          <g>
            <path d="M6.6,19.8c-0.3,0-0.5-0.1-0.7-0.3l-3.7-3.7c-0.2-0.2-0.3-0.4-0.3-0.7s0.1-0.5,0.3-0.7l1.5-1.5c0.3-0.3,0.7-0.4,1-0.2
              l0.8,0.3l0.6-0.6c-0.1-1,0.2-2.1,1-2.9l4.2-4.2c1.7-1.7,4-2.7,6.5-2.8l0.4,0c0.4,0,0.8,0.2,0.9,0.6s0.1,0.8-0.2,1.1l-0.5,0.5
              c-1.3,1.3-2,3.1-1.7,4.9c0,0.3-0.1,0.6-0.3,0.8l-4.2,4.2c-0.8,0.8-1.8,1.1-2.9,1l-0.6,0.6L9,17c0.1,0.4,0,0.7-0.2,1l-1.5,1.5
              C7.1,19.7,6.9,19.8,6.6,19.8z" />
          </g>
          <path d="M28.8,22.4L17.6,12.1l-3.9,3.9c-0.1,0.1-0.1,0.1-0.2,0.2l10.4,11.3c0.7,0.7,1.5,1.1,2.5,1.1c0,0,0.1,0,0.1,0
            c0.9,0,1.8-0.4,2.5-1c0.7-0.7,1-1.6,1-2.6C29.9,24,29.5,23.1,28.8,22.4z" />
        </svg>
      </div>

      {/* Doodle Kıvılcımlar */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="click-effect"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
          }}
        >
          <div className="doodle-spark" />
        </div>
      ))}
    </>
  );
}
