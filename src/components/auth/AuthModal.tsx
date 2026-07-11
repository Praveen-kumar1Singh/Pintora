"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthModal() {
  const router = useRouter();
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuthStore();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      login({ id: 'usr_123', name: 'John Doe', email: email || 'john@example.com' });
      toast.success(isLoginView ? "Successfully logged in!" : "Account created successfully!");
      setAuthModalOpen(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setAuthModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-background border shadow-2xl rounded-xl p-8 z-50"
          >
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                {isLoginView ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {isLoginView ? 'Sign in to your Printora account to continue.' : 'Join Printora for exclusive premium access.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <div className="space-y-2">
                  <Label htmlFor="modal-name" className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground">Full Name</Label>
                  <Input id="modal-name" type="text" placeholder="John Doe" required className="h-12" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="modal-email" className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground">Email</Label>
                <Input 
                  id="modal-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  className="h-12" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-password" className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground">Password</Label>
                <div className="relative">
                  <Input 
                    id="modal-password" 
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

            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex-1 border-t"></div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Or</span>
              <div className="flex-1 border-t"></div>
            </div>

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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
