import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Send, Zap } from 'lucide-react';
import { cannedResponses } from '../lib/mockData';

interface QuickReplyProps {
  onSend: (message: string) => void;
}

export function QuickReply({ onSend }: QuickReplyProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleCannedResponse = (response: string) => {
    setMessage(response);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-teal-600" />
        <span className="text-sm text-gray-700">Quick replies:</span>
        <Select onValueChange={handleCannedResponse}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a canned response..." />
          </SelectTrigger>
          <SelectContent>
            {cannedResponses.map((response, index) => (
              <SelectItem key={index} value={response}>
                {response.substring(0, 50)}...
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 resize-none"
          rows={3}
        />
        <Button 
          onClick={handleSend}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
