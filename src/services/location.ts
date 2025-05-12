
// Get current position as a promise
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

// Convert location name to coordinates (geocoding)
// In a real app, this would use a geocoding service like Google Maps or Mapbox
export const geocodeLocation = async (locationName: string): Promise<{ lat: number; lng: number } | null> => {
  // Simple mapping for demo purposes
  const locationMap: Record<string, { lat: number; lng: number }> = {
    "Delhi": { lat: 28.6139, lng: 77.2090 },
    "Mumbai": { lat: 19.0760, lng: 72.8777 },
    "Chandigarh": { lat: 30.7333, lng: 76.7794 },
    "Kangra": { lat: 32.0999, lng: 76.2691 },
    "Bangalore": { lat: 12.9716, lng: 77.5946 },
    "Kolkata": { lat: 22.5726, lng: 88.3639 },
    "Chennai": { lat: 13.0827, lng: 80.2707 },
    "Pune": { lat: 18.5204, lng: 73.8567 },
    "Hyderabad": { lat: 17.3850, lng: 78.4867 },
    "Gurgaon": { lat: 28.4595, lng: 77.0266 },
  };
  
  // Try to match by exact name
  if (locationName in locationMap) {
    return locationMap[locationName];
  }
  
  // Try to match by partial name
  for (const [key, value] of Object.entries(locationMap)) {
    if (locationName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(locationName.toLowerCase())) {
      return value;
    }
  }
  
  return null;
};
