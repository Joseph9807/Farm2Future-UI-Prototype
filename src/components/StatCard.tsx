import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  colorClass?: string;
  delay?: number;
}
export function StatCard({
  title,
  value,
  change,
  icon,
  colorClass = 'text-farm-600 bg-farm-50',
  delay = 0
}: StatCardProps) {
  return (
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
        duration: 0.4,
        delay
      }}
      className="card p-6 flex flex-col">
      
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${colorClass}`}>{icon}</div>
        {change !== undefined &&
        <div
          className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-farm-600' : 'text-red-600'}`}>
          
            {change >= 0 ?
          <TrendingUpIcon className="w-4 h-4 mr-1" /> :

          <TrendingDownIcon className="w-4 h-4 mr-1" />
          }
            {Math.abs(change)}%
          </div>
        }
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </motion.div>);

}