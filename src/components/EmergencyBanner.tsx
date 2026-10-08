import React from 'react';
import { AlertOctagon, Phone, Shield, X } from 'lucide-react';

interface Props {
  reason?: string;
  onDismiss?: () => void;
  persistent?: boolean;
}

export const EmergencyBanner: React.FC<Props> = ({ reason, onDismiss, persistent = false }) => {
  return (
    <div className="bg-red-600 text-white p-4 sm:p-5 rounded-xl shadow-lg border-2 border-red-700 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-xs rounded-xl shrink-0 mt-0.5">
            <AlertOctagon className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-wide uppercase bg-black/25 px-2.5 py-0.5 rounded-md">
                Safety Priority: Immediate Assistance
              </span>
              <span className="text-xs bg-red-800 text-red-100 px-2 py-0.5 rounded-full font-medium">
                Emergency Situation
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-red-50 leading-snug">
              {reason || 'If you or someone in your care is facing immediate physical danger, violence, abuse, or serious threats to safety, please seek immediate help from emergency services.'}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs sm:text-sm">
              <div className="bg-red-700/80 hover:bg-red-700 transition p-2.5 rounded-lg border border-red-500/40 flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-200 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Emergency Police / Medical</div>
                  <div className="text-red-100 text-xs">Call 911 (US/CA) • 112 (EU/India) • 999 (UK)</div>
                </div>
              </div>

              <div className="bg-red-700/80 hover:bg-red-700 transition p-2.5 rounded-lg border border-red-500/40 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-200 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Domestic Violence Hotline</div>
                  <div className="text-red-100 text-xs">1-800-799-SAFE or text START to 88788</div>
                </div>
              </div>

              <div className="bg-red-700/80 hover:bg-red-700 transition p-2.5 rounded-lg border border-red-500/40 flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-200 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Crisis Text & Lifeline</div>
                  <div className="text-red-100 text-xs">Dial 988 (US) or text HOME to 741741</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-red-200 italic pt-1">
              Do not rely on this website for active crises or imminent danger. Use a safe phone or computer if your device is monitored.
            </p>
          </div>
        </div>

        {onDismiss && !persistent && (
          <button
            onClick={onDismiss}
            className="text-white/80 hover:text-white hover:bg-red-700 p-1.5 rounded-lg transition"
            aria-label="Dismiss banner"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
