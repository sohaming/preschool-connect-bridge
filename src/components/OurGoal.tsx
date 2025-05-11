
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OurGoal = () => {
  return (
    <section className="py-16 bg-theme-500 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-theme-300 p-8 md:p-12 rounded-2xl shadow-xl relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">Our Goal</h2>
            <p className="text-xl text-foreground mb-6 leading-relaxed">
              To transform the hopes of underprivileged families into reality by 
              helping their children access quality education, breaking the cycle of poverty.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We believe that education is the most powerful tool for social mobility. 
                By connecting low-income families with affordable educational institutions, 
                we aim to ensure that every child, regardless of their family's economic situation, 
                has the opportunity to learn, grow, and build a better future.
              </p>
              <p className="text-muted-foreground">
                At the same time, we provide smaller local schools with much-needed visibility 
                to reach more students and contribute to their communities.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/parent-dashboard">
                <Button className="bg-purple-500 hover:bg-purple-700 text-lg px-8 py-6">
                  Find Schools Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-500 rounded-full"></div>
        <div className="absolute right-10 bottom-10 w-60 h-60 bg-purple-700 rounded-full"></div>
        <div className="absolute left-1/2 top-1/3 w-20 h-20 bg-purple-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default OurGoal;
