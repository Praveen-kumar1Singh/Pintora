import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side: Branding / Image */}
      <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618002621021-0a6b7d722d56?q=80&w=2938&auto=format&fit=crop"
          alt="Luxury Fashion"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 p-12 text-center text-white">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-6xl font-black uppercase tracking-tighter">Printora</h1>
          </Link>
          <p className="text-xl font-medium tracking-wide">Elevate Your Everyday Style.</p>
        </div>
      </div>
      
      {/* Right side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
