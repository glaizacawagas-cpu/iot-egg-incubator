import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Thermometer, Droplet, RotateCw, Fan } from 'lucide-react';
import { useState } from 'react';

export function Controller() {
  const [targetTemp, setTargetTemp] = useState([37.5]);
  const [targetHumidity, setTargetHumidity] = useState([60]);
  const [autoTurnEnabled, setAutoTurnEnabled] = useState(true);
  const [fanAutoMode, setFanAutoMode] = useState(true);
  const [fanSpeed, setFanSpeed] = useState([50]);

  const handleApplyTemp = () => {
    alert(`Temperature set to ${targetTemp[0]}°C`);
  };

  const handleApplyHumidity = () => {
    alert(`Humidity set to ${targetHumidity[0]}%`);
  };

  const handleManualTurn = () => {
    alert('Eggs turned manually!');
  };

  const handleApplyFan = () => {
    alert(`Fan speed set to ${fanSpeed[0]}%`);
  };

  return (
    <div className="p-4 md:p-6 pb-20 lg:pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Temperature Control */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <Thermometer className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-gray-800">Temperature Control</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-600">Target Temperature</label>
                <span className="text-gray-800">{targetTemp[0].toFixed(1)}°C</span>
              </div>
              <Slider
                value={targetTemp}
                onValueChange={setTargetTemp}
                min={35}
                max={40}
                step={0.1}
                className="mb-4"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Current</p>
                <p className="text-gray-800">37.5°C</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Range</p>
                <p className="text-gray-800">35-40°C</p>
              </div>
            </div>
            
            <Button onClick={handleApplyTemp} className="w-full bg-primary hover:bg-primary/90">
              Apply Settings
            </Button>
          </div>
        </Card>

        {/* Humidity Control */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-accent/10">
              <Droplet className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-gray-800">Humidity Control</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-600">Target Humidity</label>
                <span className="text-gray-800">{targetHumidity[0]}%</span>
              </div>
              <Slider
                value={targetHumidity}
                onValueChange={setTargetHumidity}
                min={40}
                max={80}
                step={1}
                className="mb-4"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Current</p>
                <p className="text-gray-800">60%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Range</p>
                <p className="text-gray-800">40-80%</p>
              </div>
            </div>
            
            <Button onClick={handleApplyHumidity} className="w-full bg-accent hover:bg-accent/90">
              Apply Settings
            </Button>
          </div>
        </Card>

        {/* Egg Turner Control */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-secondary/10">
              <RotateCw className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-gray-800">Egg Turner Control</h3>
          </div>
          
          <div className="space-y-4">
            <Button onClick={handleManualTurn} className="w-full bg-secondary hover:bg-secondary/90">
              Manual Turn
            </Button>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Auto Turn Mode</span>
              <Switch checked={autoTurnEnabled} onCheckedChange={setAutoTurnEnabled} />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Last Turn</span>
                <span className="text-gray-800">10:00 AM</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Next Turn</span>
                <span className="text-gray-800">{autoTurnEnabled ? '12:00 PM' : 'Manual'}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Turn Interval</span>
                <span className="text-gray-800">2 hours</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Fan Control */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-blue-100">
              <Fan className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-gray-800">Fan Control</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Auto Mode</span>
              <Switch checked={fanAutoMode} onCheckedChange={setFanAutoMode} />
            </div>

            {!fanAutoMode && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-600">Fan Speed</label>
                  <span className="text-gray-800">{fanSpeed[0]}%</span>
                </div>
                <Slider
                  value={fanSpeed}
                  onValueChange={setFanSpeed}
                  min={0}
                  max={100}
                  step={5}
                  className="mb-4"
                />
                <Button onClick={handleApplyFan} className="w-full bg-blue-600 hover:bg-blue-700">
                  Apply Speed
                </Button>
              </div>
            )}

            {fanAutoMode && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Automatic Mode Active</p>
                <p className="text-gray-800">Fan speed adjusts based on temperature</p>
              </div>
            )}
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Current Speed</span>
                <span className="text-gray-800">{fanAutoMode ? 'Auto (65%)' : `${fanSpeed[0]}%`}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600">Running</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Runtime Today</span>
                <span className="text-gray-800">8.5 hours</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
