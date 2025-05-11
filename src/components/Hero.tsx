
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-100 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Connecting Parents and Preschools
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Build stronger relationships between families and educators through seamless
            communication and collaboration for the best early childhood education experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button className="bg-blue-500 hover:bg-blue-600 text-md px-6 py-6">
                Join as Parent
              </Button>
            </Link>
            <Link to="/register?type=school">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 text-md px-6 py-6">
                Join as Preschool
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-500 rounded-full opacity-10 absolute -top-6 -left-6"></div>
            <div className="w-64 h-64 md:w-80 md:h-80 bg-green-500 rounded-full opacity-10 absolute -bottom-6 -right-6"></div>
            <div className="w-72 h-72 md:w-96 md:h-96 bg-white rounded-2xl shadow-xl overflow-hidden relative z-10 animate-float">
              <div className="w-full h-12 bg-blue-500"></div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded-md w-1/2 mt-2"></div>
                  </div>
                </div>
                <div className="w-full h-24 bg-gray-100 rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded-md w-full"></div>
                  <div className="h-3 bg-gray-200 rounded-md w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded-md w-4/6"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-16 h-6 bg-green-200 rounded-md"></div>
                  <div className="w-16 h-6 bg-yellow-200 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
