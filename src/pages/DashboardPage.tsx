import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import {
  ActivityIcon,
  LeafIcon,
  UsersIcon,
  ShieldIcon,
  AlertTriangleIcon,
  FileTextIcon,
  CoinsIcon,
  ChevronDownIcon } from
'lucide-react';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { Page, User } from '../types';
const chartData = [
{
  month: 'Jan',
  score: 72
},
{
  month: 'Feb',
  score: 75
},
{
  month: 'Mar',
  score: 74
},
{
  month: 'Apr',
  score: 78
},
{
  month: 'May',
  score: 80
},
{
  month: 'Jun',
  score: 82
},
{
  month: 'Jul',
  score: 81
},
{
  month: 'Aug',
  score: 84
},
{
  month: 'Sep',
  score: 85
},
{
  month: 'Oct',
  score: 86
},
{
  month: 'Nov',
  score: 87
},
{
  month: 'Dec',
  score: 87
}];

const allAlerts = [
{
  id: 1,
  title: 'Unusual water usage detected',
  entity: 'Green Valley Farm',
  time: '2 hours ago',
  severity: 'at-risk'
},
{
  id: 2,
  title: 'Missing carbon offset certificate',
  entity: 'Highland Pastures',
  time: '5 hours ago',
  severity: 'flagged'
},
{
  id: 3,
  title: 'Yield data anomaly',
  entity: 'Sunrise Organics',
  time: '1 day ago',
  severity: 'at-risk'
},
{
  id: 4,
  title: 'Fertiliser overuse warning',
  entity: 'Green Valley Farm',
  time: '1 day ago',
  severity: 'flagged'
},
{
  id: 5,
  title: 'Soil pH level drop detected',
  entity: 'Highland Pastures',
  time: '2 days ago',
  severity: 'at-risk'
}];

const farms = [
'All Farms',
'Green Valley Farm',
'Sunrise Organics',
'Highland Pastures'];

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  user: User;
}
export function DashboardPage({ onNavigate, user }: DashboardPageProps) {
  const isFarmer = user.role === 'farmer';
  const isRegulator = user.role === 'regulator';
  // Farmer always sees own farm; others get a dropdown
  const [selectedFarm, setSelectedFarm] = useState<string>(
    isFarmer ? user.entityName : 'All Farms'
  );
  const filteredAlerts = useMemo(() => {
    if (isFarmer) {
      return allAlerts.filter((a) => a.entity === user.entityName);
    }
    if (selectedFarm === 'All Farms') return allAlerts;
    return allAlerts.filter((a) => a.entity === selectedFarm);
  }, [selectedFarm, isFarmer, user.entityName]);
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="space-y-6">
      
      {/* Top Section: Stats & Tier */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Platform Overview
          </h2>
          <p className="text-gray-500">
            Real-time ESG metrics and system health
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Farm selector for Regulator and Buyer */}
          {!isFarmer &&
          <div className="relative">
              <select
              value={selectedFarm}
              onChange={(e) => setSelectedFarm(e.target.value)}
              className="input-field pr-10 text-sm min-w-[200px] appearance-none">
              
                {farms.map((f) =>
              <option key={f} value={f}>
                    {f}
                  </option>
              )}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          }
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500 mr-3">
              Current ESG Tier:
            </span>
            <Badge label="Excellent" variant="excellent" />
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall ESG Score"
          value="87/100"
          change={4.2}
          icon={<ActivityIcon className="w-6 h-6" />}
          colorClass="text-farm-600 bg-farm-100"
          delay={0.1} />
        
        <StatCard
          title="Environmental Score"
          value="82/100"
          change={2.1}
          icon={<LeafIcon className="w-6 h-6" />}
          colorClass="text-emerald-600 bg-emerald-100"
          delay={0.2} />
        
        <StatCard
          title="Social Score"
          value="91/100"
          change={1.5}
          icon={<UsersIcon className="w-6 h-6" />}
          colorClass="text-blue-600 bg-blue-100"
          delay={0.3} />
        
        <StatCard
          title="Governance Score"
          value="88/100"
          change={-0.5}
          icon={<ShieldIcon className="w-6 h-6" />}
          colorClass="text-purple-600 bg-purple-100"
          delay={0.4} />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.5
          }}
          className="card p-6 lg:col-span-2">
          
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            ESG Score Trends (12 Months)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 20,
                  bottom: 5,
                  left: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB" />
                
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }}
                  dy={10} />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }}
                  domain={[60, 100]} />
                
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{
                    stroke: '#A7F3D0',
                    strokeWidth: 2,
                    strokeDasharray: '3 3'
                  }} />
                
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: '#059669',
                    strokeWidth: 2,
                    stroke: '#fff'
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#047857',
                    stroke: '#fff',
                    strokeWidth: 2
                  }} />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Alerts & Actions Section */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.6
            }}
            className="card p-6">
            
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('esg-report')}
                className="w-full btn-outline justify-start">
                
                <FileTextIcon className="w-5 h-5 mr-3" />
                Generate AI ESG Report
              </button>
              {/* Only Regulator sees Monitor Tokens */}
              {isRegulator &&
              <button
                onClick={() => onNavigate('token-monitoring')}
                className="w-full btn-outline justify-start">
                
                  <CoinsIcon className="w-5 h-5 mr-3" />
                  Monitor Tokens
                </button>
              }
            </div>
          </motion.div>

          {/* Alerts Panel */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.7
            }}
            className="card p-0 overflow-hidden">
            
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 flex items-center">
                <AlertTriangleIcon className="w-4 h-4 text-amber-500 mr-2" />
                Recent Anomalies
              </h3>
              <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {filteredAlerts.length}{' '}
                {filteredAlerts.length === 1 ? 'Alert' : 'Alerts'}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredAlerts.length === 0 ?
              <div className="p-6 text-center text-sm text-gray-400">
                  No anomalies detected for the selected farm.
                </div> :

              filteredAlerts.map((alert) =>
              <div key={alert.id} className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.title}
                      </p>
                      <Badge
                    label={
                    alert.severity === 'flagged' ? 'Flagged' : 'At Risk'
                    }
                    variant={alert.severity as any} />
                  
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>{alert.entity}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
              )
              }
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>);

}