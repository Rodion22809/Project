import type { Category, Level } from '../lib/types';

export const CATEGORY_META: Record<
  Category,
  { color: string; dot: string; description: string }
> = {
  Fundamentals: {
    color: 'text-neon-300 border-neon-400/25 bg-neon-400/[0.07]',
    dot: 'bg-neon-400',
    description: 'The core mental models behind digital security.',
  },
  Networking: {
    color: 'text-sky-300 border-sky-400/25 bg-sky-400/[0.07]',
    dot: 'bg-sky-400',
    description: 'How data moves, resolves and connects.',
  },
  Threats: {
    color: 'text-rose-300 border-rose-400/25 bg-rose-400/[0.07]',
    dot: 'bg-rose-400',
    description: 'Attack patterns, malware and human manipulation.',
  },
  Cryptography: {
    color: 'text-violet-300 border-violet-400/25 bg-violet-400/[0.07]',
    dot: 'bg-violet-400',
    description: 'Keys, ciphers and the mathematics of trust.',
  },
  Linux: {
    color: 'text-amber-300 border-amber-400/25 bg-amber-400/[0.07]',
    dot: 'bg-amber-400',
    description: 'The operating system that runs the internet.',
  },
  'Web Security': {
    color: 'text-teal-300 border-teal-400/25 bg-teal-400/[0.07]',
    dot: 'bg-teal-400',
    description: 'Databases, browsers and application defense.',
  },
  Identity: {
    color: 'text-fuchsia-300 border-fuchsia-400/25 bg-fuchsia-400/[0.07]',
    dot: 'bg-fuchsia-400',
    description: 'Authentication, access and account hygiene.',
  },
};

export const LEVEL_META: Record<Level, string> = {
  Beginner: 'border-neon-400/25 text-neon-300 bg-neon-400/[0.06]',
  Intermediate: 'border-violet-400/25 text-violet-300 bg-violet-400/[0.06]',
  Advanced: 'border-rose-400/25 text-rose-300 bg-rose-400/[0.06]',
};

export const NAV_ITEMS = [
  { to: '/fyp', key: 'nav.fyp' },
  { to: '/courses', key: 'nav.courses' },
  { to: '/library', key: 'nav.library' },
  { to: '/community', key: 'nav.community' },
  { to: '/about', key: 'nav.about' },
] as const;

export const HERO_STATS = [
  { value: '12', label: 'Field notes' },
  { value: '6', label: 'Free courses' },
  { value: '24+', label: 'Guided lessons' },
  { value: '100%', label: 'Open access' },
];

export const FEATURES = [
  {
    icon: 'unlock',
    title: 'Zero-cost knowledge',
    body: 'Every course, lesson and field note is free. No trials, no credit card, no paywalled fundamentals.',
  },
  {
    icon: 'route',
    title: 'Structured paths',
    body: 'Start with a mental model, then move through networking, Linux, code and defensive security in a deliberate order.',
  },
  {
    icon: 'terminal',
    title: 'Practice-first lessons',
    body: 'Short readings, command walkthroughs and knowledge checks designed to be applied, not memorized.',
  },
  {
    icon: 'shield',
    title: 'Ethics by default',
    body: 'Responsible disclosure, consent and legal boundaries are built into every offensive-security module.',
  },
];

export const TRACKS: Array<{
  title: string;
  category: Category;
  blurb: string;
  modules: number;
}> = [
  { title: 'Security Foundations', category: 'Fundamentals', blurb: 'Build the vocabulary and threat models that everything else depends on.', modules: 3 },
  { title: 'Networks & Protocols', category: 'Networking', blurb: 'IP, DNS, VPNs and the invisible infrastructure behind every request.', modules: 3 },
  { title: 'Threat Landscape', category: 'Threats', blurb: 'Recognize phishing, malware, DDoS and social-engineering playbooks.', modules: 3 },
  { title: 'Linux Operator', category: 'Linux', blurb: 'Move confidently through a shell, filesystem and permissions model.', modules: 1 },
  { title: 'Web & Data', category: 'Web Security', blurb: 'Understand SQL, web app attack surfaces and defensive coding basics.', modules: 1 },
  { title: 'Identity & Crypto', category: 'Identity', blurb: 'Protect accounts and learn how encryption actually creates trust.', modules: 2 },
];

export const TESTIMONIALS = [
  {
    quote:
      'I finally understand how DNS, VPNs and TLS fit together. The lessons are short enough to finish after work and deep enough to matter.',
    name: 'Mira K.',
    role: 'Junior SOC analyst',
    initials: 'MK',
    color: 'from-neon-400/30 to-emerald-600/10',
    tag: 'Demo profile',
  },
  {
    quote:
      'The Linux course is the clearest introduction I have used. Real commands, honest explanations, no magic copy-paste.',
    name: 'Daniel R.',
    role: 'CS student',
    initials: 'DR',
    color: 'from-violet-400/30 to-indigo-600/10',
    tag: 'Demo profile',
  },
  {
    quote:
      'As a designer I wanted a security baseline without changing careers. DARKNET gave me exactly that — and it is free.',
    name: 'Aya S.',
    role: 'Product designer',
    initials: 'AS',
    color: 'from-sky-400/30 to-cyan-600/10',
    tag: 'Demo profile',
  },
];

