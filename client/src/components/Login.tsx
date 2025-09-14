import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'patient' as const, label: 'Patient', icon: 'personal_injury', color: 'bg-blue-100 text-blue-800' },
    { id: 'doctor' as const, label: 'Doctor', icon: 'stethoscope', color: 'bg-green-100 text-green-800' },
    { id: 'admin' as const, label: 'Admin', icon: 'admin_panel_settings', color: 'bg-purple-100 text-purple-800' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { email, password, role: selectedRole });
      setLoading(false);
      // Here you would typically redirect to the appropriate dashboard
    }, 1000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NabhaSeva</h1>
          <p className="text-gray-600">Sign in to access your healthcare dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                I am a:
              </Label>
              <div className="flex gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id);
                      console.log(`Role selected: ${role.label}`);
                    }}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all hover-elevate ${
                      selectedRole === role.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    data-testid={`role-${role.id}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-2xl text-primary">
                        {role.icon}
                      </span>
                      <Badge 
                        className={selectedRole === role.id ? role.color : 'bg-gray-100 text-gray-600'}
                      >
                        {role.label}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={loading}
                data-testid="button-login"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2">refresh</span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Additional Actions */}
            <div className="space-y-4">
              <button
                onClick={handleForgotPassword}
                className="w-full text-sm text-primary hover:underline"
                data-testid="button-forgot-password"
              >
                Forgot your password?
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSignUp}
                data-testid="button-signup"
              >
                Create New Account
              </Button>
            </div>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500">
                    emergency
                  </span>
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Medical Emergency?
                    </p>
                    <p className="text-sm text-red-600">
                      Call 108 for immediate assistance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Bridging rural gaps with smart care</p>
          <p className="mt-1">Available in Hindi & English</p>
        </div>
      </div>
    </div>
  );
}