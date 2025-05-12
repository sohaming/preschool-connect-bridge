
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export interface School {
  id: number;
  name: string;
  type: string;
  location: string;
  board: string;
  rating: string;
  fees: string;
  residential: string;
  gender: string;
  imageUrl?: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  faculty?: SchoolFaculty[];
  facilities?: SchoolFacility[];
  achievements?: SchoolAchievement[];
  gallery?: string[];
}

export interface SchoolFaculty {
  id: number;
  name: string;
  position: string;
  image?: string;
  qualification?: string;
  experience?: string;
}

export interface SchoolFacility {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

export interface SchoolAchievement {
  id: number;
  title: string;
  description?: string;
  year?: string;
  image?: string;
}

interface SchoolCardProps {
  school: School;
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/school-details/${school.id}`);
  };
  
  return (
    <Card className="mb-6 overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4 flex justify-center items-center bg-gray-100">
          <div className="rounded-full overflow-hidden w-24 h-24 border-4 border-blue-100">
            <img 
              src={school.imageUrl || "/placeholder.svg"} 
              alt={school.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{school.type}</p>
                <h3 className="text-xl font-bold text-blue-700">{school.name}</h3>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-start mb-2">
              <MapPin className="mr-1 h-4 w-4 mt-0.5 text-gray-500" />
              <span className="text-sm text-gray-600">{school.location}</span>
            </div>
            
            <div className="mb-3 text-sm">
              <span>{school.board}</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-3">
              <div>
                <span className="text-sm text-gray-600">Rating:</span>
                <span className="ml-1 font-medium">{school.rating}</span>
              </div>
              
              {school.residential && (
                <div>
                  <span className="text-sm text-gray-600">Residential:</span>
                  <span className="ml-1 font-medium">{school.residential}</span>
                </div>
              )}
              
              <div>
                <span className="text-sm text-gray-600">Gender:</span>
                <span className="ml-1 font-medium">{school.gender}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-end mt-4">
              <Button variant="outline" className="border-blue-500 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"></path><path d="M2 10h20"></path></svg>
                Brochure
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
                Enquire
              </Button>
              <Button onClick={handleViewDetails} className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default SchoolCard;
