
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RegisterForm = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('type') === 'school' ? 'preschool' : 'parent';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic would go here
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-blue-50 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-700">Create Account</CardTitle>
          <CardDescription>
            Join PreSchool Connect to enhance early childhood education
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="mb-6">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="preschool">Preschool</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parent">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childName">Child's Name</Label>
                  <Input
                    id="childName"
                    placeholder="Max"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                  Create Parent Account
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="preschool">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">Preschool Name</Label>
                  <Input
                    id="schoolName"
                    placeholder="Little Explorers Preschool"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminName">Administrator Name</Label>
                  <Input
                    id="adminName"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolEmail">Email</Label>
                  <Input
                    id="schoolEmail"
                    type="email"
                    placeholder="admin@school.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolPassword">Password</Label>
                  <Input
                    id="schoolPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolPhone">Phone Number</Label>
                  <Input
                    id="schoolPhone"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                  Create School Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="text-center text-sm">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-700 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
