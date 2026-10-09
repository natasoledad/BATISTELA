export type Locale = 'pt' | 'es' | 'en';

export interface SolutionContent {
  slug: string;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  forWhom: string[];
  deliverables: string[];
  outcome: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  file: string | null; // null = em breve
  format: string;
}

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  audience: string;
  topics: string[];
}

export interface Dictionary {
  locale: Locale;
  htmlLang: string;
  localeName: string;
  brand: { name: string; tagline: string; legalName: string };
  nav: { home: string; about: string; solutions: string; tools: string; knowledge: string; articles: string; contact: string; cta: string; menu: string; close: string; language: string };
  home: {
    seoTitle: string; seoDescription: string;
    heroEyebrow: string; heroTitle: string; heroHighlight: string; heroText: string; heroCtaPrimary: string; heroCtaSecondary: string;
    pillars: { title: string; text: string }[];
    solutionsTitle: string; solutionsText: string; solutionsCta: string;
    categoryManagement: string; categoryTech: string; solutionsCount: string;
    methodTitle: string; methodSteps: { title: string; text: string }[];
    resourcesTitle: string; resourcesText: string;
    resourceTools: { title: string; text: string; cta: string };
    resourceKnowledge: { title: string; text: string; cta: string };
    resourceArticles: { title: string; text: string; cta: string };
    ctaTitle: string; ctaText: string; ctaButton: string;
  };
  about: {
    seoTitle: string; seoDescription: string; title: string; lead: string; paragraphs: string[];
    valuesTitle: string; values: { title: string; text: string }[];
    teamTitle: string; teamText: string; partners: { name: string; role: string; bio: string; initials: string }[];
    teamPending: string;
  };
  solutions: {
    seoTitle: string; seoDescription: string; title: string; lead: string;
    categoryManagement: string; categoryTech: string; learnMore: string;
    detailForWhom: string; detailDeliverables: string; detailOutcome: string; detailCta: string; detailCtaButton: string; backToList: string; otherSolutions: string;
    items: SolutionContent[];
  };
  tools: {
    seoTitle: string; seoDescription: string; title: string; lead: string;
    calculator: {
      title: string; text: string;
      cost: string; costHelp: string; taxes: string; taxesHelp: string; commission: string; commissionHelp: string; fixedPct: string; fixedPctHelp: string; margin: string; marginHelp: string;
      resultPrice: string; resultMarkup: string; resultContribution: string; resultProfit: string; warning: string; note: string; button: string;
    };
    downloadsTitle: string; downloadsText: string; downloads: DownloadItem[];
    softwareTitle: string; softwareText: string; softwareBadge: string; softwareCta: string;
  };
  knowledge: {
    seoTitle: string; seoDescription: string; title: string; lead: string;
    ebooksTitle: string; ebooksText: string; ebooks: DownloadItem[];
    coursesTitle: string; coursesText: string; courses: CourseItem[]; courseBadge: string; courseCta: string; courseTopics: string; courseAudience: string;
  };
  articles: {
    seoTitle: string; seoDescription: string; title: string; lead: string; empty: string; readMore: string; by: string; translateNotice: string; translateLink: string; backToList: string; minutes: string;
  };
  contact: {
    seoTitle: string; seoDescription: string; title: string; lead: string;
    name: string; email: string; phone: string; company: string; subject: string; message: string; consent: string; consentLink: string; submit: string; sending: string; success: string; error: string;
    subjects: string[];
    infoTitle: string; addressLabel: string; emailLabel: string; whatsappLabel: string; hoursLabel: string; hours: string; remote: string;
  };
  leadForm: { title: string; text: string; name: string; email: string; submit: string; sending: string; success: string; error: string; downloadNow: string; waitlistTitle: string; waitlistText: string; waitlistSuccess: string; close: string };
  footer: { description: string; navTitle: string; solutionsTitle: string; contactTitle: string; privacy: string; rights: string; lgpd: string };
  cookie: { text: string; accept: string; more: string };
  privacy: { seoTitle: string; title: string; updated: string; sections: { title: string; text: string }[] };
  common: { whatsappAria: string; skipToContent: string; comingSoon: string; emBreve: string };
}
