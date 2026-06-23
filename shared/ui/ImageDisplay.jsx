"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";

const ImageDisplay = ({ product }) => {
  const [active, setActive] = useState(product?.image?.[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setActive(product.image[0]);
    }
  }, [product]);

  const handleActive = (url, index) => {
    setActive(url);
    setImageIndex(index);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (imageIndex < product?.image?.length - 1) {
      setImageIndex(imageIndex + 1);
      setActive(product?.image[imageIndex + 1]);
    }
  };

  const handlePrevious = (e) => {
    if (e) e.stopPropagation();
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
      setActive(product?.image[imageIndex - 1]);
    }
  };

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);

  return (
    <div>
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center mb-8 px-12">
            {imageIndex !== 0 && (
              <button onClick={handlePrevious} className="absolute left-4 text-white/50 hover:text-white transition-colors text-5xl z-10">
                <FaCircleChevronLeft />
              </button>
            )}

            <div className="relative w-full h-full">
              <Image
                src={active}
                fill
                alt={active}
                objectFit="contain"
                className="rounded-lg drop-shadow-2xl"
              />
            </div>

            {imageIndex !== product?.image?.length - 1 && (
              <button onClick={handleNext} className="absolute right-4 text-white/50 hover:text-white transition-colors text-5xl z-10">
                <FaCircleChevronRight />
              </button>
            )}
          </div>

          <div className="flex gap-4 px-4 overflow-x-auto max-w-full pb-4">
            {product?.image?.map((image, index) => (
              <div
                key={image}
                className={`relative h-20 w-20 shrink-0 cursor-pointer rounded-md overflow-hidden transition-all ${
                  active === image ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"
                }`}
                onClick={() => handleActive(image, index)}
              >
                <Image
                  src={image}
                  fill
                  alt={image}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Inline Display */}
      {product && (
        <div className="relative group cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
          <div className=" w-[50vw] h-[50rem] relative mb-[2rem] max-xl:h-[40rem] max-lg:h-[30rem] max-md:w-[90vw] max-md:mx-auto">
            {active && (
              <Image
                src={active}
                fill
                alt={active}
                objectFit="cover"
                objectPosition="top"
                className="rounded-md transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}
            
            {/* Expand Icon Overlay */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm text-slate-900">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            </div>
          </div>

          <div className="absolute text-4xl z-10 text-white flex items-center top-[50%] justify-between w-full px-[1rem] opacity-0 group-hover:opacity-100 transition-opacity">
            {imageIndex !== 0 ? (
              <button
                className="cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                onClick={handlePrevious}
              >
                 <FaCircleChevronLeft />
              </button>
            ) : (
              <div></div>
            )}
            {imageIndex !== product?.image?.length - 1 && (
              <button
                className="cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                onClick={handleNext}
              >
                 <FaCircleChevronRight />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Thumbnails */}
      <div className=" flex max-md:w-[90vw] max-md:mx-auto">
        {product?.image?.map((image, index) => (
          <div
            key={image}
            className={`${
              active === image && "border-2 border-[#ffd138] rounded-md scale-105"
            } mr-[1rem] p-[0.2rem] cursor-pointer relative h-[5rem] w-[5rem] max-md:w-[3rem] max-md:h-[3rem] transition-all`}
            onClick={() => handleActive(image, index)}
          >
            <Image
              src={image}
              fill
              alt={image}
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
