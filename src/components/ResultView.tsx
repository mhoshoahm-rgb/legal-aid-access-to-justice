import React, { useState } from 'react';
import {
  LegalAnalysisResult,
  DocumentItem
} from '../types';
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Printer,
  Copy,
  Check,
  Send,
  Loader2,
  Building,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  ArrowLeft,
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { EmergencyBanner } from './EmergencyBanner';
import { askClarification } from '../services/api';

interface Props {
  result: LegalAnalysisResult;
  originalProblem: string;
  source?: string;
  onReset: () => void;
}

export const ResultView: React.FC<Props> = ({ result, originalProblem, source, onReset }) => {
  // State for user tracking their own checklist
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Follow-up chat state
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [clarifications, setClarifications] = useState<Array<{ q: string; a: string }>>([]);

  const toggleStep = (stepNum: number) => {
    setCheckedSteps(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const toggleDoc = (docName: string) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
  };

  const handleCopySummary = () => {
    const text = `=== LEGAL AID & ACCESS TO JUSTICE REPORT ===
CATEGORY: ${result.legalIssue.category}
URGENCY: ${result.urgency.level} (${result.urgency.reason})

IN SIMPLE WORDS:
${result.inSimpleWords}

GENERAL RIGHTS:
${result.generalRights.map(r => `• ${r}`).join('\n')}

ACTION PLAN:
${result.whatYouCanDo.map(s => `${s.step}. ${s.title}: ${s.details}`).join('\n')}

DOCUMENT CHECKLIST:
${result.documentsNeeded.map(d => `[ ] ${d.name} (${d.importance}) - ${d.purpose}`).join('\n')}

WHERE TO SEEK HELP:
${result.whereToSeekHelp.map(h => `• ${h.name} (${h.entityType}): ${h.actionAdvice}`).join('\n')}

PRACTICAL TIPS:
${result.practicalTips.map(t => `• ${t}`).join('\n')}

DISCLAIMER:
${result.disclaimer}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAskClarification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuestion.trim() || followUpLoading) return;

    const q = followUpQuestion.trim();
    setFollowUpQuestion('');
    setFollowUpLoading(true);

    try {
      const answer = await askClarification(q, originalProblem, result.legalIssue.category);
      setClarifications(prev => [...prev, { q, a: answer }]);
    } catch (err) {
      console.error(err);
    } finally {
      setFollowUpLoading(false);
    }
  };

  // Urgency styling
  const getUrgencyBadge = () => {
    switch (result.urgency.level) {
      case 'Emergency':
        return {
          bg: 'bg-red-100 text-red-900 border-red-300 ring-2 ring-red-400',
          dot: 'bg-red-600',
          label: 'Emergency (Immediate Safety Priority)'
        };
      case 'Urgent':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
          label: 'Urgent (Time-Sensitive Deadlines)'
        };
      case 'Normal':
        return {
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          dot: 'bg-blue-600',
          label: 'Normal (Standard Legal Process)'
        };
      case 'Informational':
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          dot: 'bg-slate-500',
          label: 'Informational (General Guidance)'
        };
    }
  };

  const urgencyBadge = getUrgencyBadge();

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Describe Another Problem</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-200" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Emergency Alert Banner if Emergency */}
      {result.urgency.level === 'Emergency' && (
        <EmergencyBanner
          reason={result.urgency.emergencyGuidance || result.urgency.reason}
          persistent
        />
      )}

      {/* Main Analysis Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full pointer-events-none" />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-3 py-1 rounded-md">
              Legal Category
            </span>
            <span className="text-sm font-semibold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-0.5 rounded-full">
              {result.legalIssue.category}
            </span>
            {result.legalIssue.subTopic && (
              <span className="text-xs text-slate-500">
                • {result.legalIssue.subTopic}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Legal Problem Assessment & Action Roadmap
          </h2>

          {/* Urgency Classification Section */}
          <div className="p-4 rounded-xl border bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Apparent Urgency Assessment
              </div>
              <div className="text-sm font-medium text-slate-700 mt-0.5">
                {result.urgency.reason}
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shrink-0 ${urgencyBadge.bg}`}>
              <span className={`w-2 h-2 rounded-full ${urgencyBadge.dot}`} />
              <span>{urgencyBadge.label}</span>
            </div>
          </div>

          {result.jurisdictionNote && (
            <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{result.jurisdictionNote}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 1: IN SIMPLE WORDS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              In Simple Words
            </h3>
            <p className="text-xs text-slate-500">Plain-language explanation without confusing legal jargon</p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed bg-blue-50/40 p-4 sm:p-5 rounded-xl border border-blue-100/60 font-sans">
          {result.inSimpleWords}
        </p>
      </div>

      {/* SECTION 2: YOUR GENERAL RIGHTS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              Your General Rights & Protections
            </h3>
            <p className="text-xs text-slate-500">Standard protections commonly recognized under civil and consumer principles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {result.generalRights.map((right, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-emerald-50/20 hover:bg-emerald-50/40 transition"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-sm text-slate-800 leading-relaxed">
                {right}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: WHAT YOU CAN DO (Interactive Action Steps) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                What You Can Do (Step-by-Step Action Plan)
              </h3>
              <p className="text-xs text-slate-500">Practical steps you can take now. Click checkboxes as you complete them.</p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500 hidden sm:block">
            {Object.values(checkedSteps).filter(Boolean).length} of {result.whatYouCanDo.length} Completed
          </span>
        </div>

        <div className="space-y-3.5">
          {result.whatYouCanDo.map((item) => {
            const isDone = !!checkedSteps[item.step];
            return (
              <div
                key={item.step}
                onClick={() => toggleStep(item.step)}
                className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border cursor-pointer transition select-none ${
                  isDone
                    ? 'bg-slate-50/80 border-slate-200 opacity-75'
                    : 'bg-white hover:bg-slate-50/60 border-slate-200 hover:border-indigo-300 shadow-xs'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  <div
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition ${
                      isDone
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 bg-white hover:border-indigo-500'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-xs font-bold text-slate-500">{item.step}</span>}
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <h4 className={`text-sm sm:text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    Step {item.step}: {item.title}
                  </h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: DOCUMENTS YOU MAY NEED (Checklist) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Documents You May Need (Checklist)
              </h3>
              <p className="text-xs text-slate-500">Collect these items before filing a dispute or speaking with legal aid</p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500 hidden sm:block">
            {Object.values(checkedDocs).filter(Boolean).length} of {result.documentsNeeded.length} Gathered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {result.documentsNeeded.map((doc: DocumentItem, idx: number) => {
            const isGathered = !!checkedDocs[doc.name];
            return (
              <div
                key={idx}
                onClick={() => toggleDoc(doc.name)}
                className={`p-4 rounded-xl border cursor-pointer select-none transition ${
                  isGathered
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-white hover:bg-slate-50/70 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                        isGathered ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isGathered && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isGathered ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {doc.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {doc.purpose}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                      doc.importance === 'Essential'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : doc.importance === 'Helpful'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {doc.importance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 5: WHERE TO SEEK HELP */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              Where to Seek Help
            </h3>
            <p className="text-xs text-slate-500">Official legal-aid organizations, clinics, and dispute forums</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.whereToSeekHelp.map((resource, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-purple-50/20 hover:bg-purple-50/40 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md">
                  {resource.entityType}
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {resource.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-100/80">
                <div className="text-[11px] font-semibold text-purple-900 uppercase tracking-wider mb-1">
                  How to engage:
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  {resource.actionAdvice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: PRACTICAL & SAFETY TIPS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              Practical Tips & Evidence Preservation
            </h3>
            <p className="text-xs text-slate-500">Proven precautions for protecting yourself during a dispute</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {result.practicalTips.map((tip, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-teal-50/30 border border-teal-100 flex items-start gap-3">
              <span className="text-teal-700 font-bold text-sm shrink-0 mt-0.5">•</span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: FOLLOW-UP QUESTIONS TO CONSIDER */}
      {result.followUpQuestions && result.followUpQuestions.length > 0 && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Important Details to Verify Before Speaking with an Attorney</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {result.followUpQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SECTION 8: ASK A FOLLOW-UP CLARIFICATION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 no-print">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Need Clarification on This Analysis?
            </h3>
            <p className="text-xs text-slate-500">Ask a specific follow-up question regarding rights or document preparation</p>
          </div>
        </div>

        {/* Existing Q&A thread */}
        {clarifications.length > 0 && (
          <div className="space-y-3.5 pt-1">
            {clarifications.map((item, index) => (
              <div key={index} className="space-y-2 bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm">
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">Q</span>
                  {item.q}
                </div>
                <div className="text-slate-700 pl-6 border-l-2 border-blue-500 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleAskClarification} className="flex gap-2">
          <input
            type="text"
            value={followUpQuestion}
            onChange={(e) => setFollowUpQuestion(e.target.value)}
            placeholder="e.g., What if the landlord claims there was verbal damage? Or how do I calculate statutory notice?"
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-2xs"
            disabled={followUpLoading}
          />
          <button
            type="submit"
            disabled={!followUpQuestion.trim() || followUpLoading}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-xs sm:text-sm transition flex items-center gap-1.5 shadow-xs shrink-0"
          >
            {followUpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
      </div>

      {/* SECTION 9: MANDATORY LEGAL DISCLAIMER */}
      <div className="p-5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Statutory Educational Disclaimer</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-serif">
          {result.disclaimer}
        </p>
        <div className="text-[11px] text-amber-800 pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-amber-200/60">
          <span>Analyzed on {new Date(result.analyzedAt).toLocaleDateString()} at {new Date(result.analyzedAt).toLocaleTimeString()}</span>
          <span>Educational & Access to Justice Project</span>
        </div>
      </div>
    </div>
  );
};
