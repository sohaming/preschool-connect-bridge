
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find a School?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join Poppins today and connect your child with quality, affordable education opportunities in your area.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/parent-dashboard">
            <Button className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg">
              Find Schools Now
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="border-white hover:bg-purple-600 px-8 py-6 text-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
