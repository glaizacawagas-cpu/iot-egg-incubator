import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Settings as SettingsIcon, Bell, Palette, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [incubatorName, setIncubatorName] = useState('Main Incubator');
  const [tempThreshold, setTempThreshold] = useState([38]);
  const [humidityThreshold, setHumidityThreshold] = useState([65]);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  return (
    <div className="p-4 md:p-6 pb-20 lg:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Device Settings */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-gray-800">Device Settings</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Incubator Name</label>
              <Input
                value={incubatorName}
                onChange={(e) => setIncubatorName(e.target.value)}
                placeholder="Enter incubator name"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-600">Temperature Threshold</label>
                <span className="text-gray-800">{tempThreshold[0]}°C</span>
              </div>
              <Slider
                value={tempThreshold}
                onValueChange={setTempThreshold}
                min={35}
                max={42}
                step={0.5}
              />
              <p className="text-xs text-gray-500 mt-2">
                Alert will trigger if temperature exceeds this value
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-600">Humidity Threshold</label>
                <span className="text-gray-800">{humidityThreshold[0]}%</span>
              </div>
              <Slider
                value={humidityThreshold}
                onValueChange={setHumidityThreshold}
                min={40}
                max={85}
                step={1}
              />
              <p className="text-xs text-gray-500 mt-2">
                Alert will trigger if humidity exceeds this value
              </p>
            </div>

            <div className="pt-4">
              <Button onClick={handleSaveSettings} className="w-full bg-primary hover:bg-primary/90">
                Save Device Settings
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-accent/10">
              <Bell className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-gray-800">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-800">Email Alerts</p>
                <p className="text-sm text-gray-500">Receive alerts via email</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-800">SMS Alerts</p>
                <p className="text-sm text-gray-500">Receive alerts via SMS</p>
              </div>
              <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                Configure alert preferences to stay informed about critical events and system status.
              </p>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Palette className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-gray-800">Appearance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-800">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">Theme Colors</p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="w-full h-12 rounded-lg bg-primary mb-2"></div>
                  <p className="text-xs text-gray-500 text-center">Primary</p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-12 rounded-lg bg-secondary mb-2"></div>
                  <p className="text-xs text-gray-500 text-center">Secondary</p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-12 rounded-lg bg-accent mb-2"></div>
                  <p className="text-xs text-gray-500 text-center">Accent</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Account */}
        <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-gray-100">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-gray-800">Account</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">admin@incubator.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </Card>

        {/* System Information */}
        <Card className="lg:col-span-2 p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 className="text-gray-800 mb-4">System Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Firmware Version</p>
              <p className="text-gray-800">v2.4.1</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Last Update</p>
              <p className="text-gray-800">Nov 10, 2025</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Uptime</p>
              <p className="text-gray-800">15 days, 8 hours</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Device ID</p>
              <p className="text-gray-800">INC-2025-001</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Network Status</p>
              <p className="text-green-600">Connected</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Storage Used</p>
              <p className="text-gray-800">2.3 GB / 8 GB</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
