'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

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

function getNextMode(prevMode, seed) {
  const opts = ['left', 'center', 'right'].filter((m) => m !== prevMode);
  return opts[Math.floor(seededRandom(seed) * opts.length)];
}

/**
 * 攝影集藝術雜誌 RWD 排版 (VerticalScrollGallery)
 * 全域容器 max-w-7xl，文字靠左，影像依螢幕尺寸切換模式。
 */
export default function VerticalScrollGallery({ blocks, title, info }) {
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

  const mobileModesByIndex = useMemo(() => {
    const imgIndices = blocks?.filter((b) => b.type === 'image').map((b) => b.index) ?? [];
    const m = {};
    imgIndices.forEach((idx) => {
      const seed = baseSeed + idx * 7919 + 100;
      const r = seededRandom(seed);
      m[idx] = r < 0.5 ? 'full' : r < 0.75 ? 'indent-left' : 'indent-right';
    });
    return m;
  }, [blocks, baseSeed]);

  // 連續有負空間的圖：高機率交錯 left/right
  const sidebarEffectiveByIndex = useMemo(() => {
    const result = {};
    let lastSidebarMode = null;
    for (let i = 0; i < (blocks?.length || 0); i++) {
      const b = blocks[i];
      if (b.type !== 'image') continue;
      const dm = modesByIndex[b.index] ?? 'center';
      if (dm === 'hero') continue;
      const nb = blocks[i + 1];
      const hs = nb?.type === 'text' && !/<\s*h[12]\b/i.test(nb?.html || '');
      if (!hs) {
        lastSidebarMode = null;
        continue;
      }
      const nextSidebarMode = lastSidebarMode === 'left' ? 'right' : lastSidebarMode === 'right' ? 'left' : (b.index % 2 === 0 ? 'left' : 'right');
      result[b.index] = nextSidebarMode;
      lastSidebarMode = nextSidebarMode;
    }
    return result;
  }, [blocks, modesByIndex]);

  // 中間滿版圖：僅連續多張才左右交錯，單張置中
  const centerOffsetByIndex = useMemo(() => {
    const result = {};
    const assigned = new Set();
    for (let i = 0; i < (blocks?.length || 0); i++) {
      const b = blocks[i];
      if (b.type !== 'image' || assigned.has(b.index)) continue;
      const desktopMode = modesByIndex[b.index] ?? 'center';
      if (desktopMode === 'hero') continue;
      const nextBlock = blocks[i + 1];
      const hasSidebar =
        nextBlock?.type === 'text' && !/<\s*h[12]\b/i.test(nextBlock?.html || '');
      const effective =
        (desktopMode === 'left' || desktopMode === 'right') && !hasSidebar
          ? 'center'
          : desktopMode;
      if (effective !== 'center') continue;
      let runLen = 0;
      let j = i;
      while (j < blocks.length && blocks[j].type === 'image') {
        const dm = modesByIndex[blocks[j].index] ?? 'center';
        if (dm === 'hero') break;
        const nb = blocks[j + 1];
        const hs = nb?.type === 'text' && !/<\s*h[12]\b/i.test(nb?.html || '');
        const eff =
          (dm === 'left' || dm === 'right') && !hs ? 'center' : dm;
        if (eff !== 'center') break;
        runLen += 1;
        j += 1;
      }
      for (let k = 0; k < runLen; k++) {
        const ib = blocks[i + k];
        assigned.add(ib.index);
        result[ib.index] =
          runLen === 1 ? 'center' : (k % 2 === 0 ? 'left' : 'right');
      }
    }
    return result;
  }, [blocks, modesByIndex]);

  if (!blocks?.length) return null;

  let consumedTextIndex = -1;

  return (
    <>
      <div className="w-full max-w-[100vw] overflow-x-hidden">
        {blocks.map((block, bi) => {
          if (block.type === 'text') {
            if (bi <= consumedTextIndex) return null;
            return (
              <div key={`t-${bi}`} className="max-w-7xl mx-auto px-4 md:px-12">
                <div
                  className="my-10 md:my-16 markdown vertical-gallery-text-block w-full"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              </div>
            );
          }

          const img = block;
        const desktopMode = modesByIndex[img.index] ?? 'center';
        const mobileMode = mobileModesByIndex[img.index] ?? 'indent-left';
        const nextBlock = blocks[bi + 1];
        // H2 與其下方文字為一 block，應獨立呈現；只有非 H2 開頭的文字可放負空間
        const hasSidebar =
          nextBlock?.type === 'text' && !/<\s*h[12]\b/i.test(nextBlock.html || '');
        if (hasSidebar) consumedTextIndex = bi + 1;

        // 有負空間文字時強制左右並排，連續有 sidebar 的圖交錯 left/right
        const effectiveDesktopMode =
          (desktopMode === 'left' || desktopMode === 'right') && !hasSidebar
            ? 'center'
            : hasSidebar
              ? (sidebarEffectiveByIndex[img.index] ?? (img.index % 2 === 0 ? 'left' : 'right'))
              : desktopMode;

        const captionEl = img.captionHtml ? (
          <p
            className="font-serif text-base text-gray-700 mt-3 block text-center"
            dangerouslySetInnerHTML={{ __html: img.captionHtml }}
          />
        ) : null;

        const imgBlock = (
          <div className="flex-shrink-0 flex flex-col items-center w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full rounded-lg cursor-pointer object-cover"
              onClick={() =>
                setLightbox({
                  src: img.src,
                  alt: img.alt,
                  caption: img.captionHtml,
                })
              }
            />
            {captionEl}
          </div>
        );

        const textBlock = hasSidebar ? (
          <div
            className={`markdown vertical-gallery-sidebar-text order-first lg:order-none flex-1 min-w-0 pt-4 lg:pt-0 flex flex-col justify-center ${
              effectiveDesktopMode === 'right' ? 'lg:pr-8' : 'lg:pl-8'
            }`}
            dangerouslySetInnerHTML={{ __html: nextBlock.html }}
          />
        ) : null;

        if (desktopMode === 'hero') {
          return (
            <div
              key={`img-${img.index}`}
              className="relative w-[100vw] h-[calc(100vh-5rem)] min-h-[360px] overflow-hidden"
              style={{ marginLeft: 'calc(50% - 50vw)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() =>
                  setLightbox({
                    src: img.src,
                    alt: img.alt,
                    caption: img.captionHtml,
                  })
                }
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-2">{title}</h1>
                {info ? <p className="text-lg sm:text-xl opacity-90">{info}</p> : null}
              </div>
            </div>
          );
        }

        const mobileImgClass =
          mobileMode === 'full'
            ? 'w-[100vw] max-w-[100vw] -ml-4 md:w-[85%] md:ml-auto md:mr-0'
            : mobileMode === 'indent-left'
              ? 'w-[85%] ml-auto'
              : 'w-[85%] mr-auto';

        const centerOffset = centerOffsetByIndex[img.index] ?? 'center';
        const desktopImgClass =
          effectiveDesktopMode === 'left'
            ? 'lg:w-[60%] lg:flex-shrink-0 lg:ml-0'
            : effectiveDesktopMode === 'right'
              ? 'lg:w-[60%] lg:flex-shrink-0 lg:pl-8'
              : centerOffset === 'center'
                ? 'lg:w-[78%] lg:mx-auto'
                : centerOffset === 'right'
                  ? 'lg:w-[78%] lg:mr-[4%] lg:ml-auto'
                  : 'lg:w-[78%] lg:ml-[4%] lg:mr-auto';

        return (
          <div key={`img-${img.index}`} className="max-w-7xl mx-auto px-4 md:px-12 my-10 md:my-16">
            <div
              className={`flex flex-col lg:flex-row ${
                effectiveDesktopMode === 'right' ? 'lg:flex-row-reverse' : ''
              } ${effectiveDesktopMode === 'center' ? 'lg:flex-col' : 'lg:gap-8 lg:items-center'}`}
            >
              <div className={`${mobileImgClass} ${desktopImgClass}`}>{imgBlock}</div>
              {textBlock}
            </div>
          </div>
        );
      })}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center px-4 py-8"
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
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.caption && (
            <p
              className="mt-4 font-serif text-base text-gray-200 text-center max-w-2xl"
              dangerouslySetInnerHTML={{ __html: lightbox.caption }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
