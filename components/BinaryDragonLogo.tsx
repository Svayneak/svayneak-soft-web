"use client";

import React, { useEffect, useRef, useState } from "react";

// Exact paths from your uploaded SVG logo (`logo animado svg.svg`)
const RING_PATH =
  "M 100, 20 A 80, 80 0 1, 1 100, 180 A 80, 80 0 1, 1 100, 20 Z M 100, 35 A 65, 65 0 1, 0 100, 165 A 65, 65 0 1, 0 100, 35 Z";

const S_PATH =
  "m 100.79754,151.36869 c -13.744203,-7.52197 -23.972582,-15.02967 -35.731859,-23.45713 0.496133,-16.10079 -0.451957,-2.81425 0.523373,-18.49322 37.917196,21.50195 -11.642012,-5.421937 36.813766,21.68121 15.11593,-11.43055 0.42131,0.30792 14.4512,-11.32354 -33.399042,-19.959197 -10.28826,-6.69384 -51.477901,-30.514645 -0.329842,-19.13969 -0.06228,-0.770976 0.368311,-16.206054 33.57227,-23.103668 0.179825,-0.39355 33.79051,-22.707174 23.25878,12.757822 6.26771,2.995675 37.02073,22.903822 -1.68198,19.637688 0.52473,22.204583 -1.8098,20.254861 -19.34151,-11.460875 -19.15597,-13.112382 -35.94088,-23.697373 -13.428338,10.58151 1.06527,-0.566689 -13.422642,10.786245 22.506132,13.605299 29.048012,18.390806 49.587582,32.342928 -0.345,24.39803 -0.19445,-4.829643 -0.35606,15.3456 z";

interface BinaryDragonLogoProps {
  size?: number;
  gridResolution?: number; // e.g. 38x38 binary matrix
  interactive?: boolean;
  showVectorOverlay?: boolean;
  theme?: "dark" | "light";
  lang?: "en" | "es";
}

interface Cell {
  gx: number;
  gy: number;
  svgX: number;
  svgY: number;
  isRing: boolean;
  isS: boolean;
  phase: number;
  char: string;
}

