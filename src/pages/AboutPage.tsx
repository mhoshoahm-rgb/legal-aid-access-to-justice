import React from 'react';
import {
  Scale,
  Shield,
  BookOpen,
  Heart,
  AlertTriangle,
  Lock,
  Code2,
  Users,
  Compass,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Page Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>Academic & Student Research Initiative</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          About the Legal Aid & Access to Justice Project
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          An educational research application demonstrating how modern Generative AI technologies can democratize legal comprehension, bridge the civil justice gap, and assist citizens without making unauthorized claims to professional legal practice.
        </p>
      </div>

      {/* Mandatory Student Project Statement Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <h2 className="text-lg font-serif font-bold text-amber-900">
            Educational Student Project Notice
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
          This website was developed as an educational project in Google AI Studio Build. It is designed to explore how large language models can act as communicative bridges between complex statutory systems and everyday individuals experiencing legal stress.
        </p>
        <p className="text-xs text-amber-800 font-semibold pt-1">
          Under no circumstances does this application provide formal legal representation, create an attorney-client relationship, or serve as a substitute for individualized counsel from a licensed advocate or certified legal aid organization.
        </p>
      </div>

      {/* Core Principles Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Design Philosophy
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Core Architectural Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Zero Hallucination of Laws
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We never fabricate statutory section numbers, fictional court precedents, fictitious government schemes, or made-up phone numbers. Our prompts strictly mandate grounded legal education and emphasize verification with local attorneys.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Privacy by Design
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We explicitly advise users against submitting confidential identity identifiers (Aadhaar, SSN, bank accounts, passwords). No external trackers, user surveillance databases, or commercial telemetry are loaded.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Plain-Language Translation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Disputes are parsed into simple words, general rights, chronological action checklists, and evidence preparation lists so clients can walk into free clinics well-prepared.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Immediate Safety Priority
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If an emergency situation, threats, or domestic violence are detected, the system immediately highlights crisis contact hotlines (911, 112, 1-800-799-SAFE) rather than purely academic advice.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm font-bold text-slate-900">
              Does using this website mean I have an attorney?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No. Using this tool does not create an attorney-client relationship. All generated roadmaps are for educational preparation and organizational assistance only.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm font-bold text-slate-900">
              Can I use the generated checklist at a real legal aid clinic?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes, absolutely! In fact, one of the primary barriers in legal aid intake is that applicants arrive without their lease, payment receipts, or chronological timeline. Having an organized document checklist significantly speeds up clinical review.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm font-bold text-slate-900">
              How does the technology work?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The application runs on a lightweight React, TypeScript, and Express architecture designed natively for Google AI Studio Build. AI synthesis is powered by Gemini 3.8 Flash through a secure, server-side proxy adhering to strict safety boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Educational Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
