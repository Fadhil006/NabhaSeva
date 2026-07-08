import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";

const overviewStats = [
  { icon: "stethoscope", title: "Doctors", count: 125, tint: "bg-sky-100 text-sky-700" },
  { icon: "personal_injury", title: "Patients", count: 540, tint: "bg-emerald-100 text-emerald-700" },
  { icon: "local_pharmacy", title: "Pharmacies", count: 75, tint: "bg-amber-100 text-amber-700" },
  { icon: "monitoring", title: "Active users", count: 480, tint: "bg-violet-100 text-violet-700" },
];

const doctors = [
  { name: "Dr. Ethan Carter", specialty: "Cardiology", status: "Active", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face" },
  { name: "Dr. Olivia Bennett", specialty: "Pediatrics", status: "Active", avatar: "https://images.unsplash.com/photo-1594824388862-a062f5652a75?w=100&h=100&fit=crop&crop=face" },
  { name: "Dr. Noah Thompson", specialty: "Dermatology", status: "Pending", avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face" },
  { name: "Dr. Sophia Clark", specialty: "Neurology", status: "Inactive", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  Inactive: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const navItems = [
  { id: "dashboard", icon: "dashboard", label: "Dashboard" },
  { id: "doctors", icon: "stethoscope", label: "Doctors" },
  { id: "patients", icon: "groups", label: "Patients" },
  { id: "pharmacies", icon: "apartment", label: "Pharmacies" },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const notImplemented = (title: string) =>
    toast({ title, description: "This section is part of the product roadmap." });

  const filteredDoctors = doctors.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNav = (id: string) =>
    id === "dashboard" || id === "doctors" ? setActiveTab(id) : notImplemented(navItems.find((n) => n.id === id)?.label ?? id);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </span>
            <div>
              <p className="font-[Lexend] font-bold text-foreground">Admin Console</p>
              <p className="text-xs text-muted-foreground">NabhaSeva platform</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleNav(item.id)}
                  data-testid={`tab-${item.id}`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
            <Button variant="ghost" size="icon" onClick={() => navigate("/login")} data-testid="button-logout">
              <span className="material-symbols-outlined">logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 p-4 pb-24 md:pb-8">
        {activeTab === "dashboard" && (
          <>
            <div>
              <h2 className="font-[Lexend] text-xl font-bold text-foreground">Overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">Platform activity across the Nabha region.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {overviewStats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-4">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.tint}`}>
                      <span className="material-symbols-outlined">{stat.icon}</span>
                    </span>
                    <p className="mt-3 font-[Lexend] text-3xl font-extrabold text-foreground">{stat.count}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => setActiveTab("doctors")} data-testid="card-manage-doctors">
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="material-symbols-outlined text-3xl text-primary">manage_accounts</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Manage doctors</h3>
                    <p className="text-sm text-muted-foreground">Review registrations and specialties</p>
                  </div>
                  <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => notImplemented("Pending registrations")} data-testid="card-pending">
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="material-symbols-outlined text-3xl text-amber-500">pending_actions</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Pending registrations</h3>
                    <p className="text-sm text-muted-foreground">15 waiting for approval</p>
                  </div>
                  <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "doctors" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-[Lexend] text-xl font-bold text-foreground">Doctors</h2>
                <p className="mt-1 text-sm text-muted-foreground">{filteredDoctors.length} registered doctors</p>
              </div>
              <Button onClick={() => notImplemented("Add doctor")} data-testid="button-add-doctor">
                <span className="material-symbols-outlined mr-1.5 text-lg">add</span>
                Add doctor
              </Button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
              <Input
                className="h-11 rounded-xl pl-10"
                placeholder="Search doctors by name or specialty…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search"
              />
            </div>

            <div className="space-y-2">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.name} className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => notImplemented(doctor.name)}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>{doctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={statusStyles[doctor.status]}>
                        {doctor.status}
                      </Badge>
                      <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
                    </div>
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
              onClick={() => handleNav(item.id)}
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
