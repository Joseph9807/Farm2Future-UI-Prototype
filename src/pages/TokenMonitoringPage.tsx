import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon } from 'lucide-react';
import { Badge } from '../components/Badge';
const mockTokens = [
{
  id: 'TKN-2024-001',
  asset: 'Wheat Batch A',
  owner: 'Green Valley Farm',
  status: 'normal',
  date: '2024-10-12 09:30'
},
{
  id: 'TKN-2024-002',
  asset: 'Rice Batch C',
  owner: 'EcoFoods Corp',
  status: 'normal',
  date: '2024-10-14 11:15'
},
{
  id: 'TKN-2024-003',
  asset: 'Corn Batch B',
  owner: 'Sunrise Organics',
  status: 'flagged',
  date: '2024-10-15 14:20'
},
{
  id: 'TKN-2024-004',
  asset: 'Soybeans Batch A',
  owner: 'Highland Pastures',
  status: 'normal',
  date: '2024-10-18 08:45'
},
{
  id: 'TKN-2024-005',
  asset: 'Cotton Batch D',
  owner: 'Green Valley Farm',
  status: 'at-risk',
  date: '2024-10-20 16:10'
},
{
  id: 'TKN-2024-006',
  asset: 'Wheat Batch B',
  owner: 'EcoFoods Corp',
  status: 'normal',
  date: '2024-10-22 10:05'
},
{
  id: 'TKN-2024-007',
  asset: 'Rice Batch D',
  owner: 'Sunrise Organics',
  status: 'flagged',
  date: '2024-10-25 13:40'
},
{
  id: 'TKN-2024-008',
  asset: 'Corn Batch C',
  owner: 'Highland Pastures',
  status: 'normal',
  date: '2024-10-28 09:15'
}];

export function TokenMonitoringPage() {
  const [filter, setFilter] = useState<'all' | 'normal' | 'flagged'>('all');
  const [search, setSearch] = useState('');
  const filteredTokens = mockTokens.filter((t) => {
    if (filter === 'normal' && t.status !== 'normal') return false;
    if (
    filter === 'flagged' &&
    t.status !== 'flagged' &&
    t.status !== 'at-risk')

    return false;
    if (
    search &&
    !t.id.toLowerCase().includes(search.toLowerCase()) &&
    !t.owner.toLowerCase().includes(search.toLowerCase()))

    return false;
    return true;
  });
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="space-y-6">
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search tokens or owners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
          
        </div>

        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-farm-100 text-farm-800' : 'text-gray-500 hover:text-gray-700'}`}>
            
            All Tokens
          </button>
          <button
            onClick={() => setFilter('normal')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'normal' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>
            
            Normal
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'flagged' ? 'bg-red-100 text-red-800' : 'text-gray-500 hover:text-gray-700'}`}>
            
            Flagged
          </button>
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
                  
                  Token ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  Asset Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  Current Owner
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  ESG Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                  Timestamp
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTokens.map((token) =>
              <tr
                key={token.id}
                className={
                token.status === 'flagged' ?
                'bg-red-50/50' :
                'hover:bg-gray-50'
                }>
                
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-farm-700">
                    {token.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {token.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {token.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                    label={
                    token.status.charAt(0).toUpperCase() +
                    token.status.slice(1).replace('-', ' ')
                    }
                    variant={token.status as any} />
                  
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {token.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-farm-600 hover:text-farm-900">
                      View Details
                    </button>
                  </td>
                </tr>
              )}
              {filteredTokens.length === 0 &&
              <tr>
                  <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500">
                  
                    No tokens found matching your criteria.
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
                <span className="font-medium">{filteredTokens.length}</span> of{' '}
                <span className="font-medium">{filteredTokens.length}</span>{' '}
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