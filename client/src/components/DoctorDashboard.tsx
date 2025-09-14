import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  const todaysAppointments = [
    { 
      patient: 'Liam Harper', 
      time: '10:00 AM', 
      status: 'Completed', 
      statusColor: 'text-green-600',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    { 
      patient: 'Olivia Bennett', 
      time: '11:30 AM', 
      status: 'In Progress', 
      statusColor: 'text-blue-600',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face'
    },
    { 
      patient: 'Noah Carter', 
      time: '1:00 PM', 
      status: 'Upcoming', 
      statusColor: 'text-orange-600',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const liveConsultations = [
    {
      patient: 'Ava Morgan',
      status: 'In Progress',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      borderColor: 'border-blue-500'
    },
    {
      patient: 'Lucas Hayes',
      status: 'Waiting',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      borderColor: 'border-gray-300'
    }
  ];

  const notifications = [
    {
      icon: 'event_available',
      iconColor: 'text-blue-500',
      message: 'New appointment scheduled with Sophia Clark',
      time: '1 hour ago'
    },
    {
      icon: 'check_circle',
      iconColor: 'text-green-500',
      message: 'Patient, Owen Turner, has completed their check-in',
      time: '2 hours ago'
    }
  ];

  const urgentAppointments = [
    {
      patient: 'Kavita Singh',
      age: 52,
      time: '10:00 AM',
      symptoms: 'Abdominal pain',
      avatar: 'https://images.unsplash.com/photo-1582233479366-6d38bc390a08?w=100&h=100&fit=crop&crop=face',
      urgent: true
    },
    {
      patient: 'Raj Patel',
      age: 34,
      time: '11:15 AM',
      symptoms: 'Chest pain',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      urgent: false
    }
  ];

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'appointments', icon: 'calendar_month', label: 'Appointments' },
    { id: 'patients', icon: 'group', label: 'Patients' },
    { id: 'prescriptions', icon: 'pill', label: 'Prescriptions' },
    { id: 'settings', icon: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>DE</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-gray-500 text-sm font-medium">Welcome back,</h1>
              <h2 className="text-gray-800 text-xl font-bold">Dr. Ethan</h2>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => console.log('Notifications clicked')}
            data-testid="button-notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-6 pb-20 max-w-md mx-auto">
        {activeTab === 'home' && (
          <>
            {/* Today's Status */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-gray-800 text-lg font-bold mb-2">Today's Status</h3>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-600">
                    <span className="font-bold text-green-500">3</span> Completed
                  </span>
                  <span className="text-gray-600">
                    <span className="font-bold text-blue-500">1</span> In Progress
                  </span>
                  <span className="text-gray-600">
                    <span className="font-bold text-orange-500">2</span> Upcoming
                  </span>
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => console.log('View all appointments clicked')}
                  data-testid="button-view-appointments"
                >
                  View All Appointments
                </Button>
              </CardContent>
            </Card>

            {/* Today's Appointments */}
            <div>
              <h2 className="text-gray-800 text-xl font-bold px-4 pb-3 pt-2">
                Today's Appointments
              </h2>
              <div className="space-y-2">
                {todaysAppointments.map((appointment, index) => (
                  <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log(`${appointment.patient} appointment clicked`)}>
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-gray-800 font-semibold">
                          {appointment.patient}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {appointment.time} - 
                          <span className={`font-medium ml-1 ${appointment.statusColor}`}>
                            {appointment.status}
                          </span>
                        </p>
                      </div>
                      <Button 
                        variant={appointment.status === 'In Progress' ? 'default' : 'secondary'}
                        size="sm"
                        className={appointment.status === 'In Progress' ? 'bg-primary hover:bg-primary/90 text-white' : ''}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`${appointment.status === 'In Progress' ? 'Join Call' : 'View Record'} clicked`);
                        }}
                      >
                        {appointment.status === 'In Progress' ? 'Join Call' : 'View Record'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Live Consultations */}
            <div>
              <h2 className="text-gray-800 text-xl font-bold px-4 pb-3 pt-2">
                Live Consultations
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {liveConsultations.map((consultation, index) => (
                  <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log(`${consultation.patient} consultation clicked`)}>
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <Avatar className={`h-16 w-16 border-4 ${consultation.borderColor}`}>
                        <AvatarImage src={consultation.avatar} />
                        <AvatarFallback>{consultation.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-800 font-semibold text-center">
                        {consultation.patient}
                      </p>
                      <p className={`text-sm font-medium ${
                        consultation.status === 'In Progress' ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {consultation.status}
                      </p>
                      <Button 
                        size="sm"
                        className={`w-full mt-2 ${
                          consultation.status === 'In Progress' 
                            ? 'bg-primary hover:bg-primary/90 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`Join ${consultation.patient} consultation`);
                        }}
                      >
                        Join
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Prescription Writer */}
            <Card className="hover-elevate cursor-pointer" onClick={() => console.log('Prescription writer clicked')}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-gray-800 text-lg font-bold">Prescription Writer</h3>
                  <p className="text-gray-600 text-sm">Quickly create and send prescriptions.</p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="w-fit mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Write prescription clicked');
                    }}
                    data-testid="button-write-prescription"
                  >
                    Write Prescription
                  </Button>
                </div>
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-gray-400">pill</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <div>
              <h2 className="text-gray-800 text-xl font-bold px-4 pb-3 pt-2">
                Recent Notifications
              </h2>
              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log('Notification clicked')}>
                    <CardContent className="p-3 flex items-start gap-3">
                      <div className="flex-shrink-0 pt-1">
                        <span className={`material-symbols-outlined ${notification.iconColor}`}>
                          {notification.icon}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-gray-800 text-sm">
                          {notification.message}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {notification.time}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <>
            {/* Appointments Header */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab('home')}
                data-testid="button-back-appointments"
              >
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
              </Button>
              <h1 className="flex-1 text-center text-xl font-bold text-gray-800">
                Appointments
              </h1>
              <div className="w-10"></div>
            </div>

            <p className="text-center text-sm text-gray-500 mb-6">
              Manage your upcoming consultations and join virtual appointments.
            </p>

            <h2 className="text-lg font-bold text-gray-800 mb-4">Today's Appointments</h2>

            <div className="space-y-4">
              {urgentAppointments.map((appointment, index) => (
                <Card 
                  key={index} 
                  className={`hover-elevate cursor-pointer ${
                    appointment.urgent ? 'border-l-4 border-l-red-500 bg-red-50' : ''
                  }`}
                  onClick={() => console.log(`${appointment.patient} appointment clicked`)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-gray-800">
                          {appointment.patient}
                        </p>
                        <p className={`text-sm font-medium ${
                          appointment.urgent ? 'text-red-500' : 'text-gray-600'
                        }`}>
                          {appointment.time}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">Age: {appointment.age}</p>
                      <p className={`text-sm ${
                        appointment.urgent ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        Symptoms: {appointment.symptoms}
                      </p>
                    </div>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Join video call with ${appointment.patient}`);
                      }}
                    >
                      <span className="material-symbols-outlined mr-1 text-base">videocam</span>
                      Join
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center px-4 py-2 max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center gap-1 hover-elevate ${
                activeTab === item.id ? 'text-primary' : 'text-gray-500'
              }`}
              onClick={() => {
                setActiveTab(item.id);
                console.log(`${item.label} nav clicked`);
              }}
              data-testid={`nav-${item.id}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <p className="text-xs font-medium">{item.label}</p>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}