import { MapPin, Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AddressesPage() {
  const addresses = [
    {
      id: 1,
      name: 'John Doe',
      type: 'Home',
      street: '123 Luxury Avenue, Block B',
      area: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      phone: '+91 98765 43210',
      isDefault: true,
    },
    {
      id: 2,
      name: 'John Doe',
      type: 'Work',
      street: '456 Business Park, Tower C',
      area: 'Cyber City',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      phone: '+91 98765 43210',
      isDefault: false,
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-wider">Saved Addresses</h2>
        <Button className="uppercase tracking-widest font-semibold h-10 shadow-lg">
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="border p-6 rounded-lg bg-card relative hover:shadow-md transition-shadow">
            {addr.isDefault && (
              <span className="absolute top-4 right-14 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                Default
              </span>
            )}
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-muted-foreground">
              <MoreVertical className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold text-lg uppercase tracking-wide">{addr.type}</h3>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground text-base mb-2">{addr.name}</p>
              <p>{addr.street}</p>
              <p>{addr.area}</p>
              <p>{addr.city}, {addr.state} {addr.pincode}</p>
              <p className="pt-2">Phone: {addr.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
