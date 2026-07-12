export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin" />
        <h2 className="text-xl font-black uppercase tracking-[0.2em] animate-pulse text-foreground">
          Printora
        </h2>
      </div>
    </div>
  );
}
