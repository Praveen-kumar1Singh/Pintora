"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { useGoogleLogin } from '@react-oauth/google';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  
  const { login } = useAuthStore();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleSuccess = () => {
    router.push(redirectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call for email/password
    setTimeout(() => {
      setIsLoading(false);
      login({ id: 'usr_123', name: 'John Doe', email: email || 'john@example.com' });
      toast.success(isLoginView ? "Successfully logged in!" : "Account created successfully!");
      handleSuccess();
    }, 1500);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const user = await res.json();
        
        login({
          id: user.sub,
          name: user.name || 'Google User',
          email: user.email || '',
        });
        toast.success("Successfully logged in with Google!");
        handleSuccess();
      } catch (error) {
        toast.error("Failed to fetch Google user profile.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Failed to sign in with Google. Please try again.");
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background border shadow-xl rounded-xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoginView ? 'Sign in to your Printora account to continue.' : 'Join Printora for exclusive premium access.'}
          </p>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full h-12 mb-4 font-semibold"
          onClick={() => handleGoogleLogin()}
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign in with Google
        </Button>

        <div className="mb-4 flex items-center justify-center space-x-4">
          <div className="flex-1 border-t"></div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Or with email</span>
          <div className="flex-1 border-t"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div className="space-y-2">
              <Label htmlFor="login-name" className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground">Full Name</Label>
              <Input id="login-name" type="text" placeholder="John Doe" required className="h-12" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="login-email" className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground">Email</Label>
            <Input 
              id="login-email" 
              type="email" 
              placeholder="you@example.com" 
              required 
              className="h-12" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password" className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground">Password</Label>
            <div className="relative">
              <Input 
                id="login-password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                required 
                className="h-12 pr-10" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-12 mt-4 uppercase tracking-widest font-bold text-sm">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginView ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
          </span>
          {' '}
          <button 
            type="button"
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-bold hover:underline"
          >
            {isLoginView ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
