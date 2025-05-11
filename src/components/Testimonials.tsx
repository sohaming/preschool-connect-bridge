
import React from 'react';

const testimonials = [
  {
    quote: "PreSchool Connect has transformed how we interact with our son's teachers. We feel so much more involved in his daily activities!",
    author: "Sarah Johnson",
    role: "Parent"
  },
  {
    quote: "As a preschool director, this platform has streamlined our communication with parents and improved overall satisfaction.",
    author: "Michael Thompson",
    role: "Preschool Director"
  },
  {
    quote: "I love being able to share photos and updates with parents throughout the day. It's made a huge difference in parent engagement.",
    author: "Emily Rodriguez",
    role: "Preschool Teacher"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">What People Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from parents and educators who are already benefiting from our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex-1">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="mb-4 text-gray-600 italic">&ldquo;{item.quote}&rdquo;</p>
                <div>
                  <p className="font-medium text-blue-700">{item.author}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
