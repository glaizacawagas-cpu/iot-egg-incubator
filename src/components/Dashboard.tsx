import { Thermometer, Droplet, RotateCw } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export function Dashboard() {
  const [temperature, setTemperature] = useState(37.5);
  const [humidity, setHumidity] = useState(60);
  const [autoTurnEnabled, setAutoTurnEnabled] = useState(true);
  const [tempHistory, setTempHistory] = useState<number[]>([37.2, 37.3, 37.4, 37.5, 37.6, 37.5, 37.4, 37.5]);
  const [humidityHistory, setHumidityHistory] = useState<number[]>([58, 59, 60, 61, 60, 59, 60, 60]);

  const [chartData, setChartData] = useState(() => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${23 - i}h`,
      temperature: 37 + Math.random() * 2,
      humidity: 58 + Math.random() * 4,
    })).reverse();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      const newTemp = 37 + Math.random() * 1.5;
      const newHumidity = 58 + Math.random() * 4;
      
      setTemperature(newTemp);
      setHumidity(newHumidity);
      
      setTempHistory(prev => [...prev.slice(-7), newTemp]);
      setHumidityHistory(prev => [...prev.slice(-7), newHumidity]);
      
      setChartData(prev => [
        ...prev.slice(1),
        {
          time: 'Now',
          temperature: newTemp,
          humidity: newHumidity,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTurnEggs = () => {
    alert('Eggs turned manually!');
  };

  const getStatus = (value: number, min: number, max: number) => {
    if (value < min || value > max) return 'critical';
    if (value < min + 0.5 || value > max - 0.5) return 'warning';
    return 'normal';
  };

  return (
    <div className="p-4 md:p-6 pb-20 lg:pb-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <MetricCard
          title="Temperature"
          value={temperature}
          unit="°C"
          icon={Thermometer}
          status={getStatus(temperature, 37, 38)}
          data={tempHistory}
        />
        <MetricCard
          title="Humidity"
          value={humidity}
          unit="%"
          icon={Droplet}
          status={getStatus(humidity, 55, 65)}
          data={humidityHistory}
        />
        <Card className="p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10">
                <RotateCw className="h-6 w-6 text-accent" />
              </div>
              <p className="text-gray-600">Egg Turner</p>
            </div>
            <div className={`w-3 h-3 rounded-full ${autoTurnEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </div>
          <div className="space-y-4">
            <Button onClick={handleTurnEggs} className="w-full bg-accent hover:bg-accent/90">
              Turn Eggs Now
            </Button>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto Mode</span>
              <Switch checked={autoTurnEnabled} onCheckedChange={setAutoTurnEnabled} />
            </div>
            <div className="text-sm text-gray-500">
              Last turn: 10:00 AM<br />
              Next turn: {autoTurnEnabled ? '12:00 PM' : 'Manual'}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Environment Chart */}
        <Card className="lg:col-span-2 p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 className="mb-4 text-gray-800">24-Hour Environmental Data</h3>
          <div className="h-64 md:h-80 overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#2196F3"
                  strokeWidth={2}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Status Panel */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 className="mb-4 text-gray-800">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-gray-600">Incubator Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-green-600">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-gray-600">Next Scheduled Turn</span>
              <span className="text-gray-800">01:30 PM</span>
            </div>
            <div>
              <p className="text-gray-800 mb-2">System Logs</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="p-2 bg-gray-50 rounded">
                  <p>Eggs turned at 10:00 AM</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p>Humidity adjusted at 9:00 AM</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p>Temperature stable</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
