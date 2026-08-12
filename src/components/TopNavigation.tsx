import React, { useState } from 'react';
import { Search, Settings, Bell, LayoutGrid } from 'lucide-react';
import { patientInfo } from '../data/mockHealthData';

interface TopNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab = 'Dashboard',
  onTabChange,
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Appointment', label: 'Appointment' },
    { id: 'Patient', label: 'Patient' },
    { id: 'Reports', label: 'Reports' },
    { id: 'Chats', label: 'Chats' },
    { id: 'Billing', label: 'Billing' },
  ];

  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT / CENTER NAVIGATION CONTAINER MATCHING FIGMA */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            
            {/* Soft Light Container for Nav */}
            <nav className="flex items-center bg-[#F6F5FC] p-1.5 rounded-full border border-purple-100/50 shadow-inner overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                
                if (isActive) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all transform active:scale-95 shrink-0 cursor-pointer"
                    >
                      <LayoutGrid className="w-4 h-4 text-white fill-white/20 stroke-[2.2]" />
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className="text-slate-800 hover:text-purple-700 hover:bg-white/60 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all shrink-0 cursor-pointer"
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT SIDE UTILITIES & USER PROFILE */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Icon inside Light Gray Circular Background */}
            <button 
              className="w-10 h-10 rounded-full bg-[#EFEFF5] hover:bg-[#E2E2EC] text-slate-800 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-4.5 h-4.5 text-slate-700 stroke-[2.2]" />
            </button>

            {/* Settings Icon */}
            <button 
              className="w-10 h-10 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-slate-700 stroke-[2]" />
            </button>

            {/* Notifications Bell Icon */}
            <button 
              className="w-10 h-10 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors relative focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700 stroke-[2]" />
            </button>

            {/* Vertical Divider */}
            <div className="h-7 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

            {/* Doctor Profile Avatar & Name */}
            <div className="flex items-center space-x-3 pl-1">
              <img
                src={patientInfo.avatarUrl}
                alt={patientInfo.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100 shadow-sm"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  {patientInfo.name}
                </p>
                <p className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                  {patientInfo.role}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

