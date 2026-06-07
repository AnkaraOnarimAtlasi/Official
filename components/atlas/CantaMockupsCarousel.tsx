'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BagMockup {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  description: string;
  layerColor: string;
}

const BAGS: BagMockup[] = [
  {
    id: 6,
    src: '/mockups/canta-6.png',
    title: 'Bez Çanta · Sarı Edisyon',
    subtitle: 'Logo Özel Edisyon',
    description: "Ankara'nın üretim kültüründen ilham alan bu edisyon; el emeği, ustalık ve geleneksel zanaat pratiklerini görünür kılan rotalara eşlik etmek için tasarlandı.",
    layerColor: '#D97706', // Sarı / Altın tonu
  },
  {
    id: 5,
    src: '/mockups/canta-2.png',
    title: 'Bez Çanta · Kırmızı Edisyon',
    subtitle: 'Katman 02 · Nesneyi Onaranlar',
    description: 'Nesnelerin taşıdığı hafızadan ilham alan bu edisyon; onarım, koruma ve aktarılan bilgi etrafında şekillenen hikâyeleri temsil eder.',
    layerColor: '#B91C1C', // Kırmızı
  },
  {
    id: 2,
    src: '/mockups/canta-3.png',
    title: 'Bez Çanta · Kırmızı Edisyon',
    subtitle: 'Katman 02 · Nesneyi Onaranlar',
    description: 'Nesnelerin taşıdığı hafızadan ilham alan bu edisyon; onarım, koruma ve aktarılan bilgi etrafında şekillenen hikâyeleri temsil eder.',
    layerColor: '#B91C1C', // Kırmızı
  },
  {
    id: 4,
    src: '/mockups/canta-5.png',
    title: 'Bez Çanta · Mavi Edisyon',
    subtitle: 'Katman 03 · Hafızayı Onaranlar',
    description: 'Görme, kaydetme ve hatırlama kavramlarından yola çıkan bu edisyon; analog kültür ve kent belleği üzerine kurulu keşif rotalarına gönderme yapar.',
    layerColor: '#1D4ED8', // Mavi
  },
  {
    id: 3,
    src: '/mockups/canta-4.png',
    title: 'Bez Çanta · Mavi Edisyon',
    subtitle: 'Katman 03 · Hafızayı Onaranlar',
    description: 'Görme, kaydetme ve hatırlama kavramlarından yola çıkan bu edisyon; analog kültür ve kent belleği üzerine kurulu keşif rotalarına gönderme yapar.',
    layerColor: '#1D4ED8', // Mavi
  },
  {
    id: 1,
    src: '/mockups/canta-1.png',
    title: 'Bez Çanta · Sarı Edisyon',
    subtitle: 'Logo Özel Edisyon',
    description: "Ankara'nın üretim kültüründen ilham alan bu edisyon; el emeği, ustalık ve geleneksel zanaat pratiklerini görünür kılan rotalara eşlik etmek için tasarlandı.",
    layerColor: '#D97706', // Sarı / Altın tonu
  },
];

