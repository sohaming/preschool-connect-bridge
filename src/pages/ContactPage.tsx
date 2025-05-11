
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-6 text-purple-600">Get in Touch</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium">Your Name</label>
                  <Input id="name" placeholder="Enter your full name" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">Email Address</label>
                  <Input id="email" type="email" placeholder="Enter your email address" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block font-medium">Subject</label>
                  <Input id="subject" placeholder="What is this regarding?" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your inquiry..." 
                    className="min-h-[150px]" 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-6 text-purple-600">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email</h3>
                    <p className="text-gray-700">info@poppins.com</p>
                    <p className="text-gray-700">support@poppins.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Phone</h3>
                    <p className="text-gray-700">+91 123 456 7890</p>
                    <p className="text-gray-700">+91 987 654 3210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Home className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Office Address</h3>
                    <p className="text-gray-700">
                      123 Education Street<br />
                      Knowledge Park, Learning City<br />
                      Pin: 400001
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-lg text-purple-600 mb-2">Office Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-6 text-purple-600">Join Our Mission</h2>
              <p className="text-gray-700 mb-4">
                If you're a school administrator looking to list your institution on our platform, 
                or if you're an NGO wanting to collaborate with us for a social cause, we'd love to hear from you!
              </p>
              <p className="text-gray-700 mb-4">
                We're always open to partnerships that help further our mission of making quality education 
                accessible to underprivileged children.
              </p>
              <div className="flex justify-center mt-6">
                <Button className="bg-purple-500 hover:bg-purple-600">Partner With Us</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
