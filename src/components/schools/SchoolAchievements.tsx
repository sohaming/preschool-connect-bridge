
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Trophy } from "lucide-react";
import { SchoolAchievement } from '@/components/schools/SchoolCard';

interface SchoolAchievementsProps {
  achievements: SchoolAchievement[];
}

const SchoolAchievements = ({ achievements }: SchoolAchievementsProps) => {
  if (achievements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>School Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No achievements information available for this school yet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Sort achievements by year (most recent first)
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (!a.year || !b.year) return 0;
    return parseInt(b.year) - parseInt(a.year);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>School Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedAchievements.map(achievement => (
            <div 
              key={achievement.id} 
              className="flex flex-col md:flex-row gap-4 p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{achievement.title}</h3>
                  {achievement.year && (
                    <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      {achievement.year}
                    </span>
                  )}
                </div>
                
                {achievement.description && (
                  <p className="text-gray-600 mt-2">{achievement.description}</p>
                )}
                
                {achievement.image && (
                  <div className="mt-4 max-w-md">
                    <div className="aspect-video rounded-md overflow-hidden">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolAchievements;
