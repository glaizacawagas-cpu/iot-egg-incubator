import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Download, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface LogEntry {
  id: number;
  dateTime: string;
  temperature: string;
  humidity: string;
  action: string;
  remarks: string;
}

export function DataLogs() {
  const [filterAction, setFilterAction] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      dateTime: '2025-11-12 10:00',
      temperature: '37.5°C',
      humidity: '60%',
      action: 'Turned Eggs',
      remarks: 'Normal',
    },
    {
      id: 2,
      dateTime: '2025-11-12 09:30',
      temperature: '38.0°C',
      humidity: '58%',
      action: 'Adjusted Temp',
      remarks: 'Slight Increase',
    },
    {
      id: 3,
      dateTime: '2025-11-12 08:00',
      temperature: '37.3°C',
      humidity: '61%',
      action: 'Turned Eggs',
      remarks: 'Normal',
    },
    {
      id: 4,
      dateTime: '2025-11-12 07:45',
      temperature: '37.2°C',
      humidity: '59%',
      action: 'Adjusted Humidity',
      remarks: 'Normal',
    },
    {
      id: 5,
      dateTime: '2025-11-12 06:00',
      temperature: '37.4°C',
      humidity: '60%',
      action: 'Turned Eggs',
      remarks: 'Normal',
    },
    {
      id: 6,
      dateTime: '2025-11-12 04:00',
      temperature: '37.6°C',
      humidity: '62%',
      action: 'Turned Eggs',
      remarks: 'Normal',
    },
    {
      id: 7,
      dateTime: '2025-11-12 02:00',
      temperature: '37.5°C',
      humidity: '60%',
      action: 'Turned Eggs',
      remarks: 'Normal',
    },
    {
      id: 8,
      dateTime: '2025-11-12 01:30',
      temperature: '37.8°C',
      humidity: '57%',
      action: 'Adjusted Temp',
      remarks: 'Temperature High',
    },
    {
      id: 9,
      dateTime: '2025-11-12 00:00',
      temperature: '37.4°C',
      humidity: '60%',
      action: 'Turned Eggs',
      remarks: 'Normal',
    },
    {
      id: 10,
      dateTime: '2025-11-11 22:00',
      temperature: '37.5°C',
      humidity: '59%',
      action: 'Turned Eggs',
      remarks: 'Normal',
    },
  ]);

  const handleExportCSV = () => {
    const csvContent = [
      ['Date/Time', 'Temperature', 'Humidity', 'Action', 'Remarks'],
      ...logs.map(log => [
        log.dateTime,
        log.temperature,
        log.humidity,
        log.action,
        log.remarks,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'incubator-logs.csv';
    a.click();
  };

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const filteredLogs = logs.filter(log => {
    if (filterAction !== 'all' && !log.action.toLowerCase().includes(filterAction.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-4 md:p-6 pb-20 lg:pb-6">
      <Card className="p-4 md:p-6 bg-white" style={{ borderRadius: '16px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
          <h2 className="text-gray-800">Environmental Data Logs</h2>
          <div className="flex gap-2">
            <Button onClick={handleExportCSV} variant="outline" className="gap-2" size="sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">CSV</span>
            </Button>
            <Button onClick={handleExportPDF} variant="outline" className="gap-2" size="sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Date From</label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Date To</label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Action Type</label>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="All actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="turned">Turned Eggs</SelectItem>
                <SelectItem value="temp">Temperature Adjusted</SelectItem>
                <SelectItem value="humidity">Humidity Adjusted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" className="w-full gap-2">
              <Filter className="h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Logs</p>
            <p className="text-2xl text-gray-800">{logs.length}</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Eggs Turned</p>
            <p className="text-2xl text-gray-800">
              {logs.filter(l => l.action === 'Turned Eggs').length}
            </p>
          </div>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Temp Adjustments</p>
            <p className="text-2xl text-gray-800">
              {logs.filter(l => l.action.includes('Temp')).length}
            </p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Humidity Adjustments</p>
            <p className="text-2xl text-gray-800">
              {logs.filter(l => l.action.includes('Humidity')).length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Date/Time</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Humidity</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50">
                  <TableCell>{log.dateTime}</TableCell>
                  <TableCell>{log.temperature}</TableCell>
                  <TableCell>{log.humidity}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 rounded text-sm ${
                      log.action === 'Turned Eggs'
                        ? 'bg-green-100 text-green-700'
                        : log.action.includes('Temp')
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={
                      log.remarks.toLowerCase().includes('high') || log.remarks.toLowerCase().includes('increase')
                        ? 'text-orange-600'
                        : 'text-gray-600'
                    }>
                      {log.remarks}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
