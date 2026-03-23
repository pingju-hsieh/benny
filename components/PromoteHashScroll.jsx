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
      // 容錯：避免出現 `##travel` 造成 id 變成 `#travel`
      const id = raw?.replace(/^#+/, '');
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      // 與 toc click 相同：只捲動清單容器，避免整頁跳動到最底。
      const root =
        scrollRoot ||
        (typeof document !== 'undefined'
          ? document.querySelector('div[aria-label="推薦清單"]')
          : null);

      if (root) {
        const rootRect = root.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const deltaTop = elRect.top - rootRect.top;
        root.scrollTo({ top: root.scrollTop + deltaTop, behavior: 'smooth' });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    run();
    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [pathname, scrollRoot]);

  return null;
}
