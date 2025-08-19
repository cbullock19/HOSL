'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Download, TrendingUp, Package, Users, Calendar, MapPin } from 'lucide-react'

// Mock data
const mockMonthlyStats = {
  totalPounds: 1247.5,
  totalTasks: 48,
  activeVolunteers: 12,
  completionRate: 94.2,
}

const mockTopSources = [
  { name: 'ShopRite – Chester', pounds: 456.3, tasks: 18, percentage: 36.6 },
  { name: 'Weis – Hackettstown', pounds: 389.2, tasks: 15, percentage: 31.2 },
  { name: 'Stop & Shop – Mansfield', pounds: 402.0, tasks: 15, percentage: 32.2 },
]

const mockTopRecipients = [
  { name: 'Hands of St. Luke Pantry', pounds: 678.5, deliveries: 24, percentage: 54.4 },
  { name: 'Long Valley Community Assistance', pounds: 345.2, deliveries: 12, percentage: 27.7 },
  { name: 'Mt. Olive Food Bank', pounds: 223.8, deliveries: 12, percentage: 17.9 },
]

const mockVolunteerLeaderboard = [
  { name: 'Jane Doe', tasks: 8, pounds: 156.3, hours: 12 },
  { name: 'Bob Smith', tasks: 7, pounds: 134.7, hours: 10.5 },
  { name: 'Alice Johnson', tasks: 6, pounds: 98.2, hours: 9 },
  { name: 'Mike Wilson', tasks: 5, pounds: 87.5, hours: 7.5 },
  { name: 'Sarah Brown', tasks: 4, pounds: 76.8, hours: 6 },
]

export function AdminReports() {
  const [selectedMonth, setSelectedMonth] = useState('2024-01')
  const [selectedYear, setSelectedYear] = useState('2024')

  const months = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2024-02', label: 'February 2024' },
    { value: '2024-03', label: 'March 2024' },
    { value: '2024-04', label: 'April 2024' },
    { value: '2024-05', label: 'May 2024' },
    { value: '2024-06', label: 'June 2024' },
  ]

  const years = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ]

  const exportCSV = (type: string) => {
    const filename = `hands-of-st-luke-${type}-${selectedMonth}.csv`
    console.log(`Exporting ${filename}`)
    // Handle CSV export
  }

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Report Period</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pounds</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMonthlyStats.totalPounds.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMonthlyStats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMonthlyStats.activeVolunteers}</div>
            <p className="text-xs text-muted-foreground">
              +2 new volunteers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMonthlyStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Sources */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Top Food Sources</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportCSV('sources')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopSources.map((source, index) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-sm text-gray-500">{source.tasks} tasks</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{source.pounds.toFixed(1)} lbs</div>
                    <div className="text-sm text-gray-500">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Recipients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Top Food Recipients</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportCSV('recipients')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopRecipients.map((recipient, index) => (
                <div key={recipient.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-semibold text-green-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{recipient.name}</div>
                      <div className="text-sm text-gray-500">{recipient.deliveries} deliveries</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{recipient.pounds.toFixed(1)} lbs</div>
                    <div className="text-sm text-gray-500">{recipient.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Volunteer Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Volunteer Leaderboard</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => exportCSV('volunteers')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVolunteerLeaderboard.map((volunteer, index) => (
              <div key={volunteer.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg font-semibold text-purple-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{volunteer.name}</div>
                    <div className="text-sm text-gray-500">{volunteer.tasks} tasks completed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">{volunteer.pounds.toFixed(1)} lbs</div>
                  <div className="text-sm text-gray-500">{volunteer.hours} hours</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => exportCSV('monthly')}
              className="h-20 flex-col"
            >
              <Download className="w-6 h-6 mb-2" />
              <span>Monthly Summary</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => exportCSV('detailed')}
              className="h-20 flex-col"
            >
              <Download className="w-6 h-6 mb-2" />
              <span>Detailed Report</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => exportCSV('volunteer')}
              className="h-20 flex-col"
            >
              <Download className="w-6 h-6 mb-2" />
              <span>Volunteer Activity</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
