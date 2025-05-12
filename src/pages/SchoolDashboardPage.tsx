
import React from 'react';
import Layout from '@/components/Layout';
import SchoolDashboard from '@/components/dashboard/SchoolDashboard';
import { Toaster } from '@/components/ui/toaster';

const SchoolDashboardPage = () => {
  return (
    <Layout>
      <SchoolDashboard />
      <Toaster />
    </Layout>
  );
};

export default SchoolDashboardPage;
