
import React from 'react';
import Layout from '@/components/Layout';
import ParentDashboard from '@/components/dashboard/ParentDashboard';
import { Toaster } from '@/components/ui/toaster';

const ParentPage = () => {
  return (
    <Layout>
      <ParentDashboard />
      <Toaster />
    </Layout>
  );
};

export default ParentPage;
