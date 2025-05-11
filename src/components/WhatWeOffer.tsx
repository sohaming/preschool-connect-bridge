
import React from 'react';
import { Star, StarHalf, Users } from 'lucide-react';

const offerings = [
  {
    title: "Comprehensive School Database",
    description: "Access to thousands of schools with detailed information about fees, facilities, and teaching methods.",
    icon: <Star size={36} className="text-purple-500" />,
  },
  {
    title: "Side-by-Side School Comparison",
    description: "Compare multiple schools at once to make the best decision for your child's education.",
    icon: <StarHalf size={36} className="text-purple-500" />,
  },
  {
    title: "Community Reviews & Insights",
    description: "Read authentic reviews from parents to get real insights about schools before making a decision.",
    icon: <Users size={36} className="text-purple-500" />,
  },
];

const WhatWeOffer = () => {
  return (
    <section className="py-16 bg-theme-300">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-300 mb-4">What We Uniquely Offer</h2>
          <p className="text-muted-foreground text-lg">
            Poppins provides services specifically designed to help low-income families find quality education for their children.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {offerings.map((offering, index) => (
            <div key={index} className="relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-theme-100 p-3 rounded-full shadow-lg">
                {offering.icon}
              </div>
              <div className="pt-12 p-6 bg-theme-500 rounded-lg shadow-md hover:shadow-purple-500/10 transition-shadow text-center mt-8 h-full">
                <h3 className="text-xl font-bold mb-3 text-purple-300">{offering.title}</h3>
                <p className="text-muted-foreground">{offering.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
