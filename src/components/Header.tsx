import React from 'react';
import { Search, Settings, Bell, Sparkles } from 'lucide-react';
import { patientInfo } from '../data/mockHealthData';
import { navItems } from '../data/navigation';
import { NavItem } from '../types/navigation';
import { MobileNavMenu } from './MobileNavMenu';
import { Avatar } from './ui/Avatar';

interface HeaderProps {
  onOpenAva: () => void;
  /** Controlled by App so this view is never a navigation dead end. */
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAva, activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-brand-100/70 shadow-sm transition-all relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-18 py-3">

          {/* Left: Brand Logo & Navigation Links Pill */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8 min-w-0">

            {/* Below lg the pill nav is hidden, so this is the only way back
                to the other tabs on mobile. */}
            <MobileNavMenu activeTab={activeTab} onTabChange={onTabChange} />

            {/* Brand Logo */}
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-200">
                <Sparkles className="w-5.5 h-5.5 animate-pulse" aria-hidden="true" />
              </div>
              <div className="hidden sm:block min-w-0">
                <span className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Ava<span className="text-brand-600">Health</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-100 text-brand-700 rounded-full uppercase tracking-wider">AI 4.2</span>
                </span>
                <span className="text-xs text-slate-400 block -mt-1 font-medium">Clinical Intelligence</span>
              </div>
            </div>

            {/* Navigation Pill Container - exact links from original design */}
            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 min-w-0"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-400 ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Utilities: Search, Actions, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 shrink-0">

            {/* Search Bar */}
            <div className="relative hidden md:block w-48 xl:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="text"
                aria-label="Search patient vitals and labs"
                placeholder="Search patient vitals, labs..."
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all placeholder:text-slate-400 text-slate-700"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </span>
            </div>

            {/* Quick Ask Ava CTA */}
            <button
              type="button"
              onClick={onOpenAva}
              className="flex items-center space-x-1.5 px-3 min-h-[44px] md:min-h-0 md:py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100/80 border border-brand-200/80 rounded-full transition-all duration-200 shadow-sm shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-400"
              title="Ask Ava AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
              <span className="hidden sm:inline">Ask Ava</span>
            </button>

            {/* Settings & Bell Icons */}
            <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
              <button
                type="button"
                className="w-10 h-10 shrink-0 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="w-10 h-10 shrink-0 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span className="w-2 h-2 bg-brand-600 rounded-full absolute top-2 right-2 ring-2 ring-white" aria-hidden="true"></span>
              </button>
            </div>

            {/* User Profile Pill - exact from original: David Brock - General Physician */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200/80">
              <Avatar
                src={patientInfo.avatarUrl}
                name={patientInfo.name}
                size={36}
                loading="eager"
                decorative
                className="ring-2 ring-brand-200/70"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                  {patientInfo.name}
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
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
