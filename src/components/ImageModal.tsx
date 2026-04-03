import { useState, useRef, useEffect, useCallback } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  imageUrl: string;
  altText: string;
}

export default function ImageModal({
  imageUrl,
  altText,
  isOpen,
  onOpenChange,
}: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setImageLoaded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setImageLoaded(false);
  }, [imageUrl]);

  const getBounds = useCallback((s: number) => {
    if (!containerRef.current || !imageRef.current || s <= 1) {
      return { maxX: 0, maxY: 0 };
    }
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const iw = imageRef.current.clientWidth;
    const ih = imageRef.current.clientHeight;
    const sw = iw * s;
    const sh = ih * s;
    return {
      maxX: Math.max(0, (sw - cw) / 2),
      maxY: Math.max(0, (sh - ch) / 2),
    };
  }, []);

  const clamp = useCallback((x: number, y: number, s: number) => {
    const { maxX, maxY } = getBounds(s);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, [getBounds]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => {
      const next = Math.max(1, Math.min(5, prev * factor));
      setPosition((p) => next === 1 ? { x: 0, y: 0 } : clamp(p.x, p.y, next));
      return next;
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const rawX = posStart.current.x + dx;
    const rawY = posStart.current.y + dy;
    const clamped = clamp(rawX, rawY, scale);
    setPosition(clamped);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const zoomIn = () => {
    setScale((prev) => {
      const next = Math.min(5, prev * 1.25);
      setPosition((p) => clamp(p.x, p.y, next));
      return next;
    });
  };

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(1, prev / 1.25);
      setPosition((p) => next === 1 ? { x: 0, y: 0 } : clamp(p.x, p.y, next));
      return next;
    });
  };

  const reset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleClose = () => {
    reset();
    onOpenChange();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 gap-0 bg-transparent border-none shadow-none max-w-[95vw] lg:max-w-[90vw] [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">{altText}</DialogTitle>
        <DialogDescription />
        <div className="relative w-full h-[80dvh] lg:h-[85dvh]">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-50 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors shadow-lg"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            ref={containerRef}
            className="w-full h-full overflow-hidden rounded-lg"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{ touchAction: "none" }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: isDragging.current ? "grabbing" : scale > 1 ? "grab" : "default",
                transition: isDragging.current ? "none" : "transform 0.15s ease-out",
              }}
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt={altText}
                className="object-contain max-w-full max-h-full select-none"
                draggable={false}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {scale > 1 && imageLoaded && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2">
              <button
                onClick={zoomOut}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-white/80 text-xs font-mono min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={reset}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors ml-1"
                aria-label="Restablecer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
