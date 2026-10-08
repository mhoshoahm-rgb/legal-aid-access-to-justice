import React from 'react';
import {
  Scale,
  Shield,
  FileText,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Clock,
  Sparkles,
  Lock,
  Building2,
  Users,
  Compass,
  ExternalLink
} from 'lucide-react';
import { LEGAL_CATEGORIES } from '../data/categories';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface Props {
  onStartAssistance: (prefillProblem?: string, prefillCategory?: string) => void;
  onNavigateResources: () => void;
  onNavigateAbout: () => void;
}

export const HomePage: React.FC<Props> = ({
  onStartAssistance,
  onNavigateResources,
  onNavigateAbout
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-Assisted Educational Access to Justice</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
            Understand Your Legal Problem in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700">
              Simple, Human Terms
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Free educational legal assessment helping ordinary citizens understand dispute categories, explore fundamental rights, organize essential evidence checklists, and find authorized legal-aid assistance.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onStartAssistance()}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-base sm:text-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Describe Your Legal Problem</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={onNavigateResources}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-base transition flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-slate-500" />
              <span>Explore Legal Aid Directory</span>
            </button>
          </div>

          {/* Trust & Privacy Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-600" />
              No login or identity required
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              100% Free & Educational
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Instant plain-language breakdown
            </span>
          </div>
        </div>

        {/* Legal Disclaimer Callout */}
        <div className="max-w-4xl mx-auto mt-10">
          <DisclaimerBanner />
        </div>
      </section>

      {/* Quick Problem Simulator / "Try an Example" */}
      <section className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Interactive Demonstrations
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Select a Common Situation to See How It Works
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Click any scenario below to see the instant plain-language assessment, rights analysis, and document checklist:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {LEGAL_CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onStartAssistance(cat.sampleQuery, cat.id)}
                className="text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-amber-300 mb-1">
                    {cat.name}
                  </div>
                  <div className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    &ldquo;{cat.sampleQuery}&rdquo;
                  </div>
                </div>
                <div className="pt-3 text-[11px] font-semibold text-blue-300 group-hover:text-white flex items-center gap-1">
                  <span>Analyze this scenario</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Transparent Workflow
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            How The Access to Justice Portal Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            From feeling overwhelmed by legal jargon to having a structured, documented action plan in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Describe in Plain Words
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explain what occurred in your own everyday words. No legal terminology required. Warned against sharing sensitive ID numbers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Analyze Category & Urgency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The AI identifies the appropriate legal domain and evaluates urgency (Emergency, Urgent, Normal, or Informational).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Review Rights & Checklists
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Get an interactive roadmap: recognized general rights, practical step-by-step actions, and necessary documents to gather.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-lg">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Connect with Real Legal Aid
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find statutory legal clinics, bar association referral panels, and consumer ombudsman offices where qualified lawyers assist.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Legal Categories Grid */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Legal Categories Covered
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
              Common Dispute Areas We Assist With
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mt-1">
              We cover all fundamental civil, family, consumer, housing, and social justice areas.
            </p>
          </div>

          <button
            onClick={() => onStartAssistance()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900 transition self-start md:self-auto"
          >
            <span>Start with any custom problem</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {LEGAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition">
                  {cat.name}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100">
                <button
                  onClick={() => onStartAssistance(cat.sampleQuery, cat.id)}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:gap-1.5 transition"
                >
                  <span>Explore sample issue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why This Project Matters / Educational Mission Callout */}
      <section className="max-w-5xl mx-auto bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              The Justice Gap & Plain Language
            </h3>
            <p className="text-xs text-slate-500">Why public access to legal clarity is essential</p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Over 70% of low-income and working-class families encounter at least one civil legal problem per year—ranging from arbitrary security deposit forfeiture to unlawful wage deductions. However, complex legalese and exorbitant attorney fees prevent many from ever seeking justice.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="text-xl font-bold text-slate-900">Demystification</div>
            <div className="text-xs text-slate-600">Translating complex civil procedures into actionable, step-by-step instructions.</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="text-xl font-bold text-slate-900">Document Readiness</div>
            <div className="text-xs text-slate-600">Empowering citizens to walk into legal aid clinics with organized, relevant evidence.</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="text-xl font-bold text-slate-900">Safety & Grounding</div>
            <div className="text-xs text-slate-600">Strict safeguards against hallucinating laws while prioritizing immediate crisis helplines.</div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-4">
          <button
            onClick={onNavigateAbout}
            className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-slate-950 underline underline-offset-4"
          >
            Read more about this student project & research goals →
          </button>
        </div>
      </section>
    </div>
  );
};
