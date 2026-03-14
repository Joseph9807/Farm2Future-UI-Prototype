import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircleIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
export function TransferOwnershipPage() {
  const [isIssuing, setIsIssuing] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsIssuing(true);
    setTimeout(() => {
      setIsIssuing(false);
      setShowToast('Token issued successfully on-chain.');
      setTimeout(() => setShowToast(null), 3000);
    }, 1500);
  };
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setShowToast('Ownership transferred successfully.');
      setTimeout(() => setShowToast(null), 3000);
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
      
      {/* Toast Notification */}
      {showToast &&
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
          {showToast}
        </motion.div>
      }

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Token Card */}
        <div className="card p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-farm-100 rounded-lg mr-3">
              <PlusCircleIcon className="w-6 h-6 text-farm-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Issue New Token</h2>
          </div>

          <form onSubmit={handleIssue} className="space-y-4">
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
                Batch ID (Auto-generated)
              </label>
              <input
                type="text"
                className="input-field bg-gray-50"
                value="BCH-2024-8921"
                disabled />
              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (kg)
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 5000"
                required
                min="1" />
              
            </div>

            <button
              type="submit"
              disabled={isIssuing}
              className="btn-primary w-full mt-2">
              
              {isIssuing ? 'Processing...' : 'Issue Token'}
            </button>
          </form>
        </div>

        {/* Transfer Ownership Card */}
        <div className="card p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-earth-100 rounded-lg mr-3">
              <ArrowRightIcon className="w-6 h-6 text-earth-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Transfer Ownership
            </h2>
          </div>

          <form onSubmit={handleTransfer} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Token
              </label>
              <select className="input-field" required>
                <option value="">Select token...</option>
                <option>TKN-2024-001 (Wheat Batch A)</option>
                <option>TKN-2024-004 (Soybeans Batch A)</option>
                <option>TKN-2024-005 (Cotton Batch D)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Owner
              </label>
              <input
                type="text"
                className="input-field bg-gray-50"
                value="Green Valley Farm (You)"
                disabled />
              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Owner Address / ID
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter blockchain address or Entity ID"
                required />
              
            </div>

            <button
              type="submit"
              disabled={isTransferring}
              className="btn-primary w-full mt-2 bg-earth-700 hover:bg-earth-800 focus:ring-earth-600">
              
              {isTransferring ? 'Confirming...' : 'Confirm Transfer'}
            </button>
          </form>
        </div>
      </div>

      {/* Recent Transfers */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Recent Transfers
        </h3>
        <div className="space-y-3">
          {[
          {
            id: 'TXN-8829',
            token: 'TKN-2024-002',
            to: 'EcoFoods Corp',
            date: 'Oct 24, 2024'
          },
          {
            id: 'TXN-8810',
            token: 'TKN-2024-006',
            to: 'Global Mills',
            date: 'Oct 20, 2024'
          },
          {
            id: 'TXN-8795',
            token: 'TKN-2023-142',
            to: 'Sunrise Organics',
            date: 'Oct 15, 2024'
          }].
          map((txn) =>
          <div
            key={txn.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            
              <div className="flex items-center">
                <div className="bg-white p-2 rounded shadow-sm mr-4 border border-gray-200">
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Transferred {txn.token}
                  </p>
                  <p className="text-xs text-gray-500">To: {txn.to}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{txn.id}</p>
                <p className="text-xs text-gray-500">{txn.date}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>);

}