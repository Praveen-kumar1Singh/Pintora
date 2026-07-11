"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from 'next/navigation';

export default function OTPPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }
    
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Identity verified successfully!");
      router.push('/profile');
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Two-Step Verification</h2>
        <p className="text-muted-foreground">Enter the 6-digit authentication code sent to your phone or email.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4 flex flex-col items-center lg:items-start">
          <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Authentication Code</Label>
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-14 text-lg font-bold" />
              <InputOTPSlot index={1} className="w-12 h-14 text-lg font-bold" />
              <InputOTPSlot index={2} className="w-12 h-14 text-lg font-bold" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="w-12 h-14 text-lg font-bold" />
              <InputOTPSlot index={4} className="w-12 h-14 text-lg font-bold" />
              <InputOTPSlot index={5} className="w-12 h-14 text-lg font-bold" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-12 uppercase tracking-widest font-semibold text-sm">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Account'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Didn't receive the code?{" "}
        <button className="font-semibold text-foreground hover:underline underline-offset-4" onClick={() => toast("Code resent!")}>
          Resend
        </button>
      </p>
    </motion.div>
  );
}
