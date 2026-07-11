"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <MailCheck className="w-8 h-8 text-primary" />
      </div>
      
      <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Verify your email</h2>
      
      <p className="text-muted-foreground mb-8">
        We've sent a verification link to <span className="font-semibold text-foreground">you@example.com</span>. 
        Click the link in the email to verify your account.
      </p>

      <div className="space-y-4">
        <Button className="w-full h-12 uppercase tracking-widest font-semibold text-sm">
          Resend Verification Email
        </Button>
        <Link href="/auth/login" className="inline-block w-full">
          <Button variant="outline" className="w-full h-12">
            Back to login
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