export default function BinaryDragonLogo({
  size = 420,
  gridResolution = 38,
  interactive = true,
  showVectorOverlay = false,
  theme = "dark",
  lang = "en",
}: BinaryDragonLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const [mode, setMode] = useState<"binary" | "hybrid" | "hex">("binary");

  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Create Path2D objects in the original 200x200 SVG coordinate space
    const ringPath = new Path2D(RING_PATH);
    const sPath = new Path2D(S_PATH);

    // Offscreen context purely for accurate point-in-path sampling
    const offCanvas = document.createElement("canvas");
    offCanvas.width = 200;
    offCanvas.height = 200;
    const offCtx = offCanvas.getContext("2d")!;

    const cells: Cell[] = [];
    const step = 200 / gridResolution;

    for (let row = 0; row < gridResolution; row++) {
      for (let col = 0; col < gridResolution; col++) {
        const svgX = (col + 0.5) * step;
        const svgY = (row + 0.5) * step;

        // Multi-sample 5 points inside the cell so edges of the S and Ring stay razor-sharp
        const offsets = [
          [0, 0],
          [-step * 0.22, -step * 0.22],
          [step * 0.22, -step * 0.22],
          [-step * 0.22, step * 0.22],
          [step * 0.22, step * 0.22],
        ];

        let ringHits = 0;
        let sHits = 0;
        for (const [ox, oy] of offsets) {
          if (offCtx.isPointInPath(ringPath, svgX + ox, svgY + oy, "evenodd")) {
            ringHits++;
          }
          if (offCtx.isPointInPath(sPath, svgX + ox, svgY + oy, "nonzero")) {
            sHits++;
          }
        }

        const isRing = ringHits >= 2;
        const isS = sHits >= 2;

        // Only keep cells within a circular radar radius so the outer corners feel clean
        const distFromCenter = Math.hypot(svgX - 100, svgY - 100);
        if (distFromCenter <= 94) {
          cells.push({
            gx: col,
            gy: row,
            svgX,
            svgY,
            isRing,
            isS,
            phase: Math.random() * Math.PI * 2,
            char: isRing || isS ? "1" : "0",
          });
        }
      }
    }

    let animId: number;
    const startTime = performance.now();

    const hexChars = "0123456789ABCDEF";
    const dragonChars = "1111110SVAYNEAK";

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);

      const cellPx = size / gridResolution;
      const fontSize = Math.max(8, Math.floor(cellPx * 0.86));
      ctx.font = `700 ${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Optional faint vector ghost under the binary matrix in hybrid mode
      if (mode === "hybrid" || showVectorOverlay) {
        ctx.save();
        const scale = size / 200;
        ctx.scale(scale, scale);
        const grad = ctx.createLinearGradient(0, 0, 200, 200);
        if (isLight) {
          grad.addColorStop(0, "rgba(0, 180, 216, 0.20)");
          grad.addColorStop(0.5, "rgba(126, 34, 206, 0.22)");
          grad.addColorStop(1, "rgba(192, 38, 211, 0.20)");
        } else {
          grad.addColorStop(0, "rgba(0, 251, 255, 0.16)");
          grad.addColorStop(0.5, "rgba(168, 85, 247, 0.18)");
          grad.addColorStop(1, "rgba(237, 0, 255, 0.16)");
        }
        ctx.fillStyle = grad;
        ctx.fill(ringPath, "evenodd");
        ctx.fill(sPath);
        ctx.restore();
      }

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const px = (c.svgX / 200) * size;
        const py = (c.svgY / 200) * size;

        // Cursor proximity ripple
        const distMouse = mouseRef.current.active
          ? Math.hypot(px - mouseRef.current.x, py - mouseRef.current.y)
          : 9999;
        const nearMouse = distMouse < 58;

        if (c.isRing || c.isS) {
          let t = 0;
          if (c.isRing) {
            const angle = Math.atan2(c.svgY - 100, c.svgX - 100);
            const rotAngle = (angle + elapsed * 0.9) % (Math.PI * 2);
            t = (Math.sin(rotAngle) + 1) / 2;
          } else {
            const wave = Math.sin((c.svgX / 200) * Math.PI * 2.5 - elapsed * 2.4);
            t = (wave + 1) / 2;
          }

          // In Light Mode, use high-contrast Deep Aquamarine (#0096c7) <-> Deep Dragon Violet (#9333ea / #c026d3)
          // In Dark Mode, use luminous Aquamarine (#00fbff) <-> Vibrant Violet (#ed00ff)
          const r = isLight ? Math.round(0 + t * 185) : Math.round(0 + t * 232);
          const g = isLight ? Math.round(150 - t * 125) : Math.round(251 - t * 215);
          const b = isLight ? Math.round(205 + t * 20) : 255;

          let displayChar = "1";
          const pulse = Math.sin(elapsed * 3.5 + c.phase);

          if (nearMouse) {
            const idx = Math.floor((elapsed * 18 + i) % hexChars.length);
            displayChar = hexChars[idx];
          } else if (mode === "hex") {
            displayChar = pulse > 0.65 ? hexChars[(i + Math.floor(elapsed * 4)) % 16] : "1";
          } else {
            if (pulse > 0.92) {
              displayChar = "0";
            } else if (pulse < -0.96) {
              displayChar = dragonChars[(i + Math.floor(elapsed * 3)) % dragonChars.length];
            } else {
              displayChar = "1";
            }
          }

          ctx.shadowColor = isLight
            ? `rgba(${r}, ${g}, ${b}, 0.35)`
            : `rgba(${r}, ${g}, ${b}, 0.75)`;
          ctx.shadowBlur = nearMouse ? 10 : isLight ? 2 : 6;
          ctx.fillStyle = nearMouse
            ? isLight
              ? "#4c1d95"
              : "#ffffff"
            : `rgb(${r}, ${g}, ${b})`;

          ctx.fillText(displayChar, px, py);
          ctx.shadowBlur = 0;
        } else {
          // Background matrix ('0's outside the ring & S)
          const bgPulse = Math.sin(elapsed * 1.8 + c.phase);
          const alpha = nearMouse
            ? 0.55
            : bgPulse > 0.7
            ? isLight
              ? 0.24
              : 0.16
            : isLight
            ? 0.12
            : 0.07;

          const bgChar = nearMouse ? "1" : bgPulse > 0.95 ? "1" : "0";

          ctx.fillStyle = nearMouse
            ? isLight
              ? `rgba(8, 145, 178, ${alpha})`
              : `rgba(0, 251, 255, ${alpha})`
            : isLight
            ? `rgba(109, 40, 217, ${alpha})`
            : `rgba(168, 85, 247, ${alpha})`;
          ctx.fillText(bgChar, px, py);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [size, gridResolution, mode, showVectorOverlay, isLight]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div className="relative flex flex-col items-center select-none group">
      {/* Ambient Violet + Aquamarine Dragon Aura */}
      <div
        className={`absolute inset-4 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isLight ? "opacity-25 group-hover:opacity-45" : "opacity-35 group-hover:opacity-60"
        }`}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(0, 251, 255, 0.45), rgba(168, 85, 247, 0.45) 55%, rgba(237, 0, 255, 0.2) 80%, transparent 100%)",
        }}
      />

      {/* Interactive Binary Map Canvas */}
      <div
        className={`relative p-3 rounded-2xl border backdrop-blur-xl transition-colors duration-300 ${
          isLight
            ? "border-purple-300/80 bg-white/95 shadow-[0_20px_50px_-12px_rgba(126,34,206,0.22)]"
            : "border-white/10 bg-[#07070e]/90 shadow-[0_0_50px_-12px_rgba(168,85,247,0.45)]"
        }`}
      >
        {/* Corner Schematic Crosshairs */}
        <span className="absolute top-1.5 left-2 text-[10px] font-mono text-cyan-500/70">+</span>
        <span className="absolute top-1.5 right-2 text-[10px] font-mono text-fuchsia-500/70">+</span>
        <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-fuchsia-500/70">+</span>
        <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-cyan-500/70">+</span>

        <canvas
          ref={canvasRef}
          style={{ width: size, height: size }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="cursor-crosshair block"
        />

        {/* Telemetry HUD Footer inside the Logo Frame */}
        <div
          className={`mt-2 pt-2 border-t flex items-center justify-between gap-2 text-[11px] font-mono px-1 ${
            isLight ? "border-slate-200 text-slate-600" : "border-white/10 text-slate-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className={isLight ? "text-slate-800 font-semibold" : "text-slate-300"}>
              SVAYNEAK::DRAGON_CORE
            </span>
          </div>
          <div className="flex items-center gap-1">
            {(["binary", "hybrid", "hex"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider transition-all ${
                  mode === m
                    ? isLight
                      ? "bg-purple-100 text-purple-800 border border-purple-400 font-bold"
                      : "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 border border-cyan-400/40"
                    : isLight
                    ? "text-slate-500 hover:text-slate-900"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {m === "binary"
                  ? lang === "es"
                    ? "MAPA-01"
                    : "01-MAP"
                  : m === "hybrid"
                  ? lang === "es"
                    ? "HÍBRIDO"
                    : "HYBRID"
                  : "HEX"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
