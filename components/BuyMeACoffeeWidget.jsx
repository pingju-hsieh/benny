'use client';

import { useEffect } from 'react';

/**
 * Buy Me a Coffee 官方浮動 widget（與站內並存：不覆寫整頁，只附加右下角按鈕與 iframe）。
 * https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js
 */
export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.querySelector('script[data-name="BMC-Widget"]')) return;
    if (document.getElementById('bmc-wbtn')) return;

    const s = document.createElement('script');
    s.setAttribute('data-name', 'BMC-Widget');
    s.setAttribute('data-cfasync', 'false');
    s.setAttribute('data-id', 'banni.walks');
    s.setAttribute('data-description', 'Support me on Buy me a coffee!');
    s.setAttribute('data-message', '');
    s.setAttribute('data-color', '#FF813F');
    s.setAttribute('data-position', 'Right');
    s.setAttribute('data-x_margin', '18');
    s.setAttribute('data-y_margin', '18');
    s.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return null;
}
