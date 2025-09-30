import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, DollarSign, Sprout, Target } from 'lucide-react';

export function FarmAnalytics() {
  const yieldData = [
    { month: 'Apr', corn: 120, soybeans: 80, wheat: 95 },
    { month: 'May', corn: 135, soybeans: 95, wheat: 110 },
    { month: 'Jun', corn: 150, soybeans: 105, wheat: 125 },
    { month: 'Jul', corn: 165, soybeans: 115, wheat: 140 },
    { month: 'Aug', corn: 180, soybeans: 125, wheat: 155 },
    { month: 'Sep', corn: 195, soybeans: 135, wheat: 170 }
  ];

  const expenseData = [
    { name: 'Seeds', value: 25000, color: '#8884d8' },
    { name: 'Fertilizer', value: 18000, color: '#82ca9d' },
    { name: 'Fuel', value: 12000, color: '#ffc658' },
    { name: 'Equipment', value: 8000, color: '#ff7300' },
    { name: 'Labor', value: 15000, color: '#8dd1e1' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 52000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  const kpis = [
    {
      title: 'Total Revenue',
      value: '$318,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Crop Yield',
      value: '485 bu/acre',
      change: '+8.2%',
      icon: Sprout,
      color: 'text-green-600'
    },
    {
      title: 'Efficiency Score',
      value: '87%',
      change: '+3.1%',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'Profit Margin',
      value: '24%',
      change: '+2.4%',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl">{kpi.value}</p>
                  <p className={`text-sm ${kpi.color}`}>{kpi.change} from last month</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Yield Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Yield Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="corn" fill="#8884d8" name="Corn" />
                <Bar dataKey="soybeans" fill="#82ca9d" name="Soybeans" />
                <Bar dataKey="wheat" fill="#ffc658" name="Wheat" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Farm Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl text-green-600">65</div>
                  <div className="text-sm text-muted-foreground">Total Acres</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">Crop Types</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl text-yellow-600">8</div>
                  <div className="text-sm text-muted-foreground">Equipment</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl text-purple-600">12</div>
                  <div className="text-sm text-muted-foreground">Active Tasks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}