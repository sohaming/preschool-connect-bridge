
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SchoolCard from '../schools/SchoolCard';
import SchoolsFilter from '../schools/SchoolsFilter';
import LocationFinder from '../schools/LocationFinder';
import { useSchools } from '@/context/SchoolsContext';

const ParentDashboard = () => {
  const { schools, getNearbySchools, userLocation } = useSchools();
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sortBy: 'overallRating',
    fees: '',
    location: '',
    ranking: '',
    classGrade: '',
    boardType: '',
    schoolType: '',
    gender: '',
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters({...filters, ...newFilters});
    applyFilters({...filters, ...newFilters});
  };

  const applyFilters = (currentFilters: any) => {
    // Start with all schools or nearby schools if location is set
    let filtered = userLocation ? getNearbySchools(50) : [...schools];
    
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
    
    // Apply ranking filter
    if (currentFilters.ranking) {
      switch (currentFilters.ranking) {
        case '5star':
          filtered = filtered.filter(school => school.rating === 'AAAAA');
          break;
        case '4star':
          filtered = filtered.filter(school => school.rating.length >= 4);
          break;
        case '3star':
          filtered = filtered.filter(school => school.rating.length >= 3);
          break;
        case '2star':
          filtered = filtered.filter(school => school.rating.length >= 2);
          break;
        case '1star':
          filtered = filtered.filter(school => school.rating.length >= 1);
          break;
      }
    }
    
    // Apply class/grade filter
    if (currentFilters.classGrade) {
      // For now, we're just simulating this filter since we don't have class data
      filtered = filtered;
    }
    
    // Apply board type filter
    if (currentFilters.boardType) {
      switch (currentFilters.boardType) {
        case 'cbse':
          filtered = filtered.filter(school => school.board.includes('CBSE'));
          break;
        case 'icse':
          filtered = filtered.filter(school => school.board.includes('ICSE'));
          break;
        case 'state':
          filtered = filtered.filter(school => school.board.includes('State'));
          break;
      }
    }
    
    // Apply school type filter
    if (currentFilters.schoolType) {
      switch (currentFilters.schoolType) {
        case 'private':
          filtered = filtered.filter(school => school.type.includes('Private'));
          break;
        case 'government':
          filtered = filtered.filter(school => school.type.includes('Government'));
          break;
      }
    }
    
    // Apply gender filter
    if (currentFilters.gender) {
      switch (currentFilters.gender) {
        case 'coed':
          filtered = filtered.filter(school => school.gender === 'Co-ed');
          break;
        case 'boys':
          filtered = filtered.filter(school => school.gender === 'Boys');
          break;
        case 'girls':
          filtered = filtered.filter(school => school.gender === 'Girls');
          break;
      }
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

  // Update filtered schools when schools or location changes
  useEffect(() => {
    applyFilters(filters);
  }, [schools, userLocation]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Find Your Perfect School</h1>
          <p className="text-gray-600">Browse and filter from top schools</p>
        </div>
      </div>

      <div>
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Input 
              type="text" 
              placeholder="Search by school name or location" 
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
            <LocationFinder />
            <SchoolsFilter onFilterChange={handleFilterChange} />
          </div>
          
          <div className="md:col-span-3">
            <Card className="bg-blue-50 p-3 mb-4">
              <CardContent className="p-2">
                <p className="font-medium">
                  {userLocation ? 'Showing schools near your location' : 'Showing all schools'} 
                  ({filteredSchools.length} schools)
                </p>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {filteredSchools.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No schools match your current filters. Try adjusting your criteria.</p>
                </div>
              ) : (
                filteredSchools.map(school => (
                  <SchoolCard key={school.id} school={school} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
