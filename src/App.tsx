import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Controller } from './components/Controller';
import { Scheduler } from './components/Scheduler';
import { DataLogs } from './components/DataLogs';
import { Settings } from './components/Settings';
import {
  LayoutDashboard,
  Sliders,
  Calendar,
  Database,
  Settings as SettingsIcon,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Alert, AlertDescription } from './components/ui/alert';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';

type Page = 'dashboard' | 'controller' | 'scheduler' | 'logs' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showTempWarning, setShowTempWarning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate random alerts
    const alertInterval = setInterval(() => {
      const random = Math.random();
      if (random > 0.7) {
        setShowTempWarning(true);
        toast.warning('Temperature exceeds 38°C', {
          description: 'Please check the incubator temperature settings.',
        });
        setTimeout(() => setShowTempWarning(false), 5000);
      } else if (random > 0.4 && random <= 0.5) {
        toast.info('Next egg turn scheduled in 30 minutes', {
          description: 'Auto-turn mode is active.',
        });
      }
    }, 30000);

    return () => clearInterval(alertInterval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'controller', label: 'Controller', icon: Sliders },
    { id: 'scheduler', label: 'Scheduler', icon: Calendar },
    { id: 'logs', label: 'Data Logs', icon: Database },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'controller':
        return <Controller />;
      case 'scheduler':
        return <Scheduler />;
      case 'logs':
        return <DataLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage={currentPage}
        onMenuClick={() => setMobileMenuOpen(true)}
      />
      
      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile Navigation Drawer */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <nav className="p-4 pt-6">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setCurrentPage(item.id as Page);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        currentPage === item.id
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)] w-full lg:w-auto">
          {/* Alerts */}
          {showTempWarning && (
            <div className="p-4 md:p-6 pb-0">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Warning: Temperature exceeds 38°C. Please check the incubator temperature settings.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <ul className="flex items-center justify-around p-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id as Page)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <Toaster />
    </div>
  );
}
