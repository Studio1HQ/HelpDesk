import { Inbox, FolderOpen, CheckCircle, XCircle, BarChart3, Filter } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 4 },
    { id: 'open', label: 'Open Tickets', icon: FolderOpen, count: 4 },
    { id: 'closed', label: 'Closed Tickets', icon: CheckCircle, count: 1 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-teal-600">SupportHub</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start ${isActive ? 'bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && (
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}>
                  {item.count}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full justify-start text-gray-700">
          <Filter className="mr-3 h-5 w-5" />
          Filters
        </Button>
      </div>
    </div>
  );
}
