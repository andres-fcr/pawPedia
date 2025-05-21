import React, { useState, useRef } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

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
  const lastPosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    const scaleFactor = e.deltaY > 0 ? 0.95 : 1.05;
    setScale((prev) => Math.max(1, Math.min(3, prev * scaleFactor)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;

    isDragging.current = true;
    lastPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - lastPosition.current.x,
      y: e.clientY - lastPosition.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const reset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleOpenChange = (val: boolean) => {
    onOpenChange();
    if (!val) reset();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogTitle className="sr-only">{altText}</DialogTitle>
          <DialogDescription />
          <div
            className="relative w-full h-[80dvh] lg:h-[85dvh] overflow-hidden touch-none"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: isDragging.current ? "grabbing" : "grab",
                transition: isDragging.current
                  ? "none"
                  : "transform 0.1s ease-out",
              }}
            >
              <img
                src={imageUrl}
                alt={altText}
                className="object-contain max-w-full max-h-full"
                draggable={false}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
