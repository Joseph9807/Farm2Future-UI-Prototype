import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ESGReportPage } from './pages/ESGReportPage';
import { TokenMonitoringPage } from './pages/TokenMonitoringPage';
import { TransferOwnershipPage } from './pages/TransferOwnershipPage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { CollectFarmDataPage } from './pages/CollectFarmDataPage';
import { AppLayout } from './components/AppLayout';
import { User, Page } from './types';
export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage('dashboard');
  };
  const handleLogout = () => {
    setUser(null);
  };
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} user={user} />;
      case 'esg-report':
        return <ESGReportPage user={user} />;
      case 'token-monitoring':
        return <TokenMonitoringPage />;
      case 'transfer-ownership':
        return <TransferOwnershipPage />;
      case 'transaction-history':
        return <TransactionHistoryPage />;
      case 'collect-farm-data':
        return <CollectFarmDataPage />;
      default:
        return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };
  return (
    <AppLayout
      user={user}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}>
      
      {renderPage()}
    </AppLayout>);

}