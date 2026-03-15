'use client';

import { useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function MarkdownInteractive({ html }) {
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    const container = document.querySelector('.markdown-interactive-root');
    if (!container) return;

    // 包裝表格為可橫向捲動，以及加上邊框
    container.querySelectorAll('table').forEach((table) => {
      if (!table.parentElement || table.parentElement.classList.contains('markdown-table-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className =
        'markdown-table-wrapper overflow-x-auto my-6 rounded-lg border border-gray-200 bg-white/80';

      table.parentElement.insertBefore(wrapper, table);
      wrapper.appendChild(table);

      table.classList.add('min-w-full', 'border-collapse');
      table.querySelectorAll('th, td').forEach((cell) => {
        cell.classList.add('border', 'border-gray-200', 'px-3', 'py-2', 'text-sm');
      });
    });

    // 為圖片與表格加上放大按鈕
    const targets = [
      ...Array.from(container.querySelectorAll('img')),
      ...Array.from(container.querySelectorAll('table')),
    ];

    targets.forEach((el) => {
      if (el.parentElement && el.parentElement.classList.contains('markdown-zoom-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'markdown-zoom-wrapper relative';
      el.parentElement.insertBefore(wrapper, el);
      wrapper.appendChild(el);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'markdown-zoom-btn absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow hover:bg-amber-50 transition text-lg font-semibold';
      btn.setAttribute('aria-label', '放大檢視');
      btn.innerText = '⤢';
      wrapper.appendChild(btn);

      btn.addEventListener('click', () => {
        const isImage = el.tagName.toLowerCase() === 'img';
        // 嘗試在 DOM 中尋找緊接著的斜體段落作為 caption
        let caption = '';
        let node = wrapper.parentElement ? wrapper.parentElement.nextSibling : wrapper.nextSibling;
        while (node) {
          if (node.nodeType === 1) {
            const tag = node.tagName.toLowerCase();
            if (tag === 'p') {
              const em = node.querySelector('em');
              if (em && em.parentElement === node) {
                caption = em.innerHTML;
              }
              break;
            }
            // 如果遇到下一個區塊（圖或表）就停止，避免跨太遠
            if (tag === 'img' || tag === 'table' || tag === 'div') break;
          }
          node = node.nextSibling;
        }
        setOverlay({
          type: isImage ? 'image' : 'table',
          html: isImage ? el.outerHTML : wrapper.outerHTML,
          caption,
        });
      });
    });

    return () => {
      // overlay 關閉或內容改變時，由 React 重新渲染並再套用效果
    };
  }, [html, overlay]);

  return (
    <>
      <div className="markdown markdown-interactive-root" dangerouslySetInnerHTML={{ __html: html }} />

      {overlay && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <button
            type="button"
            onClick={() => setOverlay(null)}
            className="absolute top-4 right-4 z-50 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <div className="max-w-full max-h-[80vh] flex items-center justify-center">
              <div
                className="markdown markdown-zoom-content [&_.markdown-zoom-btn]:hidden"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: overlay.html }}
              />
            </div>
            {overlay.caption ? (
              <p className="mt-3 text-sm text-gray-100 text-center max-w-3xl">
                <em>{overlay.caption}</em>
              </p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

