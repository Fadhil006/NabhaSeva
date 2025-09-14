import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  const features = [
    { icon: "folder_open", title: "Offline Health Records", description: "Access your medical history anytime" },
    { icon: "language", title: "Multilingual Support", description: "Available in Hindi and English" },
    { icon: "pill", title: "Medicine Updates", description: "Real-time medication reminders" },
    { icon: "groups", title: "Expert Access", description: "Connect with healthcare professionals" },
    { icon: "psychology", title: "AI Symptom Checker", description: "Smart health assessment tools" },
    { icon: "support_agent", title: "24/7 Help & Support", description: "Round-the-clock assistance" }
  ];

  const stats = [
    { label: "Doctors", value: "500+" },
    { label: "Support", value: "24/7" },
    { label: "Hospitals & Clinics", value: "100+" },
    { label: "Languages", value: "10+" }
  ];

  const handleGetStarted = () => {
    console.log('Get Started clicked - redirect to login/registration');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="w-12"></div>
          <h1 className="text-lg font-bold text-gray-900">NabhaSeva</h1>
          <button 
            className="h-12 w-12 rounded-full hover-elevate flex items-center justify-center"
            onClick={() => console.log('Menu clicked')}
            data-testid="button-menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 pb-20">
        <div className="max-w-md mx-auto">
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
                <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log(`${feature.title} clicked`)}>
                  <CardContent className="flex flex-col gap-3 p-4 items-start">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {feature.icon}
                    </span>
                    <h4 className="text-gray-900 text-base font-bold leading-tight">
                      {feature.title}
                    </h4>
                  </CardContent>
                </Card>
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
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
        <nav className="flex justify-around items-center pt-2 pb-4 max-w-md mx-auto">
          {[
            { icon: 'home', label: 'Home', active: true },
            { icon: 'info', label: 'About', active: false },
            { icon: 'call', label: 'Contact', active: false },
            { icon: 'person', label: 'Login', active: false }
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center gap-1 hover-elevate ${
                item.active ? 'text-primary' : 'text-gray-500'
              }`}
              onClick={() => console.log(`${item.label} nav clicked`)}
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