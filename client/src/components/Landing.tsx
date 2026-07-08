import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocation } from "wouter";
import { useState } from "react";

const features = [
  {
    icon: "videocam",
    title: "Video Consultations",
    description: "See a doctor from your village — audio-only fallback for slow networks.",
    details:
      "Connect with qualified doctors through video or audio calls. When bandwidth is low, calls automatically fall back to audio-only so consultations never drop.",
    benefits: ["Works on 2G/3G networks", "Audio-only fallback", "Specialist referrals", "e-Prescriptions after every call"],
    tint: "bg-sky-100 text-sky-700",
  },
  {
    icon: "psychology",
    title: "AI Health Assistant",
    description: "Describe symptoms in simple words, get instant guidance.",
    details:
      "An AI-powered assistant that helps you understand symptoms, medicines and healthy habits — and tells you clearly when you should see a real doctor.",
    benefits: ["Symptom guidance", "Medicine information", "Health & diet tips", "Escalates emergencies to 108"],
    tint: "bg-violet-100 text-violet-700",
  },
  {
    icon: "folder_shared",
    title: "Offline Health Records",
    description: "Your medical history, available even without internet.",
    details:
      "Prescriptions, lab reports and vaccination records are stored on your device and synced when you're back online, so your history travels with you.",
    benefits: ["Works fully offline", "Syncs when online", "Easy sharing with doctors", "QR-based health wallet"],
    tint: "bg-amber-100 text-amber-700",
  },
  {
    icon: "local_pharmacy",
    title: "Medicine Availability",
    description: "Check pharmacy stock before you travel.",
    details:
      "Live stock updates from local pharmacies mean no more wasted trips. Reserve medicines and get reminders when refills are due.",
    benefits: ["Live stock from 10+ pharmacies", "Refill reminders", "SMS fallback", "Generic alternatives shown"],
    tint: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "language",
    title: "Multilingual",
    description: "Punjabi, Hindi and English — your language, your choice.",
    details:
      "The entire interface adapts to your preferred language so language is never a barrier to care.",
    benefits: ["ਪੰਜਾਬੀ, हिन्दी & English", "Simple, large-type UI", "Voice assistance planned", "Built for first-time users"],
    tint: "bg-rose-100 text-rose-700",
  },
  {
    icon: "support_agent",
    title: "24/7 Support",
    description: "Helplines and emergency routing, day and night.",
    details:
      "Round-the-clock helpline access with direct routing to the 108 emergency service when it matters most.",
    benefits: ["24/7 helpline", "Direct 108 routing", "Care follow-ups", "Community health camps"],
    tint: "bg-indigo-100 text-indigo-700",
  },
];

const stats = [
  { label: "Villages served", value: "173" },
  { label: "Doctors onboard", value: "500+" },
  { label: "Partner pharmacies", value: "100+" },
  { label: "Support", value: "24/7" },
];

