import React, { useEffect } from "react";

const PEN_NAME = "斑泥走走";

const ParticlesCanvas = ({ canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    const cssWidth = canvas.getBoundingClientRect().width;
    const isMobile = cssWidth < 768;
    // 手機：點稍微密一點；桌機：點更疏一些
    const density = isMobile ? 3 : 4; // 數字越大取樣越疏
    const radius = isMobile ? 1.0 : 1.6;
    const particles = [];

    let startTime = performance.now();
    let revealProgress = 0; // 從 0 慢慢到 1：聚合進度

    const drawTextMask = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const textLogicalWidth = canvas.width / dpr;
      const textLogicalHeight = canvas.height / dpr;

      // 先用舊邏輯估一個字級，再用 measureText 校正「中文字寬」誤差。
      // 若不校正，手機版常會因寬度估算偏大而「吃出容器寬度一點點」。
      const base = isMobile ? 0.85 : 1.2;
      const maxFontSize = isMobile ? 110 : 220;
      const initialFontSize = Math.min(
        textLogicalWidth / (PEN_NAME.length * base),
        maxFontSize
      );

      ctx.font = `800 ${initialFontSize}px 'Noto Serif TC', serif`;
      const measuredWidth = ctx.measureText(PEN_NAME).width || 0;

      // 預留左右邊距（讓文字 mask 永遠落在安全範圍內）
      const targetWidth = textLogicalWidth * (isMobile ? 0.92 : 0.96);
      const adjustedFontSize =
        measuredWidth > 0 ? initialFontSize * (targetWidth / measuredWidth) : initialFontSize;

      const fontSize = Math.min(adjustedFontSize, maxFontSize);

      ctx.font = `800 ${fontSize}px 'Noto Serif TC', serif`;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(PEN_NAME, textLogicalWidth / 2, textLogicalHeight / 3);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const points = [];

      const logicalWidth = canvas.width / dpr;
      const logicalHeight = canvas.height / dpr;
      for (let y = 0; y < logicalHeight; y += density) {
        for (let x = 0; x < logicalWidth; x += density) {
          const index = ((y * dpr) * canvas.width + (x * dpr)) * 4 + 3;
          if (imageData[index] > 100) {
            points.push({ x, y });
          }
        }
      }

      // 與 ctx.setTransform(dpr,…) 一致：座標必須用「邏輯像素」，不可用 canvas.width（裝置像素）
      const lw = canvas.width / dpr;
      const lh = canvas.height / dpr;

      particles.length = 0;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        particles.push({
          x: Math.random() * lw,
          y: Math.random() * lh,
          ox: p.x,
          oy: p.y,
          vx: 0,
          vy: 0,
          alpha: 0,
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const applyImpulse = (mx, my, isClick = false) => {
      const range = isClick ? (isMobile ? 140 : 200) : (isMobile ? 60 : 80);
      const impulseStrength = isClick ? (isMobile ? 4.5 : 6) : (isMobile ? 2.5 : 3);

      for (let p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < range) {
          const strength = ((1 - dist / range) ** 2.5) * (dist / range);
          const fx = (dx / dist) * strength * impulseStrength;
          const fy = (dy / dist) * strength * impulseStrength;
          p.vx += fx;
          p.vy += fy;
        }
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = (time - startTime) / 1000;
      // 略快開始聚合、總時長較短（原本 1.5s～3s 偏慢且易覺得從單側湧入）
      if (elapsed < 0.45) {
        revealProgress = 0;
      } else if (elapsed < 1.65) {
        revealProgress = (elapsed - 0.45) / 1.2;
      } else {
        revealProgress = 1;
      }

      for (let p of particles) {
        // 抖動（提升飄逸感，但控制在柔和範圍）
        const jitter = isMobile ? 0.1 : 0.2;
        p.vx += (Math.random() - 0.5) * jitter;
        p.vy += (Math.random() - 0.5) * jitter;

        // 聚合力隨時間變強（座標修正後可略提高，收斂更乾淨）
        const dx = p.ox - p.x;
        const dy = p.oy - p.y;
        const attract = isMobile ? 0.016 : 0.019;
        p.vx += dx * attract * revealProgress;
        p.vy += dy * attract * revealProgress;

        // 阻尼
        p.vx *= 0.9;
        p.vy *= 0.9;

        // 移動
        p.x += p.vx;
        p.y += p.vy;

        // 透明度淡入
        if (p.alpha < 1) p.alpha += 0.02;

        ctx.globalAlpha = Math.min(p.alpha, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#333";
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    drawTextMask();
    requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      applyImpulse(mx, my, false);
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      applyImpulse(mx, my, true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} className="w-full h-full" />
  );
};

export default ParticlesCanvas;