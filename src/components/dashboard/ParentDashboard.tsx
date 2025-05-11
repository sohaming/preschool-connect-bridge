
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, User, Search } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SchoolCard, { School } from '../schools/SchoolCard';
import SchoolsFilter from '../schools/SchoolsFilter';

const mockMessages = [
  {
    id: 1,
    sender: "Ms. Thompson",
    content: "Max had a great day today! He participated well in our reading activity.",
    time: "2 hours ago"
  },
  {
    id: 2,
    sender: "Admin",
    content: "Reminder: We have a field trip scheduled for next Friday.",
    time: "Yesterday"
  }
];

const mockEvents = [
  {
    id: 1,
    title: "Parent-Teacher Conference",
    date: "May 15, 2025",
    time: "3:00 PM"
  },
  {
    id: 2,
    title: "End of Year Celebration",
    date: "May 30, 2025",
    time: "1:00 PM"
  }
];

const mockSchools: School[] = [
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
    residential: "",
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
    name: "Little Flowers Public School",
    type: "Private Unaided/Independent",
    location: "Mumbai, Maharashtra",
    board: "Primary School | State Board",
    rating: "AAA",
    fees: "₹5,000 - ₹8,000/month",
    residential: "",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Delhi Public School",
    type: "Private Unaided/Independent",
    location: "Bangalore, Karnataka",
    board: "Sr. Secondary/Higher Secondary School | CBSE",
    rating: "AAAAA",
    fees: "₹18,000 - ₹25,000/month",
    residential: "Day School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 6,
    name: "The Heritage School",
    type: "Private Unaided/Independent",
    location: "Kolkata, West Bengal",
    board: "Sr. Secondary/Higher Secondary School | CBSE",
    rating: "AAAA",
    fees: "₹20,000 - ₹30,000/month",
    residential: "Day School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Mount Carmel School",
    type: "Private Unaided/Independent",
    location: "Chennai, Tamil Nadu",
    board: "Sr. Secondary/Higher Secondary School | State Board",
    rating: "AAAA",
    fees: "₹12,000 - ₹18,000/month",
    residential: "",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 8,
    name: "Springdales School",
    type: "Private Unaided/Independent",
    location: "Pune, Maharashtra",
    board: "Sr. Secondary/Higher Secondary School | CBSE",
    rating: "AAAAA",
    fees: "₹22,000 - ₹28,000/month",
    residential: "Day School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 9,
    name: "Kendriya Vidyalaya",
    type: "Government",
    location: "Hyderabad, Telangana",
    board: "Sr. Secondary/Higher Secondary School | CBSE",
    rating: "AAAA",
    fees: "₹2,000 - ₹4,000/month",
    residential: "",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 10,
    name: "The Shri Ram School",
    type: "Private Unaided/Independent",
    location: "Gurgaon, Haryana",
    board: "Sr. Secondary/Higher Secondary School | CBSE",
    rating: "AAAAA",
    fees: "₹25,000 - ₹35,000/month",
    residential: "Day School",
    gender: "Co-ed",
    imageUrl: "/placeholder.svg"
  }
];

