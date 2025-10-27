import React, { useEffect } from "react";

const PEN_NAME = "斑泥走走";

const ParticlesCanvas = ({ canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const density = 4;
    const radius = 1.2;
    const particles = [];
    const mouse = { x: null, y: null };

    let startTime = performance.now();
    let revealProgress = 0; // 從 0 慢慢到 1：聚合進度

    const drawTextMask = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fontSize = Math.min(canvas.width / (PEN_NAME.length * 1.8), 200);
      ctx.font = `800 ${fontSize}px 'Noto Serif TC', serif`;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(PEN_NAME, canvas.width / 2, canvas.height / 3);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const points = [];

      for (let y = 0; y < canvas.height; y += density) {
        for (let x = 0; x < canvas.width; x += density) {
          const index = (y * canvas.width + x) * 4 + 3;
          if (imageData[index] > 100) {
            points.push({ x, y });
          }
        }
      }

      particles.length = 0;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          ox: p.x,
          oy: p.y,
          vx: 0,
          vy: 0,
          alpha: 0,        // 新增透明度
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const applyImpulse = (mx, my, isClick = false) => {
      const range = isClick ? 200 : 80;
      const impulseStrength = isClick ? 6 : 3;

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
      if (elapsed < 1.5) {
        revealProgress = 0;
      } else if (elapsed < 3) {
        revealProgress = (elapsed - 1.5) / 1.5; // 緩慢聚合
      } else {
        revealProgress = 1;
      }

      for (let p of particles) {
        // 抖動
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;

        // 聚合力隨時間變強
        const dx = p.ox - p.x;
        const dy = p.oy - p.y;
        p.vx += dx * 0.01 * revealProgress;
        p.vy += dy * 0.01 * revealProgress;

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