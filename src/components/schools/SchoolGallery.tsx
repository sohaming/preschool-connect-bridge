
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SchoolGalleryProps {
  schoolId: number;
  gallery: string[];
}

const SchoolGallery = ({ schoolId, gallery }: SchoolGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  // Instead of rendering all images at once, load and display only what's necessary
  return (
    <Card>
      <CardHeader>
        <CardTitle>School Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        {gallery.length > 1 ? (
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-md">
              <img 
                key={`${schoolId}-image-${currentImageIndex}`}
                src={gallery[currentImageIndex]} 
                alt={`School gallery image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {gallery.length > 1 && (
                <>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90" 
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90" 
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
              {currentImageIndex + 1} / {gallery.length}
            </div>
          </div>
        ) : (
          <div className="aspect-video overflow-hidden rounded-md">
            <img 
              src={gallery[0]} 
              alt="School gallery image" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        
        {gallery.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {gallery.slice(0, 4).map((imageUrl, index) => (
              <div 
                key={`${schoolId}-thumb-${index}`} 
                className={`aspect-video overflow-hidden rounded-md cursor-pointer border-2 ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={imageUrl} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolGallery;
