'use client';

import { useActionState } from 'react';
import { submitSuggestion, type ActionState } from '@/app/actions/submitSuggestion';
import { cn } from '@/lib/utils/cn';

const initialState: ActionState = {
  success: false,
  message: '',
};

export function SubmissionForm() {
  const [state, formAction, isPending] = useActionState(submitSuggestion, initialState);

  if (state.success) {
    return (
      <div 
        className="bg-paper-light p-8 md:p-12 text-center space-y-6 animate-fade-in"
        style={{
          border: '2.5px solid var(--atlas-ink)',
          borderRadius: '15px 95px 12px 95px/95px 12px 95px 15px',
          boxShadow: '6px 6px 0px 0px var(--atlas-ink)',
        }}
      >
        <style>{`
          .doodle-success-icon {
            border: 2px solid var(--atlas-ink);
            box-shadow: 3px 3px 0px 0px var(--atlas-ink);
          }
          .doodle-button-back {
            border: 2px solid var(--atlas-ink) !important;
            border-radius: 90px 10px 80px 12px/12px 80px 10px 90px !important;
            box-shadow: 4px 4px 0px 0px var(--atlas-ink) !important;
            transition: all 0.2s ease;
          }
          .doodle-button-back:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px 0px var(--atlas-ink) !important;
          }
          .doodle-button-back:active {
            transform: translate(2px, 2px);
            box-shadow: 1px 1px 0px 0px var(--atlas-ink) !important;
          }
        `}</style>
        
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 doodle-success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="28"
            height="28"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-display text-3xl font-semibold text-ink">
            Öneriniz Alındı!
          </h3>
          <p className="hand-note text-lg text-ink/75 leading-relaxed max-w-sm mx-auto">
            {state.message}
          </p>
        </div>
        
        <div className="pt-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="doodle-button-back bg-paper px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink active:scale-95"
          >
            Yeni Bir Öneri Gönder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-paper-light p-6 md:p-10 space-y-8"
      style={{
        border: '2.5px solid var(--atlas-ink)',
        borderRadius: '15px 95px 12px 95px/95px 12px 95px 15px',
        boxShadow: '8px 8px 0px 0px var(--atlas-ink)',
      }}
    >
      {/* Doodle local styles */}
      <style>{`
        .doodle-input {
          border: 2px solid var(--atlas-ink) !important;
          border-radius: 120px 8px 90px 6px/6px 90px 8px 120px !important;
          outline: none;
          transition: all 0.2s ease;
          background-color: var(--atlas-paper-light) !important;
        }
        .doodle-input:focus {
          border-color: var(--atlas-accent) !important;
          box-shadow: 3px 3px 0px 0px var(--atlas-accent) !important;
          transform: translate(-1.5px, -1.5px);
        }
        .doodle-textarea {
          border: 2px solid var(--atlas-ink) !important;
          border-radius: 8px 90px 6px 120px/120px 6px 90px 8px !important;
          outline: none;
          transition: all 0.2s ease;
          background-color: var(--atlas-paper-light) !important;
        }
        .doodle-textarea:focus {
          border-color: var(--atlas-accent) !important;
          box-shadow: 3px 3px 0px 0px var(--atlas-accent) !important;
          transform: translate(-1.5px, -1.5px);
        }
        .doodle-button {
          border: 2px solid var(--atlas-ink) !important;
          border-radius: 90px 10px 80px 12px/12px 80px 10px 90px !important;
          box-shadow: 4px 4px 0px 0px var(--atlas-ink) !important;
          transition: all 0.2s ease;
        }
        .doodle-button:hover:not(:disabled) {
          transform: translate(-2.5px, -2.5px);
          box-shadow: 6.5px 6.5px 0px 0px var(--atlas-ink) !important;
        }
        .doodle-button:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px 0px var(--atlas-ink) !important;
        }
      `}</style>

      {/* Editorial Disclaimer — Post-It Note Style */}
      <div 
        className="px-5 py-4 text-sm text-ink/80 leading-relaxed bg-[#fef08a]"
        style={{
          border: '2px solid var(--atlas-ink)',
          borderRadius: '8px 120px 6px 95px/95px 6px 120px 8px',
          boxShadow: '3.5px 3.5px 0px 0px var(--atlas-ink)',
          transform: 'rotate(-0.6deg)',
        }}
      >
        📌 <strong className="font-bold text-ink">Küratöryel Değerlendirme:</strong> Ankara Onarım Atlası sıradan bir liste rehberi değildir. Gönderilen öneriler; uzmanlık derecesi, zanaatın kaybolma riski ve kentsel hafızayla kurduğu ilişki çerçevesinde ekibimizce incelenir; saha araştırması tamamlandıktan sonra onay verilerek atlas katmanlarına eklenir.
      </div>

      {/* Validation Errors Box */}
      {state.success === false && state.errors && state.errors.length > 0 && (
        <div 
          className="bg-red-100 p-4 text-sm text-red-900 space-y-1.5"
          style={{
            border: '2px solid var(--atlas-ink)',
            borderRadius: '95px 8px 120px 6px/6px 120px 8px 95px',
            boxShadow: '3px 3px 0px 0px var(--atlas-ink)',
          }}
        >
          <p className="font-semibold uppercase tracking-[0.12em] mb-1">Düzeltilmesi Gereken Hatalar:</p>
          <ul className="list-disc list-inside space-y-0.5 font-sans">
            {state.errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestion Form */}
      <form action={formAction} className="space-y-5">
        {/* Personal Details */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
              Adınız ve Soyadınız *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              disabled={isPending}
              className="doodle-input w-full px-3.5 py-2.5 text-sm text-ink disabled:opacity-50"
              placeholder="Ahmet Yılmaz"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
              E-Posta Adresiniz *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isPending}
              className="doodle-input w-full px-3.5 py-2.5 text-sm text-ink disabled:opacity-50"
              placeholder="ahmet@example.com"
            />
          </div>
        </div>

        {/* Artisan / Shop Name */}
        <div className="space-y-1.5">
          <label htmlFor="artisanName" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
            Önerilen Usta veya Mekân Adı *
          </label>
          <input
            type="text"
            id="artisanName"
            name="artisanName"
            required
            disabled={isPending}
            className="doodle-input w-full px-3.5 py-2.5 text-sm text-ink disabled:opacity-50"
            placeholder="Örnek: Saatçi Nuri Usta veya Öz Çelik Motor"
          />
        </div>

        {/* Region & Craft Details */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="district" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
              Bölge / İlçe *
            </label>
            <input
              type="text"
              id="district"
              name="district"
              required
              disabled={isPending}
              className="doodle-input w-full px-3.5 py-2.5 text-sm text-ink disabled:opacity-50"
              placeholder="Örnek: Ulus, Samanpazarı"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="craftType" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
              Zanaat veya Onarım Türü *
            </label>
            <input
              type="text"
              id="craftType"
              name="craftType"
              required
              disabled={isPending}
              className="doodle-input w-full px-3.5 py-2.5 text-sm text-ink disabled:opacity-50"
              placeholder="Örnek: Saat tamiri, daktilo onarımı"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label htmlFor="address" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
            Adres Bilgisi (Pasaj, Dükkan No, Tarif)
          </label>
          <textarea
            id="address"
            name="address"
            rows={2}
            disabled={isPending}
            className="doodle-textarea w-full px-3.5 py-2.5 text-sm text-ink resize-none disabled:opacity-50"
            placeholder="Örnek: Adilhan Çarşısı 2. Kat No: 45 Ulus"
          />
        </div>

        {/* Description / Story */}
        <div className="space-y-1.5">
          <label htmlFor="whyIncluded" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
            Neden Atlasa Dahil Edilmeli? * (Gerekçe & Usta Hikâyesi)
          </label>
          <textarea
            id="whyIncluded"
            name="whyIncluded"
            required
            rows={3}
            disabled={isPending}
            className="doodle-textarea w-full px-3.5 py-2.5 text-sm text-ink resize-none disabled:opacity-50"
            placeholder="Ustanın uzmanlığı nedir? Hangi araçları onarıyor? Hikâyesi nedir?"
          />
        </div>

        {/* Social / Web Links */}
        <div className="space-y-1.5">
          <label htmlFor="socialLink" className="archive-label text-ink/60 text-[0.65rem] font-bold pl-1">
            Bağlantı / Varsa Sosyal Medya Hesabı
          </label>
          <input
            type="text"
            id="socialLink"
            name="socialLink"
            disabled={isPending}
            className="doodle-input w-full px-3.5 py-2.5 text-sm text-ink disabled:opacity-50"
            placeholder="instagram.com/usta-hesabi"
          />
        </div>

        {/* Photo Upload Placeholder (Offline) */}
        <div className="space-y-1.5">
          <label className="archive-label text-ink/40 text-[0.65rem] font-bold pl-1">Görsel Belge Yükleme</label>
          <div 
            className="p-5 text-center text-xs text-ink/50 bg-paper-deep/10"
            style={{
              border: '2px dashed var(--atlas-ink)',
              borderRadius: '12px 95px 8px 90px/90px 8px 95px 12px',
            }}
          >
            📸 Görsel yükleme altyapısı bir sonraki güncellemede (Faz 4) aktif olacaktır.
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-3 pt-2.5">
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            required
            disabled={isPending}
            className="mt-1 h-4 w-4 accent-ink cursor-pointer disabled:opacity-50"
            style={{
              border: '2px solid var(--atlas-ink)',
            }}
          />
          <label htmlFor="agreement" className="text-[0.82rem] text-ink/80 leading-relaxed cursor-pointer select-none">
            Paylaştığım bilgilerin küratöryel değerlendirme ve saha doğrulaması süreçlerinde kullanılmasını kabul ediyorum. *
          </label>
        </div>

        {/* Submit Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              'doodle-button w-full bg-ink py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-paper-light hover:bg-[--atlas-red-deep] hover:border-[--atlas-red-deep] focus-visible:outline-2 active:scale-98',
              isPending && 'opacity-60 cursor-wait'
            )}
          >
            {isPending ? 'Öneri İletiliyor...' : 'Öneriyi Gönder'}
          </button>
        </div>
      </form>
    </div>
  );
}
