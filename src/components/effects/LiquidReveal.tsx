"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";

const BRUSH_RADIUS = 143;
const DECAY = 0.016;
const MAX_INTERPOLATED_POINTS = 60;
const INACTIVITY_CLEAR_MS = 2200;

interface Point {
  x: number;
  y: number;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
  const drawWidth = img.naturalWidth * scale;
  const drawHeight = img.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
}

export function LiquidReveal({
  base,
  reveal,
  className,
}: {
  base: { src: string; alt: string };
  reveal: { src: string; alt: string };
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const brushCanvasRef = useRef<HTMLCanvasElement>(null);
  const coverCanvasRef = useRef<HTMLCanvasElement>(null);
  const revealImgRef = useRef<HTMLImageElement | null>(null);
  const lastPointRef = useRef<Point | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const rafRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const enabled = !prefersReducedMotion && !isCoarsePointer;

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!container || !displayCanvas) return;

    const brushCanvas = document.createElement("canvas");
    const coverCanvas = document.createElement("canvas");
    brushCanvasRef.current = brushCanvas;
    coverCanvasRef.current = coverCanvas;

    const displayCtx = displayCanvas.getContext("2d");
    const brushCtx = brushCanvas.getContext("2d");
    const coverCtx = coverCanvas.getContext("2d");
    if (!displayCtx || !brushCtx || !coverCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      for (const canvas of [displayCanvas, brushCanvas, coverCanvas]) {
        canvas!.width = width * dpr;
        canvas!.height = height * dpr;
        canvas!.style.width = `${width}px`;
        canvas!.style.height = `${height}px`;
      }
      displayCtx!.scale(dpr, dpr);
      brushCtx!.scale(dpr, dpr);
      coverCtx!.scale(dpr, dpr);
      if (revealImgRef.current?.complete) {
        drawCover(coverCtx!, revealImgRef.current, width, height);
      }
    }

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = reveal.src;
    revealImgRef.current = img;
    img.onload = () => {
      if (width && height) drawCover(coverCtx, img, width, height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    function paintBrush(point: Point) {
      const gradient = brushCtx!.createRadialGradient(
        point.x,
        point.y,
        0,
        point.x,
        point.y,
        BRUSH_RADIUS
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.55, "rgba(255,255,255,0.82)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      brushCtx!.globalCompositeOperation = "source-over";
      brushCtx!.fillStyle = gradient;
      brushCtx!.beginPath();
      brushCtx!.arc(point.x, point.y, BRUSH_RADIUS, 0, Math.PI * 2);
      brushCtx!.fill();
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (point.x < 0 || point.y < 0 || point.x > width || point.y > height) return;

      lastMoveTimeRef.current = performance.now();

      const last = lastPointRef.current;
      if (last) {
        const dx = point.x - last.x;
        const dy = point.y - last.y;
        const distance = Math.hypot(dx, dy);
        const step = Math.max(BRUSH_RADIUS * 0.3, 1);
        const steps = Math.min(Math.floor(distance / step), MAX_INTERPOLATED_POINTS);
        for (let i = 1; i <= steps; i++) {
          const t = i / (steps + 1);
          paintBrush({ x: last.x + dx * t, y: last.y + dy * t });
        }
      }
      paintBrush(point);
      lastPointRef.current = point;
    }

    container.addEventListener("pointermove", handlePointerMove);

    function tick() {
      const now = performance.now();
      const idleFor = now - lastMoveTimeRef.current;

      if (idleFor > INACTIVITY_CLEAR_MS) {
        brushCtx!.clearRect(0, 0, width, height);
      } else {
        brushCtx!.globalCompositeOperation = "destination-out";
        brushCtx!.fillStyle = `rgba(0,0,0,${DECAY})`;
        brushCtx!.fillRect(0, 0, width, height);
      }

      displayCtx!.clearRect(0, 0, width, height);
      displayCtx!.globalCompositeOperation = "source-over";
      displayCtx!.drawImage(coverCanvas, 0, 0, width, height);
      displayCtx!.globalCompositeOperation = "destination-in";
      displayCtx!.drawImage(brushCanvas, 0, 0, width, height);
      displayCtx!.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, reveal.src]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={base.src}
        alt={base.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {enabled && (
        <canvas
          ref={displayCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
