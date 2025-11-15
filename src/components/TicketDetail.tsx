import { Ticket } from '../types/ticket';
import { ConversationThread } from './ConversationThread';
import { TicketProperties } from './TicketProperties';
import { QuickReply } from './QuickReply';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

export function TicketDetail({ ticket, onBack }: TicketDetailProps) {
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // In a real app, this would send the message to the backend
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main conversation area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h2>{ticket.subject}</h2>
              <p className="text-gray-500">Ticket #{ticket.id}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <ConversationThread messages={ticket.messages} />
        </div>

        {/* Quick Reply */}
        <QuickReply onSend={handleSendMessage} />
      </div>

      {/* Properties Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-6">
        <TicketProperties ticket={ticket} />
      </div>
    </div>
  );
}
