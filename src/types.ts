export type LegalCategory =
  | 'Family / Marriage / Divorce'
  | 'Domestic Violence'
  | 'Property / Land'
  | 'Labour / Employment'
  | 'Consumer Complaints'
  | 'Criminal Matters'
  | 'Cybercrime'
  | 'Rent / Tenant Disputes'
  | 'Women and Child Rights'
  | 'Senior Citizen Issues'
  | 'Accident / Compensation'
  | 'Education'
  | 'Government Services'
  | 'Other';

export type UrgencyLevel = 'Emergency' | 'Urgent' | 'Normal' | 'Informational';

export interface DocumentItem {
  name: string;
  purpose: string;
  importance: 'Essential' | 'Helpful' | 'Optional';
}

export interface LegalHelpResource {
  entityType: 'Emergency Authority' | 'Legal Aid Society / Clinic' | 'Bar Association' | 'Government Ombudsman / Commission' | 'Public Defender / Court Helpdesk';
  name: string;
  description: string;
  actionAdvice: string;
}

export interface LegalAnalysisResult {
  legalIssue: {
    category: LegalCategory;
    subTopic?: string;
    summary: string;
  };
  urgency: {
    level: UrgencyLevel;
    reason: string;
    emergencyGuidance?: string;
  };
  inSimpleWords: string;
  generalRights: string[];
  whatYouCanDo: {
    step: number;
    title: string;
    details: string;
  }[];
  documentsNeeded: DocumentItem[];
  whereToSeekHelp: LegalHelpResource[];
  practicalTips: string[];
  followUpQuestions?: string[];
  disclaimer: string;
  jurisdictionNote?: string;
  analyzedAt: string;
}

export interface AnalysisRequest {
  problemDescription: string;
  category?: string; // or 'auto'
  jurisdiction?: string;
  urgencyHint?: string;
}

export interface CategoryInfo {
  id: LegalCategory;
  name: string;
  iconName: string;
  shortDesc: string;
  commonIssues: string[];
  sampleQuery: string;
}

export interface OfficialResourceItem {
  id: string;
  name: string;
  category: string;
  type: 'Public Legal Aid' | 'Statutory Authority' | 'Pro Bono Clinic' | 'Helpline / Hotline' | 'Dispute Forum';
  region: string;
  overview: string;
  eligibilityCriteria: string;
  howToPrepare: string[];
  officialChannelNote: string;
}
