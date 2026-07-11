import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold uppercase tracking-wider mb-8">Account Settings</h2>
      
      <div className="space-y-12">
        {/* Password Reset */}
        <section>
          <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2">Change Password</h3>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Current Password</label>
              <Input type="password" placeholder="••••••••" className="h-12 bg-muted/50 border-transparent focus-visible:ring-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">New Password</label>
              <Input type="password" placeholder="••••••••" className="h-12 bg-muted/50 border-transparent focus-visible:ring-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Confirm New Password</label>
              <Input type="password" placeholder="••••••••" className="h-12 bg-muted/50 border-transparent focus-visible:ring-foreground" />
            </div>
            <Button size="lg" className="uppercase tracking-widest font-semibold px-8 h-12 shadow-lg">
              Update Password
            </Button>
          </form>
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Newsletter</p>
                <p className="text-sm text-muted-foreground">Receive updates on new drops and promotions.</p>
              </div>
              <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-primary-foreground rounded-full absolute right-1 top-1" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order Updates (SMS)</p>
                <p className="text-sm text-muted-foreground">Receive text messages about your order status.</p>
              </div>
              <div className="w-10 h-6 bg-muted rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-background rounded-full absolute left-1 top-1 shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-8 border-t">
          <h3 className="text-lg font-bold text-red-500 uppercase tracking-wider mb-4">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="outline" className="text-red-500 hover:text-white hover:bg-red-500 border-red-500 uppercase tracking-widest font-semibold">
            Delete Account
          </Button>
        </section>
      </div>
    </div>
  );
}
