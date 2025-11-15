import { useState, useEffect, useRef } from 'react';
import { Ticket, TicketStatus, TicketPriority } from '../types/ticket';
import { TicketList } from './TicketList';
import { TicketPreview } from './TicketPreview';
import { BulkActionsBar } from './BulkActionsBar';
import { BulkActionsDropdown } from './BulkActionsDropdown';
import { TagModal } from './TagModal';
import { Toast } from './Toast';

interface TicketInboxProps {
  tickets: Ticket[];
  onOpenDetail: (ticketId: string) => void;
  onUpdateTickets: (updates: { ticketIds: string[]; changes: Partial<Ticket> }) => void;
}

export function TicketInbox({ tickets, onOpenDetail, onUpdateTickets }: TicketInboxProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | undefined>(tickets[0]?.id);
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || null;
  const allSelected = tickets.length > 0 && selectedTicketIds.length === tickets.length;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        if (allSelected) {
          setSelectedTicketIds([]);
        } else {
          setSelectedTicketIds(tickets.map(t => t.id));
        }
      }
      if (e.key === 'Escape') {
        setSelectedTicketIds([]);
        setDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [allSelected, tickets]);

  const handleToggleTicketSelection = (ticketId: string) => {
    setSelectedTicketIds(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTicketIds([]);
    } else {
      setSelectedTicketIds(tickets.map(t => t.id));
    }
  };

  const handleDeselectAll = () => {
    setSelectedTicketIds([]);
    setDropdownOpen(false);
  };

  const showToast = (message: string) => {
    setToast(message);
  };

  const handleAssignToMe = () => {
    onUpdateTickets({
      ticketIds: selectedTicketIds,
      changes: { assignee: 'Current User' }
    });
    showToast(`${selectedTicketIds.length} ticket${selectedTicketIds.length !== 1 ? 's' : ''} assigned to you`);
    setSelectedTicketIds([]);
  };

  const handleChangeStatus = (status: TicketStatus) => {
    onUpdateTickets({
      ticketIds: selectedTicketIds,
      changes: { status }
    });
    showToast(`Status changed to ${status.charAt(0).toUpperCase() + status.slice(1)}`);
    setSelectedTicketIds([]);
  };

  const handleSetPriority = (priority: TicketPriority) => {
    onUpdateTickets({
      ticketIds: selectedTicketIds,
      changes: { priority }
    });
    showToast(`Priority set to ${priority.charAt(0).toUpperCase() + priority.slice(1)}`);
    setSelectedTicketIds([]);
  };

  const handleBulkClose = () => {
    onUpdateTickets({
      ticketIds: selectedTicketIds,
      changes: { status: 'closed' }
    });
    showToast(`${selectedTicketIds.length} ticket${selectedTicketIds.length !== 1 ? 's' : ''} closed`);
    setSelectedTicketIds([]);
  };

  const handleAddTags = (tags: string[]) => {
    onUpdateTickets({
      ticketIds: selectedTicketIds,
      changes: { tags }
    });
    showToast('Tags added successfully');
    setSelectedTicketIds([]);
  };

  const handleExport = () => {
    console.log('Exporting ticket IDs:', selectedTicketIds);
    showToast('Export started');
    setSelectedTicketIds([]);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <BulkActionsBar
          selectedCount={selectedTicketIds.length}
          onDeselectAll={handleDeselectAll}
          onToggleDropdown={() => setDropdownOpen(!dropdownOpen)}
          dropdownOpen={dropdownOpen}
        />
        
        <div className="flex-1 overflow-hidden relative">
          <TicketList
            tickets={tickets}
            selectedTicketId={selectedTicketId}
            onSelectTicket={setSelectedTicketId}
            selectedTicketIds={selectedTicketIds}
            onToggleTicketSelection={handleToggleTicketSelection}
            onSelectAll={handleSelectAll}
            allSelected={allSelected}
          />
          
          {selectedTicketIds.length > 0 && (
            <div 
              ref={dropdownContainerRef}
              className="absolute top-2 right-4 z-40"
            >
              <BulkActionsDropdown
                open={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
                onAssignToMe={handleAssignToMe}
                onChangeStatus={handleChangeStatus}
                onSetPriority={handleSetPriority}
                onBulkClose={handleBulkClose}
                onAddTags={() => {
                  setTagModalOpen(true);
                  setDropdownOpen(false);
                }}
                onExport={handleExport}
              />
            </div>
          )}
        </div>
      </div>
      
      <TicketPreview
        ticket={selectedTicket}
        onOpenDetail={onOpenDetail}
      />

      <TagModal
        open={tagModalOpen}
        onClose={() => setTagModalOpen(false)}
        onAddTags={handleAddTags}
      />

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
