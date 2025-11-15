import { AnalyticsData } from '../types/ticket';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Clock, CheckCircle2, TrendingUp, ThumbsUp } from 'lucide-react';
import { TeamCollaborationWidget } from './TeamCollaborationWidget';
import { TicketPriorityDistribution } from './TicketPriorityDistribution';

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="mb-2">Analytics Dashboard</h2>
          <p className="text-gray-500">Track your support team performance</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-500">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{data.avgResponseTime} min</div>
              <p className="text-xs text-green-600 mt-1">↓ 15% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-500">Avg Resolution Time</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{data.avgResolutionTime} hrs</div>
              <p className="text-xs text-green-600 mt-1">↓ 8% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-500">Total Tickets</CardTitle>
              <TrendingUp className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{data.totalTickets}</div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-500">Satisfaction Score</CardTitle>
              <ThumbsUp className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{data.satisfactionScore}%</div>
              <p className="text-xs text-green-600 mt-1">↑ 2% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Volume Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ticket Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.ticketVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  stroke="#6b7280"
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* New Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TeamCollaborationWidget />
          <TicketPriorityDistribution />
        </div>

        {/* Agent Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Tickets Resolved</TableHead>
                  <TableHead>Avg Response Time</TableHead>
                  <TableHead>Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.agentPerformance.map((agent) => (
                  <TableRow key={agent.name}>
                    <TableCell className="text-gray-900">{agent.name}</TableCell>
                    <TableCell className="text-gray-900">{agent.ticketsResolved}</TableCell>
                    <TableCell className="text-gray-900">{agent.avgResponseTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{agent.satisfaction}%</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: `${agent.satisfaction}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}