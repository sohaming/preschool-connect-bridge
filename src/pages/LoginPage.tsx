
import React from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { Toaster } from '@/components/ui/toaster';

const LoginPage = () => {
  return (
    <Layout>
      <LoginForm />
      <Toaster />
    </Layout>
  );
};

export default LoginPage;
