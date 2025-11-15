import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TicketInbox } from './components/TicketInbox';
import { TicketDetail } from './components/TicketDetail';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { mockTickets, mockAnalytics } from './lib/mockData';
import { Ticket } from './types/ticket';

export default function App() {
  const [activeView, setActiveView] = useState('inbox');
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const getFilteredTickets = (): Ticket[] => {
    switch (activeView) {
      case 'inbox':
        return tickets;
      case 'open':
        return tickets.filter(t => t.status === 'open' || t.status === 'pending');
      case 'closed':
        return tickets.filter(t => t.status === 'closed' || t.status === 'resolved');
      default:
        return tickets;
    }
  };

  const handleOpenDetail = (ticketId: string) => {
    setSelectedTicketForDetail(ticketId);
  };

  const handleBackToInbox = () => {
    setSelectedTicketForDetail(null);
  };

  const handleUpdateTickets = ({ ticketIds, changes }: { ticketIds: string[]; changes: Partial<Ticket> }) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticketIds.includes(ticket.id)) {
          return {
            ...ticket,
            ...changes,
            // Special handling for tags - append instead of replace
            tags: changes.tags ? [...new Set([...ticket.tags, ...changes.tags])] : ticket.tags,
          };
        }
        return ticket;
      })
    );
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketForDetail);

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedTicket ? (
          <TicketDetail ticket={selectedTicket} onBack={handleBackToInbox} />
        ) : activeView === 'analytics' ? (
          <AnalyticsDashboard data={mockAnalytics} />
        ) : (
          <TicketInbox 
            tickets={getFilteredTickets()} 
            onOpenDetail={handleOpenDetail}
            onUpdateTickets={handleUpdateTickets}
          />
        )}
      </div>
    </div>
  );
}
