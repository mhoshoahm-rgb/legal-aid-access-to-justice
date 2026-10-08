import React, { useState } from 'react';
import { Scale, FileText, BookOpen, Info, Menu, X, AlertTriangle } from 'lucide-react';

interface Props {
  activeTab: 'home' | 'assistance' | 'resources' | 'about';
  setActiveTab: (tab: 'home' | 'assistance' | 'resources' | 'about') => void;
  onEmergencyClick: () => void;
}

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab, onEmergencyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'assistance' | 'resources' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Portal Brand */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 group-hover:bg-blue-900 transition text-amber-400 flex items-center justify-center shadow-md">
              <Scale className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition">
                  Access to Justice
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Legal Aid Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Plain-Language Legal Information & Resources
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('assistance')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'assistance'
                  ? 'bg-blue-50 text-blue-800 ring-1 ring-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Legal Assistance</span>
            </button>
            <button
              onClick={() => handleNav('resources')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'resources'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Legal Resources</span>
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'about'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Info className="w-4 h-4 text-slate-500" />
              <span>About Project</span>
            </button>
          </nav>

          {/* Emergency Safety Trigger CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onEmergencyClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border border-red-200 transition"
              title="Click if you need immediate emergency or crisis helpline support"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Crisis Support</span>
            </button>
            <button
              onClick={() => handleNav('assistance')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs"
            >
              Describe Your Problem
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onEmergencyClick}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-red-50 text-red-700 border border-red-200"
            >
              Crisis
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1.5 shadow-lg">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === 'home' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('assistance')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activeTab === 'assistance' ? 'bg-blue-50 text-blue-900' : 'text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Legal Assistance (Analyze)</span>
            </div>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Free</span>
          </button>
          <button
            onClick={() => handleNav('resources')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'resources' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Legal Resources Directory</span>
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'about' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <Info className="w-4 h-4 text-slate-500" />
            <span>About Project & Limitations</span>
          </button>
        </div>
      )}
    </header>
  );
};
