import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { renderMarkdown } from "@/lib/markdown";
import { useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  location: string;
  languages: string[];
  consultationFee: number;
  avatar: string;
  available: boolean;
  nextSlot: string;
}

interface HealthRecord {
  id: number;
  date: string;
  doctor: string;
  type: "Consultation" | "Lab Report" | "Vaccination";
  diagnosis: string;
  prescriptions: string[];
  notes: string;
}

interface Prescription {
  id: number;
  medicine: string;
  dosage: string;
  duration: string;
  instructions: string;
  prescribedBy: string;
  date: string;
  status: "Active" | "Completed";
}

interface Appointment {
  id: number;
  doctor: Doctor;
  date: string;
  time: string;
}

interface ChatMessage {
  text: string;
  sender: "user" | "ai";
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Amelia Harper",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
    location: "Nabha",
    languages: ["English", "Hindi", "Punjabi"],
    consultationFee: 800,
    avatar: "https://images.unsplash.com/photo-1594824388862-a062f5652a75?w=100&h=100&fit=crop&crop=face",
    available: true,
    nextSlot: "10:00 AM",
  },
  {
    id: 2,
    name: "Dr. Ethan Carter",
    specialty: "General Medicine",
    experience: "12 years",
    rating: 4.6,
    location: "Patiala",
    languages: ["English", "Punjabi"],
    consultationFee: 600,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    available: true,
    nextSlot: "2:00 PM",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrics",
    experience: "10 years",
    rating: 4.9,
    location: "Nabha",
    languages: ["English", "Hindi", "Punjabi"],
    consultationFee: 700,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    available: false,
    nextSlot: "Tomorrow 9:00 AM",
  },
  {
    id: 4,
    name: "Dr. Rajesh Kumar",
    specialty: "Orthopedics",
    experience: "18 years",
    rating: 4.7,
    location: "Patiala",
    languages: ["English", "Hindi"],
    consultationFee: 900,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    available: true,
    nextSlot: "4:00 PM",
  },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const healthRecords: HealthRecord[] = [
  {
    id: 1,
    date: "2026-05-10",
    doctor: "Dr. Amelia Harper",
    type: "Consultation",
    diagnosis: "Routine Checkup",
    prescriptions: ["Vitamin D3", "Multivitamin"],
    notes: "Patient is healthy. Recommended regular exercise and balanced diet.",
  },
  {
    id: 2,
    date: "2026-04-02",
    doctor: "Dr. Ethan Carter",
    type: "Lab Report",
    diagnosis: "Blood Test Results",
    prescriptions: [],
    notes: "All parameters within normal limits. Continue current lifestyle.",
  },
  {
    id: 3,
    date: "2026-02-18",
    doctor: "Dr. Priya Sharma",
    type: "Vaccination",
    diagnosis: "Influenza Vaccine",
    prescriptions: ["Paracetamol - if fever"],
    notes: "Vaccination administered successfully. Monitor for any side effects.",
  },
];

const prescriptions: Prescription[] = [
  {
    id: 1,
    medicine: "Vitamin D3",
    dosage: "1 tablet daily",
    duration: "30 days",
    instructions: "Take with meals",
    prescribedBy: "Dr. Amelia Harper",
    date: "2026-05-10",
    status: "Active",
  },
  {
    id: 2,
    medicine: "Multivitamin",
    dosage: "1 tablet daily",
    duration: "30 days",
    instructions: "Take after breakfast",
    prescribedBy: "Dr. Amelia Harper",
    date: "2026-05-10",
    status: "Active",
  },
  {
    id: 3,
    medicine: "Paracetamol",
    dosage: "500mg as needed",
    duration: "5 days",
    instructions: "Take only if fever persists",
    prescribedBy: "Dr. Priya Sharma",
    date: "2026-02-18",
    status: "Completed",
  },
];

