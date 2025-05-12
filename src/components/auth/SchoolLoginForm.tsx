
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { School } from 'lucide-react';

const SchoolLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
      // Demo login - any school@example.com email will work with password "school123"
      if (email.includes('school') && password === 'school123') {
        toast({
          title: "Login successful",
          description: "Welcome to your school dashboard!",
        });
        navigate('/school-dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. For demo, use any email with 'school' and password 'school123'",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md bg-theme-500 border-purple-700">
        <CardHeader className="text-center">
          <div className="mx-auto bg-purple-500 text-white p-3 rounded-lg inline-flex mb-2">
            <School size={24} />
          </div>
          <CardTitle className="text-2xl font-bold text-purple-300">School Login</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to manage your school's information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-200">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="school@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-theme-400 border-gray-700 focus:border-purple-500 text-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-purple-400 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-theme-400 border-gray-700 focus:border-purple-500 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-700 pt-4 text-gray-300">
          <div className="text-sm">
            Don't have an account?{" "}
            <Link to="/school-register" className="text-purple-400 hover:underline">
              Register your school
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SchoolLoginForm;
