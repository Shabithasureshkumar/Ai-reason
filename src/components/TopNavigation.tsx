import React from 'react';
import { Search, Settings, Bell, LayoutGrid } from 'lucide-react';
import { patientInfo } from '../data/mockHealthData';
import { navItems } from '../data/navigation';
import { NavItem } from '../types/navigation';
import { MobileNavMenu } from './MobileNavMenu';
import { Avatar } from './ui/Avatar';

interface TopNavigationProps {
  /** Owned by the parent. This component renders it, it does not copy it. */
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/60 shadow-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-20">

          {/* LEFT / CENTER NAVIGATION CONTAINER MATCHING FIGMA */}
          {/* min-w-0 lets this column actually shrink instead of pushing the
              utility cluster off the right edge of the viewport. */}
          <div className="flex items-center space-x-1 sm:space-x-3 min-w-0">

            {/* Below lg the pill bar cannot fit beside the utilities */}
            <MobileNavMenu activeTab={activeTab} onTabChange={onTabChange} />

            {/* Soft Light Container for Nav */}
            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center bg-[#F6F5FC] p-1.5 rounded-full border border-purple-100/50 shadow-inner overflow-x-auto no-scrollbar min-w-0"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;

                if (isActive) {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onTabChange(item.id)}
                      aria-current="page"
                      className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all transform active:scale-95 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                    >
                      <LayoutGrid className="w-4 h-4 text-white fill-white/20 stroke-[2.2]" aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className="text-slate-800 hover:text-purple-700 hover:bg-white/60 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT SIDE UTILITIES & USER PROFILE */}
          {/* shrink-0 keeps this cluster fully on screen at every width. */}
          <div className="flex items-center gap-[9px] md:gap-3 shrink-0">

            {/* Search Icon inside Light Gray Circular Background.
                44px touch target on mobile, original 40px from sm upwards. */}
            <button
              type="button"
              className="w-11 h-11 md:w-10 md:h-10 shrink-0 rounded-full bg-[#EFEFF5] hover:bg-[#E2E2EC] text-slate-800 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-4.5 h-4.5 text-slate-700 stroke-[2.2]" aria-hidden="true" />
            </button>

            {/* Settings Icon */}
            <button
              type="button"
              className="w-11 h-11 md:w-10 md:h-10 shrink-0 rounded-full hover:bg-slate-100 text-slate-700 hidden md:flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-slate-700 stroke-[2]" aria-hidden="true" />
            </button>

            {/* Notifications Bell Icon */}
            <button
              type="button"
              className="w-11 h-11 md:w-10 md:h-10 shrink-0 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors relative focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700 stroke-[2]" aria-hidden="true" />
            </button>

            {/* Vertical Divider */}
            <div className="h-7 w-[1px] bg-slate-200 mx-1 hidden md:block" aria-hidden="true" />

            {/* Doctor Profile Avatar & Name */}
            <div className="flex items-center gap-[3px] ml-[2px] md:gap-3 md:ml-0 md:pl-1">
              <Avatar
                src={patientInfo.avatarUrl}
                name={patientInfo.name}
                size={40}
                loading="eager"
                decorative
                className="ring-2 ring-purple-100 shadow-sm"
              />
              <div className="text-left">
                <p className="text-xs md:text-sm font-bold text-slate-900 leading-tight whitespace-nowrap">
                  {patientInfo.name}
                </p>
                <p className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5 whitespace-nowrap">
                  <span className="md:hidden">{patientInfo.planLabel}</span>
                  <span className="hidden md:inline">{patientInfo.role}</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