export const FAQS = [
  {
    q: 'Is DARKNET ACADEMY really free?',
    a: 'Yes. This demo platform is designed around open-access education. There are no paid tiers, trials or hidden fees. All courses and field notes are available from the moment you enter.',
  },
  {
    q: 'Is this a real accredited school?',
    a: 'No. DARKNET ACADEMY is an independent educational demo project. We are not a licensed school, accreditation body or certifying organization. All documents on the Licenses page are explicitly marked DEMO — NOT OFFICIAL.',
  },
  {
    q: 'Do I need experience to start?',
    a: 'No. The Beginner track assumes zero technical background. If you can use a browser, you can start with “What is cybersecurity?” and follow the recommended order. Each module states its prerequisites.',
  },
  {
    q: 'What can I actually do after a course?',
    a: 'You will be able to explain core concepts, read common configurations, use a Linux shell for basic tasks and approach security problems with an ethical, structured mindset. These are foundations — not professional certifications.',
  },
  {
    q: 'Is any hacking content illegal?',
    a: 'No. We only teach defensive concepts and ethical, lawful testing on systems you own or have written permission to assess. Every offensive module includes a scope-and-consent checklist.',
  },
  {
    q: 'How is my progress stored?',
    a: 'In this demo, progress, favorites and profile data are stored only in your browser’s localStorage. Nothing is sent to a server. Clearing site data resets your account.',
  },
];

export const ACHIEVEMENTS = [
  { id: 'first-topic', title: 'First Contact', description: 'Read your first field note.', icon: 'book', requirement: 'Read 1 field note' },
  { id: 'curious', title: 'Curious Mind', description: 'Read three different field notes.', icon: 'brain', requirement: 'Read 3 field notes' },
  { id: 'collector', title: 'Signal Keeper', description: 'Save a field note to favorites.', icon: 'bookmark', requirement: 'Favorite 1 note' },
  { id: 'enrolled', title: 'Operator', description: 'Enroll in your first course.', icon: 'graduation', requirement: 'Enroll in 1 course' },
  { id: 'halfway', title: 'Momentum', description: 'Reach 50% in any course.', icon: 'trending', requirement: '50% course progress' },
  { id: 'graduate', title: 'Path Complete', description: 'Finish every lesson in a course.', icon: 'award', requirement: 'Complete 1 course' },
  { id: 'member', title: 'Academy Member', description: 'Create your demo account with Apple.', icon: 'user', requirement: 'Sign in' },
  { id: 'voice', title: 'Community Voice', description: 'Publish a post in the community feed.', icon: 'message', requirement: 'Publish 1 post' },
];

export const CERTIFICATES = [
  {
    id: 'student-license',
    title: 'Cybersecurity Student License',
    subtitle: 'Foundations in digital security',
    number: 'DKA-2026-CS-0417',
    issued: '2026-02-14',
    kind: 'STUDENT LICENSE',
    accent: 'neon',
    description:
      'A demo record of study for the Security Foundations learning path. This document has no academic or professional standing.',
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking Training Certificate',
    subtitle: 'Responsible security testing fundamentals',
    number: 'DKA-2026-EH-0921',
    issued: '2026-03-02',
    kind: 'TRAINING CERTIFICATE',
    accent: 'violet',
    description:
      'A demonstration credential for the Ethical Hacking Basics course. It does not certify professional competence or authorize testing.',
  },
  {
    id: 'network-security',
    title: 'Network Security Training License',
    subtitle: 'Protocols, segmentation and defense',
    number: 'DKA-2026-NS-1180',
    issued: '2026-03-21',
    kind: 'TRAINING LICENSE',
    accent: 'cyan',
    description:
      'A demo completion record for Networking Essentials. Not a license to operate, audit or provide security services.',
  },
  {
    id: 'membership',
    title: 'Darknet Academy Membership',
    subtitle: 'Open-access learning collective',
    number: 'DKA-2026-MB-0042',
    issued: '2026-01-08',
    kind: 'MEMBERSHIP RECORD',
    accent: 'amber',
    description:
      'A demo membership card for this educational project. It carries no rights, privileges or affiliation with any real organization.',
  },
];

export const CONTACT_TOPICS = [
  'General question',
  'Course feedback',
  'Report an error',
  'Accessibility',
  'Partnership idea',
  'Safety concern',
];
