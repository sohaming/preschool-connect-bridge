
import React from 'react';
import Layout from '@/components/Layout';
import SchoolLoginForm from '@/components/auth/SchoolLoginForm';
import { Toaster } from '@/components/ui/toaster';

const SchoolLoginPage = () => {
  return (
    <Layout>
      <SchoolLoginForm />
      <Toaster />
    </Layout>
  );
};

export default SchoolLoginPage;
