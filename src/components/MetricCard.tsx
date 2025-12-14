import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
  data?: number[];
}

export function MetricCard({ title, value, unit, icon: Icon, status, data }: MetricCardProps) {
  const statusColors = {
    normal: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
  };

  const chartData = data?.map((val, idx) => ({ value: val, index: idx })) || [];

  return (
    <Card className="p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl text-gray-800">{value.toFixed(1)}</span>
              <span className="text-gray-500">{unit}</span>
            </div>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
      </div>
      
      {chartData.length > 0 && (
        <div className="h-16 -mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4CAF50" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
