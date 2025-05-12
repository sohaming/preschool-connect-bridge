
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { SchoolFaculty as FacultyType } from '@/components/schools/SchoolCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SchoolFacultyProps {
  faculty: FacultyType[];
}

const SchoolFaculty = ({ faculty }: SchoolFacultyProps) => {
  if (faculty.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No faculty information available for this school yet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map(member => (
            <div 
              key={member.id} 
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <Avatar className="w-24 h-24 mb-4 border-2 border-blue-300">
                <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="bg-blue-200 text-blue-800 text-xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="text-lg font-semibold text-center">{member.name}</h3>
              <p className="text-blue-700 text-sm mb-2">{member.position}</p>
              
              {member.qualification && (
                <p className="text-gray-600 text-sm text-center">{member.qualification}</p>
              )}
              
              {member.experience && (
                <p className="text-gray-600 text-sm text-center mt-1">
                  Experience: {member.experience}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolFaculty;
