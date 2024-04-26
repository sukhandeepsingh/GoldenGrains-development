import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ${
              index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
            style={{ left: `${index * 100}%` }}
          >
            <img src={slide.imageUrl} alt={slide.altText} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full px-6 pb-6 text-white">
              <h1 className="text-3xl font-bold">{slide.heading}</h1>
              <p className="text-lg">{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
