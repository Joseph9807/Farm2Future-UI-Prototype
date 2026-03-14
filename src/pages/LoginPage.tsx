import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LeafIcon,
  SproutIcon,
  ShoppingCartIcon,
  ShieldCheckIcon } from
'lucide-react';
import { Role, User } from '../types';
interface LoginPageProps {
  onLogin: (user: User) => void;
}
export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<Role>('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const roles: {
    id: Role;
    label: string;
    icon: React.ElementType;
    desc: string;
  }[] = [
  {
    id: 'farmer',
    label: 'Farmer',
    icon: SproutIcon,
    desc: 'Manage crops & data'
  },
  {
    id: 'buyer',
    label: 'Buyer',
    icon: ShoppingCartIcon,
    desc: 'Purchase & monitor'
  },
  {
    id: 'regulator',
    label: 'Regulator',
    icon: ShieldCheckIcon,
    desc: 'Audit & compliance'
  }];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      const mockUsers: Record<Role, User> = {
        farmer: {
          id: 'u1',
          name: 'Joseph',
          role: 'farmer',
          entityName: 'Green Valley Farm'
        },
        buyer: {
          id: 'u2',
          name: 'James',
          role: 'buyer',
          entityName: 'EcoFoods Corp'
        },
        regulator: {
          id: 'u3',
          name: 'Gov Official',
          role: 'regulator',
          entityName: 'Dept of Agriculture'
        }
      };
      onLogin(mockUsers[selectedRole]);
    }, 800);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-50 via-cream to-earth-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-farm-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-earth-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-farm-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <LeafIcon className="w-10 h-10 text-white -rotate-3" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Farm2Future
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          AI-enabled blockchain tokenisation for ESG supply chains
        </p>
      </div>

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
          duration: 0.5
        }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select your role
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`
                        flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all
                        ${isSelected ? 'border-farm-600 bg-farm-50 text-farm-800' : 'border-gray-200 bg-white text-gray-500 hover:border-farm-300 hover:bg-farm-50/50'}
                      `}>
                      
                      <Icon
                        className={`w-6 h-6 mb-2 ${isSelected ? 'text-farm-600' : 'text-gray-400'}`} />
                      
                      <span className="text-xs font-medium">{role.label}</span>
                    </button>);

                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder={`demo@${selectedRole}.com`} />
                
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••" />
                
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-farm-600 focus:ring-farm-500 border-gray-300 rounded" />
                
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-farm-600 hover:text-farm-500">
                  
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-lg shadow-md">
                
                {isLoading ?
                <span className="flex items-center">
                    <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    
                      <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4">
                    </circle>
                      <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                    </svg>
                    Authenticating...
                  </span> :

                'Sign in securely'
                }
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>);

}