'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * BackgroundGradient — Tüm haritaların pastel renklerini sayfa kaydırıldıkça
 * yumuşak geçişlerle sunan ve fare hareketlerini takip eden canlı arka plan sistemi.
 */
export function BackgroundGradient() {
  const pathname = usePathname();
  const [currentBg, setCurrentBg] = useState('#edf2fc'); // Varsayılan pastel mavi
  
  // Fare takip koordinatları
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // 1. Ekran Kaydırıldıkça Bölüm Renklerini Tespit Etme
  useEffect(() => {
    // Sayfadaki tüm section'ları bul (layout ve main içerisindeki)
    const sections = document.querySelectorAll('main section, main > div > section');
    
    // Varsayılan pastel renk sırası
    const colors = [
      '#edf2fc', // 1. Bölüm (Hero) — Pastel Mavi (Analog Optik)
      '#eef7f5', // 2. Bölüm (Layers) — Pastel Nane Yeşili (Zanaat)
      '#f4f0f9', // 3. Bölüm (Preview) — Pastel Mor (Kağıt Sanatı)
      '#faf0ef', // 4. Bölüm (Manifesto) — Pastel Gül Kırmızısı (Manifesto)
      '#f9f3ee', // 5. Bölüm (Story) — Pastel Sepia (Nesne Tamiri)
      '#fcf9ef', // 6. Bölüm (Physical) — Pastel Sarı/Krem
      '#edf2fc', // 7. Bölüm (Submission) — Pastel Mavi
    ];

    if (sections.length === 0) {
      // Eğer sayfada section yoksa varsayılan olarak pastel mavi kullan
      setCurrentBg('#edf2fc');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const index = Array.from(sections).indexOf(target);
            
            // Eğer elementte özel data-bg tanımlanmışsa onu kullan, yoksa index'e göre pastel rengi seç
            const customBg = target.getAttribute('data-bg');
            const chosenBg = customBg || colors[index % colors.length] || '#fafaf7';
            
            setCurrentBg(chosenBg);
          }
        });
      },
      {
        root: null,
        rootMargin: '-35% 0px -35% 0px', // Ekranın ortasına yaklaştığında tetikle
        threshold: 0.05,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, [pathname]);

  // 2. Dinamik Aksan Renklerini (CSS Değişkenlerini) Güncelleme
  useEffect(() => {
    const accentColors: Record<string, string> = {
      '#edf2fc': '#1a3f8f', // Mavi / İndigo
      '#eef7f5': '#1a6b5c', // Firuze / Yeşil
      '#f4f0f9': '#5c3b8e', // Mor / Kağıt Sanatı
      '#faf0ef': '#b91c1c', // Kırmızı / Manifesto
      '#f9f3ee': '#8a4a1f', // Sepia / Kahve
      '#fcf9ef': '#d97706', // Sarı
    };
    const accent = accentColors[currentBg] || '#5c3b8e';
    document.documentElement.style.setProperty('--atlas-red-deep', accent);
    document.documentElement.style.setProperty('--atlas-accent', accent);
  }, [currentBg]);

  // 3. Fareyi Takip Eden Yumuşak Parıldama (Spotlight)
  useEffect(() => {
    // İlk olarak ekranın ortasını hedefle
    mouseTarget.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouseCurrent.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = e.clientX;
      mouseTarget.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const tick = () => {
      // Yumuşak takip efekti (lerp)
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.08;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${mouseCurrent.current.x}px ${mouseCurrent.current.y}px, rgba(255, 255, 255, 0.45) 0%, transparent 100%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden transition-colors duration-1000 ease-out"
      style={{
        backgroundColor: currentBg,
        zIndex: 0,
      }}
    >
      {/* Kağıt Doku Üzerinde Yumuşak Işık Yansıması */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 w-full h-full mix-blend-overlay opacity-80"
        style={{
          willChange: 'background',
        }}
      />
    </div>
  );
}
