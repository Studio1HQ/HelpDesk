import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Settings } from 'lucide-react';
import { Button } from './ui/button';

interface Agent {
  id: string;
  name: string;
  status: 'online' | 'away';
  activeTickets: number;
  initials: string;
}

interface Handoff {
  id: string;
  fromAgent: string;
  toAgent: string;
  ticketId: string;
  timestamp: string;
}

const agents: Agent[] = [
  { id: '1', name: 'John Doe', status: 'online', activeTickets: 5, initials: 'JD' },
  { id: '2', name: 'Jane Smith', status: 'online', activeTickets: 3, initials: 'JS' },
  { id: '3', name: 'Alex Brown', status: 'away', activeTickets: 2, initials: 'AB' },
  { id: '4', name: 'Sarah Wilson', status: 'online', activeTickets: 4, initials: 'SW' },
];

const handoffs: Handoff[] = [
  {
    id: '1',
    fromAgent: 'John Doe',
    toAgent: 'Jane Smith',
    ticketId: 'TKT-1008',
    timestamp: '5m ago',
  },
  {
    id: '2',
    fromAgent: 'Sarah Wilson',
    toAgent: 'Alex Brown',
    ticketId: 'TKT-1009',
    timestamp: '15m ago',
  },
  {
    id: '3',
    fromAgent: 'Jane Smith',
    toAgent: 'John Doe',
    ticketId: 'TKT-1010',
    timestamp: '32m ago',
  },
];

export function TeamCollaborationWidget() {
  return (
    <Card className="w-[400px] h-[480px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Team Activity</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4 text-gray-500" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Active Agents Section */}
        <div className="mb-6">
          <h4 className="text-gray-500 mb-4">Active Agents</h4>
          <div className="flex justify-between gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {agent.initials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Status dot */}
                  <div
                    className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                      agent.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                  {/* Active tickets badge */}
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs">
                    {agent.activeTickets}
                  </div>
                </div>
                <p className="text-gray-900 text-sm mt-2 text-center leading-tight">
                  {agent.name.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Handoffs Section */}
        <div className="flex-1 pt-4 border-t border-gray-200">
          <h4 className="text-gray-500 mb-4">Recent Handoffs</h4>
          <div className="space-y-3">
            {handoffs.map((handoff, index) => (
              <div key={handoff.id}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                      {handoff.fromAgent.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900 text-sm">
                        {handoff.fromAgent.split(' ')[0]} → {handoff.toAgent.split(' ')[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-600 text-xs">{handoff.ticketId}</span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-gray-400 text-xs">{handoff.timestamp}</span>
                    </div>
                  </div>
                </div>
                {index < handoffs.length - 1 && (
                  <div className="h-px bg-gray-200 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
