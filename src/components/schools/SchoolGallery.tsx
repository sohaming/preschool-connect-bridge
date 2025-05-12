
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface SchoolGalleryProps {
  schoolId: number;
  gallery: string[];
}

const SchoolGallery = ({ schoolId, gallery }: SchoolGalleryProps) => {
  if (gallery.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>School Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No gallery images available for this school yet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>School Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((imageUrl, index) => (
            <div key={`${schoolId}-image-${index}`} className="aspect-video overflow-hidden rounded-md">
              <img 
                src={imageUrl} 
                alt={`School gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolGallery;
