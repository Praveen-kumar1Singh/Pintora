export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center relative">
        {/* Ambient glow */}
        <div className="absolute w-48 h-48 bg-foreground/5 blur-3xl rounded-full animate-pulse" />
        
        {/* Brand Text */}
        <h2 
          className="text-2xl md:text-4xl font-heading font-black uppercase tracking-[0.2em] text-foreground relative z-10"
          style={{ animation: 'pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        >
          Printora
        </h2>
        
        {/* Loading track */}
        <div className="mt-6 w-32 h-[2px] bg-muted overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-foreground w-1/3" style={{ animation: 'slide-track 1.5s ease-in-out infinite' }} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-brand {
          0%, 100% { opacity: 1; filter: blur(0px); transform: scale(1); }
          50% { opacity: 0.6; filter: blur(1px); transform: scale(0.98); }
        }
        @keyframes slide-track {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </div>
  );
}
