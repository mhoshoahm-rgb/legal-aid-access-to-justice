import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Building,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Shield,
  ArrowRight
} from 'lucide-react';
import { OFFICIAL_LEGAL_AID_SYSTEMS, GENERAL_LEGAL_AID_CRITERIA_GUIDE } from '../data/resources';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface Props {
  onStartAssistance: () => void;
}

export const ResourcesPage: React.FC<Props> = ({ onStartAssistance }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const resourceTypes = ['All', 'Public Legal Aid', 'Statutory Authority', 'Pro Bono Clinic', 'Dispute Forum', 'Helpline / Hotline'];

  const filteredResources = OFFICIAL_LEGAL_AID_SYSTEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || item.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* Page Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Official Legal Aid Information Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Public Legal Aid Systems & Dispute Resolution Channels
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Understanding the official public pathways available for civil justice. We do not invent contact numbers or private law firm ads; instead, we provide verified guidance on how official public legal aid, bar association pro bono panels, and statutory dispute commissions operate.
        </p>
      </div>

      {/* Guide: How to Qualify for Free Legal Aid */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Eligibility Principles
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Who Qualifies for Free or Subsidized Legal Aid?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Civil legal aid is generally rationed to those most vulnerable. Here are the 4 primary assessment criteria:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GENERAL_LEGAL_AID_CRITERIA_GUIDE.map((guide, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                {guide.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {guide.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search channels (e.g., housing, wage, clinic)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Directory Cards */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-blue-200 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {res.type}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {res.region}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                  {res.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {res.overview}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block">Eligibility Framework:</span>
                  <p>{res.eligibilityCriteria}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>What to organize before calling:</span>
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {res.howToPrepare.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-slate-500 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                  <strong>Official Channel Note:</strong> {res.officialChannelNote}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No resources matched your search</h3>
            <p className="text-xs text-slate-500">Try adjusting your search keywords or resetting the filter category.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedType('All'); }}
              className="text-xs font-bold text-blue-600 underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Direct CTA to problem analyzer */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Have a specific problem right now?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Input your dispute details to generate a customized document checklist and step-by-step roadmap tailored to your situation.
          </p>
        </div>

        <button
          onClick={onStartAssistance}
          className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition shadow-md shrink-0 flex items-center gap-2"
        >
          <span>Analyze My Problem Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Educational Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
