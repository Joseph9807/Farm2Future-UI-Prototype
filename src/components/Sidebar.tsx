import React from 'react';
import {
  LayoutDashboardIcon,
  FileTextIcon,
  CoinsIcon,
  ArrowRightLeftIcon,
  ClockIcon,
  SproutIcon,
  LogOutIcon,
  LeafIcon } from
'lucide-react';
import { Role, Page, User } from '../types';
interface SidebarProps {
  user: User;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
}
export function Sidebar({
  user,
  currentPage,
  onNavigate,
  onLogout,
  isMobileOpen,
  closeMobile
}: SidebarProps) {
  const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboardIcon,
    roles: ['farmer', 'buyer', 'regulator']
  },
  {
    id: 'esg-report',
    label: 'AI ESG Report',
    icon: FileTextIcon,
    roles: ['farmer', 'buyer', 'regulator']
  },
  {
    id: 'token-monitoring',
    label: 'Token Monitoring',
    icon: CoinsIcon,
    roles: ['regulator']
  },
  {
    id: 'transfer-ownership',
    label: 'Transfer Ownership',
    icon: ArrowRightLeftIcon,
    roles: ['farmer', 'buyer']
  },
  {
    id: 'transaction-history',
    label: 'Transaction History',
    icon: ClockIcon,
    roles: ['buyer', 'regulator']
  },
  {
    id: 'collect-farm-data',
    label: 'Collect Farm Data',
    icon: SproutIcon,
    roles: ['farmer']
  }];

  const filteredNav = navItems.filter((item) => item.roles.includes(user.role));
  const handleNav = (pageId: string) => {
    onNavigate(pageId as Page);
    closeMobile();
  };
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen &&
      <div
        className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
        onClick={closeMobile} />

      }

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-farm-900 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Logo */}
        <div className="flex items-center h-16 px-6 bg-farm-900 border-b border-farm-800">
          <LeafIcon className="w-6 h-6 text-farm-300 mr-2" />
          <span className="text-xl font-bold tracking-wide text-white">
            Farm2Future
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${isActive ? 'bg-farm-800 text-white' : 'text-farm-100 hover:bg-farm-800/50 hover:text-white'}
                `}>
                
                <Icon
                  className={`w-5 h-5 mr-3 ${isActive ? 'text-farm-300' : 'text-farm-200'}`} />
                
                {item.label}
              </button>);

          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-farm-800 bg-farm-900">
          <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-farm-700 flex items-center justify-center text-farm-100 font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-farm-300 capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-farm-200 rounded-lg hover:bg-farm-800 hover:text-white transition-colors">
            
            <LogOutIcon className="w-5 h-5 mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </>);

}