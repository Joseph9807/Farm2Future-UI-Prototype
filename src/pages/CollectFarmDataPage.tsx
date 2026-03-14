import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SproutIcon,
  WifiIcon,
  DropletsIcon,
  ThermometerIcon,
  WindIcon,
  FlaskConicalIcon,
  CheckCircleIcon } from
'lucide-react';
export function CollectFarmDataPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1500);
  };
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="space-y-6 relative">
      
      {showSuccess &&
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="absolute top-0 right-0 z-50 bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
        
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Data successfully cleaned and stored on-chain.
        </motion.div>
      }

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manual Data Entry Form */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-farm-100 rounded-lg mr-3">
              <SproutIcon className="w-6 h-6 text-farm-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Manual Data Entry
              </h2>
              <p className="text-sm text-gray-500">
                Log batch details for ESG compliance
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type
                </label>
                <select className="input-field" required>
                  <option value="">Select crop...</option>
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Corn</option>
                  <option>Soybeans</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]} />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yield (kg)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 2500"
                  required
                  min="1" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Water Usage (L)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 15000"
                  required
                  min="1" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbon Emissions Est. (kg CO2)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 450"
                  required
                  min="0" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fertiliser Type
                </label>
                <select className="input-field" required>
                  <option value="">Select type...</option>
                  <option>Organic Compost</option>
                  <option>Synthetic NPK</option>
                  <option>Bio-fertiliser</option>
                  <option>None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fertiliser Usage (kg)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 120"
                  required
                  min="0" />
                
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto px-8">
                
                {isSubmitting ? 'Processing...' : 'Submit Data'}
              </button>
            </div>
          </form>
        </div>

        {/* IoT Sensor Data Panel */}
        <div className="card p-0 flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center">
              <WifiIcon className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">IoT Sensors</h2>
            </div>
            <div className="flex items-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-600">Live</span>
            </div>
          </div>

          <div className="p-6 flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <DropletsIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Soil Moisture
                  </p>
                  <p className="text-xs text-gray-400">Updated 2m ago</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">42%</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-amber-50 rounded-lg mr-3">
                  <ThermometerIcon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Temperature
                  </p>
                  <p className="text-xs text-gray-400">Updated 2m ago</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">24°C</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-cyan-50 rounded-lg mr-3">
                  <WindIcon className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Humidity</p>
                  <p className="text-xs text-gray-400">Updated 5m ago</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">68%</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-purple-50 rounded-lg mr-3">
                  <FlaskConicalIcon className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">pH Level</p>
                  <p className="text-xs text-gray-400">Updated 1h ago</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">6.5</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-center text-gray-500">
            Sensor data is automatically appended to manual submissions.
          </div>
        </div>
      </div>
    </motion.div>);

}