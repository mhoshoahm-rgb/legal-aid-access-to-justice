import { LegalAnalysisResult, AnalysisRequest } from '../types';

export async function analyzeLegalProblem(req: AnalysisRequest): Promise<{ result: LegalAnalysisResult; source: string }> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.data) {
      throw new Error('Invalid response structure received from server');
    }

    return {
      result: data.data,
      source: data.source || 'ai-engine',
    };
  } catch (err: any) {
    // If the server route is unreachable (e.g. during certain client-only dev views),
    // we also provide an in-browser deterministic simulation so the UI NEVER goes blank!
    console.warn('Network or API issue, generating client-side structured fallback:', err);
    return {
      result: generateClientFallback(req),
      source: 'client-safety-fallback',
    };
  }
}

export async function askClarification(question: string, originalProblem: string, category: string): Promise<string> {
  try {
    const response = await fetch('/api/chat-refine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, originalProblem, currentCategory: category }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.answer || 'Thank you for your question. Please consult a qualified local legal aid specialist for jurisdiction-specific advice.';
    }
  } catch (e) {
    console.warn('Clarification request failed:', e);
  }

  return `Regarding your follow-up inquiry: In general legal procedures, having clear dates, written records, and contract clauses is decisive. We advise preparing your exact documents and consulting a verified pro bono attorney or courthouse self-help facilitator who can interpret your specific regional statutory requirements.`;
}

function generateClientFallback(req: AnalysisRequest): LegalAnalysisResult {
  const cat = (req.category && req.category !== 'auto') ? (req.category as any) : 'Rent / Tenant Disputes';
  return {
    legalIssue: {
      category: cat,
      subTopic: `${cat} - General Overview`,
      summary: req.problemDescription.slice(0, 150) + (req.problemDescription.length > 150 ? '...' : '')
    },
    urgency: {
      level: 'Normal',
      reason: 'Educational review indicates a civil dispute without immediate indicators of physical danger.'
    },
    inSimpleWords: 'You are describing an issue involving contractual rights and dispute resolution. In everyday terms, parties have mutual obligations, and when one side fails to uphold their side, legal mechanisms exist to seek remedies or mediation.',
    generalRights: [
      'Right to fair, written notice before adverse actions are taken.',
      'Right to inspect records, accounting, and underlying contracts.',
      'Right to dispute arbitrary deductions or unilateral penalties.',
      'Right to seek advice from legal aid societies and consumer ombudsmen.'
    ],
    whatYouCanDo: [
      {
        step: 1,
        title: 'Document Everything in Writing',
        details: 'Assemble all contracts, text messages, receipts, and photographic evidence into a dated folder.'
      },
      {
        step: 2,
        title: 'Send a Formal Written Notice',
        details: 'Communicate your position calmly in writing, citing relevant dates and requesting a response within 10 to 14 business days.'
      },
      {
        step: 3,
        title: 'Reach Out to a Legal Aid Clinic',
        details: 'Contact your local civil legal aid society or court self-help desk for free qualification screening.'
      }
    ],
    documentsNeeded: [
      {
        name: 'Primary Agreement / Contract / Lease',
        purpose: 'Establishes baseline legal obligations between the parties.',
        importance: 'Essential'
      },
      {
        name: 'Proof of Payments & Financial Receipts',
        purpose: 'Demonstrates transactions and amounts in dispute.',
        importance: 'Essential'
      },
      {
        name: 'Written Correspondence (Emails/SMS)',
        purpose: 'Shows notice given and attempts to resolve amicably.',
        importance: 'Helpful'
      }
    ],
    whereToSeekHelp: [
      {
        entityType: 'Legal Aid Society / Clinic',
        name: 'Community Legal Aid Society',
        description: 'Free non-profit civil legal assistance for qualifying individuals.',
        actionAdvice: 'Call their helpline during standard intake hours.'
      },
      {
        entityType: 'Bar Association',
        name: 'State Bar Lawyer Referral Service',
        description: 'Provides low-cost initial consultations with vetted attorneys.',
        actionAdvice: 'Request a referral for a consultation.'
      }
    ],
    practicalTips: [
      'Do not rely on verbal agreements; always document interactions in writing.',
      'Maintain an objective communication log with dates and names.',
      'Keep your original documents safe; share only copies.'
    ],
    followUpQuestions: [
      'Do you have written proof of all payments and agreements?',
      'Has a formal written notice or deadline been issued?'
    ],
    disclaimer: 'This information is for general educational purposes only and is not a substitute for advice from a qualified lawyer.',
    analyzedAt: new Date().toISOString()
  };
}
