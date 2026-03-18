'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

/** 以 title 為種子的簡易 hash */
function hashStr(str) {
  let h = 0;
  const s = String(str || '');
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h) + 1;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/** A/B/C 隨機循環，避免連續重複 */
function getNextMode(prevMode, seed) {
  const opts = ['left', 'center', 'right'].filter((m) => m !== prevMode);
  return opts[Math.floor(seededRandom(seed) * opts.length)];
}

/**
 * 攝影集負空間排版：完整保留 Markdown（標題、引用、列表），
 * 影像單元以 A/B/C 循環，文字可填入負空間。
 */
export default function GalleryEditorialLayout({ blocks, title, info }) {
  const [lightbox, setLightbox] = useState(null);
  const baseSeed = useMemo(() => hashStr(title), [title]);

  const modesByIndex = useMemo(() => {
    const imgIndices = blocks?.filter((b) => b.type === 'image').map((b) => b.index) ?? [];
    const m = {};
    let prev = null;
    for (let i = 0; i < imgIndices.length; i++) {
      const idx = imgIndices[i];
      if (idx === 0) {
        m[0] = 'hero';
      } else {
        prev = getNextMode(prev, baseSeed + idx * 7919);
        m[idx] = prev;
      }
    }
    return m;
  }, [blocks, baseSeed]);

  if (!blocks?.length) return null;

  let consumedTextIndex = -1;

  return (
    <div className="w-full overflow-visible">
      {blocks.map((block, bi) => {
        if (block.type === 'text') {
          if (bi <= consumedTextIndex) return null;
          return (
            <div
              key={`t-${bi}`}
              className="my-24 max-w-2xl mx-auto gallery-content"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        }

        const img = block;
        const mode = modesByIndex[img.index] ?? 'center';
        const nextBlock = blocks[bi + 1];
        const hasSidebar = nextBlock?.type === 'text';
        if (hasSidebar) consumedTextIndex = bi + 1;

        const captionEl = img.captionHtml ? (
          <p
            className="font-serif text-sm text-stone-400 mt-2 text-center"
            dangerouslySetInnerHTML={{ __html: img.captionHtml }}
          />
        ) : null;

        const imgBlock = (
          <div className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full rounded-lg cursor-pointer object-cover"
              onClick={() => setLightbox({ src: img.src, alt: img.alt })}
            />
            {captionEl}
          </div>
        );

        const textBlock = hasSidebar ? (
          <div
            className="gallery-content gallery-sidebar order-first lg:order-none flex-shrink-0 lg:min-w-[260px]"
            dangerouslySetInnerHTML={{ __html: nextBlock.html }}
          />
        ) : null;

        if (mode === 'hero') {
          return (
            <div key={`img-${img.index}`} className="relative w-full h-[80vh] min-h-[400px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setLightbox({ src: img.src, alt: img.alt })}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-2">{title}</h1>
                {info ? <p className="text-lg sm:text-xl opacity-90">{info}</p> : null}
              </div>
            </div>
          );
        }

        if (mode === 'center') {
          return (
            <div key={`img-${img.index}`} className="my-24 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                {imgBlock}
              </div>
            </div>
          );
        }

        if (mode === 'left') {
          return (
            <div key={`img-${img.index}`} className="my-24 px-4 sm:px-6 lg:px-12">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8 max-w-6xl mx-auto">
                <div className="w-full lg:w-[60%] flex-shrink-0">{imgBlock}</div>
                {textBlock}
              </div>
            </div>
          );
        }

        // right
        return (
          <div key={`img-${img.index}`} className="my-24 px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-end gap-8 max-w-6xl mx-auto">
              {textBlock}
              <div className="w-full lg:w-[60%] flex-shrink-0 lg:pl-8">{imgBlock}</div>
            </div>
          </div>
        );
      })}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal
          aria-label="放大檢視"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-[60] inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
