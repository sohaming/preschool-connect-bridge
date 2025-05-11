
import React from 'react';
import { Calendar, MessageSquare, User } from 'lucide-react';

const featureData = [
  {
    icon: <MessageSquare size={36} className="text-blue-500" />,
    title: "Seamless Communication",
    description: "Direct messaging between parents and teachers to stay informed about your child's progress and needs."
  },
  {
    icon: <Calendar size={36} className="text-green-500" />,
    title: "Activity Tracking",
    description: "Keep up with your child's daily activities, schedules, milestones, and upcoming events."
  },
  {
    icon: <User size={36} className="text-yellow-500" />,
    title: "Profile Management",
    description: "Manage your child's profile including medical information, emergency contacts, and permissions."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">How We Connect</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides tools for both parents and preschools to create a seamless
            connection for the best early childhood education experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureData.map((feature, index) => (
            <div key={index} className="dashboard-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
