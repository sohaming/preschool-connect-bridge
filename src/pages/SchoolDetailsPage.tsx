
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from '@/components/ui/toaster';
import { useSchools } from '@/context/SchoolsContext';
import { School } from '@/components/schools/SchoolCard';
import { ChevronLeft, MapPin, Phone, Mail, Globe, Book, Users, Award, Home } from 'lucide-react';
import SchoolGallery from '@/components/schools/SchoolGallery';
import SchoolFaculty from '@/components/schools/SchoolFaculty';
import SchoolFacilities from '@/components/schools/SchoolFacilities';
import SchoolAchievements from '@/components/schools/SchoolAchievements';

const SchoolDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { schools } = useSchools();
  const [activeTab, setActiveTab] = useState('about');
  
  // Find school by ID
  const school = schools.find(s => s.id === Number(id));
  
  if (!school) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">School Not Found</h1>
          <p className="mb-8">The school you're looking for doesn't exist or has been removed.</p>
          <Link to="/parent-dashboard">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Schools
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <Link to="/parent-dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to schools
        </Link>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/4 flex justify-center">
            <div className="rounded-lg overflow-hidden w-48 h-48 border-4 border-blue-100">
              <img 
                src={school.imageUrl || "/placeholder.svg"} 
                alt={school.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-3/4">
            <div className="mb-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                {school.type}
              </span>
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {school.board}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">{school.name}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{school.location}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="text-sm text-gray-600">Rating</div>
                <div className="font-bold text-blue-700">{school.rating}</div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="text-sm text-gray-600">Fees Structure</div>
                <div className="font-bold text-blue-700">{school.fees}</div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="text-sm text-gray-600">School Type</div>
                <div className="font-bold text-blue-700">{school.gender} | {school.residential}</div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Apply Now
              </Button>
              <Button variant="outline" className="border-blue-500 text-blue-700">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Book className="mr-2 h-4 w-4" /> About
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="faculty" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="mr-2 h-4 w-4" /> Faculty
            </TabsTrigger>
            <TabsTrigger value="facilities" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Home className="mr-2 h-4 w-4" /> Facilities
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Award className="mr-2 h-4 w-4" /> Achievements
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About {school.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      {school.description ? (
                        <p>{school.description}</p>
                      ) : (
                        <p>No description available for this school yet.</p>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {school.phone && (
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-blue-700" />
                            <span>{school.phone}</span>
                          </div>
                        )}
                        
                        {school.email && (
                          <div className="flex items-center">
                            <Mail className="mr-2 h-4 w-4 text-blue-700" />
                            <span>{school.email}</span>
                          </div>
                        )}
                        
                        {school.website && (
                          <div className="flex items-center">
                            <Globe className="mr-2 h-4 w-4 text-blue-700" />
                            <a href={school.website.startsWith('http') ? school.website : `https://${school.website}`} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-blue-600 hover:underline">
                              {school.website}
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {school.address && (
                        <div className="mt-4">
                          <div className="flex items-start">
                            <MapPin className="mr-2 h-4 w-4 mt-1 text-blue-700" />
                            <span>{school.address}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gallery">
              <SchoolGallery schoolId={school.id} gallery={school.gallery || []} />
            </TabsContent>
            
            <TabsContent value="faculty">
              <SchoolFaculty faculty={school.faculty || []} />
            </TabsContent>
            
            <TabsContent value="facilities">
              <SchoolFacilities facilities={school.facilities || []} />
            </TabsContent>
            
            <TabsContent value="achievements">
              <SchoolAchievements achievements={school.achievements || []} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Toaster />
    </Layout>
  );
};

export default SchoolDetailsPage;
