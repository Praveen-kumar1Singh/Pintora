import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}

export function StatCard({ title, value, icon: Icon, trend, trendDirection = 'neutral' }: StatCardProps) {
  return (
    <div className="bg-background rounded-xl p-6 border shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-black tracking-tight">{value}</p>
        {trend && (
          <p className={`text-xs font-bold mt-2 flex items-center ${
            trendDirection === 'up' ? 'text-green-600' : 
            trendDirection === 'down' ? 'text-red-600' : 
            'text-muted-foreground'
          }`}>
            {trendDirection === 'up' && '↑ '}
            {trendDirection === 'down' && '↓ '}
            {trend} from last month
          </p>
        )}
      </div>
    </div>
  );
}