const mockActivities = [
  {
    id: 1,
    time: "9:30 AM",
    activity: "Morning Circle",
    details: "Discussed animals and their habitats"
  },
  {
    id: 2,
    time: "10:45 AM",
    activity: "Art Time",
    details: "Painted with watercolors"
  },
  {
    id: 3,
    time: "12:00 PM",
    activity: "Lunch",
    details: "Ate well, finished most of lunch"
  }
];

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schools'>('dashboard');
  const [filteredSchools, setFilteredSchools] = useState<School[]>(mockSchools);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sortBy: 'overallRating',
    fees: '',
    location: '',
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: any) => {
    let filtered = [...mockSchools];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply fees filter
    if (currentFilters.fees) {
      switch (currentFilters.fees) {
        case 'under5000':
          filtered = filtered.filter(school => school.fees.includes('5,000') && !school.fees.includes('15,000'));
          break;
        case '5000to10000':
          filtered = filtered.filter(school => 
            (school.fees.includes('5,000') || school.fees.includes('8,000')) && 
            (school.fees.includes('10,000') || school.fees.includes('12,000')));
          break;
        case '10000to20000':
          filtered = filtered.filter(school => 
            (school.fees.includes('10,000') || school.fees.includes('15,000') || school.fees.includes('18,000')) && 
            (school.fees.includes('15,000') || school.fees.includes('20,000')));
          break;
        case 'above20000':
          filtered = filtered.filter(school => 
            school.fees.includes('20,000') || school.fees.includes('25,000') || school.fees.includes('30,000') || 
            school.fees.includes('35,000'));
          break;
      }
    }
    
    // Apply location filter
    if (currentFilters.location) {
      filtered = filtered.filter(school => 
        school.location.toLowerCase().includes(currentFilters.location.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (currentFilters.sortBy) {
      case 'overallRating':
        filtered.sort((a, b) => b.rating.length - a.rating.length);
        break;
      case 'residentialRating':
        filtered.sort((a, b) => (b.residential ? 1 : 0) - (a.residential ? 1 : 0));
        break;
      case 'feesLowToHigh':
        filtered.sort((a, b) => {
          const aValue = parseInt(a.fees.match(/\d+/g)?.[0] || '0');
          const bValue = parseInt(b.fees.match(/\d+/g)?.[0] || '0');
          return aValue - bValue;
        });
        break;
      case 'feesHighToLow':
        filtered.sort((a, b) => {
          const aValue = parseInt(a.fees.match(/\d+/g)?.[0] || '0');
          const bValue = parseInt(b.fees.match(/\d+/g)?.[0] || '0');
          return bValue - aValue;
        });
        break;
      case 'nameAToZ':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZToA':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    setFilteredSchools(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(filters);
  };

  useEffect(() => {
    // Initial filter application
    applyFilters(filters);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Welcome, Jessica!</h1>
          <p className="text-gray-600">Here's what's happening with Max today</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant={activeTab === 'dashboard' ? 'default' : 'outline'}
            className={activeTab === 'dashboard' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <User className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button 
            variant={activeTab === 'schools' ? 'default' : 'outline'}
            className={activeTab === 'schools' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            onClick={() => setActiveTab('schools')}
          >
            <Search className="mr-2 h-4 w-4" /> Find Schools
          </Button>
        </div>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Child Activity Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <User className="mr-2 h-5 w-5" /> Today's Activities
              </CardTitle>
              <CardDescription>Max's day at Little Explorers Preschool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map(activity => (
                  <div key={activity.id} className="flex items-start border-l-4 border-blue-500 pl-4 pb-4">
                    <div>
                      <p className="font-semibold">{activity.time} - {activity.activity}</p>
                      <p className="text-gray-600">{activity.details}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <Button variant="outline" className="text-blue-700 border-blue-500">
                    View Full Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <MessageSquare className="mr-2 h-5 w-5" /> Messages
              </CardTitle>
              <CardDescription>Recent communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMessages.map(message => (
                  <div key={message.id} className="pb-3 border-b last:border-b-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold">{message.sender}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{message.content}</p>
                  </div>
                ))}
                <Button variant="link" className="text-blue-700 p-0">
                  See all messages
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Calendar className="mr-2 h-5 w-5" /> Upcoming Events
              </CardTitle>
              <CardDescription>Stay updated with school activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockEvents.map(event => (
                  <div key={event.id} className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-700">{event.title}</p>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>{event.date} at {event.time}</p>
                    </div>
                    <Button variant="link" className="text-blue-700 p-0 mt-2">
                      Add to calendar
                    </Button>
                  </div>
                ))}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-dashed border-green-300 flex items-center justify-center">
                  <Button variant="link" className="text-green-700">
                    View All Events
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Search by school name" 
                className="pr-10 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1 top-1 h-8 px-3 bg-blue-500"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <SchoolsFilter onFilterChange={handleFilterChange} />
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-blue-50 p-3 mb-4 rounded-md">
                <p className="font-medium">Showing {filteredSchools.length} Schools</p>
              </div>
              
              <div className="space-y-4">
                {filteredSchools.map(school => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
