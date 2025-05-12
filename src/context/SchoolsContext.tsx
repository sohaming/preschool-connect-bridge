
import React, { createContext, useState, useContext, useEffect } from 'react';
import { School } from '@/components/schools/SchoolCard';

// Initial school data
const initialSchools: School[] = [
  {
    id: 1,
    name: "DAV Senior Secondary School",
    type: "Private Unaided/Independent",
    location: "Chandigarh, Chandigarh",
    board: "Sr. Secondary/Higher Secondary School | CBSE",
    rating: "AAAAA",
    fees: "₹10,000 - ₹15,000/month",
    residential: "Day-cum-Boarding School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Rose Public School",
    type: "Private Unaided/Independent",
    location: "Kangra, Himachal Pradesh",
    board: "Sr. Secondary/Higher Secondary School | CBSE",
    rating: "AAAAA",
    fees: "₹8,000 - ₹12,000/month",
    residential: "Day School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 3,
    name: "St. Mary's Convent School",
    type: "Private Unaided/Independent",
    location: "Delhi, Delhi",
    board: "Sr. Secondary/Higher Secondary School | ICSE",
    rating: "AAAA",
    fees: "₹15,000 - ₹20,000/month",
    residential: "Day School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Sunshine Academy",
    type: "Private Unaided/Independent",
    location: "Delhi, Delhi",
    board: "CBSE",
    rating: "AAAA",
    fees: "₹5,000 - ₹8,000/month",
    residential: "Day School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  }
];

type SchoolsContextType = {
  schools: School[];
  userLocation: { lat: number; lng: number } | null;
  updateSchool: (id: number, updatedData: Partial<School>) => void;
  addSchool: (school: Omit<School, "id">) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  getNearbySchools: (maxDistance?: number) => School[];
};

const SchoolsContext = createContext<SchoolsContextType | undefined>(undefined);

export const SchoolsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schools, setSchools] = useState<School[]>(() => {
    // Try to load schools from localStorage
    const savedSchools = localStorage.getItem('schools');
    return savedSchools ? JSON.parse(savedSchools) : initialSchools;
  });
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Save schools to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('schools', JSON.stringify(schools));
  }, [schools]);

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  // Extract coordinates from location string
  const extractCoordinates = (locationStr: string): { lat: number; lng: number } | null => {
    // In a real app, we'd use a geocoding service
    // For this demo, we'll use a simple mapping
    const locationMap: Record<string, { lat: number; lng: number }> = {
      "Delhi, Delhi": { lat: 28.6139, lng: 77.2090 },
      "Mumbai, Maharashtra": { lat: 19.0760, lng: 72.8777 },
      "Chandigarh, Chandigarh": { lat: 30.7333, lng: 76.7794 },
      "Kangra, Himachal Pradesh": { lat: 32.0999, lng: 76.2691 },
      "Bangalore, Karnataka": { lat: 12.9716, lng: 77.5946 },
      "Kolkata, West Bengal": { lat: 22.5726, lng: 88.3639 },
      "Chennai, Tamil Nadu": { lat: 13.0827, lng: 80.2707 },
      "Pune, Maharashtra": { lat: 18.5204, lng: 73.8567 },
      "Hyderabad, Telangana": { lat: 17.3850, lng: 78.4867 },
      "Gurgaon, Haryana": { lat: 28.4595, lng: 77.0266 },
    };
    
    return locationMap[locationStr] || null;
  };

  const getNearbySchools = (maxDistance = 50): School[] => {
    if (!userLocation) return schools;
    
    return schools.filter(school => {
      const schoolCoords = extractCoordinates(school.location);
      if (!schoolCoords) return false;
      
      const distance = calculateDistance(
        userLocation.lat, 
        userLocation.lng,
        schoolCoords.lat,
        schoolCoords.lng
      );
      
      return distance <= maxDistance;
    });
  };

  const updateSchool = (id: number, updatedData: Partial<School>) => {
    setSchools(prevSchools => 
      prevSchools.map(school => 
        school.id === id ? { ...school, ...updatedData } : school
      )
    );
  };

  const addSchool = (school: Omit<School, "id">) => {
    const newId = Math.max(...schools.map(s => s.id), 0) + 1;
    setSchools(prevSchools => [...prevSchools, { ...school, id: newId }]);
  };

  return (
    <SchoolsContext.Provider 
      value={{ 
        schools, 
        userLocation, 
        updateSchool, 
        addSchool,
        setUserLocation,
        getNearbySchools
      }}
    >
      {children}
    </SchoolsContext.Provider>
  );
};

export const useSchools = () => {
  const context = useContext(SchoolsContext);
  if (context === undefined) {
    throw new Error('useSchools must be used within a SchoolsProvider');
  }
  return context;
};
