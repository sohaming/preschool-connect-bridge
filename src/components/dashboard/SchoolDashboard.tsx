
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useSchools } from '@/context/SchoolsContext';
import { 
  School as SchoolIcon, 
  Upload, 
  MapPin, 
  Save,
  Image,
  FileText,
  Database
} from "lucide-react";

const SchoolDashboard = () => {
  const { schools, updateSchool } = useSchools();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Find school with ID 101 (Sunshine Academy) or use the first one
  const currentSchool = schools.find(s => s.id === 101) || schools[0];
  
  const [schoolData, setSchoolData] = useState(currentSchool);

  useEffect(() => {
    if (currentSchool) {
      setSchoolData(currentSchool);
    }
  }, [currentSchool]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchoolData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setSchoolData(prev => ({ ...prev, [name]: value }));
  };

  // Handle save
  const handleSave = () => {
    setIsLoading(true);
    
    // Update school data in context
    updateSchool(schoolData.id, schoolData);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Changes saved",
        description: "Your school information has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-purple-300">School Dashboard</h1>
          <p className="text-gray-400">Manage your school's information</p>
        </div>
        <Button 
          onClick={handleSave} 
          className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700"
          disabled={isLoading}
        >
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Information Card */}
        <Card className="md:col-span-2 bg-theme-500 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-300">
              <SchoolIcon className="mr-2 h-5 w-5" /> Basic Information
            </CardTitle>
            <CardDescription className="text-gray-400">Update your school's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">School Name</Label>
              <Input 
                id="name" 
                name="name"
                value={schoolData.name}
                onChange={handleChange}
                className="bg-theme-400 border-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-gray-300">School Type</Label>
                <Select 
                  value={schoolData.type} 
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger className="bg-theme-400 border-gray-700">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Unaided/Independent">Private Unaided</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="NGO Supported">NGO Supported</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="board" className="text-gray-300">Board</Label>
                <Select 
                  value={schoolData.board} 
                  onValueChange={(value) => handleSelectChange('board', value)}
                >
                  <SelectTrigger className="bg-theme-400 border-gray-700">
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="State Board">State Board</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">School Description</Label>
              <Textarea 
                id="description" 
                name="description"
                value={schoolData.description || ""}
                onChange={handleChange}
                rows={4}
                className="bg-theme-400 border-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">Location</Label>
                <div className="flex">
                  <Input 
                    id="location" 
                    name="location"
                    value={schoolData.location}
                    onChange={handleChange}
                    className="bg-theme-400 border-gray-700"
                  />
                  <Button variant="ghost" className="ml-2 text-purple-300">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating" className="text-gray-300">Rating (A to AAAAA)</Label>
                <Select 
                  value={schoolData.rating} 
                  onValueChange={(value) => handleSelectChange('rating', value)}
                >
                  <SelectTrigger className="bg-theme-400 border-gray-700">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AAAAA">AAAAA (5 star)</SelectItem>
                    <SelectItem value="AAAA">AAAA (4 star)</SelectItem>
                    <SelectItem value="AAA">AAA (3 star)</SelectItem>
                    <SelectItem value="AA">AA (2 star)</SelectItem>
                    <SelectItem value="A">A (1 star)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fees" className="text-gray-300">Fee Structure</Label>
                <Input 
                  id="fees" 
                  name="fees"
                  value={schoolData.fees}
                  onChange={handleChange}
                  placeholder="e.g. ₹5,000 - ₹8,000/month"
                  className="bg-theme-400 border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="residential" className="text-gray-300">Residential Type</Label>
                <Select 
                  value={schoolData.residential} 
                  onValueChange={(value) => handleSelectChange('residential', value)}
                >
                  <SelectTrigger className="bg-theme-400 border-gray-700">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day School">Day School</SelectItem>
                    <SelectItem value="Boarding School">Boarding School</SelectItem>
                    <SelectItem value="Day-cum-Boarding School">Day-cum-Boarding</SelectItem>
                    <SelectItem value="Not Specified">Not Specified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-300">Gender</Label>
                <Select 
                  value={schoolData.gender} 
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger className="bg-theme-400 border-gray-700">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Co-ed">Co-educational</SelectItem>
                    <SelectItem value="Boys">Boys Only</SelectItem>
                    <SelectItem value="Girls">Girls Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Upload Card */}
        <Card className="bg-theme-500 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-300">
              <Image className="mr-2 h-5 w-5" /> School Logo & Images
            </CardTitle>
            <CardDescription className="text-gray-400">Upload your school logo and photos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-700">
                <img 
                  src={schoolData.imageUrl || "/placeholder.svg"} 
                  alt="School Logo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="ghost" className="text-white p-1">
                    <Upload className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">School Photos</Label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-theme-400">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-400">Drag and drop photos here, or click to browse</p>
                <Button variant="outline" className="mt-4 bg-theme-500 border-gray-600 text-purple-300">
                  Upload Photos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="md:col-span-3 bg-theme-500 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-300">
              <FileText className="mr-2 h-5 w-5" /> Contact Information
            </CardTitle>
            <CardDescription className="text-gray-400">Update your contact details for parents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    value={schoolData.email || ""}
                    onChange={handleChange}
                    className="bg-theme-400 border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={schoolData.phone || ""}
                    onChange={handleChange}
                    className="bg-theme-400 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-300">Website</Label>
                  <Input 
                    id="website" 
                    name="website"
                    value={schoolData.website || ""}
                    onChange={handleChange}
                    className="bg-theme-400 border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-300">Full Address</Label>
                  <Textarea 
                    id="address" 
                    name="address"
                    value={schoolData.address || ""}
                    onChange={handleChange}
                    className="bg-theme-400 border-gray-700"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Database Status Card */}
        <Card className="md:col-span-3 bg-theme-500 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-300">
              <Database className="mr-2 h-5 w-5" /> Data History
            </CardTitle>
            <CardDescription className="text-gray-400">Recent updates to your school information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-theme-400 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-200">Basic information updated</p>
                    <p className="text-sm text-gray-400">Updated school type, fees and description</p>
                  </div>
                  <span className="text-xs text-gray-400">Today, 10:23 AM</span>
                </div>
              </div>
              
              <div className="bg-theme-400 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-200">Logo uploaded</p>
                    <p className="text-sm text-gray-400">New school logo uploaded</p>
                  </div>
                  <span className="text-xs text-gray-400">Yesterday, 4:12 PM</span>
                </div>
              </div>
              
              <div className="bg-theme-400 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-200">School registered</p>
                    <p className="text-sm text-gray-400">Initial school profile created</p>
                  </div>
                  <span className="text-xs text-gray-400">May 10, 2025</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolDashboard;
