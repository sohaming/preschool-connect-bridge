
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-8">About Poppins</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Poppins, we believe that quality education should be accessible to every child, 
                regardless of their family's economic situation. Our platform is dedicated to bridging 
                the gap between parents living below the poverty line and affordable, quality schools 
                in their vicinity.
              </p>
              <p className="text-gray-700">
                We are committed to ensuring that financial constraints never stand in the way of a 
                child's education and future prospects.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600">What We Do</h2>
              <p className="text-gray-700 mb-4">
                Poppins serves as a comprehensive database of schools, focusing particularly on 
                affordable options including government schools, NGO-run educational institutions, 
                and budget-friendly private schools. Our platform allows parents to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Search for schools based on location, fees, and other important criteria</li>
                <li>Compare different schools side by side to make informed decisions</li>
                <li>Access detailed information about each school, including their facilities, teaching methodology, and fee structure</li>
                <li>Read reviews from other parents to get real insights about the schools</li>
              </ul>
              <p className="text-gray-700">
                Meanwhile, we help smaller, local schools gain online visibility and reach more families who could benefit from their services.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Impact</h2>
              <p className="text-gray-700 mb-4">
                By connecting underprivileged families with affordable educational institutions, 
                Poppins aims to increase school enrollment rates among children from low-income households. 
                At the same time, we provide a platform for lesser-known but quality schools to showcase 
                their offerings and attract more students.
              </p>
              <p className="text-gray-700">
                We believe that this two-way bridge benefits both parties and contributes to the larger 
                goal of universal education—a stepping stone towards breaking the cycle of poverty.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
