import { Ticket } from '../types/ticket';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

interface TicketPropertiesProps {
  ticket: Ticket;
  onUpdate?: (updates: Partial<Ticket>) => void;
}

export function TicketProperties({ ticket, onUpdate }: TicketPropertiesProps) {
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
    <div className="space-y-6">
      <div>
        <h3 className="mb-4">Ticket Properties</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-gray-500 text-sm mb-2 block">Status</Label>
          <Select defaultValue={ticket.status}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-500 text-sm mb-2 block">Priority</Label>
          <Select defaultValue={ticket.priority}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-500 text-sm mb-2 block">Assignee</Label>
          <Select defaultValue={ticket.assignee}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="John Doe">John Doe</SelectItem>
              <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              <SelectItem value="Alex Brown">Alex Brown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-500 text-sm mb-2 block">Tags</Label>
          <div className="flex flex-wrap gap-2">
            {ticket.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-gray-700">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Label className="text-gray-500 text-sm mb-2 block">Ticket ID</Label>
          <p className="text-gray-900">{ticket.id}</p>
        </div>

        <div>
          <Label className="text-gray-500 text-sm mb-2 block">Customer</Label>
          <p className="text-gray-900">{ticket.customerName}</p>
          <p className="text-gray-500 text-sm">{ticket.customerEmail}</p>
        </div>

        <div>
          <Label className="text-gray-500 text-sm mb-2 block">Created</Label>
          <p className="text-gray-900">
            {new Date(ticket.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
