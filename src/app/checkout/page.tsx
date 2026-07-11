"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CreditCard, Truck, ShieldCheck, Lock, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const steps = [
  { id: 1, title: 'Shipping' },
  { id: 2, title: 'Delivery' },
  { id: 3, title: 'Payment' },
  { id: 4, title: 'Review' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state: any) => state.cart);
  const cartItems = cart?.lines?.edges?.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.merchandise.product.title,
    quantity: edge.node.quantity,
    price: parseFloat(edge.node.cost.totalAmount.amount) / edge.node.quantity,
    images: { edges: edge.node.merchandise.product.images.edges },
    selectedColor: edge.node.merchandise.title,
    selectedSize: ''
  })) || [];
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for mocked inputs
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [coupon, setCoupon] = useState('');

  // Cart calculations
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const shipping = deliveryMethod === 'express' ? 199 : (subtotal > 1499 ? 0 : 99);
  const total = subtotal + shipping;

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate API call and payment processing
    setTimeout(() => {
      setIsLoading(false);
      // Randomly fail sometimes for demonstration, or just succeed
      if (Math.random() > 0.9) {
        router.push('/checkout/failed');
      } else {
        router.push('/checkout/success');
        // Clear cart in real life
      }
    }, 2000);
  };

  // Prevent accessing checkout with empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Add some items before proceeding to checkout.</p>
        <Link href="/shop">
          <Button className="uppercase tracking-widest font-bold">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="bg-muted/10 min-h-screen pb-24">
        {/* Header */}
      <header className="bg-background border-b py-6 mb-8 md:mb-12">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter">
            Printora
          </Link>
          <div className="flex items-center text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            <Lock className="w-4 h-4 mr-2" /> Secure Checkout
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Main Content (Steps) */}
          <div className="flex-1">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-12 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:bg-muted before:w-full before:-z-10">
              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                return (
                  <div key={step.id} className="flex flex-col items-center bg-muted/10 px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                      isActive ? 'border-primary bg-background text-primary' : 
                      isCompleted ? 'border-primary bg-primary text-primary-foreground' : 
                      'border-muted bg-background text-muted-foreground'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest mt-2 font-bold ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-background p-6 md:p-10 rounded-xl border shadow-sm"
              >
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black uppercase tracking-tighter border-b pb-4">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input defaultValue="123 Fashion Street, Bandra West" />
                    </div>
                    <div className="space-y-2">
                      <Label>Apartment, suite, etc. (optional)</Label>
                      <Input defaultValue="Apt 4B" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input defaultValue="Mumbai" />
                      </div>
                      <div className="space-y-2">
                        <Label>Postal Code</Label>
                        <Input defaultValue="400050" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input defaultValue="+91 98765 43210" />
                    </div>
                    <div className="flex items-center space-x-2 pt-4">
                      <Checkbox id="save-info" defaultChecked />
                      <label htmlFor="save-info" className="text-sm font-medium leading-none">
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black uppercase tracking-tighter border-b pb-4">Delivery Method</h2>
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-4">
                      <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${deliveryMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`} onClick={() => setDeliveryMethod('standard')}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer font-bold">Standard Shipping</Label>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{subtotal > 1499 ? 'Free' : '₹99'}</p>
                          <p className="text-xs text-muted-foreground">3-5 Business Days</p>
                        </div>
                      </div>
                      <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${deliveryMethod === 'express' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`} onClick={() => setDeliveryMethod('express')}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer font-bold">Express Shipping</Label>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹199</p>
                          <p className="text-xs text-muted-foreground">1-2 Business Days</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black uppercase tracking-tighter border-b pb-4">Payment Method</h2>
                    <p className="text-sm text-muted-foreground flex items-center mb-6"><Lock className="w-4 h-4 mr-2" /> All transactions are secure and encrypted.</p>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className={`p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'credit-card' ? 'border-primary bg-primary/5' : 'border-muted'}`}>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('credit-card')}>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <Label htmlFor="credit-card" className="cursor-pointer font-bold flex items-center">
                              Credit / Debit Card <CreditCard className="w-4 h-4 ml-2" />
                            </Label>
                          </div>
                        </div>
                        {paymentMethod === 'credit-card' && (
                          <div className="mt-4 pt-4 border-t space-y-4">
                            <Input placeholder="Card Number" />
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="Expiration Date (MM/YY)" />
                              <Input placeholder="Security Code (CVV)" />
                            </div>
                            <Input placeholder="Name on Card" />
                          </div>
                        )}
                      </div>

                      <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`} onClick={() => setPaymentMethod('upi')}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="cursor-pointer font-bold">UPI / Google Pay</Label>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`} onClick={() => setPaymentMethod('cod')}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="cursor-pointer font-bold">Cash on Delivery (COD)</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black uppercase tracking-tighter border-b pb-4">Review Your Order</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2">Shipping To</h4>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">123 Fashion Street, Bandra West, Apt 4B<br/>Mumbai, 400050</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2">Method</h4>
                        <p className="font-medium flex items-center"><Truck className="w-4 h-4 mr-2" /> {deliveryMethod === 'express' ? 'Express Shipping (1-2 Days)' : 'Standard Shipping (3-5 Days)'}</p>
                      </div>

                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2">Payment</h4>
                        <p className="font-medium flex items-center">
                          {paymentMethod === 'credit-card' && <><CreditCard className="w-4 h-4 mr-2" /> Credit Card ending in 4242</>}
                          {paymentMethod === 'upi' && 'UPI / Google Pay'}
                          {paymentMethod === 'cod' && 'Cash on Delivery'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              {currentStep > 1 ? (
                <Button variant="ghost" onClick={handleBack} className="uppercase tracking-widest font-bold">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <Link href="/shop">
                  <Button variant="ghost" className="uppercase tracking-widest font-bold">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Return to Shop
                  </Button>
                </Link>
              )}
              
              {currentStep < 4 ? (
                <Button onClick={handleNext} className="uppercase tracking-widest font-bold px-8">
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handlePlaceOrder} disabled={isLoading} className="uppercase tracking-widest font-bold px-8 h-12 bg-primary text-primary-foreground text-lg">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5 mr-2" /> Place Order</>}
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar (Order Summary) */}
          <div className="w-full lg:w-[400px] xl:w-[450px]">
            <div className="bg-background p-6 md:p-8 rounded-xl border shadow-sm sticky top-24">
              <h3 className="text-xl font-black uppercase tracking-tighter border-b pb-4 mb-6">Order Summary</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-muted rounded-md overflow-hidden shrink-0 border">
                      <Image src={item.images.edges[0]?.node.url} alt={item.title} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm leading-tight line-clamp-2 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Size: M</p>
                      <p className="font-bold text-sm mt-1">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 pt-6 border-t space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Gift card or discount code" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button variant="secondary">Apply</Button>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>Calculated at next step</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t flex justify-between items-end">
                <span className="text-lg font-black uppercase tracking-tighter">Total</span>
                <span className="text-3xl font-black">
                  <span className="text-sm font-medium text-muted-foreground mr-1">INR</span>
                  ₹{total}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
