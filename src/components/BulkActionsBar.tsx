import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onDeselectAll: () => void;
  onToggleDropdown: () => void;
  dropdownOpen: boolean;
}

export function BulkActionsBar({ selectedCount, onDeselectAll, onToggleDropdown, dropdownOpen }: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="h-12 bg-teal-50 border-b border-teal-100 flex items-center justify-between px-3 animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-3">
        <Checkbox
          checked="indeterminate"
          onCheckedChange={onDeselectAll}
          className="border-teal-600 data-[state=checked]:bg-teal-600"
        />
        <span className="text-gray-900">
          {selectedCount} ticket{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>
      <Button
        onClick={onToggleDropdown}
        className="bg-teal-600 hover:bg-teal-700 text-white h-8"
      >
        Actions
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </Button>
    </div>
  );
}
