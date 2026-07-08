import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";

type Role = "patient" | "doctor" | "admin";

const roles: { id: Role; label: string; icon: string; description: string }[] = [
  { id: "patient", label: "Patient", icon: "personal_injury", description: "Book consultations & records" },
  { id: "doctor", label: "Doctor", icon: "stethoscope", description: "Manage appointments & patients" },
  { id: "admin", label: "Admin", icon: "admin_panel_settings", description: "Platform oversight" },
];

const demoCredentials: Record<Role, { email: string; password: string }> = {
  patient: { email: "patient@demo.com", password: "patient123" },
  doctor: { email: "doctor@demo.com", password: "doctor123" },
  admin: { email: "admin@demo.com", password: "admin123" },
};

export default function Login() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [signUpData, setSignUpData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const goToDashboard = (role: Role) => {
    toast({ title: "Welcome!", description: `Signed in as ${role}.` });
    navigate(`/${role === "patient" ? "patient" : role}`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!validEmail(email)) newErrors.email = "Please enter a valid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    setTimeout(() => {
      const demo = demoCredentials[selectedRole];
      if ((email === demo.email && password === demo.password) || email.includes("demo")) {
        goToDashboard(selectedRole);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials — use a demo account below.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 600);
  };

  const handleDemoLogin = (role: Role) => {
    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
    goToDashboard(role);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!signUpData.name) newErrors.name = "Name is required";
    if (!validEmail(signUpData.email)) newErrors.signupEmail = "Please enter a valid email";
    if (!signUpData.phone) newErrors.phone = "Phone number is required";
    if (signUpData.password.length < 6) newErrors.signupPassword = "Password must be at least 6 characters";
    if (signUpData.password !== signUpData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    toast({ title: "Account created", description: "You can now sign in with your details." });
    setShowSignUp(false);
  };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12">
          <button className="flex items-center gap-2.5" onClick={() => navigate("/")} data-testid="link-home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
              <span className="material-symbols-outlined">medical_services</span>
            </span>
            <span className="font-[Lexend] text-2xl font-bold text-white">NabhaSeva</span>
          </button>
          <div>
            <h1 className="font-[Lexend] text-4xl font-bold leading-tight text-white">
              Quality healthcare,
              <br />
              one tap away.
            </h1>
            <p className="mt-4 max-w-md text-white/80">
              Serving 173 villages around Nabha with video consultations, AI health guidance and offline health
              records — in Punjabi, Hindi and English.
            </p>
          </div>
          <p className="text-sm text-white/70">Government of Punjab · Problem Statement SIH 25018</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex min-h-screen flex-col justify-center px-4 py-10 sm:px-12 lg:min-h-0">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="material-symbols-outlined text-xl">medical_services</span>
            </span>
            <span className="font-[Lexend] text-xl font-bold text-foreground">
              Nabha<span className="text-primary">Seva</span>
            </span>
          </div>

          <h2 className="font-[Lexend] text-2xl font-bold text-foreground">Sign in</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Choose your role and enter your credentials.</p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`rounded-xl border-2 p-3 text-center transition-colors ${
                  selectedRole === role.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/40"
                }`}
                data-testid={`role-${role.id}`}
              >
                <span
                  className={`material-symbols-outlined text-2xl ${
                    selectedRole === role.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {role.icon}
                </span>
                <p className="mt-1 text-sm font-semibold text-foreground">{role.label}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={errors.email ? "border-destructive" : ""}
                data-testid="input-email"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className={errors.password ? "border-destructive" : ""}
                data-testid="input-password"
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <Button type="submit" className="h-11 w-full text-base" disabled={loading} data-testid="button-login">
              {loading ? (
                <>
                  <span className="material-symbols-outlined mr-2 animate-spin">progress_activity</span>
                  Signing in…
                </>
              ) : (
                `Sign in as ${roles.find((r) => r.id === selectedRole)?.label}`
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-3 text-muted-foreground">or try a demo account</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <Button
                key={role.id}
                variant="outline"
                className="h-auto flex-col gap-1 py-3"
                onClick={() => handleDemoLogin(role.id)}
                data-testid={`button-demo-${role.id}`}
              >
                <span className="material-symbols-outlined text-primary">{role.icon}</span>
                <span className="text-xs">Demo {role.label}</span>
              </Button>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to NabhaSeva?{" "}
            <button className="font-semibold text-primary hover:underline" onClick={() => setShowSignUp(true)} data-testid="button-signup">
              Create an account
            </button>
          </p>

          <Card className="mt-8 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40">
            <CardContent className="flex items-center gap-3 p-4">
              <span className="material-symbols-outlined text-red-500">emergency</span>
              <p className="text-sm text-red-700 dark:text-red-300">
                Medical emergency? Call{" "}
                <a href="tel:108" className="font-bold underline underline-offset-2">
                  108
                </a>{" "}
                for immediate assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="signup-name">Full name</Label>
              <Input
                id="signup-name"
                placeholder="Your full name"
                value={signUpData.name}
                onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              />
              {errors.signupEmail && <p className="text-xs text-destructive">{errors.signupEmail}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-phone">Phone number</Label>
              <Input
                id="signup-phone"
                placeholder="+91"
                value={signUpData.phone}
                onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                />
                {errors.signupPassword && <p className="text-xs text-destructive">{errors.signupPassword}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-confirm">Confirm</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
