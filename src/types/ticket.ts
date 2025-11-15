export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Message {
  id: string;
  author: string;
  role: 'customer' | 'agent';
  content: string;
  timestamp: string;
  avatar?: string;
}

export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  timestamp: string;
  assignee?: string;
  tags: string[];
  messages: Message[];
}

export interface AnalyticsData {
  avgResponseTime: number;
  avgResolutionTime: number;
  totalTickets: number;
  satisfactionScore: number;
  ticketVolume: Array<{ date: string; tickets: number }>;
  agentPerformance: Array<{
    name: string;
    ticketsResolved: number;
    avgResponseTime: string;
    satisfaction: number;
  }>;
}
