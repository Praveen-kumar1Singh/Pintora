"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password reset successfully!");
      router.push('/auth/login');
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Create New Password</h2>
        <p className="text-muted-foreground">Your new password must be different from previous used passwords.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password" className="uppercase tracking-wider text-xs font-bold text-muted-foreground">New Password</Label>
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            required 
            className="h-12" 
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-12 uppercase tracking-widest font-semibold text-sm">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
        </Button>
      </form>
    </motion.div>
  );
}
