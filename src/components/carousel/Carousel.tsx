"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./Carousel.module.css";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <div className={style.container}>
      <Image
        src={images[currentIndex]}
        alt={`Product Image ${currentIndex + 1}`}
        width={500}
        height={350}
        style={{ borderRadius: "10px", objectFit: "cover" }}
        priority
      />

      <button className={style.arrowLeft} onClick={prevSlide}>
        ❮
      </button>

      <button onClick={nextSlide} className={style.arrowRight}>
        ❯
      </button>

      <div className={style.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${style.dot} ${
              currentIndex === index ? style.active : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
