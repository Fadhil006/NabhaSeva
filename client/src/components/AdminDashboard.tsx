import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const overviewStats = [
    { icon: 'medication', title: 'Doctors', count: 125, color: 'text-primary' },
    { icon: 'personal_injury', title: 'Patients', count: 540, color: 'text-primary' },
    { icon: 'local_pharmacy', title: 'Pharmacies', count: 75, color: 'text-primary' }
  ];

  const activityStats = [
    { title: 'Active Users', count: 480, icon: 'monitoring' },
    { title: 'Pending Registrations', count: 15, icon: 'pending_actions' }
  ];

  const doctors = [
    { name: 'Dr. Ethan Carter', specialty: 'Cardiology', status: 'Active', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face' },
    { name: 'Dr. Olivia Bennett', specialty: 'Pediatrics', status: 'Active', avatar: 'https://images.unsplash.com/photo-1594824388862-a062f5652a75?w=100&h=100&fit=crop&crop=face' },
    { name: 'Dr. Noah Thompson', specialty: 'Dermatology', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face' },
    { name: 'Dr. Sophia Clark', specialty: 'Neurology', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'doctors', icon: 'stethoscope', label: 'Doctors' },
    { id: 'patients', icon: 'groups', label: 'Patients' },
    { id: 'pharmacies', icon: 'apartment', label: 'Pharmacies' },
    { id: 'settings', icon: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-50 sticky top-0 z-10 px-4 pt-6 pb-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => console.log('Menu clicked')}
            data-testid="button-menu"
          >
            <span className="material-symbols-outlined text-gray-900">menu</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="p-4 pb-20 max-w-md mx-auto">
        {activeTab === 'dashboard' && (
          <>
            {/* Overview Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                {overviewStats.slice(0, 2).map((stat, index) => (
                  <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log(`${stat.title} card clicked`)}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`material-symbols-outlined ${stat.color}`}>
                          {stat.icon}
                        </span>
                        <h3 className="text-base font-semibold text-gray-900">
                          {stat.title}
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.count}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                <Card className="col-span-2 hover-elevate cursor-pointer" onClick={() => console.log('Pharmacies card clicked')}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary">
                        local_pharmacy
                      </span>
                      <h3 className="text-base font-semibold text-gray-900">
                        Pharmacies
                      </h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">75</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Activity Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity</h2>
              <div className="space-y-4">
                {activityStats.map((stat, index) => (
                  <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log(`${stat.title} clicked`)}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {stat.title}
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.count}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-4xl text-primary">
                        {stat.icon}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'doctors' && (
          <>
            {/* Doctors Header */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="text-gray-600 hover-elevate p-2 rounded-full"
                data-testid="button-back"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-10">
                Doctors
              </h2>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  search
                </span>
                <input
                  className="form-input w-full rounded-full border-gray-200 bg-gray-100 pl-10 pr-4 py-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search doctors"
                  type="text"
                  onChange={(e) => console.log('Search:', e.target.value)}
                  data-testid="input-search"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => console.log('Specialization filter clicked')}>
                  Specialization
                  <span className="material-symbols-outlined ml-1">arrow_drop_down</span>
                </Button>
                <Button variant="secondary" size="sm" onClick={() => console.log('Status filter clicked')}>
                  Status
                  <span className="material-symbols-outlined ml-1">arrow_drop_down</span>
                </Button>
              </div>
            </div>

            {/* Doctors List */}
            <div className="space-y-2">
              {doctors.map((doctor, index) => (
                <Card key={index} className="hover-elevate cursor-pointer" onClick={() => console.log(`${doctor.name} clicked`)}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        alt={doctor.name}
                        className="rounded-full h-12 w-12 object-cover"
                        src={doctor.avatar}
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-gray-900 text-base font-semibold leading-normal">
                          {doctor.name}
                        </p>
                        <p className="text-gray-500 text-sm font-normal leading-normal">
                          {doctor.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(doctor.status)}>
                        {doctor.status}
                      </Badge>
                      <span className="material-symbols-outlined text-gray-400">
                        chevron_right
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Doctor FAB */}
            <div className="fixed bottom-24 right-4 z-20">
              <Button
                size="icon"
                className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                onClick={() => console.log('Add doctor clicked')}
                data-testid="button-add-doctor"
              >
                <span className="material-symbols-outlined text-4xl">add</span>
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <nav className="flex justify-around px-2 py-2 max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center gap-1 w-1/5 hover-elevate ${
                activeTab === item.id ? 'text-primary' : 'text-gray-500'
              }`}
              onClick={() => {
                setActiveTab(item.id);
                console.log(`${item.label} nav clicked`);
              }}
              data-testid={`nav-${item.id}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}