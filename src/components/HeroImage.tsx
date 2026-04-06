import ImageWithFallback from "@/components/ImageWithFallback";
import { ImageIcon, ZoomIn } from "lucide-react";

interface HeroImageProps {
  src: string;
  alt: string;
  origin: string;
  originIcon: React.ReactNode;
  onZoomImage: () => void;
}

const HeroImage = ({ src, alt, origin, originIcon, onZoomImage }: HeroImageProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 group border-2 border-border">
      <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[2/1] w-full">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
          fallbackIcon={<ImageIcon className="w-16 h-16 opacity-30" />}
          fallbackClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-3">
            {originIcon}
            <span className="text-white/80 font-outfit text-sm tracking-wide uppercase">
              {origin}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-white">
            {alt}
          </h1>
        </div>
        <button
          onClick={onZoomImage}
          className="absolute top-4 right-4 p-3 bg-primary/80 rounded-full text-white hover:bg-primary transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 shadow-lg"
          aria-label="Ampliar imagen"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroImage;
