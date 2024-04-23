import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalIdRef = React.useRef(null);

  useEffect(() => {
    if (autoplay) {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [autoplay]);

  const slides = [
    {
      imageUrl: require("../../../Assets/Images/carousel/pexels-flambo-388007-1112080.jpg"),
      altText: "Image 1 description",
      heading: "This is the heading for image 1.",
      text: "This is the text for image 1. This is the text for image 1. This is the text for image 1. This is the text for image 1. This is the text for image 1. This is the text for image 1.",
    },
    {
      imageUrl: require("../../../Assets/Images/carousel/pexels-nc-farm-bureau-mark-2252584.jpg"),
      altText: "Image 2 description",
      heading: "This is the heading for image 2.",
      text: "This is the text for image 2. This is the text for image 2. This is the text for image 2. This is the text for image 2. This is the text for image 2. This is the text for image 2.",
    },
    {
      imageUrl: require("../../../Assets/Images/carousel/pexels-pixabay-164504.jpg"),
      altText: "Image 3 description",
      heading: "This is the heading for image 3.",
      text: "This is the text for image 3. This is the text for image 3. This is the text for image 3. This is the text for image 3. This is the text for image 3. This is the text for image 3.",
    },
    {
      imageUrl: require("../../../Assets/Images/carousel/pexels-pixabay-461960.jpg"),
      altText: "Image 4 description",
      heading: "This is the heading for image 4.",
      text: "This is the text for image 4. This is the text for image 4. This is the text for image 4. This is the text for image 4. This is the text for image 4. This is the text for image 4.",
    },
    {
      imageUrl: require("../../../Assets/Images/carousel/pexels-quang-nguyen-vinh-222549-2165688.jpg"),
      altText: "Image 5 description",
      heading: "This is the heading for image 5.",
      text: "This is the text for image 5. This is the text for image 5. This is the text for image 5. This is the text for image 5. This is the text for image 5. This is the text for image 5.",
    },
    {
      imageUrl: require("../../../Assets/Images/carousel/pexels-tomfisk-1595108.jpg"),
      altText: "Image 6 description",
      heading: "This is the heading for image 6.",
      text: "This is the text for image 6. This is the text for image 6. This is the text for image 6. This is the text for image 6. This is the text for image 6. This is the text for image 6.",
    },
  ];

  const prevSlide = () => {
    clearInterval(intervalIdRef.current);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setTimeout(() => {
      if (autoplay) {
        intervalIdRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
      }
    }, 500);
  };

  const nextSlide = () => {
    clearInterval(intervalIdRef.current);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setTimeout(() => {
      if (autoplay) {
        intervalIdRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
      }
    }, 500);
  };

  return (
    <>
      <div
        className={`800px:w-11/12 w-full mx-auto max-h-[450pt] 800px:mt-10 mt-2 min-h-[60pt] relative group 800px:border-[1px] 800px:border-slate-400 800px:rounded-lg rounded-none`}
      >
        <div
          className={`w-full max-h-[450pt] 800px:rounded-lg rounded-none bg-cover duration-700 bg-black`}
        >
          <img
            src={slides[currentIndex].imageUrl}
            alt={slides[currentIndex].altText}
            className="800px:rounded-lg rounded-none max-h-[450pt] w-full opacity-90"
          />
          <div className="absolute inset-0 max-h-[500pt] z-[1] rounded-lg">
            <div className="absolute 800px:rounded-lg max-h-[450pt] rounded-none inset-0 bg-gradient-to-r from-black/85 to-transparent"></div>
          </div>
          <div className="absolute inset-0 800px:pl-10 pl-6 flex flex-col justify-center text-white z-[2]">
            <h1 className="800px:text-3xl text-2xl font-bold text-left 800px:w-1/2 w-3/4 pb-10">
              {slides[currentIndex].heading}
            </h1>
            <p className="800px:text-xl text-lg text-left 800px:w-1/2 w-5/6">
              {slides[currentIndex].text}
            </p>
          </div>
        </div>
        {/* left arrow */}
        <div className="hidden z-50 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-[#000000a4] text-[#fff] cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* right arrow */}
        <div className="hidden z-50 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-[#000000a4] text-[#fff] cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <button onClick={() => setAutoplay(!autoplay)}
          className="hidden z-50 800px:group-hover:block absolute justify-end bottom-2 right-2 bg-[#000000a4] text-[#fff] rounded-[5pt] p-2"
        >
          {autoplay ? "Pause Autoplay" : "Resume Autoplay"}
        </button>
        <div className="hidden z-50 group-hover:flex absolute justify-center left-[50%] right-[50%] bottom-2 items-center">
          {slides.map((slide, index) => (
            <div
              className={`cursor-pointer ${
                currentIndex === index
                  ? "text-[#4cff3b] text-[22pt]"
                  : "text-[#ffffffe0] text-[17pt]"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <RxDotFilled />{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
