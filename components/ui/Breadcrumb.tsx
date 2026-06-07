import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-[0.7rem] uppercase tracking-[0.14em]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="inline-flex items-center gap-1">
                {index > 0 && (
                  <span aria-hidden className="text-ink/25 select-none">
                    ›
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-ink/50 transition-colors duration-150 ease-atlas hover:text-ink/80',
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-ink/70"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
