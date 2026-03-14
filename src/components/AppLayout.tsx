import React, { useState } from 'react';
import { MenuIcon, BellIcon } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { User, Page } from '../types';
interface AppLayoutProps {
  user: User;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  children: React.ReactNode;
}
export function AppLayout({
  user,
  currentPage,
  onNavigate,
  onLogout,
  children
}: AppLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pageTitles: Record<Page, string> = {
    dashboard: 'ESG Dashboard',
    'esg-report': 'AI ESG Report',
    'token-monitoring': 'Token Monitoring',
    'transfer-ownership': 'Smart Contract Transfer',
    'transaction-history': 'Transaction History',
    'collect-farm-data': 'Collect Farm Data'
  };
  return (
    <div className="min-h-screen bg-cream flex">
      <Sidebar
        user={user}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)} />
      

      <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all duration-300">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {pageTitles[currentPage]}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-farm-600 transition-colors relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="hidden sm:block text-sm text-right">
              <p className="font-medium text-gray-900">{user.entityName}</p>
              <p className="text-gray-500 text-xs">Verified Entity</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>);

}