const quickPrompts = [
  { title: "Symptom check", icon: "psychology", message: "I have a headache and mild fever since yesterday. What should I do?" },
  { title: "Medicine info", icon: "pill", message: "What should I keep in mind when taking paracetamol?" },
  { title: "Health tips", icon: "tips_and_updates", message: "Give me simple tips for staying healthy." },
  { title: "Exercise", icon: "fitness_center", message: "What exercises are good for beginners?" },
];

const navItems = [
  { id: "home", icon: "home", label: "Home" },
  { id: "consult", icon: "videocam", label: "Consult" },
  { id: "records", icon: "description", label: "Records" },
  { id: "assistant", icon: "smart_toy", label: "Assistant" },
  { id: "pharmacy", icon: "local_pharmacy", label: "Pharmacy" },
];

const tabTitles: Record<string, string> = {
  home: "My Health",
  consult: "Book Appointment",
  records: "Health Records",
  assistant: "AI Health Assistant",
  pharmacy: "Pharmacy",
};

export default function PatientPortal() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Hello! I'm your AI Health Assistant. Ask me about symptoms, medicines or healthy habits — in simple words.", sender: "ai" },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isLoading]);

  useEffect(() => {
    if (activeTab === "assistant") inputRef.current?.focus();
  }, [activeTab]);

  const monthLabel = new Date(currentYear, currentMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const generateCalendarDays = () => {
    const days: { day: number | null; isToday?: boolean; isPast?: boolean }[] = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDayOfMonth; i++) days.push({ day: null });
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentYear, currentMonth, day);
      days.push({ day, isToday: cellDate.getTime() === today.getTime(), isPast: cellDate < today });
    }
    return days;
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = doctor.name.toLowerCase().includes(q) || doctor.specialty.toLowerCase().includes(q);
    const matchesFilter =
      searchFilter === "all" ||
      (searchFilter === "available" && doctor.available) ||
      doctor.specialty.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const confirmBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) return;
    setBookedAppointments([
      ...bookedAppointments,
      { id: Date.now(), doctor: selectedDoctor, date: `${selectedDate} ${monthLabel}`, time: selectedTimeSlot },
    ]);
    toast({
      title: "Appointment booked",
      description: `${selectedDoctor.name} · ${selectedDate} ${monthLabel} at ${selectedTimeSlot}`,
    });
    setShowBookingConfirm(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setActiveTab("home");
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const delta = direction === "prev" ? -1 : 1;
    const next = new Date(currentYear, currentMonth + delta);
    setCurrentMonth(next.getMonth());
    setCurrentYear(next.getFullYear());
    setSelectedDate(null);
  };

  const sendMessage = async (messageOverride?: string) => {
    const text = (messageOverride ?? currentMessage).trim();
    if (!text || isLoading) return;

    const history = chatMessages.map(({ sender, text: t }) => ({ role: sender, text: t }));
    setChatMessages((prev) => [...prev, { text, sender: "user" }]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setChatMessages((prev) => [...prev, { text: data.reply, sender: "ai" }]);
    } catch (error) {
      console.error("chat error:", error);
      setChatMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't reach the assistant. Please check your connection and try again.", sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const nextAppointment = bookedAppointments[bookedAppointments.length - 1];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-4">
          <Button variant="ghost" size="icon" onClick={() => (activeTab === "home" ? navigate("/") : setActiveTab("home"))} data-testid="button-back">
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
          <h1 className="flex-1 font-[Lexend] text-lg font-bold text-foreground">{tabTitles[activeTab]}</h1>
          {/* Desktop tabs */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                data-testid={`tab-${item.id}`}
              >
                <span className="material-symbols-outlined mr-1.5 text-lg">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 p-4 pb-24 md:pb-8">
        {activeTab === "home" && (
          <>
            {/* Next appointment */}
            <Card className="overflow-hidden">
              <CardContent className="flex items-center gap-5 p-5">
                <div className="flex-1">
                  {nextAppointment ? (
                    <>
                      <p className="text-sm text-muted-foreground">Next appointment</p>
                      <p className="mt-1 text-lg font-bold text-foreground">{nextAppointment.doctor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {nextAppointment.date} at {nextAppointment.time}
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => toast({ title: "Video call", description: `Joining consultation with ${nextAppointment.doctor.name}…` })}
                        data-testid="button-join-consultation"
                      >
                        <span className="material-symbols-outlined mr-2">video_call</span>
                        Join now
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                      <p className="mt-1 text-lg font-bold text-foreground">Book your next consultation</p>
                      <p className="text-sm text-muted-foreground">Doctors available today in your area</p>
                      <Button className="mt-4" onClick={() => setActiveTab("consult")} data-testid="button-book-appointment">
                        <span className="material-symbols-outlined mr-2">calendar_add_on</span>
                        Book appointment
                      </Button>
                    </>
                  )}
                </div>
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarImage src={nextAppointment ? nextAppointment.doctor.avatar : doctors[0].avatar} />
                  <AvatarFallback>Dr</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: "videocam", title: "Consult", tint: "bg-sky-100 text-sky-700", tab: "consult" },
                { icon: "folder_shared", title: "Records", tint: "bg-amber-100 text-amber-700", tab: "records" },
                { icon: "smart_toy", title: "AI Assistant", tint: "bg-violet-100 text-violet-700", tab: "assistant" },
                { icon: "local_pharmacy", title: "Pharmacy", tint: "bg-emerald-100 text-emerald-700", tab: "pharmacy" },
              ].map((item) => (
                <Card
                  key={item.tab}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => setActiveTab(item.tab)}
                  data-testid={`card-quick-${item.tab}`}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.tint}`}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </span>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Health camp banner */}
            <Card>
              <CardContent className="flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <span className="material-symbols-outlined">festival</span>
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Community Health Camp</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Free health check-up and awareness session. Next camp: <strong>July 25th, 2026</strong>
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => toast({ title: "Health camp", description: "Details will be sent to your registered phone number." })}
                    data-testid="button-learn-more"
                  >
                    Learn more
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active prescriptions preview */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Active prescriptions</h2>
                <Button variant="ghost" size="sm" onClick={() => { setActiveTab("records"); setShowPrescriptions(true); }}>
                  View all
                </Button>
              </div>
              <div className="space-y-2">
                {prescriptions.filter((p) => p.status === "Active").map((prescription) => (
                  <Card key={prescription.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-foreground">{prescription.medicine}</p>
                        <p className="text-sm text-muted-foreground">{prescription.dosage} · {prescription.instructions}</p>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        Active
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === "consult" && (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-3">
              {/* Search */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
                  <Input
                    className="h-11 rounded-xl pl-10"
                    placeholder="Search by name or specialty…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-doctors"
                  />
                </div>
                <select
                  className="h-11 rounded-xl border border-input bg-background px-3 text-sm text-foreground"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  data-testid="select-filter"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="cardiologist">Cardiology</option>
                  <option value="general">General</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
              </div>

              <p className="text-sm font-medium text-muted-foreground">{filteredDoctors.length} doctors found</p>

              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>{doctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-foreground">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.specialty} · {doctor.experience}</p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                              <span className="material-symbols-outlined text-sm text-amber-500">star</span>
                              {doctor.rating} · {doctor.location} · {doctor.languages.join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">₹{doctor.consultationFee}</p>
                            <Badge
                              variant="secondary"
                              className={doctor.available
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                                : ""}
                            >
                              {doctor.available ? "Available" : "Busy"}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Next: {doctor.nextSlot}</p>
                          <Button
                            size="sm"
                            disabled={!doctor.available}
                            onClick={() => {
                              setSelectedDoctor(doctor);
                              if (selectedDate && selectedTimeSlot) setShowBookingConfirm(true);
                              else toast({ title: "Pick a slot", description: "Choose a date and time from the calendar first." });
                            }}
                            data-testid={`button-book-${doctor.id}`}
                          >
                            {doctor.available ? "Book now" : "Unavailable"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Calendar */}
            <Card className="h-fit lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Select date & time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex items-center justify-between">
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")} data-testid="button-prev-month">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </Button>
                  <p className="font-semibold text-foreground">{monthLabel}</p>
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")} data-testid="button-next-month">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </Button>
                </div>
                <div className="mb-1 grid grid-cols-7 text-center">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <p key={i} className="py-1 text-xs font-medium text-muted-foreground">{day}</p>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((dateObj, index) => (
                    <button
                      key={index}
                      className={`h-9 rounded-full text-sm font-medium transition-colors ${
                        !dateObj.day || dateObj.isPast
                          ? "cursor-default text-muted-foreground/40"
                          : selectedDate === dateObj.day
                            ? "bg-primary text-primary-foreground"
                            : dateObj.isToday
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-accent"
                      }`}
                      onClick={() => dateObj.day && !dateObj.isPast && setSelectedDate(dateObj.day)}
                      disabled={!dateObj.day || dateObj.isPast}
                    >
                      {dateObj.day ?? ""}
                    </button>
                  ))}
                </div>
                {selectedDate && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-foreground">Time slots</p>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTimeSlot === slot ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTimeSlot(slot)}
                          data-testid={`button-slot-${slot.replace(/[^a-zA-Z0-9]/g, "-")}`}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "records" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">{showPrescriptions ? "Prescriptions" : "Medical records"}</h2>
              <Button variant="outline" size="sm" onClick={() => setShowPrescriptions(!showPrescriptions)} data-testid="button-toggle-records">
                {showPrescriptions ? "View records" : "View prescriptions"}
              </Button>
            </div>

            {!showPrescriptions
              ? healthRecords.map((record) => (
                  <Card
                    key={record.id}
                    className="cursor-pointer transition-shadow hover:shadow-md"
                    onClick={() => setSelectedRecord(record)}
                    data-testid={`card-record-${record.id}`}
                  >
                    <CardContent className="flex items-start justify-between p-4">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined mt-0.5 text-primary">
                          {record.type === "Consultation" ? "stethoscope" : record.type === "Lab Report" ? "science" : "vaccines"}
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground">{record.type}</h3>
                          <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                          <p className="text-xs text-muted-foreground">{record.doctor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                        <Badge variant="secondary" className="mt-1">
                          {record.prescriptions.length} Rx
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : prescriptions.map((prescription) => (
                  <Card key={prescription.id}>
                    <CardContent className="flex items-start justify-between p-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{prescription.medicine}</h3>
                        <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{prescription.instructions}</p>
                        <p className="text-xs text-muted-foreground">Prescribed by {prescription.prescribedBy}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="secondary"
                          className={prescription.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                            : ""}
                        >
                          {prescription.status}
                        </Badge>
                        <p className="mt-1 text-xs text-muted-foreground">{prescription.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        )}

        {activeTab === "assistant" && (
          <div className="flex h-[calc(100vh-11rem)] flex-col md:h-[calc(100vh-9rem)]">
            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "ai" && (
                    <span className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                      <span className="material-symbols-outlined text-lg">smart_toy</span>
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed md:max-w-[70%] ${
                      message.sender === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-card text-card-foreground shadow-sm [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_li]:ml-4 [&_li]:list-disc [&_p+p]:mt-2 [&_ul]:my-2 [&_.md-heading]:font-semibold"
                    }`}
                    {...(message.sender === "ai"
                      ? { dangerouslySetInnerHTML: { __html: renderMarkdown(message.text) } }
                      : { children: message.text })}
                  />
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <span className="mr-2 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <span className="material-symbols-outlined text-lg">smart_toy</span>
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick prompts */}
            <div className="flex gap-2 overflow-x-auto py-3">
              {quickPrompts.map((item) => (
                <button
                  key={item.title}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  onClick={() => sendMessage(item.message)}
                  data-testid={`quick-${item.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <span className="material-symbols-outlined text-sm text-primary">{item.icon}</span>
                  {item.title}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                className="h-11 rounded-xl"
                placeholder="Ask about your health…"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isLoading}
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                className="h-11 w-11 rounded-xl"
                onClick={() => sendMessage()}
                disabled={!currentMessage.trim() || isLoading}
                data-testid="button-send-message"
              >
                <span className="material-symbols-outlined">send</span>
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              For guidance only — not a substitute for a doctor. Emergency? Call 108.
            </p>
          </div>
        )}

        {activeTab === "pharmacy" && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <span className="material-symbols-outlined">local_pharmacy</span>
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">Prescription orders</h3>
                    <p className="text-sm text-muted-foreground">Order medicines and manage refills</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => toast({ title: "Order placed", description: "Your medicine order has been placed. Delivery in 2–3 days." })}
                  data-testid="button-order-medicines"
                >
                  Order medicines
                </Button>
              </CardContent>
            </Card>

            <h2 className="font-semibold text-foreground">Active prescriptions</h2>
            {prescriptions.filter((p) => p.status === "Active").map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{prescription.medicine}</h3>
                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{prescription.duration} remaining</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast({ title: "Reorder placed", description: `${prescription.medicine} reorder confirmed.` })}
                      data-testid={`button-reorder-${prescription.id}`}
                    >
                      Reorder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <h2 className="font-semibold text-foreground">Services</h2>
            {[
              { title: "Find nearby pharmacy", icon: "location_on", note: "3 pharmacies found within 2 km. Apollo Pharmacy is nearest (0.5 km)." },
              { title: "Medicine reminders", icon: "alarm", note: "Daily reminders set for 10:00 AM and 8:00 PM." },
              { title: "Health products", icon: "inventory_2", note: "Browse vitamins, supplements and wellness products." },
            ].map((service) => (
              <Card
                key={service.title}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => toast({ title: service.title, description: service.note })}
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="material-symbols-outlined text-primary">{service.icon}</span>
                  <p className="flex-1 font-medium text-foreground">{service.title}</p>
                  <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Booking confirmation */}
      <Dialog open={showBookingConfirm} onOpenChange={setShowBookingConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm appointment</DialogTitle>
            <DialogDescription>Review the details before confirming your booking.</DialogDescription>
          </DialogHeader>
          {selectedDoctor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={selectedDoctor.avatar} />
                  <AvatarFallback>{selectedDoctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{selectedDoctor.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                  <p className="text-sm font-medium text-primary">₹{selectedDoctor.consultationFee}</p>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="font-medium text-foreground">
                  {selectedDate} {monthLabel} · {selectedTimeSlot}
                </p>
                <p className="text-muted-foreground">Video consultation (audio fallback available)</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowBookingConfirm(false)} data-testid="button-cancel-booking">
                  Cancel
                </Button>
                <Button className="flex-1" onClick={confirmBooking} data-testid="button-confirm-booking">
                  Confirm booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Record detail */}
      <Dialog open={!!selectedRecord} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Health record</DialogTitle>
            <DialogDescription>Complete record details and doctor's notes.</DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-foreground">{selectedRecord.diagnosis}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedRecord.doctor} · {selectedRecord.date}
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-foreground">Notes</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.notes}</p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-foreground">Prescriptions</h4>
                {selectedRecord.prescriptions.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedRecord.prescriptions.map((rx) => (
                      <li key={rx} className="rounded bg-muted px-3 py-2 text-sm text-foreground">
                        {rx}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No prescriptions</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile bottom navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur md:hidden">
        <nav className="mx-auto flex max-w-md items-center justify-around py-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex w-1/5 flex-col items-center gap-0.5 rounded-lg py-1.5 ${
                activeTab === item.id ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab(item.id)}
              data-testid={`nav-${item.id}`}
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <p className="text-[11px] font-medium">{item.label}</p>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}
