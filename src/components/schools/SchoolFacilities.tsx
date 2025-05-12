
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { SchoolFacility } from '@/components/schools/SchoolCard';

interface SchoolFacilitiesProps {
  facilities: SchoolFacility[];
}

const SchoolFacilities = ({ facilities }: SchoolFacilitiesProps) => {
  if (facilities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>School Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No facilities information available for this school yet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>School Facilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map(facility => (
            <div 
              key={facility.id} 
              className="flex flex-col md:flex-row gap-4 p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow"
            >
              {facility.image && (
                <div className="w-full md:w-1/3">
                  <div className="aspect-video rounded-md overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className={facility.image ? "w-full md:w-2/3" : "w-full"}>
                <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
                {facility.description && (
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolFacilities;
