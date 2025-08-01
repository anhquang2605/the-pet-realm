import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export interface Banner {
  id: string;
  title: string;
  dateCreated: Date;
  eventid: string;
  imageURL: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide every 5s
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleBannerClick = (eventid: string) => {
    router.push(`/event/${eventid}`);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: `min(50vh)`,
      }}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex-shrink-0 w-full h-full cursor-pointer flex justify-center items-center bg-black"
            onClick={() => handleBannerClick(banner.eventid)}
          >
            <img
              src={banner.imageURL}
              alt={banner.title}
              className="w-full h-full object-contain"
              style={{
                maxHeight: "50vh", // never taller than half viewport
                objectFit: "contain", // preserve aspect ratio
              }}
            />
          </div>
        ))}
      </div>

      {/* Bullets */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;