const steps = [
  { icon: "translate", title: "Choose your language", text: "Punjabi, Hindi or English — the app adapts to you." },
  { icon: "stethoscope", title: "Describe your problem", text: "Use the AI symptom checker or browse available doctors." },
  { icon: "videocam", title: "Consult a doctor", text: "Join a video or audio call — no travel, no waiting rooms." },
  { icon: "receipt_long", title: "Get your e-prescription", text: "Saved to your health wallet, with pharmacy stock checked nearby." },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button className="flex items-center gap-2.5" onClick={() => scrollTo("top")} data-testid="link-logo">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="material-symbols-outlined text-xl">medical_services</span>
            </span>
            <span className="font-[Lexend] text-xl font-bold tracking-tight text-foreground">
              Nabha<span className="text-primary">Seva</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              ["Features", "features"],
              ["How it works", "how-it-works"],
              ["About", "about"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <Button key={id} variant="ghost" onClick={() => scrollTo(id)} data-testid={`nav-${id}`}>
                {label}
              </Button>
            ))}
            <Button className="ml-2" onClick={() => navigate("/login")} data-testid="button-signin">
              Sign in
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Button size="sm" onClick={() => navigate("/login")} data-testid="button-signin-mobile">
              Sign in
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">
              <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t bg-background px-4 py-2 md:hidden">
            {[
              ["Features", "features"],
              ["How it works", "how-it-works"],
              ["About", "about"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <Button key={id} variant="ghost" className="w-full justify-start" onClick={() => scrollTo(id)}>
                {label}
              </Button>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-teal-50 via-background to-background dark:from-teal-950/30" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1.5 text-xs font-medium">
                <span className="material-symbols-outlined text-sm text-primary">verified</span>
                Telemedicine for 173 villages around Nabha, Punjab
              </Badge>
              <h1 className="font-[Lexend] text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Healthcare that
                <span className="text-primary"> reaches every village</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Video consultations, an AI health assistant, offline health records and live pharmacy stock — built
                for low bandwidth, in Punjabi, Hindi and English.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-8 text-base" onClick={() => navigate("/login")} data-testid="button-get-started">
                  Get started
                  <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base" onClick={() => navigate("/patient")} data-testid="button-explore-demo">
                  Explore the demo
                </Button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="material-symbols-outlined text-base text-red-500">emergency</span>
                Medical emergency? Call <a href="tel:108" className="font-semibold text-foreground underline underline-offset-2">108</a> immediately.
              </p>
            </div>

            <div className="relative">
              <div
                className="aspect-[4/3] w-full rounded-3xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, rgba(13,148,136,0.15), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
                }}
                role="img"
                aria-label="Healthcare worker consulting a patient"
              />
              <Card className="absolute -bottom-5 left-4 shadow-lg sm:left-8">
                <CardContent className="flex items-center gap-3 p-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <span className="material-symbols-outlined">videocam</span>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Dr. Priya is online</p>
                    <p className="text-xs text-muted-foreground">Next slot in 10 min</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="absolute -top-4 right-4 hidden shadow-lg sm:block sm:right-8">
                <CardContent className="flex items-center gap-3 p-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <span className="material-symbols-outlined">psychology</span>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">AI Assistant</p>
                    <p className="text-xs text-muted-foreground">Ask about any symptom</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-card">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 py-10 sm:px-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-2 text-center">
                <p className="font-[Lexend] text-3xl font-extrabold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[Lexend] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything rural care needs, in one app
            </h2>
            <p className="mt-4 text-muted-foreground">
              Designed around the realities of rural Punjab: patchy networks, long travel distances and language diversity.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Dialog key={feature.title}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer transition-shadow hover:shadow-lg" data-testid={`card-feature-${feature.icon}`}>
                    <CardContent className="p-6">
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tint}`}>
                        <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                      <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Learn more
                        <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
                          arrow_forward
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.tint}`}>
                        <span className="material-symbols-outlined">{feature.icon}</span>
                      </span>
                      {feature.title}
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.details}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 border-y bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[Lexend] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How it works</h2>
              <p className="mt-4 text-muted-foreground">From symptom to prescription in four simple steps.</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Step {index + 1}</p>
                  <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-[Lexend] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why NabhaSeva exists
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Nabha's Civil Hospital serves <strong className="text-foreground">173 villages with only 11 doctors</strong> for
                23 sanctioned posts. Patients travel for hours on poor roads and lose a day's wages — often to find the
                doctor unavailable or the medicine out of stock.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                NabhaSeva, built for the Government of Punjab's Department of Higher Education problem statement
                (SIH&nbsp;25018), closes that gap with telemedicine that works on weak networks, in the patient's own
                language, with records that live on the patient's phone.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: "route", title: "50% less travel", text: "Target reduction in unnecessary hospital trips." },
                { icon: "diversity_3", title: "200+ patients", text: "Onboarding goal across the region in 6 months." },
                { icon: "storefront", title: "10+ pharmacies", text: "Integrated for live medicine stock updates." },
                { icon: "wifi_off", title: "Offline-first", text: "Records and symptom checker work without internet." },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-5">
                    <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                    <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Contact */}
        <section id="contact" className="scroll-mt-20 bg-primary">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
            <h2 className="font-[Lexend] text-3xl font-bold tracking-tight text-primary-foreground">
              Bring the doctor to your doorstep
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Join NabhaSeva today — free for patients, in your language, on any phone.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base" onClick={() => navigate("/login")} data-testid="button-cta">
                Create your account
              </Button>
              <a
                href="mailto:help@nabhaseva.in"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/90 underline-offset-4 hover:underline"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                help@nabhaseva.in
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">medical_services</span>
            <span>NabhaSeva — Telemedicine for rural Punjab</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Helpline: 1800-123-4567</span>
            <span className="flex items-center gap-1 font-medium text-red-600">
              <span className="material-symbols-outlined text-base">emergency</span>
              Emergency: 108
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
