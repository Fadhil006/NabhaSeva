import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Landing() {
  const [, navigate] = useLocation();
  const [activeView, setActiveView] = useState('home'); // 'home', 'about', 'contact'
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const features = [
    { 
      icon: "folder_open", 
      title: "Offline Health Records", 
      description: "Access your medical history anytime",
      details: "Store and access your complete medical history offline. View past prescriptions, lab reports, vaccination records, and treatment history even without internet connectivity. Your health data stays private and secure on your device.",
      benefits: ["Complete offline access", "Secure encryption", "Easy sharing with doctors", "Multiple language support"]
    },
    { 
      icon: "language", 
      title: "Multilingual Support", 
      description: "Available in Hindi and English",
      details: "NabhaSeva supports multiple Indian languages to serve rural communities effectively. The interface adapts to your preferred language, making healthcare accessible to everyone regardless of language barriers.",
      benefits: ["Hindi & English support", "Voice assistance", "Regional language options", "Cultural adaptation"]
    },
    { 
      icon: "pill", 
      title: "Medicine Updates", 
      description: "Real-time medication reminders",
      details: "Never miss your medications with smart reminders. Get notifications for medicine times, track your doses, check drug interactions, and receive alerts for prescription refills.",
      benefits: ["Smart reminders", "Dose tracking", "Interaction alerts", "Refill notifications"]
    },
    { 
      icon: "groups", 
      title: "Expert Access", 
      description: "Connect with healthcare professionals",
      details: "Connect with qualified doctors, specialists, and healthcare experts through video consultations. Get second opinions, emergency consultations, and follow-up appointments from the comfort of your home.",
      benefits: ["Video consultations", "Specialist access", "Emergency support", "Second opinions"]
    },
    { 
      icon: "psychology", 
      title: "AI Symptom Checker", 
      description: "Smart health assessment tools",
      details: "Use AI-powered symptom checker to get preliminary health assessments. The system analyzes your symptoms and provides guidance on whether you need immediate medical attention or home care.",
      benefits: ["AI-powered analysis", "Preliminary diagnosis", "Risk assessment", "Treatment suggestions"]
    },
    { 
      icon: "support_agent", 
      title: "24/7 Help & Support", 
      description: "Round-the-clock assistance",
      details: "Get help whenever you need it with our 24/7 support system. Access emergency helplines, technical support, and medical guidance at any time of the day or night.",
      benefits: ["24/7 availability", "Emergency helpline", "Technical support", "Medical guidance"]
    }
  ];

  const stats = [
    { label: "Doctors", value: "500+" },
    { label: "Support", value: "24/7" },
    { label: "Hospitals & Clinics", value: "100+" },
    { label: "Languages", value: "10+" }
  ];

  const aboutInfo = {
    mission: "To bridge the healthcare gap in rural India by providing accessible, multilingual, and technology-driven healthcare solutions.",
    vision: "A future where every individual, regardless of location, has access to quality healthcare services.",
    values: ["Accessibility", "Affordability", "Quality Care", "Cultural Sensitivity", "Innovation"]
  };

  const contactInfo = {
    emergency: "108",
    helpline: "1800-123-4567",
    email: "help@nabhaseva.in",
    address: "Rural Healthcare Innovation Center, New Delhi, India"
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleNavigation = (section: string) => {
    setActiveView(section);
  };

  const renderAboutSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">health_and_safety</span>
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{aboutInfo.mission}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">visibility</span>
            Our Vision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{aboutInfo.vision}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">favorite</span>
            Our Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {aboutInfo.values.map((value, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                {value}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-4">
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-500 text-3xl">emergency</span>
            <div>
              <h3 className="font-bold text-red-800">Medical Emergency</h3>
              <p className="text-red-600">Call {contactInfo.emergency} immediately</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">call</span>
            <div>
              <h4 className="font-semibold">Helpline</h4>
              <p className="text-gray-600">{contactInfo.helpline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">email</span>
            <div>
              <h4 className="font-semibold">Email Support</h4>
              <p className="text-gray-600">{contactInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-600">{contactInfo.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        className="w-full bg-primary hover:bg-primary/90"
        onClick={() => window.open(`mailto:${contactInfo.email}`, '_blank')}
      >
        Send Email
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {activeView !== 'home' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView('home')}
              data-testid="button-back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Button>
          )}
          {activeView === 'home' && <div className="w-12"></div>}
          <h1 className="text-lg font-bold text-gray-900">
            {activeView === 'home' ? 'NabhaSeva' : 
             activeView === 'about' ? 'About Us' : 'Contact Us'}
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <button 
                className="h-12 w-12 rounded-full hover-elevate flex items-center justify-center"
                data-testid="button-menu"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Menu</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => {setActiveView('home')}}>
                  <span className="material-symbols-outlined mr-2">home</span>
                  Home
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => {setActiveView('about')}}>
                  <span className="material-symbols-outlined mr-2">info</span>
                  About
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => {setActiveView('contact')}}>
                  <span className="material-symbols-outlined mr-2">call</span>
                  Contact
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/login')}>
                  <span className="material-symbols-outlined mr-2">person</span>
                  Login
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="px-4 pb-20">
        <div className="max-w-md mx-auto">
          {activeView === 'home' && (
            <>
              {/* Hero Section */}
              <div 
                className="min-h-[480px] flex flex-col gap-6 rounded-2xl bg-cover bg-center bg-no-repeat items-start justify-end p-6"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                }}
              >
                <div className="flex flex-col gap-4 text-left">
                  <h2 className="text-white text-4xl font-black leading-tight tracking-tighter">
                    Bridging rural gaps with smart care
                  </h2>
                  <p className="text-white/90 text-sm font-normal leading-normal">
                    NabhaSeva brings healthcare to your doorstep, no matter where you are. Access vital health services, connect with experts, and stay informed about your health, all in your language.
                  </p>
                </div>
                <Button 
                  onClick={handleGetStarted}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </div>

              {/* Why NabhaSeva Section */}
              <section className="mt-8">
                <h3 className="text-gray-900 text-2xl font-bold leading-tight tracking-tighter mb-4">
                  Why NabhaSeva?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Card className="hover-elevate cursor-pointer">
                          <CardContent className="flex flex-col gap-3 p-4 items-start">
                            <span className="material-symbols-outlined text-primary text-3xl">
                              {feature.icon}
                            </span>
                            <h4 className="text-gray-900 text-base font-bold leading-tight">
                              {feature.title}
                            </h4>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">
                              {feature.icon}
                            </span>
                            {feature.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-gray-600">{feature.details}</p>
                          <div>
                            <h4 className="font-semibold mb-2">Key Benefits:</h4>
                            <ul className="space-y-1">
                              {feature.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </section>

              {/* Stats Section */}
              <section className="mt-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <Card key={index} className="bg-green-50 border-green-100">
                      <CardContent className="flex flex-col gap-1 p-4">
                        <p className="text-gray-900 text-base font-medium leading-normal">
                          {stat.label}
                        </p>
                        <p className="text-primary tracking-light text-3xl font-bold leading-tight">
                          {stat.value}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeView === 'about' && renderAboutSection()}
          {activeView === 'contact' && renderContactSection()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
        <nav className="flex justify-around items-center pt-2 pb-4 max-w-md mx-auto">
          {[
            { icon: 'home', label: 'Home', view: 'home' },
            { icon: 'info', label: 'About', view: 'about' },
            { icon: 'call', label: 'Contact', view: 'contact' },
            { icon: 'person', label: 'Login', view: 'login' }
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center gap-1 hover-elevate ${
                (activeView === item.view) ? 'text-primary' : 'text-gray-500'
              }`}
              onClick={() => {
                if (item.view === 'login') {
                  navigate('/login');
                } else {
                  handleNavigation(item.view);
                }
              }}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <span className="material-symbols-outlined text-2xl">
                {item.icon}
              </span>
              <p className="text-xs font-medium tracking-wide">
                {item.label}
              </p>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}