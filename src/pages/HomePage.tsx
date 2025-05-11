
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default HomePage;
