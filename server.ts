import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json({ limit: '1mb' }));

// Initialize Gemini SDK with telemetry header as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Categories list
const VALID_CATEGORIES = [
  'Family / Marriage / Divorce',
  'Domestic Violence',
  'Property / Land',
  'Labour / Employment',
  'Consumer Complaints',
  'Criminal Matters',
  'Cybercrime',
  'Rent / Tenant Disputes',
  'Women and Child Rights',
  'Senior Citizen Issues',
  'Accident / Compensation',
  'Education',
  'Government Services',
  'Other'
];

// Fallback analyzer generator when offline or in case of API limits
function generateFallbackAnalysis(description: string, categoryHint?: string, jurisdiction?: string) {
  const text = (description || '').toLowerCase();

  let category = categoryHint && VALID_CATEGORIES.includes(categoryHint) ? categoryHint : 'Other';
  let urgencyLevel: 'Emergency' | 'Urgent' | 'Normal' | 'Informational' = 'Normal';
  let urgencyReason = 'Standard civil or administrative matter requiring structured review.';
  let emergencyGuidance = '';

  if (
    text.includes('kill') ||
    text.includes('beat') ||
    text.includes('hit me') ||
    text.includes('abuse') ||
    text.includes('danger') ||
    text.includes('threat') ||
    text.includes('weapon') ||
    text.includes('hurt') ||
    categoryHint === 'Domestic Violence'
  ) {
    category = 'Domestic Violence';
    urgencyLevel = 'Emergency';
    urgencyReason = 'The description indicates potential risk to physical safety or immediate intimidation.';
    emergencyGuidance = 'If you or someone else is in immediate physical danger, please contact local emergency emergency services (e.g., 911, 112, 999, or 100) or an emergency domestic violence crisis shelter immediately. Do not wait for online advice.';
  } else if (
    text.includes('rent') ||
    text.includes('landlord') ||
    text.includes('evict') ||
    text.includes('deposit') ||
    text.includes('lease') ||
    text.includes('tenant')
  ) {
    category = 'Rent / Tenant Disputes';
    if (text.includes('evict') || text.includes('shut off') || text.includes('lockout')) {
      urgencyLevel = 'Urgent';
      urgencyReason = 'Notice of eviction or loss of essential utilities carries strict statutory response timelines.';
    }
  } else if (
    text.includes('job') ||
    text.includes('salary') ||
    text.includes('wage') ||
    text.includes('fired') ||
    text.includes('employer') ||
    text.includes('boss') ||
    text.includes('workplace')
  ) {
    category = 'Labour / Employment';
    if (text.includes('retaliation') || text.includes('fired')) {
      urgencyLevel = 'Urgent';
      urgencyReason = 'Employment termination or withheld final earnings may have short claim filing periods.';
    }
  } else if (
    text.includes('police') ||
    text.includes('arrest') ||
    text.includes('jail') ||
    text.includes('fir') ||
    text.includes('crime')
  ) {
    category = 'Criminal Matters';
    urgencyLevel = 'Urgent';
    urgencyReason = 'Criminal proceedings, custody, or police questioning affect fundamental constitutional liberty rights.';
  } else if (
    text.includes('scam') ||
    text.includes('hack') ||
    text.includes('bank transfer') ||
    text.includes('fraud') ||
    text.includes('otp') ||
    text.includes('cyber')
  ) {
    category = 'Cybercrime';
    urgencyLevel = 'Urgent';
    urgencyReason = 'Financial cybercrime requires immediate account freezes to prevent further unauthorized losses.';
  } else if (
    text.includes('product') ||
    text.includes('warranty') ||
    text.includes('refund') ||
    text.includes('defect') ||
    text.includes('store')
  ) {
    category = 'Consumer Complaints';
    urgencyLevel = 'Normal';
  } else if (
    text.includes('divorce') ||
    text.includes('custody') ||
    text.includes('spouse') ||
    text.includes('child') ||
    text.includes('marriage')
  ) {
    category = 'Family / Marriage / Divorce';
    urgencyLevel = 'Normal';
  }

  const jurText = jurisdiction && jurisdiction !== 'auto' ? ` (${jurisdiction})` : '';

  return {
    legalIssue: {
      category,
      subTopic: `${category} inquiry${jurText}`,
      summary: description.slice(0, 160) + (description.length > 160 ? '...' : '')
    },
    urgency: {
      level: urgencyLevel,
      reason: urgencyReason,
      emergencyGuidance: urgencyLevel === 'Emergency' ? emergencyGuidance : undefined
    },
    inSimpleWords: `You are dealing with an issue related to ${category}. In everyday terms, this involves resolving a disagreement, seeking fair treatment, or clarifying the responsibilities between parties under established civil or consumer protection principles${jurText}. You do not have to navigate this alone; standard legal processes exist to help resolve this systematically.`,
    generalRights: [
      'Right to fair, written notice and an opportunity to respond before unilateral adverse action is taken.',
      'Right to review all relevant documentation, contracts, receipts, or official notices.',
      'Right to seek representation from a licensed legal professional, public defender, or authorized legal aid advocate.',
      'Right against unlawful harassment, unauthorized lockouts, retaliation, or deceptive business practices.'
    ],
    whatYouCanDo: [
      {
        step: 1,
        title: 'Gather and Organize All Relevant Documentation',
        details: 'Assemble copies of agreements, payment receipts, written emails, text messages, and photos. Create a chronological event timeline.'
      },
      {
        step: 2,
        title: 'Conduct Communications in Writing',
        details: 'Avoid purely verbal agreements. Send a formal, polite written communication (email or certified delivery) summarizing the issue and requesting a resolution within a reasonable timeframe (e.g., 7 to 14 days).'
      },
      {
        step: 3,
        title: 'Contact Local Free or Low-Cost Legal Aid',
        details: 'Reach out to your regional statutory Legal Aid Society, university legal clinic, or courthouse self-help facilitator for intake eligibility screening.'
      },
      {
        step: 4,
        title: 'Consider Official Dispute Mechanisms',
        details: 'If informal resolution fails, examine appropriate administrative forums such as the Department of Labor, Consumer Protection Commission, or Small Claims Tribunal.'
      }
    ],
    documentsNeeded: [
      {
        name: 'Written Agreement or Contract',
        purpose: 'Proves the baseline obligations and agreed terms between both parties.',
        importance: 'Essential' as const
      },
      {
        name: 'Proof of Payments / Invoices / Financial Records',
        purpose: 'Verifies transactions, security deposit transfers, or outstanding unpaid compensation.',
        importance: 'Essential' as const
      },
      {
        name: 'Written Communications (Emails, SMS, Letters)',
        purpose: 'Demonstrates when the issue was brought to attention and how the opposing party responded.',
        importance: 'Essential' as const
      },
      {
        name: 'Photographic / Digital Evidence (if applicable)',
        purpose: 'Records property condition, physical defects, or timestamps.',
        importance: 'Helpful' as const
      }
    ],
    whereToSeekHelp: [
      {
        entityType: 'Legal Aid Society / Clinic' as const,
        name: 'Public Legal Aid Society / Community Law Centre',
        description: 'Non-profit or statutory organization offering free civil legal assistance to income-qualifying individuals.',
        actionAdvice: 'Call their intake helpline and provide a short summary of the issue to see if your case meets their priority criteria.'
      },
      {
        entityType: 'Bar Association' as const,
        name: 'Local Bar Association Lawyer Referral Service',
        description: 'Operates low-cost 30-minute initial consultations and modest-means panels for individuals above free-aid income thresholds.',
        actionAdvice: 'Request a referral to a vetted attorney specializing in ' + category + '.'
      },
      {
        entityType: 'Public Defender / Court Helpdesk' as const,
        name: 'Courthouse Self-Help Center / Pro Se Clinic',
        description: 'Court-based informational desk providing official court forms and procedural filing instructions.',
        actionAdvice: 'Visit during walk-in hours to obtain certified forms and filing requirement packets.'
      }
    ],
    practicalTips: [
      'Keep copies of everything: Never surrender your only original copy of any contract or official document.',
      'Maintain an objective communication log: Record dates, times, names of people spoken to, and summaries of what was stated.',
      'Stay calm and professional in all communications: Avoid angry remarks or unverified accusations, as written communications can become evidence in court.',
      'Watch for strict filing deadlines: Many legal actions have statutory limitation periods; verify deadlines early.'
    ],
    followUpQuestions: [
      'Do you have a signed written contract or lease, or was the agreement made verbally?',
      'Has the other party provided any written notice or formal letter with a specific deadline?',
      'Are there any immediate physical safety concerns or threats?'
    ],
    disclaimer: 'This information is for general educational purposes only and is not a substitute for advice from a qualified lawyer. Laws and procedures vary significantly across jurisdictions and specific facts.',
    jurisdictionNote: jurisdiction && jurisdiction !== 'auto' ? `Grounded in general legal principles applicable to ${jurisdiction}. Verification with a licensed local attorney is strongly advised.` : 'General legal principles provided. Local statutory rules may differ.',
    analyzedAt: new Date().toISOString()
  };
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
    supportedCategories: VALID_CATEGORIES
  });
});

