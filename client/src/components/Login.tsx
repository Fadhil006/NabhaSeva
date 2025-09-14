import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Login() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const roles = [
    { id: 'patient' as const, label: 'Patient', icon: 'personal_injury', color: 'bg-blue-100 text-blue-800' },
    { id: 'doctor' as const, label: 'Doctor', icon: 'stethoscope', color: 'bg-green-100 text-green-800' },
    { id: 'admin' as const, label: 'Admin', icon: 'admin_panel_settings', color: 'bg-purple-100 text-purple-800' }
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUpForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!signUpData.name) newErrors.name = 'Name is required';
    if (!signUpData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(signUpData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!signUpData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with demo credentials
    setTimeout(() => {
      const demoCredentials = {
        'patient@demo.com': 'patient123',
        'doctor@demo.com': 'doctor123',
        'admin@demo.com': 'admin123'
      };
      
      const validCredential = Object.entries(demoCredentials).find(
        ([demoEmail, demoPassword]) => demoEmail === email && demoPassword === password
      );
      
      if (validCredential || email.includes('demo')) {
        toast({
          title: "Login Successful",
          description: `Welcome ${selectedRole}!`,
        });
        
        // Navigate based on role
        switch (selectedRole) {
          case 'patient':
            navigate('/patient');
            break;
          case 'doctor':
            navigate('/doctor');
            break;
          case 'admin':
            navigate('/admin');
            break;
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try demo credentials.",
          variant: "destructive"
        });
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleResetPassword = () => {
    if (!resetEmail || !validateEmail(resetEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reset Link Sent",
      description: "Password reset link has been sent to your email.",
    });
    setShowForgotPassword(false);
    setResetEmail('');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignUpForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Account Created",
      description: "Your account has been created successfully!",
    });
    setShowSignUp(false);
    setSignUpData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });
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
            {/* Demo Credentials Info */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <div className="text-xs text-blue-800">
                  <p className="font-semibold mb-1">Demo Credentials:</p>
                  <p>Patient: patient@demo.com / patient123</p>
                  <p>Doctor: doctor@demo.com / doctor123</p>
                  <p>Admin: admin@demo.com / admin123</p>
                </div>
              </CardContent>
            </Card>

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
                      setErrors({}); // Clear errors when role changes
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  className={errors.email ? 'border-red-500' : ''}
                  data-testid="input-email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({...errors, password: ''});
                  }}
                  className={errors.password ? 'border-red-500' : ''}
                  data-testid="input-password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
                onClick={() => setShowSignUp(true)}
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

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div>
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleResetPassword}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Send Reset Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                placeholder="Enter your full name"
                value={signUpData.name}
                onChange={(e) => {
                  setSignUpData({...signUpData, name: e.target.value});
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={signUpData.email}
                onChange={(e) => {
                  setSignUpData({...signUpData, email: e.target.value});
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Label htmlFor="signup-phone">Phone Number</Label>
              <Input
                id="signup-phone"
                placeholder="Enter your phone number"
                value={signUpData.phone}
                onChange={(e) => {
                  setSignUpData({...signUpData, phone: e.target.value});
                  if (errors.phone) setErrors({...errors, phone: ''});
                }}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Enter your password"
                value={signUpData.password}
                onChange={(e) => {
                  setSignUpData({...signUpData, password: e.target.value});
                  if (errors.password) setErrors({...errors, password: ''});
                }}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <Label htmlFor="signup-confirm">Confirm Password</Label>
              <Input
                id="signup-confirm"
                type="password"
                placeholder="Confirm your password"
                value={signUpData.confirmPassword}
                onChange={(e) => {
                  setSignUpData({...signUpData, confirmPassword: e.target.value});
                  if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                }}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSignUp(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Create Account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}