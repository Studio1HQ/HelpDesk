import { Ticket } from '../types/ticket';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

interface TicketPreviewProps {
  ticket: Ticket | null;
  onOpenDetail: (ticketId: string) => void;
}

export function TicketPreview({ ticket, onOpenDetail }: TicketPreviewProps) {
  if (!ticket) {
    return (
      <div className="w-96 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Select a ticket to preview</p>
      </div>
    );
  }

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

  return (
    <div className="w-96 bg-gray-50 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3>Preview</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenDetail(ticket.id)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm mb-1">Customer</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-teal-100 text-teal-700">
                  {ticket.customerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-gray-900">{ticket.customerName}</p>
                <p className="text-gray-500 text-sm">{ticket.customerEmail}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Status</p>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status}
            </Badge>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Priority</p>
            <p className="text-gray-900">{ticket.priority}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Assignee</p>
            <p className="text-gray-900">{ticket.assignee || 'Unassigned'}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="mb-3">Conversation</h4>
        <div className="space-y-3">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.role === 'customer' ? 'bg-white' : 'bg-teal-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className={message.role === 'customer' ? 'bg-gray-200 text-gray-700' : 'bg-teal-200 text-teal-700'}>
                    {message.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-900 text-sm">{message.author}</span>
              </div>
              <p className="text-gray-600 text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
