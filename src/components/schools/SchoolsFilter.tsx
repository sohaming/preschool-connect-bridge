
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const SchoolsFilter = ({ onFilterChange }: FilterProps) => {
  const [sortBy, setSortBy] = useState('overallRating');
  const [fees, setFees] = useState('');
  const [location, setLocation] = useState('');
  const [ranking, setRanking] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [boardType, setBoardType] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [gender, setGender] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isSchoolTypeOpen, setIsSchoolTypeOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const handleReset = () => {
    setSortBy('overallRating');
    setFees('');
    setLocation('');
    setRanking('');
    setClassGrade('');
    setBoardType('');
    setSchoolType('');
    setGender('');
    onFilterChange({
      sortBy: 'overallRating',
      fees: '',
      location: '',
      ranking: '',
      classGrade: '',
      boardType: '',
      schoolType: '',
      gender: '',
    });
  };

  const handleApplyFilters = () => {
    onFilterChange({
      sortBy,
      fees,
      location,
      ranking,
      classGrade,
      boardType,
      schoolType,
      gender,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg flex items-center">
          <Filter className="mr-2 h-5 w-5" /> Filters By
        </CardTitle>
        <Button variant="ghost" onClick={handleReset} className="h-8 text-blue-600">
          Reset
        </Button>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="space-y-6">
          {/* Sort By */}
          <div>
            <h3 className="font-semibold mb-3">SORT BY</h3>
            <RadioGroup value={sortBy} onValueChange={setSortBy} className="space-y-3">
              <div className="flex items-center">
                <RadioGroupItem value="overallRating" id="overallRating" />
                <Label htmlFor="overallRating" className="ml-2">Overall Schools Rating</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="residentialRating" id="residentialRating" />
                <Label htmlFor="residentialRating" className="ml-2">Residential Schools Rating</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="feesLowToHigh" id="feesLowToHigh" />
                <Label htmlFor="feesLowToHigh" className="ml-2">Fees-Low To High</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="feesHighToLow" id="feesHighToLow" />
                <Label htmlFor="feesHighToLow" className="ml-2">Fees-High To Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="nameAToZ" id="nameAToZ" />
                <Label htmlFor="nameAToZ" className="ml-2">School Name - A To Z</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="nameZToA" id="nameZToA" />
                <Label htmlFor="nameZToA" className="ml-2">School Name - Z To A</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Fees */}
          <div>
            <h3 className="font-semibold mb-3">FEES</h3>
            <Select value={fees} onValueChange={setFees}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select fee range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under5000">Under ₹5,000/month</SelectItem>
                <SelectItem value="5000to10000">₹5,000 - ₹10,000/month</SelectItem>
                <SelectItem value="10000to20000">₹10,000 - ₹20,000/month</SelectItem>
                <SelectItem value="above20000">Above ₹20,000/month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-3">LOCATION</h3>
            <div className="bg-orange-50 border border-orange-200 hover:bg-orange-100 rounded-md p-3 mb-3 cursor-pointer">
              <div className="flex items-center justify-center text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                Schools Near Me
              </div>
            </div>

            <Collapsible open={isLocationOpen} onOpenChange={setIsLocationOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">STATE</h3>
                  {isLocationOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-2">
                  <Input 
                    placeholder="Search state or city" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mb-2"
                  />
                  <div className="max-h-48 overflow-y-auto space-y-2 mt-2">
                    <div className="flex items-center">
                      <Checkbox id="delhi" className="mr-2" onCheckedChange={() => setLocation('Delhi')} />
                      <Label htmlFor="delhi">Delhi (1245)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="mumbai" className="mr-2" onCheckedChange={() => setLocation('Mumbai')} />
                      <Label htmlFor="mumbai">Mumbai (987)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="bangalore" className="mr-2" onCheckedChange={() => setLocation('Bangalore')} />
                      <Label htmlFor="bangalore">Bangalore (854)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="hyderabad" className="mr-2" onCheckedChange={() => setLocation('Hyderabad')} />
                      <Label htmlFor="hyderabad">Hyderabad (621)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="chennai" className="mr-2" onCheckedChange={() => setLocation('Chennai')} />
                      <Label htmlFor="chennai">Chennai (532)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="kolkata" className="mr-2" onCheckedChange={() => setLocation('Kolkata')} />
                      <Label htmlFor="kolkata">Kolkata (487)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="pune" className="mr-2" onCheckedChange={() => setLocation('Pune')} />
                      <Label htmlFor="pune">Pune (412)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="chandigarh" className="mr-2" onCheckedChange={() => setLocation('Chandigarh')} />
                      <Label htmlFor="chandigarh">Chandigarh (278)</Label>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Class/Grade */}
          <div>
            <h3 className="font-semibold mb-3">CLASS</h3>
            <Select value={classGrade} onValueChange={setClassGrade}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="playgroup">Playgroup</SelectItem>
                <SelectItem value="nursery">Nursery</SelectItem>
                <SelectItem value="lkg">LKG</SelectItem>
                <SelectItem value="ukg">UKG</SelectItem>
                <SelectItem value="class1">Class 1</SelectItem>
                <SelectItem value="class2">Class 2</SelectItem>
                <SelectItem value="class3">Class 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ranking */}
          <div>
            <h3 className="font-semibold mb-3">RANKING</h3>
            <Select value={ranking} onValueChange={setRanking}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select ranking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5star">5 Star</SelectItem>
                <SelectItem value="4star">4 Star & Above</SelectItem>
                <SelectItem value="3star">3 Star & Above</SelectItem>
                <SelectItem value="2star">2 Star & Above</SelectItem>
                <SelectItem value="1star">1 Star & Above</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Board Type */}
          <div>
            <Collapsible open={isBoardOpen} onOpenChange={setIsBoardOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">BOARD TYPE</h3>
                  {isBoardOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="cbse" className="mr-2" onCheckedChange={() => setBoardType('cbse')} />
                    <Label htmlFor="cbse">CBSE Board (825)</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="icse" className="mr-2" onCheckedChange={() => setBoardType('icse')} />
                    <Label htmlFor="icse">ICSE Board (354)</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="state" className="mr-2" onCheckedChange={() => setBoardType('state')} />
                    <Label htmlFor="state">State Board (612)</Label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* School Type */}
          <div>
            <Collapsible open={isSchoolTypeOpen} onOpenChange={setIsSchoolTypeOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">SCHOOL TYPE</h3>
                  {isSchoolTypeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="private" className="mr-2" onCheckedChange={() => setSchoolType('private')} />
                    <Label htmlFor="private">Private Schools (1245)</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="government" className="mr-2" onCheckedChange={() => setSchoolType('government')} />
                    <Label htmlFor="government">Government Schools (432)</Label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* Gender */}
          <div>
            <Collapsible open={isGenderOpen} onOpenChange={setIsGenderOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <h3 className="font-semibold">GENDER</h3>
                  {isGenderOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="coed" className="mr-2" onCheckedChange={() => setGender('coed')} />
                    <Label htmlFor="coed">Co-Education (1587)</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="boys" className="mr-2" onCheckedChange={() => setGender('boys')} />
                    <Label htmlFor="boys">Boys Only (245)</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="girls" className="mr-2" onCheckedChange={() => setGender('girls')} />
                    <Label htmlFor="girls">Girls Only (312)</Label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolsFilter;
