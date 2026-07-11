import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold uppercase tracking-wider mb-8">Personal Information</h2>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">First Name</label>
            <Input defaultValue="John" className="h-12 bg-muted/50 border-transparent focus-visible:ring-foreground" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Last Name</label>
            <Input defaultValue="Doe" className="h-12 bg-muted/50 border-transparent focus-visible:ring-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Email Address</label>
          <Input type="email" defaultValue="john.doe@example.com" className="h-12 bg-muted/50 border-transparent focus-visible:ring-foreground" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Phone Number</label>
          <Input type="tel" defaultValue="+91 98765 43210" className="h-12 bg-muted/50 border-transparent focus-visible:ring-foreground" />
        </div>

        <div className="pt-6 border-t mt-8">
          <Button size="lg" className="uppercase tracking-widest font-semibold px-8 h-12 shadow-lg">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
