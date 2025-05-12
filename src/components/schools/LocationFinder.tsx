import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Locate } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getCurrentPosition, geocodeLocation } from '@/services/location';
import { useSchools } from '@/context/SchoolsContext';
const LocationFinder = () => {
  const [locationInput, setLocationInput] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const {
    setUserLocation
  } = useSchools();
  const {
    toast
  } = useToast();
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
  return <Card className="mb-6 bg-theme-500 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg flex items-center text-purple-300">
          <MapPin className="mr-2 h-5 w-5" /> Find Schools Near Me
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input placeholder="Enter city or area name" value={locationInput} onChange={e => setLocationInput(e.target.value)} className="bg-theme-400 border-gray-700 bg-zinc-600" />
            <Button onClick={handleFindByInput} disabled={isLocating} className="bg-purple-600 hover:bg-purple-700 text-white">
              <MapPin className="mr-2 h-4 w-4" />
              Find
            </Button>
          </div>
          <div className="text-center">
            <span className="text-gray-400">- or -</span>
          </div>
          <Button onClick={handleUseCurrentLocation} disabled={isLocating} variant="outline" className="border-purple-500 text-purple-300">
            <Locate className="mr-2 h-4 w-4" />
            Use My Current Location
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export default LocationFinder;