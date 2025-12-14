import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';

interface Schedule {
  id: number;
  time: string;
  status: 'active' | 'inactive';
}

export function Scheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [newTime, setNewTime] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, time: '02:00 AM', status: 'active' },
    { id: 2, time: '04:00 AM', status: 'active' },
    { id: 3, time: '06:00 AM', status: 'active' },
    { id: 4, time: '08:00 AM', status: 'active' },
    { id: 5, time: '10:00 AM', status: 'active' },
    { id: 6, time: '12:00 PM', status: 'active' },
    { id: 7, time: '02:00 PM', status: 'inactive' },
    { id: 8, time: '04:00 PM', status: 'active' },
  ]);

  const handleAddSchedule = () => {
    if (newTime) {
      const newSchedule: Schedule = {
        id: Date.now(),
        time: newTime,
        status: 'active',
      };
      setSchedules([...schedules, newSchedule].sort((a, b) => a.time.localeCompare(b.time)));
      setNewTime('');
    }
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const toggleScheduleStatus = (id: number) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
  };

  return (
    <div className="p-4 md:p-6 pb-20 lg:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Calendar and Time Picker */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 className="mb-4 text-gray-800">Schedule New Turn</h3>
          
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Select Time</label>
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button onClick={handleAddSchedule} className="w-full bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </Card>

        {/* Schedule List */}
        <Card className="lg:col-span-2 p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-gray-800">Turn Schedules</h3>
            <Badge variant="secondary">{schedules.filter(s => s.status === 'active').length} Active</Badge>
          </div>
          
          <div className="space-y-2 md:space-y-3 max-h-96 overflow-y-auto">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 rounded-lg border-2 transition-all gap-2 ${
                  schedule.status === 'active'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className={`h-5 w-5 ${schedule.status === 'active' ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <p className="text-gray-800">{schedule.time}</p>
                    <p className="text-sm text-gray-500">Every day</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Badge variant={schedule.status === 'active' ? 'default' : 'secondary'}>
                    {schedule.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleScheduleStatus(schedule.id)}
                  >
                    {schedule.status === 'active' ? 'Disable' : 'Enable'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 24-Hour Timeline */}
        <Card className="lg:col-span-3 p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 className="mb-4 text-gray-800">Next 24-Hour Turn Plan</h3>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>12 AM</span>
            </div>
            
            <div className="relative h-16 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                {schedules
                  .filter(s => s.status === 'active')
                  .map((schedule) => {
                    const [time, period] = schedule.time.split(' ');
                    const [hours, minutes] = time.split(':');
                    let hour = parseInt(hours);
                    if (period === 'PM' && hour !== 12) hour += 12;
                    if (period === 'AM' && hour === 12) hour = 0;
                    const position = ((hour + parseInt(minutes) / 60) / 24) * 100;
                    
                    return (
                      <div
                        key={schedule.id}
                        className="absolute top-0 bottom-0 w-1 bg-primary"
                        style={{ left: `${position}%` }}
                      >
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
                      </div>
                    );
                  })}
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Turns/Day</p>
                <p className="text-gray-800">{schedules.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Next Turn</p>
                <p className="text-gray-800">12:00 PM</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Turn Duration</p>
                <p className="text-gray-800">15 seconds</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Avg Interval</p>
                <p className="text-gray-800">2 hours</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
