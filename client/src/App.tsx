import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Import all components
import Landing from "@/components/Landing";
import Login from "@/components/Login";
import AdminDashboard from "@/components/AdminDashboard";
import DoctorDashboard from "@/components/DoctorDashboard";
import PatientPortal from "@/components/PatientPortal";
import NotFound from "@/pages/not-found";

// Demo selector component
function DemoSelector() {
  const [, navigate] = useLocation();
  
  const demos = [
    { 
      path: "/", 
      name: "Landing Page", 
      description: "Public homepage with features and hero section",
      icon: "home",
      color: "bg-blue-100 text-blue-800"
    },
    { 
      path: "/login", 
      name: "Login Portal", 
      description: "Multi-role authentication (Patient/Doctor/Admin)",
      icon: "login",
      color: "bg-gray-100 text-gray-800"
    },
    { 
      path: "/patient", 
      name: "Patient Portal", 
      description: "Health records, appointment booking, consultations",
      icon: "personal_injury",
      color: "bg-teal-100 text-teal-800"
    },
    { 
      path: "/doctor", 
      name: "Doctor Dashboard", 
      description: "Appointments, patient management, prescriptions",
      icon: "stethoscope",
      color: "bg-green-100 text-green-800"
    },
    { 
      path: "/admin", 
      name: "Admin Dashboard", 
      description: "System overview, user management, analytics",
      icon: "admin_panel_settings",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">NabhaSeva</h1>
          <p className="text-xl text-gray-600 mb-4">Healthcare Platform Demo</p>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Interactive Prototype - Click any card to explore
          </Badge>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Card 
              key={demo.path} 
              className="hover-elevate cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => {
                console.log(`Navigating to ${demo.name}`);
                navigate(demo.path);
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        {demo.icon}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {demo.name}
                      </h3>
                      <Badge className={demo.color}>
                        Demo
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {demo.description}
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(demo.path);
                      }}
                    >
                      Explore Demo
                      <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            About This Prototype
          </h4>
          <p className="text-gray-600 mb-4">
            This is a fully interactive prototype of the NabhaSeva healthcare platform. 
            Each section demonstrates different user roles and functionalities with realistic UI interactions.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary">touch_app</span>
              Interactive Elements
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary">smartphone</span>
              Mobile Optimized
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary">accessibility</span>
              Accessible Design
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/patient" component={PatientPortal} />
      <Route path="/doctor" component={DoctorDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/demo" component={DemoSelector} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
