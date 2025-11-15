import { useState, useRef, useEffect } from 'react';
import { UserPlus, CircleDot, Flag, CheckCircle, Tag, Download } from 'lucide-react';
import { TicketStatus, TicketPriority } from '../types/ticket';

interface BulkActionsDropdownProps {
  open: boolean;
  onClose: () => void;
  onAssignToMe: () => void;
  onChangeStatus: (status: TicketStatus) => void;
  onSetPriority: (priority: TicketPriority) => void;
  onBulkClose: () => void;
  onAddTags: () => void;
  onExport: () => void;
}

export function BulkActionsDropdown({
  open,
  onClose,
  onAssignToMe,
  onChangeStatus,
  onSetPriority,
  onBulkClose,
  onAddTags,
  onExport,
}: BulkActionsDropdownProps) {
  const [statusSubmenuOpen, setStatusSubmenuOpen] = useState(false);
  const [prioritySubmenuOpen, setPrioritySubmenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const statusOptions: { value: TicketStatus; label: string; color: string }[] = [
    { value: 'open', label: 'Open', color: 'bg-blue-500' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-500' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-500' },
  ];

  const priorityOptions: { value: TicketPriority; label: string; color: string }[] = [
    { value: 'high', label: 'High', color: 'bg-red-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'low', label: 'Low', color: 'bg-green-500' },
  ];

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-1 w-60 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200"
    >
      <button
        onClick={() => {
          onAssignToMe();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors"
      >
        <UserPlus className="h-5 w-5" />
        <span>Assign to Me</span>
      </button>

      <div
        className="relative"
        onMouseEnter={() => setStatusSubmenuOpen(true)}
        onMouseLeave={() => setStatusSubmenuOpen(false)}
      >
        <button className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors">
          <CircleDot className="h-5 w-5" />
          <span>Change Status</span>
        </button>
        {statusSubmenuOpen && (
          <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-in fade-in-0 slide-in-from-left-2 duration-150">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChangeStatus(option.value);
                  setStatusSubmenuOpen(false);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors"
              >
                <div className={`h-2 w-2 rounded-full ${option.color}`} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPrioritySubmenuOpen(true)}
        onMouseLeave={() => setPrioritySubmenuOpen(false)}
      >
        <button className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors">
          <Flag className="h-5 w-5" />
          <span>Set Priority</span>
        </button>
        {prioritySubmenuOpen && (
          <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-in fade-in-0 slide-in-from-left-2 duration-150">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSetPriority(option.value);
                  setPrioritySubmenuOpen(false);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors"
              >
                <div className={`h-2 w-2 rounded-full ${option.color}`} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          onBulkClose();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors"
      >
        <CheckCircle className="h-5 w-5" />
        <span>Bulk Close</span>
      </button>

      <button
        onClick={() => {
          onAddTags();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors"
      >
        <Tag className="h-5 w-5" />
        <span>Add Tags</span>
      </button>

      <div className="h-px bg-gray-200 my-1" />

      <button
        onClick={() => {
          onExport();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-3 h-10 hover:bg-gray-50 hover:text-teal-600 transition-colors"
      >
        <Download className="h-5 w-5" />
        <span>Export Selected</span>
      </button>
    </div>
  );
}
