
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community of parents and preschools to enhance early childhood education through better communication.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg">
              Sign Up Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-white hover:bg-blue-500 px-8 py-6 text-lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
