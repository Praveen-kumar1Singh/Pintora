"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Reset link sent!");
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link href="/auth/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to login
      </Link>

      <div className="mb-10">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Reset Password</h2>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" required className="h-12" />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-12 uppercase tracking-widest font-semibold text-sm">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
          </Button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-muted/30 p-8 rounded-lg text-center border border-dashed"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Check your inbox</h3>
          <p className="text-muted-foreground text-sm mb-6">
            We've sent a password reset link to your email address. Please check your spam folder if you don't see it.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
            Try another email
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
