"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      login({ id: 'usr_123', name: 'John Doe', email: email || 'john@example.com' });
      toast.success("Successfully logged in!");
      router.push('/profile');
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to your Printora account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            required 
            className="h-12" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Remember me
            </label>
          </div>
          <Link href="/auth/forgot-password" className="text-sm font-medium hover:underline underline-offset-4">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-12 uppercase tracking-widest font-semibold text-sm">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="flex-1 border-t"></div>
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Or continue with</span>
        <div className="flex-1 border-t"></div>
      </div>

      <div className="mt-6">
        <Button variant="outline" className="w-full h-12 font-medium">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.72 17.57V20.34H19.29C21.37 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.29 20.34L15.72 17.57C14.73 18.23 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.88 14.13H2.21V16.98C4.01 20.55 7.7 23 12 23Z" fill="#34A853"/>
            <path d="M5.88 14.13C5.66 13.47 5.54 12.76 5.54 12C5.54 11.24 5.66 10.53 5.88 9.87V7.02H2.21C1.47 8.5 1.05 10.2 1.05 12C1.05 13.8 1.47 15.5 2.21 16.98L5.88 14.13Z" fill="#FBBC05"/>
            <path d="M12 5.38C13.62 5.38 15.07 5.94 16.21 7.03L19.38 3.86C17.45 2.06 14.96 1 12 1C7.7 1 4.01 3.45 2.21 7.02L5.88 9.87C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="font-semibold text-foreground hover:underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
