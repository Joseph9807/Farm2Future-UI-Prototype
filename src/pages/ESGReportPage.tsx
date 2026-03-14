import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DownloadIcon,
  FileTextIcon,
  FilterIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  SparklesIcon } from
'lucide-react';
import { User } from '../types';
interface ESGReportPageProps {
  user: User;
}
export function ESGReportPage({ user }: ESGReportPageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(true);
  const isFarmer = user.role === 'farmer';
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReport(true);
    }, 1500);
  };
  const handleExport = (type: string) => {
    alert(`Started exporting report as ${type}...`);
  };
  // Farmer-specific risk flags
  const farmerRiskFlags = [
  {
    type: 'success',
    title: 'Water Usage Optimization',
    desc: `${user.entityName} achieved 20% reduction in water usage.`
  },
  {
    type: 'warning',
    title: 'Fertiliser Overuse Warning',
    desc: `Q4 fertiliser usage exceeded recommended levels by 8%.`
  }];

  // All-entity risk flags
  const allRiskFlags = [
  {
    type: 'success',
    title: 'Water Usage Optimization',
    desc: 'Green Valley Farm achieved 20% reduction in water usage.'
  },
  {
    type: 'warning',
    title: 'Fertilizer Data Gap',
    desc: 'Missing Q3 fertilizer logs for Highland Pastures.'
  },
  {
    type: 'danger',
    title: 'Carbon Offset Expiry',
    desc: 'Sunrise Organics certificates expiring in 14 days.'
  }];

  const riskFlags = isFarmer ? farmerRiskFlags : allRiskFlags;
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="space-y-6">
      
      {/* Filters Section */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                className="input-field"
                defaultValue="2024-01-01" />
              
              <span className="text-gray-500">to</span>
              <input
                type="date"
                className="input-field"
                defaultValue="2024-12-31" />
              
            </div>
          </div>
          {/* Only show farm dropdown for non-farmers */}
          {!isFarmer &&
          <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm / Entity
              </label>
              <select className="input-field">
                <option>All Entities</option>
                <option>Green Valley Farm</option>
                <option>Sunrise Organics</option>
                <option>Highland Pastures</option>
              </select>
            </div>
          }
          <div className="w-full md:w-auto">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-primary w-full md:w-auto">
              
              {isGenerating ?
              'Generating...' :

              <>
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Generate AI Report
                </>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      {showReport &&
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="card overflow-hidden">
        
          <div className="border-b border-gray-200 bg-gray-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-farm-100 rounded-lg mr-4">
                <FileTextIcon className="w-6 h-6 text-farm-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  AI ESG Report
                </h2>
                <p className="text-sm text-gray-500">
                  Jan 1, 2024 - Dec 31, 2024 •{' '}
                  {isFarmer ? user.entityName : 'All Entities'}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
              onClick={() => handleExport('CSV')}
              className="btn-outline py-1.5 px-3 text-sm">
              
                <DownloadIcon className="w-4 h-4 mr-2" /> CSV
              </button>
              <button
              onClick={() => handleExport('PDF')}
              className="btn-outline py-1.5 px-3 text-sm">
              
                <DownloadIcon className="w-4 h-4 mr-2" /> PDF
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Col: Scores */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Score Breakdown
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Environmental (E)
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      82/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                    className="bg-emerald-500 h-2.5 rounded-full"
                    style={{
                      width: '82%'
                    }}>
                  </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Carbon footprint reduced by 12% YoY.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Social (S)
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      91/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{
                      width: '91%'
                    }}>
                  </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Fair labor practices verified across 100% of supply chain.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Governance (G)
                    </span>
                    <span className="text-sm font-bold text-purple-600">
                      88/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{
                      width: '88%'
                    }}>
                  </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    All compliance audits passed successfully.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Risk Flags */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Risk Flags & Highlights
              </h3>

              <ul className="space-y-4">
                {riskFlags.map((flag, i) => {
                const bgColor =
                flag.type === 'success' ?
                'bg-emerald-50 border-emerald-100' :
                flag.type === 'warning' ?
                'bg-amber-50 border-amber-100' :
                'bg-red-50 border-red-100';
                const iconColor =
                flag.type === 'success' ?
                'text-emerald-500' :
                flag.type === 'warning' ?
                'text-amber-500' :
                'text-red-500';
                const titleColor =
                flag.type === 'success' ?
                'text-emerald-900' :
                flag.type === 'warning' ?
                'text-amber-900' :
                'text-red-900';
                const descColor =
                flag.type === 'success' ?
                'text-emerald-700' :
                flag.type === 'warning' ?
                'text-amber-700' :
                'text-red-700';
                const Icon =
                flag.type === 'success' ? CheckCircleIcon : AlertCircleIcon;
                return (
                  <li
                    key={i}
                    className={`flex items-start p-3 rounded-lg border ${bgColor}`}>
                    
                      <Icon
                      className={`w-5 h-5 ${iconColor} mr-3 mt-0.5 flex-shrink-0`} />
                    
                      <div>
                        <p className={`text-sm font-medium ${titleColor}`}>
                          {flag.title}
                        </p>
                        <p className={`text-xs ${descColor} mt-0.5`}>
                          {flag.desc}
                        </p>
                      </div>
                    </li>);

              })}
              </ul>
            </div>
          </div>
        </motion.div>
      }
    </motion.div>);

}