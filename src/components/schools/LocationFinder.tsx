
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Locate, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getCurrentPosition, geocodeLocation } from '@/services/location';
import { useSchools } from '@/context/SchoolsContext';

const LocationFinder = () => {
  const [locationInput, setLocationInput] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const { setUserLocation } = useSchools();
  const { toast } = useToast();

  const handleFindByInput = async () => {
    if (!locationInput.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location to search",
        variant: "destructive"
      });
      return;
    }

    setIsLocating(true);
    try {
      const coords = await geocodeLocation(locationInput);
      if (coords) {
        setUserLocation(coords);
        toast({
          title: "Location found",
          description: `Found schools near ${locationInput}`
        });
      } else {
        toast({
          title: "Location not found",
          description: "We couldn't find that location. Please try another city.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error finding location",
        description: "There was an error finding this location. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLocating(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setIsLocating(true);
    try {
      const position = await getCurrentPosition();
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      toast({
        title: "Location found",
        description: "Found your current location. Showing nearby schools."
      });
    } catch (error) {
      toast({
        title: "Location error",
        description: "Couldn't access your location. Please check your browser permissions.",
        variant: "destructive"
      });
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 border-0 shadow-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
        </svg>
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
      </div>

      <CardHeader className="relative">
        <CardTitle className="text-lg flex items-center text-white">
          <MapPin className="mr-2 h-5 w-5" /> Find Schools Near Me
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input 
              placeholder="Enter city or area name" 
              value={locationInput} 
              onChange={e => setLocationInput(e.target.value)}
              className="pl-10 pr-4 py-6 border-white/20 bg-white/10 text-white placeholder-white/70 backdrop-blur-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleFindByInput()}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            <Button 
              onClick={handleFindByInput} 
              disabled={isLocating} 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white text-blue-700 hover:bg-blue-100 shadow-lg"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Find
            </Button>
          </div>
          
          <div className="text-center">
            <span className="text-white/60">- or -</span>
          </div>
          
          <Button 
            onClick={handleUseCurrentLocation} 
            disabled={isLocating} 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Locate className="mr-2 h-4 w-4 animate-pulse" />
            Use My Current Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationFinder;
