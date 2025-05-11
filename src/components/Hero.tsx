
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-theme-300 to-theme-500 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
            Quality Education For Every Child
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Finding affordable quality schools shouldn't be difficult. 
            We help low-income families connect with schools that fit their budget 
            and provide the education their children deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/parent-dashboard">
              <Button className="bg-purple-500 hover:bg-purple-700 text-md px-6 py-6">
                Find Schools Near You
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-theme-300 text-md px-6 py-6">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-purple-500 rounded-full opacity-10 absolute -top-6 -left-6"></div>
            <div className="w-64 h-64 md:w-80 md:h-80 bg-purple-700 rounded-full opacity-10 absolute -bottom-6 -right-6"></div>
            <div className="w-72 h-72 md:w-96 md:h-96 bg-theme-300 rounded-2xl shadow-xl overflow-hidden relative z-10 animate-float">
              <div className="w-full h-12 bg-purple-500"></div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-theme-100 rounded-md w-3/4"></div>
                    <div className="h-3 bg-theme-100 rounded-md w-1/2 mt-2"></div>
                  </div>
                </div>
                <div className="w-full h-24 bg-theme-100 rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-theme-100 rounded-md w-full"></div>
                  <div className="h-3 bg-theme-100 rounded-md w-5/6"></div>
                  <div className="h-3 bg-theme-100 rounded-md w-4/6"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-16 h-6 bg-purple-200 rounded-md"></div>
                  <div className="w-16 h-6 bg-purple-100 rounded-md"></div>
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
