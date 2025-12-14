import { Bell, User, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface HeaderProps {
  currentPage: string;
  onMenuClick: () => void;
}

export function Header({ currentPage, onMenuClick }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDateTimeMobile = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPageTitle = () => {
    return currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 sticky top-0 z-50" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-gray-800 hidden md:block">IoT-Based Egg Monitoring Incubator</h1>
          <h1 className="text-gray-800 md:hidden">Egg Monitor</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-gray-600 text-sm md:text-base hidden sm:block">{formatDateTime(currentTime)}</span>
          <span className="text-gray-600 text-xs sm:hidden">{formatDateTimeMobile(currentTime)}</span>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}
