import React, { useState } from "react";

const FeaturesSection = ({ features }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <section className="mb-12 text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative bg-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ${
              hoveredFeature === index ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            {/* Render title directly when not hovered */}
            <h3 className="text-lg font-semibold mb-2 z-20">{feature.title}</h3>
          </div>
        ))}
        {hoveredFeature !== null && (
          <div className="rounded-full overflow-hidden w-84 h-auto bg-white border shadow-md absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-4 z-30">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {features[hoveredFeature].title}
              </h3>
              <p className="text-md font-semibold text-gray-800">
                {features[hoveredFeature].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
