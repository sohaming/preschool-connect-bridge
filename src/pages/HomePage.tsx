
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import WhatWeOffer from '@/components/WhatWeOffer';
import OurGoal from '@/components/OurGoal';
import CallToAction from '@/components/CallToAction';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <WhyUs />
      <WhatWeOffer />
      <OurGoal />
      <CallToAction />
    </Layout>
  );
};

export default HomePage;
