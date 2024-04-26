import React, { useState } from "react";

const WhyChooseUs = () => {
  const reasons = [
    {
      image: require("../../Assets/Images/carousel/pexels-flambo-388007-1112080.jpg"),
      title: "Direct Farmer-to-Consumer Connection",
      description:
        "Cut out the middleman and support local farmers by buying fresh produce directly from them.",
    },
    {
      image: require("../../Assets/Images/carousel/pexels-nc-farm-bureau-mark-2252584.jpg"),
      title: "Quality Assurance",
      description:
        "Our platform ensures that all produce meets high-quality standards by working closely with farmers.",
    },
    {
      image: require("../../Assets/Images/carousel/pexels-pixabay-164504.jpg"),
      title: "Transparent Pricing",
      description:
        "Know exactly what you're paying for with transparent pricing and fair deals for both farmers and consumers.",
    },
    {
      image: require("../../Assets/Images/carousel/pexels-pixabay-461960.jpg"),
      title: "Community Support",
      description:
        "Join a community of farmers and consumers who care about sustainability, local economies, and healthy living.",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <div className="w-full flex justify-center my-5">
        <div className="flex w-11/12 justify-center">
        <div className="container mx-auto my-5 justify-center">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                <img
                  src={reason.image}
                  alt={reason.title}
                  className="w-full h-48 object-cover opacity-100 transition-opacity duration-300 ease-in-out"
                />
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-85 transition-opacity duration-300 ease-in-out ${
                    hoveredIndex === index ? "opacity-100" : ""
                  }`}
                ></div>
                <h3
                  className={`absolute z-10 w-max bottom-4 px-2 text-center text-[#fff] ${
                    hoveredIndex === index ? "invisible" : ""
                  }`}
                >
                  {reason.title}
                </h3>
                <div
                  className={`absolute bottom-0 left-0 h-full w-full px-4 py-2 bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3
                    className={`text-lg font-medium my-2 text-white transform transition-transform duration-300 ease-in-out ${
                      hoveredIndex === index
                        ? "translate-y-0"
                        : "translate-y-full"
                    }`}
                  >
                    {reason.title}
                  </h3>
                  <div
                    className={`text-sm text-white ${
                      hoveredIndex !== index ? "invisible" : ""
                    }`}
                  >
                    <p>{reason.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
