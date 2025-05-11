
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, User } from "lucide-react";
import { Button } from '@/components/ui/button';

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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Welcome, Jessica!</h1>
          <p className="text-gray-600">Here's what's happening with Max today</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <MessageSquare className="mr-2 h-4 w-4" /> Message Teacher
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default ParentDashboard;
