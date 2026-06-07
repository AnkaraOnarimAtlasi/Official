import { GoatLoader } from '@/components/ui/GoatLoader';

/**
 * Next.js App Router — app/loading.tsx
 * Sayfa geçişlerinde ve Suspense sınırlarında otomatik gösterilir.
 */
export default function Loading() {
  return <GoatLoader />;
}
