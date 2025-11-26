"use client";

import { useState } from "react";
import { DishImageFrame } from "@/components/shared/DishImageFrame";

export interface DishCarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
}

/**
 * Carousel specifically for dish/food images.
 * Uses DishImageFrame to enforce 768×463 aspect ratio.
 * Manual navigation only (arrows + dots).
 */
export function DishCarousel({ 
  images, 
  className = "" 
}: DishCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <section 
      className={`relative ${className}`}
      aria-label="Dish image carousel"
      role="region"
    >
      {/* Dish Image with standardized aspect ratio */}
      <div className="relative w-full overflow-hidden rounded-2xl">
        <DishImageFrame
          src={currentImage.src}
          alt={currentImage.alt}
          priority={currentIndex === 0}
        />
      </div>

      {/* Navigation Arrows - Only show if more than 1 image */}
      {images.length > 1 && (
        <>
          {/* Left Arrow - Enlarged hit area */}
          <button
            type="button"
            onClick={goToPrevious}
            className="group absolute inset-y-0 left-0 z-20 flex w-[20%] max-w-[160px] items-center justify-start bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Previous image"
          >
            <span className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-lg shadow-md transition-all duration-200 motion-safe:group-hover:-translate-y-1 group-hover:shadow-xl group-active:scale-[0.97]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </button>

          {/* Right Arrow - Enlarged hit area */}
          <button
            type="button"
            onClick={goToNext}
            className="group absolute inset-y-0 right-0 z-20 flex w-[20%] max-w-[160px] items-center justify-end bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Next image"
          >
            <span className="mr-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-lg shadow-md transition-all duration-200 motion-safe:group-hover:-translate-y-1 group-hover:shadow-xl group-active:scale-[0.97]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1} of ${images.length}`}
                aria-current={index === currentIndex ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  index === currentIndex
                    ? "w-4 bg-primary"
                    : "w-2 bg-muted hover:bg-primary/50 motion-safe:hover:scale-110"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 z-10 bg-foreground/80 backdrop-blur-sm text-background text-sm font-medium px-4 py-1.5 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </section>
  );
}
