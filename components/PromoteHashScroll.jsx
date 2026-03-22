'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 從站內連結開啟 /promote#xxx 時，在捲動容器內捲到錨點。
 */
export default function PromoteHashScroll({ scrollRoot }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/promote') return;

    const run = () => {
      const raw = typeof window !== 'undefined' ? window.location.hash : '';
      const id = raw?.replace(/^#/, '');
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    run();
    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [pathname, scrollRoot]);

  return null;
}
