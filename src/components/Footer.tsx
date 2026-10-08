import React from 'react';
import { Scale, ShieldCheck, Heart, ExternalLink, AlertCircle } from 'lucide-react';

interface Props {
  setActiveTab: (tab: 'home' | 'assistance' | 'resources' | 'about') => void;
}

export const Footer: React.FC<Props> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Legal Aid & Access to Justice Portal
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              An educational, open access-to-justice initiative designed to bridge the legal information divide. We help ordinary citizens translate complex disputes into plain language, discover fundamental rights, organize document checklists, and locate official legal-aid resources.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Privacy Guaranteed: We never store your personal case information or passwords.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition text-slate-400"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('assistance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition text-slate-400"
                >
                  Describe Your Legal Problem
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('resources'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition text-slate-400"
                >
                  Legal Aid Directory & Qualifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition text-slate-400"
                >
                  About This Project & Limitations
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Emergency Services
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                <strong className="text-slate-200">Immediate Police / Emergency:</strong><br />
                Call 911 (US/CA) | 112 (EU/India) | 999 (UK)
              </p>
              <p>
                <strong className="text-slate-200">Domestic Violence Support:</strong><br />
                1-800-799-SAFE (7233) or SMS &ldquo;START&rdquo; to 88788
              </p>
              <p>
                <strong className="text-slate-200">Suicide & Crisis Helpline:</strong><br />
                Dial 988 (US/CA)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Educational Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <p>
              <strong>Academic Project Disclaimer:</strong> This website is an educational demonstration project and does not constitute formal legal advice.
            </p>
            <p>
              Neither this tool nor any generative output creates an attorney-client relationship. If you face a serious legal dispute, consult a licensed attorney or a recognized legal-aid organization.
            </p>
          </div>

          <div className="flex items-center gap-1 text-slate-400 shrink-0">
            <span>Built with care for public legal literacy</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
