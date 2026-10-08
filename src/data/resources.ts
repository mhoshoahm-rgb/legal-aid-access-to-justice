import { OfficialResourceItem } from '../types';

export const OFFICIAL_LEGAL_AID_SYSTEMS: OfficialResourceItem[] = [
  {
    id: 'public-legal-aid-orgs',
    name: 'Statutory Legal Aid & Community Legal Clinics',
    category: 'General Civil & Housing',
    type: 'Public Legal Aid',
    region: 'National / Regional (e.g. Legal Services Corp, NALSA, Legal Aid Agency, Legal Aid Ontario)',
    overview: 'Publicly-funded legal aid organizations provide free or low-cost civil legal assistance to individuals who cannot afford a private attorney. They handle critical issues including eviction defense, domestic violence protection, consumer debt, public benefits, and wage theft.',
    eligibilityCriteria: 'Generally based on household income (typically at or below 125% to 200% of the federal/national poverty threshold). Exceptions often exist for survivors of domestic violence, seniors, and persons with disabilities regardless of income.',
    howToPrepare: [
      'Proof of current household income (recent pay stubs, benefits award letters, or tax returns)',
      'Lease agreement, eviction notice, or landlord communications for housing issues',
      'Employment contract, timesheets, and pay receipts for wage claims',
      'Timeline of events written in chronological order with key dates'
    ],
    officialChannelNote: 'Search your local jurisdiction government portal or recognized Legal Aid directory. Look for non-profit entities chartered under official statutory legal service boards.'
  },
  {
    id: 'bar-association-pro-bono',
    name: 'Bar Association Lawyer Referral & Pro Bono Panels',
    category: 'All Categories',
    type: 'Pro Bono Clinic',
    region: 'State, Provincial & City Bar Associations',
    overview: 'State, provincial, and metropolitan bar associations operate lawyer referral and pro bono services. While some services offer free representation by volunteer lawyers, many also provide low-fee initial consultations (e.g., a 30-minute structured advice session for a modest nominal fee or free).',
    eligibilityCriteria: 'Pro bono representation typically requires passing an income qualification screening. Lawyer referral consultation programs are usually open to the general public regardless of income.',
    howToPrepare: [
      'A concise 1-page summary of the problem and desired outcome',
      'Copies of any court papers, summons, or legal notices received',
      'Specific questions written down beforehand to maximize consultation time',
      'Budget information if seeking modest-means or payment-plan representation'
    ],
    officialChannelNote: 'Visit your official State Bar or Law Society website. Ensure the attorney you speak with is registered with the state licensing board with no disciplinary sanctions.'
  },
  {
    id: 'court-self-help-centers',
    name: 'Court Self-Help Centers & Pro Se Legal Desks',
    category: 'Court Procedures & Filings',
    type: 'Statutory Authority',
    region: 'Local District / County / Municipal Courthouses',
    overview: 'Courthouses frequently operate on-site Self-Help Centers (also called Pro Se Assistance or Family Court Help Desks). Court facilitators explain filing procedures, provide official fillable court forms, and verify that paperwork complies with local court filing rules.',
    eligibilityCriteria: 'Open to all unrepresented litigants with no income test required. Note: Court staff cannot give strategic legal advice or represent you in hearings.',
    howToPrepare: [
      'Case docket number if a legal proceeding has already been filed',
      'Identification documents (driver license, government ID)',
      'All original documents plus at least 2 clean photocopies for court filing',
      'Pen and notebook to record filing deadlines and hearing dates'
    ],
    officialChannelNote: 'Check the official court website (.gov or judiciary domain) for self-help desk operating hours, walk-in clinics, and downloadable pleading templates.'
  },
  {
    id: 'labor-standards-board',
    name: 'Government Labor & Employment Standards Commissions',
    category: 'Labour / Employment',
    type: 'Statutory Authority',
    region: 'Department of Labor / Wage & Hour Division / Labour Commissioner',
    overview: 'Government labor departments enforce statutory wage, overtime, safe working conditions, and anti-retaliation laws. In most jurisdictions, employees can file an administrative wage claim directly without paying court filing fees or hiring a lawyer.',
    eligibilityCriteria: 'Applicable to employees, apprentices, and misclassified independent contractors covered by statutory labor standards. No fee is charged for filing a wage claim.',
    howToPrepare: [
      'Official employment offer letter or written contract',
      'Work schedules, clock-in records, shift messages, and emails',
      'Bank deposit statements showing wage payment history and gaps',
      'Detailed calculation of total claimed unpaid hours and rate'
    ],
    officialChannelNote: 'Submit claims through official state or national Department of Labor websites or regional Labour Commissioner offices.'
  },
  {
    id: 'consumer-protection-ombudsman',
    name: 'Consumer Protection Agencies & Small Claims Tribunals',
    category: 'Consumer Complaints',
    type: 'Dispute Forum',
    region: 'Federal Trade Commission, State Attorney General, Consumer Commissions',
    overview: 'Consumer affairs departments and statutory consumer dispute commissions provide accessible mediation and adjudication for defective goods, fraudulent business practices, and deceptive advertising. Small claims tribunals offer streamlined, low-cost hearings without complex lawyer rules.',
    eligibilityCriteria: 'Available to consumers experiencing defective goods or services. Small claims courts have statutory monetary caps (e.g., up to $5,000 to $10,000 depending on jurisdiction).',
    howToPrepare: [
      'Original purchase receipt, invoice, or credit card billing proof',
      'Warranty documents and service center communication records',
      'Photographic or video evidence of the defect or damage',
      'Written formal notice or complaint letter previously sent to the merchant'
    ],
    officialChannelNote: 'File complaints online via state Attorney General Consumer Protection portals or municipal consumer commissions.'
  },
  {
    id: 'emergency-crisis-hotlines',
    name: 'Domestic Safety & Emergency Crisis Helplines',
    category: 'Domestic Violence & Safety',
    type: 'Helpline / Hotline',
    region: 'National / Local 24/7 Hotlines',
    overview: 'Confidential 24/7 crisis helplines provide immediate safety planning, emergency shelter placement, emotional support, and referrals to legal advocates for filing emergency protective orders (restraining orders).',
    eligibilityCriteria: 'Free, confidential, and available to anyone experiencing intimate partner violence, stalking, intimidation, or domestic abuse.',
    howToPrepare: [
      'Prioritize your physical safety first before gathering any items',
      'If safe: keep a secure emergency bag with identification, prescription medicine, birth certificates, and money',
      'Use a secure phone or private browsing device that the abuser cannot monitor'
    ],
    officialChannelNote: 'In immediate physical danger, always call local emergency dispatch (e.g. 911 / 112 / 999). For confidential support: National Domestic Violence Hotline (US: 1-800-799-SAFE or text "START" to 88788; UK: 0808 2000 247; India: 112 / 181).'
  }
];

export const GENERAL_LEGAL_AID_CRITERIA_GUIDE = [
  {
    title: 'Income & Financial Means Test',
    description: 'Most free civil legal aid organizations are restricted to households earning below 125% - 200% of federal or regional poverty guidelines. If your income exceeds this threshold, ask about "Modest Means" panels or sliding-scale fees.'
  },
  {
    title: 'Merits and Case Type',
    description: 'Legal aid societies prioritize essential survival needs: avoiding homelessness (eviction), physical protection (restraining orders), retaining custody, wage recovery, and basic food/health benefits. They rarely take business disputes or fee-generating tort cases (which private contingency lawyers handle).'
  },
  {
    title: 'Special Protected Groups',
    description: 'Many clinics offer specialized priority representation regardless of income for senior citizens (60+), active duty military veterans, victims of human trafficking or domestic violence, and children.'
  },
  {
    title: 'What to Ask on Your First Call',
    description: 'When calling a legal intake line, have your timeline ready. Ask: (1) Does my case meet your current intake criteria? (2) What is the deadline to file paperwork? (3) Can you provide self-help documentation or refer me to a volunteer lawyer clinic if you are at capacity?'
  }
];
