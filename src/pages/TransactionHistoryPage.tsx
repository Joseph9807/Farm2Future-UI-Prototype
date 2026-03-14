import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, CalendarIcon } from 'lucide-react';
import { Badge } from '../components/Badge';
const mockTransactions = [
{
  id: 'TXN-2024-101',
  token: 'TKN-2024-001',
  from: 'System',
  to: 'Green Valley Farm',
  date: '2024-10-12 09:30',
  status: 'completed'
},
{
  id: 'TXN-2024-102',
  token: 'TKN-2024-002',
  from: 'Green Valley Farm',
  to: 'EcoFoods Corp',
  date: '2024-10-14 11:15',
  status: 'completed'
},
{
  id: 'TXN-2024-103',
  token: 'TKN-2024-003',
  from: 'System',
  to: 'Sunrise Organics',
  date: '2024-10-15 14:20',
  status: 'pending'
},
{
  id: 'TXN-2024-104',
  token: 'TKN-2024-004',
  from: 'Highland Pastures',
  to: 'Global Mills',
  date: '2024-10-18 08:45',
  status: 'completed'
},
{
  id: 'TXN-2024-105',
  token: 'TKN-2024-005',
  from: 'System',
  to: 'Green Valley Farm',
  date: '2024-10-20 16:10',
  status: 'failed'
},
{
  id: 'TXN-2024-106',
  token: 'TKN-2024-006',
  from: 'EcoFoods Corp',
  to: 'Retailer Inc',
  date: '2024-10-22 10:05',
  status: 'completed'
},
{
  id: 'TXN-2024-107',
  token: 'TKN-2024-007',
  from: 'Sunrise Organics',
  to: 'EcoFoods Corp',
  date: '2024-10-25 13:40',
  status: 'completed'
},
{
  id: 'TXN-2024-108',
  token: 'TKN-2024-008',
  from: 'System',
  to: 'Highland Pastures',
  date: '2024-10-28 09:15',
  status: 'completed'
}];

export function TransactionHistoryPage() {
  const [search, setSearch] = useState('');
  const filteredTxns = mockTransactions.filter(
    (t) =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.token.toLowerCase().includes(search.toLowerCase()) ||
    t.from.toLowerCase().includes(search.toLowerCase()) ||
    t.to.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="space-y-6">
      
      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search by ID, Token, or Actor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
          
        </div>
        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="date" className="input-field pl-10 text-gray-500" />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  Transaction ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  Token ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  From
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTxns.map((txn) =>
              <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {txn.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-farm-600">
                    {txn.token}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {txn.from}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {txn.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {txn.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                    label={
                    txn.status.charAt(0).toUpperCase() + txn.status.slice(1)
                    }
                    variant={txn.status as any} />
                  
                  </td>
                </tr>
              )}
              {filteredTxns.length === 0 &&
              <tr>
                  <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500">
                  
                    No transactions found.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        {/* Pagination Mock */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredTxns.length}</span> of{' '}
                <span className="font-medium">{filteredTxns.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination">
                
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-farm-50 text-sm font-medium text-farm-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);

}