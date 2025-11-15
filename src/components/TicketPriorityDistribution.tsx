import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const priorityData = [
  { name: 'High', value: 35, count: 87, color: '#EF4444' },
  { name: 'Medium', value: 45, count: 112, color: '#F59E0B' },
  { name: 'Low', value: 20, count: 49, color: '#10B981' },
];

const priorityStats = [
  { level: 'High', count: 87, trend: 12, trendUp: true, color: '#EF4444' },
  { level: 'Medium', count: 112, trend: 5, trendUp: true, color: '#F59E0B' },
  { level: 'Low', count: 49, trend: 8, trendUp: false, color: '#10B981' },
];

const totalTickets = priorityData.reduce((sum, item) => sum + item.count, 0);

export function TicketPriorityDistribution() {
  return (
    <Card className="w-[500px] h-[420px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <CardTitle>Priority Distribution</CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Info className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Chart Area */}
        <div className="flex-1 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-gray-900">{totalTickets}</div>
            <div className="text-gray-500 text-sm">tickets</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-4">
          {priorityData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700 text-sm">{item.name}</span>
              <span className="text-gray-500 text-sm">{item.value}%</span>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          {priorityStats.map((stat) => (
            <div
              key={stat.level}
              className="p-3 rounded-lg bg-gray-50 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-gray-600 text-sm">{stat.level}</span>
              </div>
              <div className="text-gray-900 mb-1">{stat.count} tickets</div>
              <div
                className={`flex items-center gap-1 text-xs ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{stat.trend}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
