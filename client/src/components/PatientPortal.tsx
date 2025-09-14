import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const doctors = [
    {
      name: 'Dr. Amelia Harper',
      specialty: 'Oncologist',
      experience: '10 years',
      avatar: 'https://images.unsplash.com/photo-1594824388862-a062f5652a75?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Dr. Ethan Carter',
      specialty: 'Radiologist',
      experience: '8 years',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const features = [
    { 
      icon: 'folder_shared', 
      title: 'Health Records', 
      description: 'View your medical history.', 
      link: 'View Records →',
      color: 'text-blue-500'
    },
    { 
      icon: 'smart_toy', 
      title: 'AI Health Assistant', 
      description: 'Personalized health insights.', 
      link: 'Chat Now →',
      color: 'text-purple-500'
    }
  ];

  const generateCalendarDays = () => {
    const days = [];
    // July 2024 calendar
    const startDay = 4; // July 1st starts on Thursday (0=Sunday)
    const daysInMonth = 31;
    
    // Empty cells for days before the 1st
    for (let i = 0; i < startDay - 1; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }
    
    return days;
  };

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'consult', icon: 'videocam', label: 'Consult' },
    { id: 'records', icon: 'description', label: 'Records' },
    { id: 'assistant', icon: 'smart_toy', label: 'Assistant' },
    { id: 'pharmacy', icon: 'local_pharmacy', label: 'Pharmacy' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <div className="w-12"></div>
          <h1 className="text-xl font-bold text-gray-800 flex-1 text-center">
            {activeTab === 'home' ? 'My Health' : 
             activeTab === 'consult' ? 'Book Appointment' : 
             activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="flex w-12 items-center justify-end">
            {activeTab === 'home' && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => console.log('Settings clicked')}
                data-testid="button-settings"
              >
                <span className="material-symbols-outlined text-2xl">settings</span>
              </Button>
            )}
            {activeTab === 'consult' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab('home')}
                data-testid="button-back"
              >
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6 pb-20 max-w-md mx-auto">
        {activeTab === 'home' && (
          <>
            {/* Upcoming Consultation */}
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Upcoming Consultation</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">Dr. Emily Carter</p>
                    <p className="text-sm text-gray-500 mt-1">Today, 10:00 AM</p>
                    <Button 
                      className="mt-4 bg-teal-500 hover:bg-teal-600 text-white w-full"
                      onClick={() => console.log('Join consultation clicked')}
                      data-testid="button-join-consultation"
                    >
                      <span className="material-symbols-outlined mr-2">video_call</span>
                      Join Now
                    </Button>
                  </div>
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1594824388862-a062f5652a75?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <section>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <Card key={index} className="shadow-md hover-elevate cursor-pointer" onClick={() => console.log(`${feature.title} clicked`)}>
                    <CardContent className="p-4 flex flex-col items-start space-y-2">
                      <span className={`material-symbols-outlined text-3xl ${feature.color}`}>
                        {feature.icon}
                      </span>
                      <h3 className="text-base font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {feature.description}
                      </p>
                      <a className={`text-sm font-medium mt-auto pt-2 hover:underline ${
                        feature.color.replace('text-', 'text-')
                      }`} href="#">
                        {feature.link}
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Community Health Camp */}
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="material-symbols-outlined text-3xl text-orange-500 bg-orange-100 p-2 rounded-full">
                      festival
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900">
                      Community Health Camp
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Join us for a free health check-up and awareness session.
                    </p>
                    <p className="text-sm text-gray-500 font-medium mt-2">
                      Next Camp: June 25th, 2024
                    </p>
                    <Button 
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full"
                      onClick={() => console.log('Learn more about health camp')}
                      data-testid="button-learn-more"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pharmacy Orders */}
            <Card className="shadow-md hover-elevate cursor-pointer" onClick={() => console.log('Pharmacy orders clicked')}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <span className="material-symbols-outlined text-3xl text-green-500">
                  pill
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  Pharmacy Orders
                </h3>
                <p className="text-xs text-gray-500">
                  Manage prescriptions and refills.
                </p>
                <a className="text-sm font-medium text-green-600 hover:underline mt-auto pt-2" href="#">
                  Manage Orders →
                </a>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'consult' && (
          <>
            {/* Search and Filters */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-9">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    search
                  </span>
                  <Input
                    className="pl-10 rounded-xl bg-gray-100 border-none h-12"
                    placeholder="Search for doctors..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      console.log('Search:', e.target.value);
                    }}
                    data-testid="input-search-doctors"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <Button 
                  variant="secondary" 
                  className="h-12 w-full rounded-xl bg-gray-100"
                  onClick={() => console.log('Filters clicked')}
                  data-testid="button-filters"
                >
                  <span className="material-symbols-outlined text-gray-600">filter_list</span>
                  <span className="ml-1">Filters</span>
                </Button>
              </div>
            </div>

            {/* Available Doctors Header */}
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-gray-900">
                Available Doctors
              </p>
              <a className="text-sm font-medium text-primary" href="#">
                See All
              </a>
            </div>

            {/* Doctors List */}
            <div className="space-y-4">
              {doctors.map((doctor, index) => (
                <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log(`${doctor.name} selected`)}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-gray-900 text-base font-bold leading-normal">
                        {doctor.name}
                      </p>
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        {doctor.specialty} | {doctor.experience}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <span className="material-symbols-outlined text-gray-600">
                        arrow_forward_ios
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Calendar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="icon">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </Button>
                  <p className="text-gray-900 text-base font-bold leading-tight text-center">
                    July 2024
                  </p>
                  <Button variant="ghost" size="icon">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </Button>
                </div>
                
                {/* Calendar Header */}
                <div className="grid grid-cols-7 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <p key={day} className="text-gray-500 text-sm font-medium h-10 flex items-center justify-center">
                      {day}
                    </p>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((dateObj, index) => (
                    <button
                      key={index}
                      className={`h-10 text-sm font-medium hover-elevate ${
                        !dateObj.isCurrentMonth 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : selectedDate === dateObj.day
                          ? 'bg-primary text-white rounded-full'
                          : 'text-gray-900 hover:bg-gray-100 rounded-full'
                      }`}
                      onClick={() => {
                        if (dateObj.isCurrentMonth && dateObj.day) {
                          setSelectedDate(dateObj.day);
                          console.log(`Date ${dateObj.day} selected`);
                        }
                      }}
                      disabled={!dateObj.isCurrentMonth}
                    >
                      {dateObj.day || ''}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <nav className="flex justify-around items-center px-4 py-2 max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center gap-1 w-1/5 hover-elevate ${
                activeTab === item.id ? 'text-teal-500' : 'text-gray-500'
              }`}
              onClick={() => {
                setActiveTab(item.id);
                console.log(`${item.label} nav clicked`);
              }}
              data-testid={`nav-${item.id}`}
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <p className="text-xs font-medium">{item.label}</p>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}