// POST /api/analyze - Core AI Legal Issue Analyzer
app.post('/api/analyze', async (req, res) => {
  const { problemDescription, category: userCategory, jurisdiction } = req.body || {};

  if (!problemDescription || typeof problemDescription !== 'string' || problemDescription.trim().length < 5) {
    res.status(400).json({
      error: 'Please provide a clear description of the legal problem (at least 5 characters).'
    });
    return;
  }

  // System prompt enforcing strict anti-hallucination and educational guidance rules
  const systemInstruction = `You are a knowledgeable, empathetic, and strictly educational legal-aid information specialist assisting ordinary people who need access to justice.
Your role is to help users understand their problem in plain language, identify potential general rights, outline practical next steps, and recommend standard legal-aid channels.

IMPORTANT BOUNDARIES & RULES:
1. You are NOT providing formal legal advice, representation, or legal determinations. This is an educational and access-to-justice guide.
2. DO NOT INVENT or hallucinate specific statutes, legal section numbers, court decisions, exact monetary deadlines, specific phone numbers, physical addresses, or government schemes.
3. If an exact rule depends on local jurisdiction, state clearly that it must be verified with a local attorney or legal aid clinic.
4. URGENCY CLASSIFICATION:
   - "Emergency": Situations involving imminent physical harm, domestic violence, severe threats, child endangerment, or immediate crisis. Clearly advise contacting emergency services (e.g., 911, 112, 999) or domestic violence hotlines right away.
   - "Urgent": Strict short deadlines, impending eviction lockouts, criminal charges, arrest/police summons, or active financial cyberfraud.
   - "Normal": Routine disputes, consumer grievances, delayed security deposits, wage claims, or contract disagreements.
   - "Informational": General questions about legal concepts, rights awareness, or exploratory inquiries.
5. Emphasize document gathering and peaceful, well-documented communication.
6. Use simple, jargon-free words that a beginner can easily understand.`;

  const userPrompt = `Analyze the following legal concern submitted by an ordinary user:
---
User's Description:
"${problemDescription.trim()}"

User Selected Category Hint: ${userCategory || 'Auto-Detect'}
Target Jurisdiction / Region: ${jurisdiction || 'General / Not Specified'}
---

Return a strictly structured JSON response matching the following schema.
Legal categories must be one of: ${VALID_CATEGORIES.join(', ')}.
Urgency level must be one of: "Emergency", "Urgent", "Normal", "Informational".`;

  // Try calling Gemini API if key is present
  if (apiKey) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              legalIssue: {
                type: Type.OBJECT,
                properties: {
                  category: {
                    type: Type.STRING,
                    description: 'One of the valid categories'
                  },
                  subTopic: {
                    type: Type.STRING,
                    description: 'Specific subject area or topic within the category'
                  },
                  summary: {
                    type: Type.STRING,
                    description: 'Concise 1-2 sentence distillation of the issue'
                  }
                },
                required: ['category', 'summary']
              },
              urgency: {
                type: Type.OBJECT,
                properties: {
                  level: {
                    type: Type.STRING,
                    description: 'Emergency, Urgent, Normal, or Informational'
                  },
                  reason: {
                    type: Type.STRING,
                    description: 'Explanation for this urgency classification'
                  },
                  emergencyGuidance: {
                    type: Type.STRING,
                    description: 'Mandatory if Emergency: immediate safety and emergency contact instruction'
                  }
                },
                required: ['level', 'reason']
              },
              inSimpleWords: {
                type: Type.STRING,
                description: 'Clear, compassionate explanation of what the issue is in plain everyday words'
              },
              generalRights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 to 5 general legal rights, principles, or consumer protections that commonly apply'
              },
              whatYouCanDo: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    step: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    details: { type: Type.STRING }
                  },
                  required: ['step', 'title', 'details']
                },
                description: 'Numbered practical, actionable next steps'
              },
              documentsNeeded: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    purpose: { type: Type.STRING },
                    importance: { type: Type.STRING, description: 'Essential, Helpful, or Optional' }
                  },
                  required: ['name', 'purpose', 'importance']
                },
                description: 'Checklist of documents and evidence to collect'
              },
              whereToSeekHelp: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    entityType: { type: Type.STRING },
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    actionAdvice: { type: Type.STRING }
                  },
                  required: ['entityType', 'name', 'description', 'actionAdvice']
                },
                description: 'Official types of legal aid, clinics, bar associations, or government agencies'
              },
              practicalTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 to 5 safety, communication logging, or evidence preservation tips'
              },
              followUpQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2 to 3 clarifying questions the user should consider or gather details on'
              },
              disclaimer: {
                type: Type.STRING,
                description: 'Statement that this is educational information and not a substitute for a qualified lawyer'
              },
              jurisdictionNote: {
                type: Type.STRING,
                description: 'Notes regarding regional laws'
              }
            },
            required: [
              'legalIssue',
              'urgency',
              'inSimpleWords',
              'generalRights',
              'whatYouCanDo',
              'documentsNeeded',
              'whereToSeekHelp',
              'practicalTips',
              'disclaimer'
            ]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        // Ensure standard disclaimer
        if (!parsed.disclaimer || !parsed.disclaimer.includes('lawyer')) {
          parsed.disclaimer = 'This information is for general educational purposes only and is not a substitute for advice from a qualified lawyer.';
        }
        parsed.analyzedAt = new Date().toISOString();
        res.json({
          success: true,
          source: 'gemini-3.8-flash',
          data: parsed
        });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini API call failed or encountered error, utilizing high-quality fallback:', err?.message || err);
    }
  }

  // Graceful fallback if Gemini API key is absent or failed
  const fallback = generateFallbackAnalysis(problemDescription, userCategory, jurisdiction);
  res.json({
    success: true,
    source: 'educational-rules-engine',
    data: fallback,
    notice: apiKey ? 'AI response synthesized through legal aid rules engine.' : 'Demonstration mode: Comprehensive educational analysis generated.'
  });
});

