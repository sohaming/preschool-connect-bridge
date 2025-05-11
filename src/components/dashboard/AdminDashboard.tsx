
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, User, Users } from "lucide-react";
import { Button } from '@/components/ui/button';

const mockStudents = [
  { id: 1, name: "Max Johnson", age: "4 years", attendance: "Present" },
  { id: 2, name: "Sophia Lee", age: "3 years", attendance: "Absent" },
  { id: 3, name: "Noah Brown", age: "4 years", attendance: "Present" },
  { id: 4, name: "Emma Wilson", age: "3 years", attendance: "Present" },
  { id: 5, name: "Liam Davis", age: "4 years", attendance: "Late" }
];

const mockMessages = [
  {
    id: 1,
    sender: "Jessica Johnson (Max's mom)",
    content: "Will Max need to bring anything special for the field trip?",
    time: "1 hour ago"
  },
  {
    id: 2,
    sender: "David Lee (Sophia's dad)",
    content: "Sophia will be absent tomorrow due to a doctor's appointment.",
    time: "3 hours ago"
  }
];

const mockActivities = [
  { id: 1, title: "Morning Circle", status: "Completed", notes: "All students participated well" },
  { id: 2, title: "Art Time", status: "Completed", notes: "Painted animals with watercolors" },
  { id: 3, title: "Outdoor Play", status: "Upcoming", notes: "If weather permits" },
  { id: 4, title: "Story Time", status: "Upcoming", notes: "Reading 'The Very Hungry Caterpillar'" }
];

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Welcome, Ms. Thompson!</h1>
          <p className="text-gray-600">Monday, May 11, 2025 | Little Explorers Preschool</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button className="bg-green-500 hover:bg-green-600">
            <Calendar className="mr-2 h-4 w-4" /> Add Activity
          </Button>
          <Button variant="outline" className="border-blue-500 text-blue-700">
            <MessageSquare className="mr-2 h-4 w-4" /> Send Update
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Students Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Users className="mr-2 h-5 w-5" /> Students
            </CardTitle>
            <CardDescription>Today's attendance and quick actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Age</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-right py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map((student) => (
                    <tr key={student.id} className="border-b">
                      <td className="py-3">{student.name}</td>
                      <td>{student.age}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.attendance === "Present" ? "bg-green-100 text-green-700" :
                          student.attendance === "Absent" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {student.attendance}
                        </span>
                      </td>
                      <td className="text-right">
                        <Button variant="ghost" size="sm" className="text-blue-700">
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="text-blue-700 border-blue-500">
                View All Students
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <MessageSquare className="mr-2 h-5 w-5" /> Parent Messages
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
                  <Button variant="link" className="text-blue-700 p-0 mt-1 h-auto">
                    Reply
                  </Button>
                </div>
              ))}
              <Button variant="link" className="text-blue-700 p-0">
                See all messages
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Activities */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Calendar className="mr-2 h-5 w-5" /> Today's Schedule
            </CardTitle>
            <CardDescription>Activities and learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockActivities.map(activity => (
                <div 
                  key={activity.id} 
                  className={`p-4 rounded-lg ${
                    activity.status === "Completed" ? "bg-blue-50" : "bg-yellow-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-blue-700">{activity.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activity.status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.notes}</p>
                  {activity.status === "Completed" ? (
                    <Button variant="link" className="text-blue-700 p-0 mt-2 h-auto">
                      Add notes
                    </Button>
                  ) : (
                    <Button variant="link" className="text-yellow-700 p-0 mt-2 h-auto">
                      Start activity
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Send Daily Report to Parents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
