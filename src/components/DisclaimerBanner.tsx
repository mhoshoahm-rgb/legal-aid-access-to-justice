import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<Props> = ({ compact }) => {
  if (compact) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-xs text-amber-900 rounded-r-md flex items-center justify-between no-print">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Educational Project Only:</strong> This portal does not provide legal advice or create an attorney-client relationship. Always verify details with a qualified legal professional.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border border-amber-200/80 rounded-xl p-4 sm:p-5 shadow-xs text-amber-900 no-print">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-700 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <h4 className="font-semibold text-amber-950 flex items-center gap-2">
            Important Legal Information Notice
            <span className="text-[11px] font-normal uppercase tracking-wider bg-amber-200/60 text-amber-800 px-2 py-0.5 rounded-full">
              Student / Educational Project
            </span>
          </h4>
          <p className="text-amber-800/90 leading-relaxed">
            This application is designed solely for general legal literacy, rights education, and guidance toward verified legal-aid resources. It <strong>does NOT provide formal legal advice</strong>, does not form an attorney-client relationship, and must not replace counsel from a licensed attorney in your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
};
