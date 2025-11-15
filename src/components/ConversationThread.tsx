import { Message } from '../types/ticket';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ConversationThreadProps {
  messages: Message[];
}

export function ConversationThread({ messages }: ConversationThreadProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-4">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className={message.role === 'customer' ? 'bg-gray-200 text-gray-700' : 'bg-teal-100 text-teal-700'}>
              {message.author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-900">{message.author}</span>
              <span className="text-gray-400 text-sm">{formatTime(message.timestamp)}</span>
              {message.role === 'agent' && (
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded">Agent</span>
              )}
            </div>
            <div className="text-gray-700 leading-relaxed">
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
