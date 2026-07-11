import { Button } from '@/components/ui/button';

export default function AdminSettings() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Settings</h1>
        <p className="text-muted-foreground">Manage your store preferences and configurations.</p>
      </div>

      <div className="bg-background rounded-xl border shadow-sm divide-y">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Store Information</h3>
            <p className="text-sm text-muted-foreground">Update your store name, contact email, and phone number.</p>
          </div>
          <Button variant="outline">Manage</Button>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Payment Gateways</h3>
            <p className="text-sm text-muted-foreground">Configure Razorpay, Stripe, and COD settings.</p>
          </div>
          <Button variant="outline">Configure</Button>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Shipping Zones</h3>
            <p className="text-sm text-muted-foreground">Set up domestic and international shipping rates.</p>
          </div>
          <Button variant="outline">Edit Zones</Button>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1 text-destructive">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">Pause or deactivate your store.</p>
          </div>
          <Button variant="destructive">Deactivate Store</Button>
        </div>
      </div>
    </div>
  );
}
