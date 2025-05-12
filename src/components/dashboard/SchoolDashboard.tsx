
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useSchools } from '@/context/SchoolsContext';
import { School as SchoolInterface, SchoolFaculty, SchoolFacility, SchoolAchievement } from '@/components/schools/SchoolCard';
import { 
  School as SchoolIcon, 
  Upload, 
  MapPin, 
  Save, 
  Image, 
  FileText, 
  Database,
  Users,
  Building,
  Award,
  Plus,
  Trash2 
} from "lucide-react";

const SchoolDashboard = () => {
  const { schools, updateSchool } = useSchools();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  
  // Find school with ID 101 (Sunshine Academy) or use the first one
  const currentSchool = schools.find(s => s.id === 101) || schools[0];
  const [schoolData, setSchoolData] = useState<SchoolInterface>({
    ...currentSchool,
    faculty: currentSchool.faculty || [],
    facilities: currentSchool.facilities || [],
    achievements: currentSchool.achievements || [],
    gallery: currentSchool.gallery || []
  });
  
  // New faculty member state
  const [newFaculty, setNewFaculty] = useState<Omit<SchoolFaculty, 'id'>>({
    name: '',
    position: '',
    image: '',
    qualification: '',
    experience: ''
  });
  
  // New facility state
  const [newFacility, setNewFacility] = useState<Omit<SchoolFacility, 'id'>>({
    name: '',
    description: '',
    image: ''
  });
  
  // New achievement state
  const [newAchievement, setNewAchievement] = useState<Omit<SchoolAchievement, 'id'>>({
    title: '',
    description: '',
    year: new Date().getFullYear().toString(),
    image: ''
  });

  // File upload simulation states
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingFacultyImage, setUploadingFacultyImage] = useState(false);
  const [uploadingFacilityImage, setUploadingFacilityImage] = useState(false);
  const [uploadingAchievementImage, setUploadingAchievementImage] = useState(false);
  
  useEffect(() => {
    if (currentSchool) {
      setSchoolData({
        ...currentSchool,
        faculty: currentSchool.faculty || [],
        facilities: currentSchool.facilities || [],
        achievements: currentSchool.achievements || [],
        gallery: currentSchool.gallery || []
      });
    }
  }, [currentSchool]);

  // Handle input changes for basic info
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchoolData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setSchoolData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simulate file upload (in a real app, this would upload to a server)
  const simulateFileUpload = (type: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a random placeholder image URL
        const imageId = Math.floor(Math.random() * 1000);
        resolve(`https://picsum.photos/id/${imageId}/300/200`);
      }, 1500);
    });
  };
  
  // Handle logo upload
  const handleLogoUpload = async () => {
    setUploadingLogo(true);
    try {
      const imageUrl = await simulateFileUpload('logo');
      setSchoolData(prev => ({
        ...prev,
        imageUrl
      }));
      toast({
        title: "Logo uploaded",
        description: "School logo has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your logo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingLogo(false);
    }
  };
  
  // Handle gallery image upload
  const handleGalleryUpload = async () => {
    setUploadingGallery(true);
    try {
      const imageUrl = await simulateFileUpload('gallery');
      setSchoolData(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), imageUrl]
      }));
      toast({
        title: "Image uploaded",
        description: "Gallery image has been added successfully."
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingGallery(false);
    }
  };
  
  // Remove a gallery image
  const handleRemoveGalleryImage = (index: number) => {
    setSchoolData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index)
    }));
    toast({
      title: "Image removed",
      description: "Gallery image has been removed successfully."
    });
  };
  
  // Faculty management
  const handleFacultyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFaculty(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFacultyImageUpload = async () => {
    setUploadingFacultyImage(true);
    try {
      const imageUrl = await simulateFileUpload('faculty');
      setNewFaculty(prev => ({
        ...prev,
        image: imageUrl
      }));
      toast({
        title: "Image uploaded",
        description: "Faculty image has been uploaded successfully."
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading the faculty image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingFacultyImage(false);
    }
  };
  
  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.position) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and position for the faculty member.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = schoolData.faculty && schoolData.faculty.length > 0 
      ? Math.max(...schoolData.faculty.map(f => f.id)) + 1 
      : 1;
      
    const facultyMember: SchoolFaculty = {
      id: newId,
      ...newFaculty
    };
    
    setSchoolData(prev => ({
      ...prev,
      faculty: [...(prev.faculty || []), facultyMember]
    }));
    
    // Reset form
    setNewFaculty({
      name: '',
      position: '',
      image: '',
      qualification: '',
      experience: ''
    });
    
    toast({
      title: "Faculty added",
      description: "New faculty member has been added successfully."
    });
  };
  
  const handleRemoveFaculty = (id: number) => {
    setSchoolData(prev => ({
      ...prev,
      faculty: prev.faculty?.filter(f => f.id !== id) || []
    }));
    
    toast({
      title: "Faculty removed",
      description: "Faculty member has been removed successfully."
    });
  };
  
  // Facility management
  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFacility(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFacilityImageUpload = async () => {
    setUploadingFacilityImage(true);
    try {
      const imageUrl = await simulateFileUpload('facility');
      setNewFacility(prev => ({
        ...prev,
        image: imageUrl
      }));
      toast({
        title: "Image uploaded",
        description: "Facility image has been uploaded successfully."
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading the facility image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingFacilityImage(false);
    }
  };
  
  const handleAddFacility = () => {
    if (!newFacility.name) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name for the facility.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = schoolData.facilities && schoolData.facilities.length > 0 
      ? Math.max(...schoolData.facilities.map(f => f.id)) + 1 
      : 1;
      
    const facility: SchoolFacility = {
      id: newId,
      ...newFacility
    };
    
    setSchoolData(prev => ({
      ...prev,
      facilities: [...(prev.facilities || []), facility]
    }));
    
    // Reset form
    setNewFacility({
      name: '',
      description: '',
      image: ''
    });
    
    toast({
      title: "Facility added",
      description: "New facility has been added successfully."
    });
  };
  
  const handleRemoveFacility = (id: number) => {
    setSchoolData(prev => ({
      ...prev,
      facilities: prev.facilities?.filter(f => f.id !== id) || []
    }));
    
    toast({
      title: "Facility removed",
      description: "Facility has been removed successfully."
    });
  };
  
  // Achievement management
  const handleAchievementChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAchievement(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAchievementImageUpload = async () => {
    setUploadingAchievementImage(true);
    try {
      const imageUrl = await simulateFileUpload('achievement');
      setNewAchievement(prev => ({
        ...prev,
        image: imageUrl
      }));
      toast({
        title: "Image uploaded",
        description: "Achievement image has been uploaded successfully."
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading the achievement image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingAchievementImage(false);
    }
  };
  
  const handleAddAchievement = () => {
    if (!newAchievement.title) {
      toast({
        title: "Missing information",
        description: "Please provide at least a title for the achievement.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = schoolData.achievements && schoolData.achievements.length > 0 
      ? Math.max(...schoolData.achievements.map(a => a.id)) + 1 
      : 1;
      
    const achievement: SchoolAchievement = {
      id: newId,
      ...newAchievement
    };
    
    setSchoolData(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), achievement]
    }));
    
    // Reset form
    setNewAchievement({
      title: '',
      description: '',
      year: new Date().getFullYear().toString(),
      image: ''
    });
    
    toast({
      title: "Achievement added",
      description: "New achievement has been added successfully."
    });
  };
  
  const handleRemoveAchievement = (id: number) => {
    setSchoolData(prev => ({
      ...prev,
      achievements: prev.achievements?.filter(a => a.id !== id) || []
    }));
    
    toast({
      title: "Achievement removed",
      description: "Achievement has been removed successfully."
    });
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
        description: "Your school information has been updated successfully."
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
        <Button onClick={handleSave} className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          <TabsTrigger value="basic" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <SchoolIcon className="mr-2 h-4 w-4" /> Basic Info
          </TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Image className="mr-2 h-4 w-4" /> Gallery
          </TabsTrigger>
          <TabsTrigger value="faculty" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" /> Faculty
          </TabsTrigger>
          <TabsTrigger value="facilities" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Building className="mr-2 h-4 w-4" /> Facilities
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Award className="mr-2 h-4 w-4" /> Achievements
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <FileText className="mr-2 h-4 w-4" /> Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="bg-theme-500 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-300">
                <SchoolIcon className="mr-2 h-5 w-5" /> Basic Information
              </CardTitle>
              <CardDescription className="text-gray-400">Update your school's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-700">
                  <img src={schoolData.imageUrl || "/placeholder.svg"} alt="School Logo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="ghost" className="text-white p-1" onClick={handleLogoUpload} disabled={uploadingLogo}>
                      {uploadingLogo ? "Uploading..." : <Upload className="h-6 w-6" />}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">School Name</Label>
                <Input id="name" name="name" value={schoolData.name} onChange={handleChange} className="bg-theme-400 border-gray-700 bg-zinc-950" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-gray-300">School Type</Label>
                  <Select value={schoolData.type} onValueChange={value => handleSelectChange('type', value)}>
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
                  <Select value={schoolData.board} onValueChange={value => handleSelectChange('board', value)}>
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
                <Textarea id="description" name="description" value={schoolData.description || ""} onChange={handleChange} rows={4} className="bg-theme-400 border-gray-700 bg-neutral-700" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-300">Location</Label>
                  <div className="flex">
                    <Input id="location" name="location" value={schoolData.location} onChange={handleChange} className="bg-theme-400 border-gray-700 bg-zinc-600" />
                    <Button variant="ghost" className="ml-2 text-purple-300">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-gray-300">Rating (A to AAAAA)</Label>
                  <Select value={schoolData.rating} onValueChange={value => handleSelectChange('rating', value)}>
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
                  <Input id="fees" name="fees" value={schoolData.fees} onChange={handleChange} placeholder="e.g. ₹5,000 - ₹8,000/month" className="bg-theme-400 border-gray-700 bg-zinc-600" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="residential" className="text-gray-300">Residential Type</Label>
                  <Select value={schoolData.residential} onValueChange={value => handleSelectChange('residential', value)}>
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
                  <Select value={schoolData.gender} onValueChange={value => handleSelectChange('gender', value)}>
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
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card className="bg-theme-500 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-300">
                <Image className="mr-2 h-5 w-5" /> School Gallery
              </CardTitle>
              <CardDescription className="text-gray-400">Upload photos of your school campus, activities, and facilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-theme-400">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-400">Drag and drop photos here, or click to browse</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-theme-500 border-gray-600 text-purple-300"
                  onClick={handleGalleryUpload}
                  disabled={uploadingGallery}
                >
                  {uploadingGallery ? "Uploading..." : "Upload Photo"}
                </Button>
              </div>

              {schoolData.gallery && schoolData.gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {schoolData.gallery.map((imageUrl, index) => (
                    <div key={index} className="relative group rounded-md overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={`Gallery image ${index + 1}`} 
                        className="w-full aspect-video object-cover" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No gallery images uploaded yet. Add some photos to showcase your school!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-6">
          <Card className="bg-theme-500 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-300">
                <Users className="mr-2 h-5 w-5" /> Faculty Members
              </CardTitle>
              <CardDescription className="text-gray-400">Manage your school's teaching and administrative staff</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 bg-theme-400 p-4 rounded-md">
                <h3 className="font-semibold text-purple-300">Add New Faculty Member</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty-name" className="text-gray-300">Name</Label>
                    <Input 
                      id="faculty-name" 
                      name="name" 
                      value={newFaculty.name} 
                      onChange={handleFacultyChange} 
                      placeholder="Teacher's full name"
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faculty-position" className="text-gray-300">Position</Label>
                    <Input 
                      id="faculty-position" 
                      name="position" 
                      value={newFaculty.position} 
                      onChange={handleFacultyChange} 
                      placeholder="e.g., Science Teacher, Principal"
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faculty-qualification" className="text-gray-300">Qualification</Label>
                    <Input 
                      id="faculty-qualification" 
                      name="qualification" 
                      value={newFaculty.qualification} 
                      onChange={handleFacultyChange} 
                      placeholder="e.g., M.Sc., B.Ed."
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faculty-experience" className="text-gray-300">Experience</Label>
                    <Input 
                      id="faculty-experience" 
                      name="experience" 
                      value={newFaculty.experience} 
                      onChange={handleFacultyChange} 
                      placeholder="e.g., 5 years"
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-20 h-20 bg-theme-500 rounded-md overflow-hidden flex items-center justify-center border border-gray-700">
                    {newFaculty.image ? (
                      <img src={newFaculty.image} alt="Faculty" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="bg-theme-500 border-gray-600 text-purple-300"
                    onClick={handleFacultyImageUpload}
                    disabled={uploadingFacultyImage}
                  >
                    {uploadingFacultyImage ? "Uploading..." : "Upload Photo"}
                  </Button>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleAddFaculty}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Faculty
                  </Button>
                </div>
              </div>
              
              {schoolData.faculty && schoolData.faculty.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schoolData.faculty.map(faculty => (
                    <div key={faculty.id} className="bg-theme-400 p-4 rounded-md relative group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleRemoveFaculty(faculty.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-theme-500 flex items-center justify-center">
                          {faculty.image ? (
                            <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-purple-200">{faculty.name}</h4>
                          <p className="text-sm text-gray-400">{faculty.position}</p>
                        </div>
                      </div>
                      
                      {(faculty.qualification || faculty.experience) && (
                        <div className="mt-3 pl-15 text-sm text-gray-400">
                          {faculty.qualification && <p>{faculty.qualification}</p>}
                          {faculty.experience && <p>Experience: {faculty.experience}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No faculty members added yet. Start building your faculty list above!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-6">
          <Card className="bg-theme-500 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-300">
                <Building className="mr-2 h-5 w-5" /> School Facilities
              </CardTitle>
              <CardDescription className="text-gray-400">Manage information about your school's facilities and infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 bg-theme-400 p-4 rounded-md">
                <h3 className="font-semibold text-purple-300">Add New Facility</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="facility-name" className="text-gray-300">Facility Name</Label>
                    <Input 
                      id="facility-name" 
                      name="name" 
                      value={newFacility.name} 
                      onChange={handleFacilityChange} 
                      placeholder="e.g., Science Laboratory, Sports Ground"
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facility-description" className="text-gray-300">Description</Label>
                    <Textarea 
                      id="facility-description" 
                      name="description" 
                      value={newFacility.description} 
                      onChange={handleFacilityChange} 
                      placeholder="Describe the facility and its features"
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-32 h-24 bg-theme-500 rounded-md overflow-hidden flex items-center justify-center border border-gray-700">
                    {newFacility.image ? (
                      <img src={newFacility.image} alt="Facility" className="w-full h-full object-cover" />
                    ) : (
                      <Building className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="bg-theme-500 border-gray-600 text-purple-300"
                    onClick={handleFacilityImageUpload}
                    disabled={uploadingFacilityImage}
                  >
                    {uploadingFacilityImage ? "Uploading..." : "Upload Photo"}
                  </Button>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleAddFacility}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Facility
                  </Button>
                </div>
              </div>
              
              {schoolData.facilities && schoolData.facilities.length > 0 ? (
                <div className="space-y-4">
                  {schoolData.facilities.map(facility => (
                    <div key={facility.id} className="bg-theme-400 p-4 rounded-md flex flex-col md:flex-row gap-4 relative group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleRemoveFacility(facility.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {facility.image && (
                        <div className="w-full md:w-1/4">
                          <div className="aspect-video rounded-md overflow-hidden">
                            <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}
                      
                      <div className={facility.image ? "w-full md:w-3/4" : "w-full"}>
                        <h4 className="text-lg font-semibold text-purple-200">{facility.name}</h4>
                        {facility.description && <p className="mt-2 text-gray-400">{facility.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No facilities added yet. Start highlighting your school's infrastructure above!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="bg-theme-500 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-300">
                <Award className="mr-2 h-5 w-5" /> School Achievements
              </CardTitle>
              <CardDescription className="text-gray-400">Showcase your school's awards, recognitions and accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 bg-theme-400 p-4 rounded-md">
                <h3 className="font-semibold text-purple-300">Add New Achievement</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="achievement-title" className="text-gray-300">Achievement Title</Label>
                    <Input 
                      id="achievement-title" 
                      name="title" 
                      value={newAchievement.title} 
                      onChange={handleAchievementChange} 
                      placeholder="e.g., First Prize in Science Exhibition"
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="achievement-year" className="text-gray-300">Year</Label>
                    <Input 
                      id="achievement-year" 
                      name="year" 
                      value={newAchievement.year} 
                      onChange={handleAchievementChange}
                      type="number" 
                      className="bg-theme-500 border-gray-700" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="achievement-description" className="text-gray-300">Description</Label>
                  <Textarea 
                    id="achievement-description" 
                    name="description" 
                    value={newAchievement.description} 
                    onChange={handleAchievementChange}
                    placeholder="Describe the achievement, participants, and importance"
                    className="bg-theme-500 border-gray-700" 
                  />
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-32 h-24 bg-theme-500 rounded-md overflow-hidden flex items-center justify-center border border-gray-700">
                    {newAchievement.image ? (
                      <img src={newAchievement.image} alt="Achievement" className="w-full h-full object-cover" />
                    ) : (
                      <Award className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="bg-theme-500 border-gray-600 text-purple-300"
                    onClick={handleAchievementImageUpload}
                    disabled={uploadingAchievementImage}
                  >
                    {uploadingAchievementImage ? "Uploading..." : "Upload Photo"}
                  </Button>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleAddAchievement}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                </div>
              </div>
              
              {schoolData.achievements && schoolData.achievements.length > 0 ? (
                <div className="space-y-4">
                  {schoolData.achievements.map(achievement => (
                    <div key={achievement.id} className="bg-theme-400 p-4 rounded-md relative group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleRemoveAchievement(achievement.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-purple-200">{achievement.title}</h4>
                        {achievement.year && (
                          <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded">
                            {achievement.year}
                          </span>
                        )}
                      </div>
                      
                      {achievement.description && (
                        <p className="mt-2 text-gray-400">{achievement.description}</p>
                      )}
                      
                      {achievement.image && (
                        <div className="mt-4">
                          <div className="aspect-video w-full max-w-md rounded-md overflow-hidden">
                            <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No achievements added yet. Start showcasing your school's accomplishments above!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card className="bg-theme-500 border-gray-700">
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
                    <Input id="email" name="email" value={schoolData.email || ""} onChange={handleChange} className="bg-theme-400 border-gray-700 bg-zinc-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input id="phone" name="phone" value={schoolData.phone || ""} onChange={handleChange} className="bg-theme-400 border-gray-700 bg-zinc-600" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-300">Website</Label>
                    <Input id="website" name="website" value={schoolData.website || ""} onChange={handleChange} className="bg-theme-400 border-gray-700 bg-zinc-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-300">Full Address</Label>
                    <Textarea id="address" name="address" value={schoolData.address || ""} onChange={handleChange} className="bg-theme-400 border-gray-700 bg-zinc-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="md:col-span-3 bg-theme-500 border-gray-700 mt-6">
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
  );
};

export default SchoolDashboard;
