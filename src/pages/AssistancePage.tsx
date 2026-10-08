import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  ShieldAlert,
  Loader2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  MapPin,
  Lock,
  ChevronDown
} from 'lucide-react';
import { LEGAL_CATEGORIES } from '../data/categories';
import { LegalAnalysisResult } from '../types';
import { analyzeLegalProblem } from '../services/api';
import { ResultView } from '../components/ResultView';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface Props {
  initialProblem?: string;
  initialCategory?: string;
}

export const AssistancePage: React.FC<Props> = ({ initialProblem = '', initialCategory = 'auto' }) => {
  const [problemDescription, setProblemDescription] = useState(initialProblem);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [jurisdiction, setJurisdiction] = useState('General');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LegalAnalysisResult | null>(null);
  const [source, setSource] = useState<string>('');

  useEffect(() => {
    if (initialProblem) {
      setProblemDescription(initialProblem);
    }
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialProblem, initialCategory]);

  // Loading step simulation
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const loadingMessages = [
    'Reading and parsing your situation...',
    'Identifying primary legal domain & urgency indicators...',
    'Synthesizing general rights & practical action steps...',
    'Structuring tailored document checklist & legal aid channels...'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim() || problemDescription.trim().length < 5) {
      setError('Please provide a short description of the problem (at least 5 characters).');
      return;
    }

    // Check for accidental sensitive information warnings
    const lower = problemDescription.toLowerCase();
    if (lower.includes('password') || lower.includes('cvv') || lower.includes('pin:')) {
      setError('Safety notice: It looks like you may have entered sensitive credentials or passwords. Please remove them before submitting.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await analyzeLegalProblem({
        problemDescription: problemDescription.trim(),
        category: selectedCategory === 'auto' ? undefined : selectedCategory,
        jurisdiction: jurisdiction === 'General' ? undefined : jurisdiction,
      });

      setResult(data.result);
      setSource(data.source);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred while analyzing the issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick preset loader
  const handleSelectSample = (sample: string, category: string) => {
    setProblemDescription(sample);
    setSelectedCategory(category);
    setError(null);
  };

  if (result) {
    return (
      <ResultView
        result={result}
        originalProblem={problemDescription}
        source={source}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <FileText className="w-3.5 h-3.5" />
          <span>Interactive Legal Problem Assessment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Describe Your Legal Concern
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explain what happened in everyday language. We will categorize your issue, detect urgency, explain your basic rights, and generate an actionable next-steps roadmap.
        </p>
      </div>

      {/* Strict Privacy Warning Callout */}
      <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
        <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 space-y-1">
          <h4 className="font-bold text-amber-950">
            Privacy & Confidentiality Warning
          </h4>
          <p className="text-amber-800 leading-relaxed">
            Please <strong>do not enter unnecessary sensitive personal information</strong> such as passwords, bank account numbers, Aadhaar or Social Security numbers, or confidential identity credentials. Describe the circumstances without naming private financial accounts.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Description Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="problemDescription" className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>What is happening? Describe your problem:</span>
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400">
              {problemDescription.length} characters
            </span>
          </div>

          <textarea
            id="problemDescription"
            rows={6}
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="Example: My landlord has refused to return my security deposit after I moved out two months ago. The apartment was cleaned and handed over in good condition with photos taken, but they are ignoring my messages..."
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-800 text-sm sm:text-base leading-relaxed placeholder:text-slate-400 bg-white shadow-2xs resize-y"
            disabled={loading}
          />
        </div>

        {/* Category & Jurisdiction Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <span>Legal Category</span>
              <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loading}
                className="w-full appearance-none p-3 pr-10 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm text-slate-800 bg-white font-medium"
              >
                <option value="auto">✨ Auto-Detect with AI</option>
                {LEGAL_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-400">
              Leave on Auto-Detect if you are unsure which category applies.
            </p>
          </div>

          {/* Jurisdiction / Location Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="jurisdiction" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <span>Jurisdiction / Region</span>
              <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <select
                id="jurisdiction"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                disabled={loading}
                className="w-full appearance-none p-3 pr-10 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm text-slate-800 bg-white font-medium"
              >
                <option value="General">General / International Legal Principles</option>
                <option value="United States">United States (State & Federal)</option>
                <option value="India">India (Central & State Laws)</option>
                <option value="United Kingdom">United Kingdom (England & Wales / Scotland)</option>
                <option value="Canada">Canada (Federal & Provincial)</option>
                <option value="Australia">Australia (Commonwealth & State)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-400">
              Helps ground legal-aid terminology to your regional framework.
            </p>
          </div>
        </div>

        {/* Quick Sample Scenarios Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick Examples (Click to test instantly):
          </div>
          <div className="flex flex-wrap gap-2">
            {LEGAL_CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectSample(cat.sampleQuery, cat.id)}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition font-medium text-left truncate max-w-xs"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold">Unable to process description:</span>
              <p className="text-xs sm:text-sm text-rose-700">{error}</p>
            </div>
          </div>
        )}

        {/* Submit Button & Progress Indicator */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || !problemDescription.trim()}
            className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-base transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Your Situation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Analyze Problem & Generate Action Plan</span>
              </>
            )}
          </button>

          {/* Loading status text */}
          {loading && (
            <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-xs sm:text-sm space-y-2 text-center animate-pulse">
              <div className="font-semibold">
                {loadingMessages[loadingStep]}
              </div>
              <div className="w-full bg-blue-200/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-700"
                  style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Bottom Educational Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
