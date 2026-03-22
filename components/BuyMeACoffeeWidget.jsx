'use client';

import { useEffect } from 'react';

/**
 * Buy Me a Coffee 官方浮動 widget（右下角）。
 * 在 Next/React 裡若只 append script，頁面早就不會再觸發 DOMContentLoaded，
 * widget 腳本會以為「還沒載好」而不渲染——需在 script onload 後手動觸發一次。
 * @see https://stackoverflow.com/questions/62039217/add-buy-me-a-coffee-widget-to-react-application
 */
const BMC_SCRIPT_SRC = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';

function triggerBmcDomReady() {
  if (typeof window === 'undefined') return;
  try {
    const domReady = new Event('DOMContentLoaded', { bubbles: true, cancelable: true });
    window.document.dispatchEvent(domReady);
    window.dispatchEvent(domReady);
  } catch {
    /* legacy */
    const evt = document.createEvent('Event');
    evt.initEvent('DOMContentLoaded', false, false);
    window.dispatchEvent(evt);
  }
}

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 已出現按鈕就不必再載入
    if (document.getElementById('bmc-wbtn')) return;

    const existing = document.querySelector('script[data-name="BMC-Widget"]');
    if (existing) {
      // Strict Mode 重掛：腳本在但按鈕沒出來時，再觸發一次初始化
      if (!document.getElementById('bmc-wbtn')) {
        triggerBmcDomReady();
        const t = window.setTimeout(triggerBmcDomReady, 100);
        return () => window.clearTimeout(t);
      }
      return undefined;
    }

    const s = document.createElement('script');
    s.setAttribute('data-name', 'BMC-Widget');
    s.setAttribute('data-cfasync', 'false');
    s.setAttribute('data-id', 'banni.walks');
    s.setAttribute('data-description', 'Support me on Buy me a coffee!');
    s.setAttribute('data-message', '');
    /* 官方黃色；x/y 與 globals.css --fab-edge / 回主頁 h-14 對齊 */
    s.setAttribute('data-color', '#FFDD00');
    s.setAttribute('data-position', 'Right');
    s.setAttribute('data-x_margin', '24');
    /* bottom-6(24) + 圓鈕 56 + 間距 8 */
    s.setAttribute('data-y_margin', '88');
    s.src = BMC_SCRIPT_SRC;
    s.async = true;

    s.onload = () => {
      triggerBmcDomReady();
      // 部分環境需延遲一幀再觸發
      window.requestAnimationFrame(() => {
        triggerBmcDomReady();
      });
    };

    document.body.appendChild(s);

    return undefined;
  }, []);

  return null;
}