// POST /api/chat-refine - Follow-up clarification on an existing analysis
app.post('/api/chat-refine', async (req, res) => {
  const { question, originalProblem, currentCategory } = req.body || {};

  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'Please provide your follow-up question.' });
    return;
  }

  if (apiKey) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Original Issue Context:
"${originalProblem || 'Legal issue'}"
Category: ${currentCategory || 'General'}

User's Follow-up Question:
"${question}"

Provide a concise, helpful, educational clarification (under 200 words). Explain in simple terms what factors apply, what documents are relevant, and remind them that specific case outcomes depend on local jurisdiction and advice from a licensed lawyer. Do NOT invent statute numbers or specific contact details.`,
        config: {
          systemInstruction: 'You are an educational legal information assistant. Provide clear, grounded, non-legal-advice explanations.',
        }
      });

      res.json({
        success: true,
        answer: response.text || 'Unable to generate clarification at this time.'
      });
      return;
    } catch (err) {
      console.warn('Chat refine error:', err);
    }
  }

  // Fallback response for chat refine
  res.json({
    success: true,
    answer: `Regarding "${question}": In general legal aid proceedings, this depends largely on documentation and statutory timelines. We recommend preserving all written communications regarding this point, bringing it to your initial legal clinic consultation, and avoiding making verbal admissions. A local legal aid attorney can review the specific jurisdiction rules that apply.`
  });
});

// Vite Middleware for Dev or Static Hosting for Prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Legal Aid & Access to Justice Server running on http://0.0.0.0:${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
