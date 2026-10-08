import { CategoryInfo, LegalCategory } from '../types';

export const LEGAL_CATEGORIES: CategoryInfo[] = [
  {
    id: 'Rent / Tenant Disputes',
    name: 'Rent / Tenant Disputes',
    iconName: 'Home',
    shortDesc: 'Security deposit withholding, illegal eviction threats, repairs negligence, lease violations.',
    commonIssues: [
      'Landlord refuses to return security deposit without cause',
      'Sudden eviction notice without required statutory notice period',
      'Landlord shutting off water or electricity to force eviction',
      'Uninhabitable living conditions and refused urgent repairs'
    ],
    sampleQuery: 'My landlord is refusing to return my $1,500 security deposit after I moved out two months ago. The apartment was cleaned and handed over in good condition with photos taken, but the landlord is ignoring my messages.'
  },
  {
    id: 'Labour / Employment',
    name: 'Labour / Employment',
    iconName: 'Briefcase',
    shortDesc: 'Unpaid wages, unlawful termination, workplace harassment, overtime disputes, non-competes.',
    commonIssues: [
      'Withheld final paycheck or unpaid overtime hours',
      'Abrupt termination without severance or statutory notice',
      'Hostile work environment, discrimination, or retaliation',
      'Misclassification as independent contractor instead of employee'
    ],
    sampleQuery: 'My former employer has withheld my final month salary and overtime pay after I gave standard two-week notice. They claim company policy allows deduction for administrative handovers, but this was never in my employment contract.'
  },
  {
    id: 'Consumer Complaints',
    name: 'Consumer Complaints',
    iconName: 'ShoppingBag',
    shortDesc: 'Defective products, refusal of warranty, misleading ads, unfair service charges, fraud.',
    commonIssues: [
      'Refusal to honor manufacturer warranty on defective goods',
      'Unauthorized debit or recurring billing without consent',
      'Misleading advertising or bait-and-switch sales tactics',
      'Deficient service from telecom, airline, or home repair contractor'
    ],
    sampleQuery: 'I bought a laptop three months ago with an advertised 1-year comprehensive warranty. The screen malfunctioned, but the authorized service center is demanding $350 for repairs, claiming display panels are not covered despite the written warranty card.'
  },
  {
    id: 'Domestic Violence',
    name: 'Domestic Violence',
    iconName: 'ShieldAlert',
    shortDesc: 'Physical safety threats, abusive partner/family, protection orders, emergency safe shelter.',
    commonIssues: [
      'Physical assault or ongoing threats from spouse or partner',
      'Emotional, psychological, or financial coercion and abuse',
      'Need for immediate emergency protection orders / restraining orders',
      'Securing child custody during domestic emergency'
    ],
    sampleQuery: 'My spouse has become increasingly aggressive, making direct threats to physically harm me and take away our child. I need to understand how emergency protection orders work and what legal steps protect my immediate safety.'
  },
  {
    id: 'Family / Marriage / Divorce',
    name: 'Family / Marriage / Divorce',
    iconName: 'Users',
    shortDesc: 'Divorce petitions, child custody & visitation, maintenance/alimony, separation agreements.',
    commonIssues: [
      'Filing for legal separation or mutual/contested divorce',
      'Child custody arrangements, visitation schedules, and support',
      'Division of marital assets, property, and liabilities',
      'Spousal maintenance and enforcement of support agreements'
    ],
    sampleQuery: 'My spouse and I are planning to separate after 7 years of marriage. We have a 4-year-old child and a shared home. I need to understand general custody guidelines, child support factors, and how marital property division is usually approached.'
  },
  {
    id: 'Property / Land',
    name: 'Property / Land',
    iconName: 'MapPin',
    shortDesc: 'Boundary disputes, inheritance claims, fraudulent sales, encroachment, title deeds.',
    commonIssues: [
      'Neighbor encroaching across property survey line',
      'Dispute over ancestral property inheritance without clear will',
      'Builder delayed property possession past contractual deadline',
      'Cloud on title deed or fraudulent duplicate sales document'
    ],
    sampleQuery: 'A neighbor has built a permanent boundary wall that extends two feet into my registered plot according to my municipal survey deed. They refuse to negotiate or inspect the official survey map.'
  },
  {
    id: 'Cybercrime',
    name: 'Cybercrime',
    iconName: 'Laptop',
    shortDesc: 'Online financial fraud, identity theft, unauthorized account access, cyber harassment.',
    commonIssues: [
      'Bank account or credit card phishing scam theft',
      'Identity theft and fraudulent loans taken in your name',
      'Non-consensual image sharing or online stalking/blackmail',
      'Impersonation and social media account hijacking'
    ],
    sampleQuery: 'Someone created fake social media accounts using my real name, photographs, and workplace details, and is sending defamatory messages to my colleagues and demanding money to take them down.'
  },
  {
    id: 'Criminal Matters',
    name: 'Criminal Matters',
    iconName: 'Scale',
    shortDesc: 'Police questioning, right to legal counsel, false accusations, bail basics, FIR / reporting.',
    commonIssues: [
      'Understanding your rights if stopped or questioned by police',
      'Procedures for registering an official police report or complaint',
      'Right to silence, representation, and public defender qualification',
      'What to do if falsely accused of a misdemeanour or crime'
    ],
    sampleQuery: 'A police officer has summoned me to the local station for informal questioning regarding an alleged theft at an office where I worked 6 months ago. What are my general rights regarding legal counsel and questioning?'
  },
  {
    id: 'Women and Child Rights',
    name: 'Women and Child Rights',
    iconName: 'HeartHandshake',
    shortDesc: 'Maternity benefits, workplace safety, child protection, guardianship, educational rights.',
    commonIssues: [
      'Denial of statutory maternity leave or employment retaliation',
      'Sexual harassment in educational or professional settings',
      'Child welfare protections and reporting child neglect/abuse',
      'Legal guardianship and protection of minors'
    ],
    sampleQuery: 'My company informed me that my position will be dissolved right before I am scheduled to start my maternity leave. Other junior team members are retaining their roles. What rights protect pregnant employees against discrimination?'
  },
  {
    id: 'Senior Citizen Issues',
    name: 'Senior Citizen Issues',
    iconName: 'Award',
    shortDesc: 'Elder financial abuse, maintenance from adult children, pension rights, healthcare access.',
    commonIssues: [
      'Adult children neglecting elderly parents or coercing property transfer',
      'Pension delays, arbitrary deductions, or denied retirement benefits',
      'Financial exploitation and predatory contracts targeting seniors',
      'Healthcare and assisted living facility rights'
    ],
    sampleQuery: 'A 74-year-old retired parent was pressured by a relative into signing over power of attorney and deed documents while recovering in the hospital. The relative is now attempting to sell the family home.'
  },
  {
    id: 'Accident / Compensation',
    name: 'Accident / Compensation',
    iconName: 'AlertTriangle',
    shortDesc: 'Motor vehicle collisions, workplace injuries, insurance claims, liability, medical expense recovery.',
    commonIssues: [
      'Insurance company offering an unfairly low settlement post-crash',
      'Hit-and-run incident documentation and compensation funds',
      'Workplace injury compensation claims and employer liability',
      'Preserving evidence, accident reports, and medical expense records'
    ],
    sampleQuery: 'I was struck by a commercial delivery van while crossing a pedestrian crosswalk and suffered a fractured arm. The driver was cited, but the company insurance adjuster is pressuring me to sign a quick $1,000 release before medical bills are finalized.'
  },
  {
    id: 'Education',
    name: 'Education',
    iconName: 'GraduationCap',
    shortDesc: 'Unfair student expulsion, fee refund disputes, discrimination, special education rights.',
    commonIssues: [
      'Institute refusing fee refund after withdrawal within statutory window',
      'Arbitrary disciplinary actions without fair hearing or due process',
      'Denial of reasonable accommodations for disabilities',
      'Withholding educational certificates or degrees over disputed fees'
    ],
    sampleQuery: 'A vocational college abruptly cancelled an accredited diploma program midway through the semester and is refusing to issue a tuition refund or transfer academic credits to a recognized institution.'
  },
  {
    id: 'Government Services',
    name: 'Government Services',
    iconName: 'Landmark',
    shortDesc: 'Denied welfare entitlements, public records requests (FOIA / RTI), municipal inaction, permits.',
    commonIssues: [
      'Arbitrary cancellation or denial of food assistance or disability pension',
      'Refusal of public authorities to disclose public records or decisions',
      'Severe municipal negligence causing property damage',
      'Delays in statutory certificate issuance or passport processing'
    ],
    sampleQuery: 'My application for statutory disability support was rejected without any written statement of reasons or hearing, despite having certified medical assessments from recognized hospitals.'
  },
  {
    id: 'Other',
    name: 'Other',
    iconName: 'HelpCircle',
    shortDesc: 'General civil disputes, small claims, contract issues, neighbor disputes, and uncategorized matters.',
    commonIssues: [
      'Informal loan given to an acquaintance who refuses repayment',
      'Small business verbal contract breach',
      'Defamation or false statements harming personal reputation',
      'Nuisance complaints and community association disagreements'
    ],
    sampleQuery: 'I lent $2,000 to an acquaintance for an emergency with written WhatsApp message promises to repay in 60 days. They have now blocked my number and refuse to pay. What are the general options in small claims dispute resolution?'
  }
];
