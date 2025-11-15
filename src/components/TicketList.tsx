import { Ticket } from '../types/ticket';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Checkbox } from './ui/checkbox';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId?: string;
  onSelectTicket: (ticketId: string) => void;
  selectedTicketIds: string[];
  onToggleTicketSelection: (ticketId: string) => void;
  onSelectAll: () => void;
  allSelected: boolean;
}

export function TicketList({ 
  tickets, 
  selectedTicketId, 
  onSelectTicket,
  selectedTicketIds,
  onToggleTicketSelection,
  onSelectAll,
  allSelected
}: TicketListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'resolved':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'closed':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600';
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const someSelected = selectedTicketIds.length > 0 && selectedTicketIds.length < tickets.length;

  return (
    <div className="flex-1 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <Checkbox
          checked={allSelected ? true : someSelected ? 'indeterminate' : false}
          onCheckedChange={onSelectAll}
          className="border-teal-600 data-[state=checked]:bg-teal-600"
        />
        <div className="flex-1">
          <h2>Tickets</h2>
          <p className="text-gray-500">{tickets.length} total</p>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 flex-1">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`p-4 transition-colors ${
              selectedTicketId === ticket.id ? 'bg-teal-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedTicketIds.includes(ticket.id)}
                onCheckedChange={() => onToggleTicketSelection(ticket.id)}
                className="mt-1 border-teal-600 data-[state=checked]:bg-teal-600"
                onClick={(e) => e.stopPropagation()}
              />
              
              <div 
                className="flex items-start gap-3 flex-1 cursor-pointer"
                onClick={() => onSelectTicket(ticket.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-teal-100 text-teal-700">
                    {ticket.customerName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-gray-900">{ticket.customerName}</span>
                    <span className="text-gray-400 text-sm">{formatTimestamp(ticket.timestamp)}</span>
                  </div>
                  
                  <p className="text-gray-900 mb-2">{ticket.subject}</p>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <span className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-xs">#{ticket.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
