import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [showHealthRecord, setShowHealthRecord] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<{ text: string, sender: 'user' | 'ai' }[]>([
    { text: "Hello! I'm your AI Health Assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Auto focus input when component mounts or when user starts typing
  useEffect(() => {
    if (activeTab === 'assistant') {
      inputRef.current?.focus();
    }
  }, [activeTab]);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Amelia Harper',
      specialty: 'Cardiologist',
      experience: '15 years',
      rating: 4.8,
      location: 'New Delhi',
      languages: ['English', 'Hindi'],
      consultationFee: 800,
      avatar: 'https://images.unsplash.com/photo-1594824388862-a062f5652a75?w=100&h=100&fit=crop&crop=face',
      available: true,
      nextSlot: '10:00 AM'
    },
    {
      id: 2,
      name: 'Dr. Ethan Carter',
      specialty: 'General Medicine',
      experience: '12 years',
      rating: 4.6,
      location: 'Mumbai',
      languages: ['English', 'Marathi'],
      consultationFee: 600,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      available: true,
      nextSlot: '2:00 PM'
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      experience: '10 years',
      rating: 4.9,
      location: 'Bangalore',
      languages: ['English', 'Hindi', 'Kannada'],
      consultationFee: 700,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
      available: false,
      nextSlot: 'Tomorrow 9:00 AM'
    },
    {
      id: 4,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Orthopedics',
      experience: '18 years',
      rating: 4.7,
      location: 'Chennai',
      languages: ['English', 'Tamil', 'Hindi'],
      consultationFee: 900,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
      available: true,
      nextSlot: '4:00 PM'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const healthRecords = [
    {
      id: 1,
      date: '2024-09-10',
      doctor: 'Dr. Amelia Harper',
      type: 'Consultation',
      diagnosis: 'Routine Checkup',
      prescriptions: ['Vitamin D3', 'Multivitamin'],
      notes: 'Patient is healthy. Recommended regular exercise and balanced diet.'
    },
    {
      id: 2,
      date: '2024-08-15',
      doctor: 'Dr. Ethan Carter',
      type: 'Lab Report',
      diagnosis: 'Blood Test Results',
      prescriptions: [],
      notes: 'All parameters within normal limits. Continue current lifestyle.'
    },
    {
      id: 3,
      date: '2024-07-22',
      doctor: 'Dr. Priya Sharma',
      type: 'Vaccination',
      diagnosis: 'COVID-19 Booster',
      prescriptions: ['Paracetamol - if fever'],
      notes: 'Vaccination administered successfully. Monitor for any side effects.'
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medicine: 'Vitamin D3',
      dosage: '1 tablet daily',
      duration: '30 days',
      instructions: 'Take with meals',
      prescribedBy: 'Dr. Amelia Harper',
      date: '2024-09-10',
      status: 'Active'
    },
    {
      id: 2,
      medicine: 'Multivitamin',
      dosage: '1 tablet daily',
      duration: '30 days',
      instructions: 'Take after breakfast',
      prescribedBy: 'Dr. Amelia Harper',
      date: '2024-09-10',
      status: 'Active'
    },
    {
      id: 3,
      medicine: 'Paracetamol',
      dosage: '500mg as needed',
      duration: '5 days',
      instructions: 'Take only if fever persists',
      prescribedBy: 'Dr. Priya Sharma',
      date: '2024-07-22',
      status: 'Completed'
    }
  ];

  const features = [
    {
      icon: 'folder_shared',
      title: 'Health Records',
      description: 'View your medical history.',
      link: 'View Records →',
      color: 'text-blue-500',
      action: () => setActiveTab('records')
    },
    {
      icon: 'smart_toy',
      title: 'AI Health Assistant',
      description: 'Personalized health insights.',
      link: 'Chat Now →',
      color: 'text-purple-500',
      action: () => setActiveTab('assistant')
    }
  ];

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentYear, currentMonth, day);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const cellDateNorm = new Date(cellDate);
      cellDateNorm.setHours(0, 0, 0, 0);

      days.push({
        day,
        isCurrentMonth: true,
        isToday: cellDateNorm.getTime() === todayDate.getTime(),
        isPast: cellDateNorm < todayDate
      });
    }

    return days;
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = searchFilter === 'all' ||
      (searchFilter === 'available' && doctor.available) ||
      doctor.specialty.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const handleBookAppointment = (doctor: any, date: number, timeSlot: string) => {
    setSelectedDoctor(doctor);
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    setShowBookingConfirm(true);
  };

  const confirmBooking = () => {
    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      date: `${selectedDate} ${new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      time: selectedTimeSlot,
      status: 'confirmed'
    };
    setBookedAppointments([...bookedAppointments, newAppointment]);
    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${selectedDoctor?.name} is confirmed for ${selectedDate} at ${selectedTimeSlot}`,
    });
    setShowBookingConfirm(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = { text: currentMessage, sender: 'user' as const };
    setChatMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      const aiMessage = { text: data.reply, sender: 'ai' as const };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'ai' as const };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = (message: string) => {
    // This function is no longer used since sendMessage is now async
    return "Loading...";
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
          <div className="w-12">
            {activeTab !== 'home' && (
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
          <h1 className="text-xl font-bold text-gray-800 flex-1 text-center">
            {activeTab === 'home' ? 'My Health' :
              activeTab === 'consult' ? 'Book Appointment' :
                activeTab === 'records' ? 'Health Records' :
                  activeTab === 'assistant' ? 'Health Assistant' :
                    activeTab === 'pharmacy' ? 'Pharmacy' :
                      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="flex w-12 items-center justify-end">
            {activeTab === 'home' && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => toast({ title: "Settings", description: "Settings functionality coming soon!" })}
                data-testid="button-settings"
              >
                <span className="material-symbols-outlined text-2xl">settings</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6 pb-20 max-w-md mx-auto">
        {activeTab === 'home' && (
          <>
            {/* Upcoming/Next Consultation */}
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    {bookedAppointments.length > 0 ? (
                      <>
                        <p className="text-sm text-gray-500">Next Appointment</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">{bookedAppointments[bookedAppointments.length - 1].doctor.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{bookedAppointments[bookedAppointments.length - 1].date} at {bookedAppointments[bookedAppointments.length - 1].time}</p>
                        <Button
                          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white w-full"
                          onClick={() => toast({ title: "Video Call", description: `Joining consultation with ${bookedAppointments[bookedAppointments.length - 1].doctor.name}...` })}
                          data-testid="button-join-consultation"
                        >
                          <span className="material-symbols-outlined mr-2">video_call</span>
                          Join Now
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500">No Upcoming Appointments</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">Book your next consultation</p>
                        <p className="text-sm text-gray-500 mt-1">Stay connected with healthcare</p>
                        <Button
                          className="mt-4 bg-primary hover:bg-primary/90 text-white w-full"
                          onClick={() => setActiveTab('consult')}
                          data-testid="button-book-appointment"
                        >
                          <span className="material-symbols-outlined mr-2">calendar_add_on</span>
                          Book Appointment
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={bookedAppointments.length > 0
                        ? bookedAppointments[bookedAppointments.length - 1].doctor.avatar
                        : "https://images.unsplash.com/photo-1594824388862-a062f5652a75?w=100&h=100&fit=crop&crop=face"} />
                      <AvatarFallback>{bookedAppointments.length > 0
                        ? bookedAppointments[bookedAppointments.length - 1].doctor.name.split(' ').map(n => n[0]).join('')
                        : 'Dr'}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <section>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <Card key={index} className="shadow-md hover-elevate cursor-pointer" onClick={feature.action}>
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
                      <span className={`text-sm font-medium mt-auto pt-2 hover:underline ${feature.color.replace('text-', 'text-')
                        }`}>
                        {feature.link}
                      </span>
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
                      Next Camp: September 25th, 2024
                    </p>
                    <Button
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full"
                      onClick={() => toast({ title: "Health Camp", description: "More information about upcoming health camps sent to your email." })}
                      data-testid="button-learn-more"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pharmacy Orders */}
            <Card className="shadow-md hover-elevate cursor-pointer" onClick={() => setActiveTab('pharmacy')}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <span className="material-symbols-outlined text-3xl text-green-500">
                  local_pharmacy
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  Pharmacy Orders
                </h3>
                <p className="text-xs text-gray-500">
                  Manage prescriptions and refills.
                </p>
                <span className="text-sm font-medium text-green-600 hover:underline mt-auto pt-2">
                  Manage Orders →
                </span>
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
                    placeholder="Search doctors by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-doctors"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <select
                  className="h-12 w-full rounded-xl bg-gray-100 border-none text-sm px-3"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="cardiologist">Cardiology</option>
                  <option value="general">General</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>

            {/* Available Doctors Header */}
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-gray-900">
                Available Doctors ({filteredDoctors.length})
              </p>
            </div>

            {/* Doctors List */}
            <div className="space-y-4">
              {filteredDoctors.map((doctor, index) => (
                <Card key={doctor.id} className="hover-elevate">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-gray-900 text-base font-bold">
                              {doctor.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {doctor.specialty} • {doctor.experience}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="flex items-center gap-1 text-xs text-amber-600">
                                <span className="material-symbols-outlined text-xs">star</span>
                                {doctor.rating}
                              </span>
                              <span className="text-xs text-gray-500">• {doctor.location}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Languages: {doctor.languages.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ₹{doctor.consultationFee}
                            </p>
                            <Badge className={doctor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                              {doctor.available ? 'Available' : 'Busy'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-sm text-gray-600">
                            Next: {doctor.nextSlot}
                          </p>
                          <Button
                            size="sm"
                            className={doctor.available ? 'bg-primary hover:bg-primary/90' : ''}
                            variant={doctor.available ? 'default' : 'secondary'}
                            disabled={!doctor.available}
                            onClick={() => {
                              setSelectedDoctor(doctor);
                              if (selectedDate && selectedTimeSlot) {
                                setShowBookingConfirm(true);
                              } else if (!selectedDate) {
                                toast({ title: "Select Date", description: "Please select a date from the calendar below." });
                              } else if (!selectedTimeSlot) {
                                toast({ title: "Select Time", description: "Please select a time slot after choosing a date." });
                              }
                            }}
                            data-testid={`button-book-${doctor.id}`}
                          >
                            {doctor.available ? 'Book Now' : 'Unavailable'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Select Appointment Date</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth('prev')}
                    data-testid="button-prev-month"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </Button>
                  <p className="text-gray-900 text-base font-bold leading-tight text-center">
                    {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth('next')}
                    data-testid="button-next-month"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </Button>
                </div>

                {/* Calendar Header */}
                <div className="grid grid-cols-7 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <p key={`${day}-${index}`} className="text-gray-500 text-sm font-medium h-8 flex items-center justify-center">
                      {day}
                    </p>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((dateObj, index) => (
                    <button
                      key={index}
                      className={`h-10 text-sm font-medium hover-elevate ${!dateObj.isCurrentMonth
                          ? 'text-gray-400 cursor-not-allowed'
                          : dateObj.isPast
                            ? 'text-gray-400 cursor-not-allowed'
                            : selectedDate === dateObj.day
                              ? 'bg-primary text-white rounded-full'
                              : dateObj.isToday
                                ? 'bg-blue-100 text-blue-800 rounded-full'
                                : 'text-gray-900 hover:bg-gray-100 rounded-full'
                        }`}
                      onClick={() => {
                        if (dateObj.isCurrentMonth && dateObj.day && !dateObj.isPast) {
                          setSelectedDate(dateObj.day);
                        }
                      }}
                      disabled={!dateObj.isCurrentMonth || dateObj.isPast}
                    >
                      {dateObj.day || ''}
                    </button>
                  ))}
                </div>

                {selectedDate && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Available Time Slots:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map(slot => (
                        <Button
                          key={slot}
                          variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={selectedTimeSlot === slot ? 'bg-primary' : ''}
                          data-testid={`button-time-slot-${slot.replace(/[^a-zA-Z0-9]/g, '-')}`}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
        {/* Health Records Tab */}
        {activeTab === 'records' && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">Medical Records</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrescriptions(!showPrescriptions)}
                >
                  {showPrescriptions ? 'View Records' : 'View Prescriptions'}
                </Button>
              </div>

              {!showPrescriptions ? (
                <div className="space-y-3">
                  {healthRecords.map((record) => (
                    <Card key={record.id} className="hover-elevate cursor-pointer"
                      onClick={() => {
                        setSelectedRecord(record);
                        setShowHealthRecord(true);
                      }}
                      data-testid={`card-health-record-${record.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="material-symbols-outlined text-primary">
                                {record.type === 'Consultation' ? 'stethoscope' :
                                  record.type === 'Lab Report' ? 'science' : 'vaccines'}
                              </span>
                              <h3 className="font-semibold text-gray-900">{record.type}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{record.diagnosis}</p>
                            <p className="text-xs text-gray-500">Dr. {record.doctor.replace('Dr. ', '')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{record.date}</p>
                            <Badge variant="secondary" className="mt-1">
                              {record.prescriptions.length} prescriptions
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {prescriptions.map((prescription) => (
                    <Card key={prescription.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{prescription.medicine}</h3>
                            <p className="text-sm text-gray-600">{prescription.dosage}</p>
                            <p className="text-xs text-gray-500 mt-1">{prescription.instructions}</p>
                            <p className="text-xs text-gray-400 mt-1">Prescribed by {prescription.prescribedBy}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={prescription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                              {prescription.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{prescription.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Health Assistant Tab */}
        {activeTab === 'assistant' && (
          <>
            {/* AI Chat Interface */}
            <Card className="h-80">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-500">smart_toy</span>
                  AI Health Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2" style={{ maxHeight: '200px' }}>
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                        }`}>
                        {message.sender === 'ai' ? (
                          <div dangerouslySetInnerHTML={{ __html: message.text }} />
                        ) : (
                          message.text
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 max-w-xs px-3 py-2 rounded-lg text-sm">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    placeholder="Ask me about your health..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    disabled={isLoading}
                    data-testid="input-chat-message"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim() || isLoading}
                    data-testid="button-send-message"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Quick Actions</h4>
              {[
                { title: 'Symptom Checker', icon: 'psychology', color: 'text-red-500', message: 'I have a headache and fever. What should I do?' },
                { title: 'Medicine Questions', icon: 'pill', color: 'text-orange-500', message: 'Can I take paracetamol with my current medications?' },
                { title: 'Health Tips', icon: 'tips_and_updates', color: 'text-green-500', message: 'Give me some tips for staying healthy.' },
                { title: 'Exercise Advice', icon: 'fitness_center', color: 'text-blue-500', message: 'What exercises are good for beginners?' }
              ].map((item, index) => (
                <Card key={index} className="hover-elevate cursor-pointer"
                  onClick={() => {
                    setCurrentMessage(item.message);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  data-testid={`quick-action-${item.title.toLowerCase().replace(' ', '-')}`}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className={`material-symbols-outlined text-2xl ${item.color}`}>
                      {item.icon}
                    </span>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <span className="material-symbols-outlined text-gray-400 ml-auto">arrow_forward_ios</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Pharmacy Tab */}
        {activeTab === 'pharmacy' && (
          <>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-2xl text-green-500">
                      local_pharmacy
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Prescription Orders</h3>
                      <p className="text-sm text-gray-600">Manage your medicine orders and refills</p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => toast({ title: "Order Placed", description: "Your medicine order has been placed successfully!" })}
                    data-testid="button-order-medicines"
                  >
                    Order Medicines
                  </Button>
                </CardContent>
              </Card>

              <h4 className="font-semibold text-gray-900">Active Prescriptions</h4>
              <div className="space-y-3">
                {prescriptions.filter(p => p.status === 'Active').map((prescription) => (
                  <Card key={prescription.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{prescription.medicine}</h4>
                          <p className="text-sm text-gray-600">{prescription.dosage}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{prescription.duration} remaining</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast({ title: "Reorder Placed", description: `${prescription.medicine} reorder confirmed. Expected delivery: 2-3 days.` })}
                          data-testid={`button-reorder-${prescription.id}`}
                        >
                          Reorder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Pharmacy Services</h4>
                {[
                  { title: 'Find Nearby Pharmacy', icon: 'location_on', action: () => toast({ title: "Location Found", description: "3 pharmacies found within 2km. Apollo Pharmacy is nearest (0.5km)." }) },
                  { title: 'Medicine Reminders', icon: 'alarm', action: () => toast({ title: "Reminders Set", description: "Daily medicine reminders activated for 10:00 AM and 8:00 PM." }) },
                  { title: 'Health Products', icon: 'inventory_2', action: () => toast({ title: "Health Store", description: "Browse vitamins, supplements, and wellness products now available!" }) }
                ].map((service, index) => (
                  <Card key={`service-${index}`} className="hover-elevate cursor-pointer" onClick={service.action}
                    data-testid={`pharmacy-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl text-primary">
                        {service.icon}
                      </span>
                      <p className="font-medium text-gray-900">{service.title}</p>
                      <span className="material-symbols-outlined text-gray-400 ml-auto">arrow_forward_ios</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Booking Confirmation Dialog */}
      <Dialog open={showBookingConfirm} onOpenChange={setShowBookingConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogDescription>
              Please review your appointment details and confirm your booking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDoctor && (
              <>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedDoctor.avatar} />
                    <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedDoctor.name}</p>
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-green-600">₹{selectedDoctor.consultationFee}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Appointment Details:</p>
                  <p className="font-medium">Date: {selectedDate} {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  <p className="font-medium">Time: {selectedTimeSlot}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowBookingConfirm(false)}
                    className="flex-1"
                    data-testid="button-cancel-booking"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmBooking}
                    className="flex-1 bg-primary hover:bg-primary/90"
                    data-testid="button-confirm-booking"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Health Record Detail Dialog */}
      <Dialog open={showHealthRecord} onOpenChange={setShowHealthRecord}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Health Record Details</DialogTitle>
            <DialogDescription>
              View your complete medical record information and notes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRecord && (
              <>
                <div>
                  <p className="font-semibold text-gray-900">{selectedRecord.diagnosis}</p>
                  <p className="text-sm text-gray-600">{selectedRecord.doctor} • {selectedRecord.date}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Notes:</h4>
                  <p className="text-sm text-gray-600">{selectedRecord.notes}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Prescriptions:</h4>
                  <div className="space-y-2">
                    {selectedRecord.prescriptions.length > 0 ? (
                      selectedRecord.prescriptions.map((prescription, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded">
                          <p className="font-medium">{prescription}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No prescriptions</p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => setShowHealthRecord(false)}
                  className="w-full"
                  data-testid="button-close-record"
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <nav className="flex justify-around items-center px-4 py-2 max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center gap-1 w-1/5 hover-elevate ${activeTab === item.id ? 'text-teal-500' : 'text-gray-500'
                }`}
              onClick={() => setActiveTab(item.id)}
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