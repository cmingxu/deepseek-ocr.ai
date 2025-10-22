"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type DotGridProps = {
  dotSize?: number; // px
  gap?: number; // px between dots
  baseColor?: string;
  activeColor?: string;
  proximity?: number; // px radius around cursor
  shockRadius?: number; // px radius on click
  shockStrength?: number; // extra scale on click
  className?: string;
  style?: React.CSSProperties;
};

// Lightweight DotGrid effect inspired by React Bits Dot Grid.
// Dots scale and change color near the cursor; optional click shock ripple.
export default function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = "rgba(82, 39, 255, 0.25)",
  activeColor = "#5227FF",
  proximity = 150,
  shockRadius = 250,
  shockStrength = 0.8,
  className = "",
  style,
}: DotGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Store dot refs and positions
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);

  // Cursor state
  const cursorRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setDims({ width: rect.width, height: rect.height });
    };

    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Build dots when dims change
  const { cols, rows } = useMemo(() => {
    const cols = Math.ceil(dims.width / gap) + 1;
    const rows = Math.ceil(dims.height / gap) + 1;
    return { cols, rows };
  }, [dims.width, dims.height, gap]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Clear previous
    dotsRef.current = [];
    positionsRef.current = [];
    el.innerHTML = "";

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * gap;
        const y = r * gap;
        const dot = document.createElement("div");
        dot.style.position = "absolute";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.borderRadius = "50%";
        dot.style.transform = "translate(-50%, -50%) scale(1)";
        dot.style.backgroundColor = baseColor;
        dot.style.willChange = "transform, background-color";
        el.appendChild(dot);
        dotsRef.current.push(dot);
        positionsRef.current.push({ x, y });
      }
    }
  }, [rows, cols, gap, dotSize, baseColor]);

  // Animation loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursorRef.current = { x, y };
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    };

    const onLeave = () => {
      cursorRef.current = null;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const prx = positionsRef.current;
      const dots = dotsRef.current;
      for (let i = 0; i < prx.length; i++) {
        const dx = prx[i].x - cx;
        const dy = prx[i].y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < shockRadius) {
          const extra = (1 - dist / shockRadius) * shockStrength;
          const dot = dots[i];
          dot.style.transform = `translate(-50%, -50%) scale(${1 + extra})`;
          dot.style.backgroundColor = activeColor;
          // Decay back
          setTimeout(() => {
            dot.style.transform = "translate(-50%, -50%) scale(1)";
            dot.style.backgroundColor = baseColor;
          }, 250);
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    el.addEventListener("click", onClick);

    const step = () => {
      rafRef.current = null;
      const prx = positionsRef.current;
      const dots = dotsRef.current;
      const cursor = cursorRef.current;
      for (let i = 0; i < prx.length; i++) {
        const dot = dots[i];
        if (!dot) continue;
        if (cursor) {
          const dx = prx[i].x - cursor.x;
          const dy = prx[i].y - cursor.y;
          const dist = Math.hypot(dx, dy);
          if (dist < proximity) {
            const influence = 1 - dist / proximity;
            const scale = 1 + influence * 0.8;
            dot.style.transform = `translate(-50%, -50%) scale(${scale})`;
            dot.style.backgroundColor = activeColor;
          } else {
            dot.style.transform = "translate(-50%, -50%) scale(1)";
            dot.style.backgroundColor = baseColor;
          }
        } else {
          dot.style.transform = "translate(-50%, -50%) scale(1)";
          dot.style.backgroundColor = baseColor;
        }
      }
    };

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("click", onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [proximity, activeColor, baseColor, shockRadius, shockStrength]);

  return (
    <div
      ref={containerRef}
      className={"absolute inset-0 " + (className || "")}
      style={style}
      aria-hidden
    />
  );
}