import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";

const todaysAppointments = [
  { patient: "Liam Harper", time: "10:00 AM", status: "Completed", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { patient: "Olivia Bennett", time: "11:30 AM", status: "In Progress", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face" },
  { patient: "Noah Carter", time: "1:00 PM", status: "Upcoming", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  "In Progress": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  Upcoming: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
};

const liveConsultations = [
  { patient: "Ava Morgan", status: "In Progress", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { patient: "Lucas Hayes", status: "Waiting", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
];

const urgentAppointments = [
  { patient: "Kavita Singh", age: 52, time: "10:00 AM", symptoms: "Abdominal pain", urgent: true, avatar: "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?w=100&h=100&fit=crop&crop=face" },
  { patient: "Raj Patel", age: 34, time: "11:15 AM", symptoms: "Chest pain", urgent: false, avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face" },
];

const notifications = [
  { icon: "event_available", tint: "text-sky-500", message: "New appointment scheduled with Sophia Clark", time: "1 hour ago" },
  { icon: "check_circle", tint: "text-emerald-500", message: "Owen Turner has completed check-in", time: "2 hours ago" },
];

const navItems = [
  { id: "home", icon: "home", label: "Home" },
  { id: "appointments", icon: "calendar_month", label: "Appointments" },
  { id: "patients", icon: "group", label: "Patients" },
  { id: "prescriptions", icon: "pill", label: "Prescriptions" },
];

export default function DoctorDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const notImplemented = (title: string) =>
    toast({ title, description: "This section is part of the product roadmap." });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Welcome back,</p>
              <p className="font-[Lexend] font-bold text-foreground">Dr. Ethan Carter</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => (item.id === "home" || item.id === "appointments" ? setActiveTab(item.id) : notImplemented(item.label))}
                  data-testid={`tab-${item.id}`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
            <Button variant="ghost" size="icon" onClick={() => notImplemented("Notifications")} data-testid="button-notifications">
              <span className="material-symbols-outlined">notifications</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/login")} data-testid="button-logout">
              <span className="material-symbols-outlined">logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 p-4 pb-24 md:pb-8">
        {activeTab === "home" && (
          <>
            {/* Today's status */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Completed", value: 3, tint: "text-emerald-600" },
                { label: "In progress", value: 1, tint: "text-sky-600" },
                { label: "Upcoming", value: 2, tint: "text-amber-600" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4 text-center">
                    <p className={`font-[Lexend] text-3xl font-extrabold ${stat.tint}`}>{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Today's appointments */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Today's appointments</h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("appointments")} data-testid="button-view-appointments">
                    View all
                  </Button>
                </div>
                <div className="space-y-2">
                  {todaysAppointments.map((appointment) => (
                    <Card key={appointment.patient}>
                      <CardContent className="flex items-center gap-3 p-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={appointment.avatar} />
                          <AvatarFallback>{appointment.patient.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-foreground">{appointment.patient}</p>
                          <p className="text-xs text-muted-foreground">{appointment.time}</p>
                        </div>
                        <Badge variant="secondary" className={statusStyles[appointment.status]}>
                          {appointment.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Live consultations */}
              <section>
                <h2 className="mb-3 font-semibold text-foreground">Live consultations</h2>
                <div className="grid grid-cols-2 gap-3">
                  {liveConsultations.map((consultation) => (
                    <Card key={consultation.patient}>
                      <CardContent className="flex flex-col items-center gap-2 p-4">
                        <Avatar
                          className={`h-14 w-14 border-4 ${
                            consultation.status === "In Progress" ? "border-sky-400" : "border-muted"
                          }`}
                        >
                          <AvatarImage src={consultation.avatar} />
                          <AvatarFallback>{consultation.patient.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <p className="text-center text-sm font-semibold text-foreground">{consultation.patient}</p>
                        <p className={`text-xs font-medium ${consultation.status === "In Progress" ? "text-sky-600" : "text-muted-foreground"}`}>
                          {consultation.status}
                        </p>
                        <Button
                          size="sm"
                          variant={consultation.status === "In Progress" ? "default" : "secondary"}
                          className="w-full"
                          onClick={() => toast({ title: "Joining call", description: `Connecting to ${consultation.patient}…` })}
                        >
                          <span className="material-symbols-outlined mr-1 text-base">videocam</span>
                          Join
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Prescription writer */}
                <Card className="mt-3">
                  <CardContent className="flex items-center gap-4 p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <span className="material-symbols-outlined">prescriptions</span>
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Prescription writer</h3>
                      <p className="text-sm text-muted-foreground">Create and send e-prescriptions.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => notImplemented("Prescription writer")} data-testid="button-write-prescription">
                      Write
                    </Button>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Notifications */}
            <section>
              <h2 className="mb-3 font-semibold text-foreground">Recent notifications</h2>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <Card key={notification.message}>
                    <CardContent className="flex items-start gap-3 p-3.5">
                      <span className={`material-symbols-outlined ${notification.tint}`}>{notification.icon}</span>
                      <div>
                        <p className="text-sm text-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === "appointments" && (
          <>
            <div>
              <h2 className="font-[Lexend] text-xl font-bold text-foreground">Appointments</h2>
              <p className="mt-1 text-sm text-muted-foreground">Manage consultations and join virtual appointments.</p>
            </div>
            <div className="space-y-3">
              {urgentAppointments.map((appointment) => (
                <Card key={appointment.patient} className={appointment.urgent ? "border-l-4 border-l-red-500" : ""}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>{appointment.patient.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-foreground">{appointment.patient}</p>
                        {appointment.urgent && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Age {appointment.age} · {appointment.symptoms}
                      </p>
                      <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                    </div>
                    <Button size="sm" onClick={() => toast({ title: "Joining call", description: `Connecting to ${appointment.patient}…` })}>
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

      {/* Mobile bottom navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur md:hidden">
        <nav className="mx-auto flex max-w-md items-center justify-around py-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex w-1/4 flex-col items-center gap-0.5 rounded-lg py-1.5 ${
                activeTab === item.id ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => (item.id === "home" || item.id === "appointments" ? setActiveTab(item.id) : notImplemented(item.label))}
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