export function CantaMockupsCarousel() {
  const [active, setActive] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeBag = BAGS[active];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % BAGS.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + BAGS.length) % BAGS.length);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      {/* Sol — 3D Stacked Deck */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center">
        <div
          className="relative w-full max-w-[420px] aspect-[1/1] flex items-center justify-center"
          style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
        >
          {/* Yerdeki yumuşak 3D gölge */}
          <div
            aria-hidden
            className="absolute bottom-4 left-[10%] right-[10%] h-6 rounded-full bg-ink/12 blur-lg transition-transform duration-500"
            style={{
              transform: `scale(${hoveredIndex !== null ? 1.05 : 1})`,
            }}
          />

          {BAGS.map((bag, idx) => {
            // Dairesel fark hesabı (active merkeze yerleşecek)
            let diff = idx - active;
            
            // Dairesel kaydırma
            if (diff < -BAGS.length / 2) diff += BAGS.length;
            if (diff > BAGS.length / 2) diff -= BAGS.length;

            const isActive = idx === active;
            const isHovered = hoveredIndex === idx;
            
            // 3D transform parametreleri
            const rotateY = diff * 12; // Y ekseninde kıvrılma açısı
            const translateZ = isActive ? 100 : -Math.abs(diff) * 120; // aktif çanta öne fırlar
            const translateX = diff * 90; // yatay fan açılması
            const translateY = Math.abs(diff) * 15; // hafif kavisli aşağı inme
            const rotateZ = diff * 4; // hafif yelpaze eğimi
            
            return (
              <figure
                key={bag.id}
                onClick={() => setActive(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute w-[62%] aspect-[1/1.15] select-none cursor-pointer rounded-xl overflow-hidden shadow-sheet border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  zIndex: BAGS.length - Math.abs(diff),
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${isActive && isHovered ? 1.03 : 1})`,
                  opacity: Math.abs(diff) > 2 ? 0 : 1 - Math.abs(diff) * 0.25,
                  pointerEvents: Math.abs(diff) > 1 && !isActive ? 'none' : 'auto',
                  backgroundColor: 'var(--atlas-paper-light)',
                  borderColor: isActive 
                    ? 'rgba(20, 20, 20, 0.24)' 
                    : 'rgba(20, 20, 20, 0.08)',
                }}
              >
                <div className="relative w-full h-full p-3 flex flex-col justify-between">
                  {/* Üst renk şeridi */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1.5 transition-opacity duration-300"
                    style={{
                      backgroundColor: bag.layerColor,
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />

                  {/* Thumbnail / Image Area */}
                  <div className="relative w-full flex-1 rounded-lg overflow-hidden bg-paper-deep/20 mt-1">
                    <Image
                      src={bag.src}
                      alt={bag.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 40vw"
                      className="object-cover transition-transform duration-500"
                      style={{
                        transform: isActive && isHovered ? 'scale(1.05)' : 'scale(1)',
                      }}
                      priority={isActive}
                    />
                  </div>

                  {/* Alt etiket alanı */}
                  <figcaption className="mt-2.5 px-1 flex flex-col">
                    <span className="truncate font-display text-[0.88rem] leading-tight text-ink mt-0.5">
                      {bag.title.split(' · ')[0]}
                    </span>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>

        {/* 3D Kontroller */}
        <div className="mt-6 flex items-center gap-6">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper-light text-ink/70 transition-all hover:bg-paper hover:border-ink/30 active:scale-95"
            aria-label="Önceki mockup"
          >
            &larr;
          </button>
          
          <div className="flex gap-2">
            {BAGS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: active === i ? '18px' : '8px',
                  backgroundColor: active === i ? BAGS[i].layerColor : 'rgba(20,20,20,0.15)',
                }}
                aria-label={`Mockup ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper-light text-ink/70 transition-all hover:bg-paper hover:border-ink/30 active:scale-95"
            aria-label="Sonraki mockup"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Sağ — Aktif Detay Açıklaması */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <span className="archive-label text-ink/45 text-xs">
          Promosyon Ürünleri
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-ink mt-3 leading-tight transition-all duration-500">
          {activeBag.title}
        </h3>
        <p className="hand-note text-lg text-ink/65 mt-1.5 transition-all duration-500">
          {activeBag.subtitle}
        </p>
        
        <div 
          className="h-[1.5px] w-16 my-5 transition-colors duration-500" 
          style={{
            backgroundColor: activeBag.layerColor
          }}
        />

        <p className="text-base text-ink/75 leading-relaxed transition-all duration-500">
          {activeBag.description}
        </p>

        <ul className="mt-6 space-y-2.5 text-sm text-ink/70">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30" />
            %100 Organik pamuk ham kanvas dokusu
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30" />
            Zanaat katmanlarına özel Pantone renk kodları
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30" />
            Saha araştırmalarında kullanım için sağlam dikiş
          </li>
        </ul>
      </div>
    </div>
  );
}
