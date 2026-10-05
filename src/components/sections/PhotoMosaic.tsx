'use client';

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiInstagram } from "react-icons/fi";

const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    alt: "Smiling children receiving education kits",
    caption: "Education Support",
  },
  {
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    alt: "Children in primary school classroom",
    caption: "Rural Classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    alt: "Volunteers community hands together",
    caption: "Community Relief",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    alt: "Elderly medical checkup camp",
    caption: "Senior Health Camp",
  },
  {
    src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&q=80",
    alt: "Clean water drinking facility",
    caption: "Clean Water Station",
  },
  {
    src: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=600&q=80",
    alt: "Joyful community gathering",
    caption: "Joy & Togetherness",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    alt: "Emergency nutrition and food package distribution",
    caption: "Hot Meals Drive",
  },
  {
    src: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=600&q=80",
    alt: "Young girl learning in community library",
    caption: "Girls' Education",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    alt: "Humanitarian volunteer support",
    caption: "Hope in Action",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
    alt: "Volunteers team holding hands",
    caption: "Partner With Us",
  },
];

// Repeat gallery items 3 times so there are never empty gaps or blank sections on any screen size
const infinitePhotos = [...galleryPhotos, ...galleryPhotos, ...galleryPhotos];

export default function PhotoMosaic() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Set initial scroll offset to the middle set so user can scroll left or right immediately
    const oneThird = scrollContainer.scrollWidth / 3;
    if (scrollContainer.scrollLeft === 0 && oneThird > 0) {
      scrollContainer.scrollLeft = oneThird;
    }

    const scrollSpeed = 0.8; // Smooth gentle pace

    const step = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        const singleSetWidth = scrollContainer.scrollWidth / 3;
        // Seamlessly reset when passing into the third set
        if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
          scrollContainer.scrollLeft -= singleSetWidth;
        }
      }
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPaused]);

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 340;
    const singleSetWidth = container.scrollWidth / 3;
    
    if (container.scrollLeft - scrollAmount < singleSetWidth * 0.2) {
      container.scrollLeft += singleSetWidth;
    }
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 340;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft + scrollAmount > singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    }
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-6 sm:py-10 bg-white overflow-hidden relative group/gallery">
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing px-3 sm:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {infinitePhotos.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="relative flex-shrink-0 w-52 sm:w-72 md:w-80 h-36 sm:h-56 md:h-64 rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 208px, (max-width: 768px) 288px, 320px"
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/75 via-brand-black/10 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm">
                  {photo.caption}
                </span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-sm">
                  <FiInstagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons: subtly open left and right on hover (hidden on small mobile screens to favor touch) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden sm:flex items-center justify-between px-3 md:px-8">
        {/* Left Button - subtly opens to the left on hover */}
        <button
          onClick={scrollLeft}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Scroll gallery left"
          className="pointer-events-auto group/btn w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 text-brand-black hover:text-white hover:bg-brand-red shadow-[0_4px_20px_rgba(0,0,0,0.18)] border border-gray-100/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 ease-out hover:-translate-x-2 active:-translate-x-3.5 hover:shadow-[0_6px_24px_rgba(255,113,0,0.35)]"
        >
          <FiChevronLeft className="w-6 h-6 transition-transform duration-200 group-hover/btn:-translate-x-0.5" />
        </button>

        {/* Right Button - subtly opens to the right on hover */}
        <button
          onClick={scrollRight}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Scroll gallery right"
          className="pointer-events-auto group/btn w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 text-brand-black hover:text-white hover:bg-brand-red shadow-[0_4px_20px_rgba(0,0,0,0.18)] border border-gray-100/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 ease-out hover:translate-x-2 active:translate-x-3.5 hover:shadow-[0_6px_24px_rgba(255,113,0,0.35)]"
        >
          <FiChevronRight className="w-6 h-6 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
