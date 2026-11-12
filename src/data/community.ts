import type { CommunityPost } from '../lib/types';

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Mira K.',
    handle: '@mira_k',
    role: 'SOC analyst in training',
    color: 'neon',
    time: '2h ago',
    category: 'Study log',
    content:
      'Finished the DNS module and finally understand why my home network was resolving some names slowly. The trace diagram made the resolver chain click. Next stop: TLS handshakes. What should I practice first, Wireshark or reading server logs?',
    likes: 42,
    pinned: true,
    replies: [
      {
        id: 'r1',
        author: 'Noah V.',
        handle: '@noahv',
        content:
          'Start with logs — they force you to build a timeline. Then use a packet capture to confirm what you inferred. Both together are much more useful than either alone.',
        time: '1h ago',
        color: 'violet',
      },
      {
        id: 'r2',
        author: 'Aya S.',
        handle: '@ayas',
        content:
          'The TLS lesson’s certificate checklist is great for a home server. I fixed two renewal warnings this weekend.',
        time: '48m ago',
        color: 'sky',
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Noah V.',
    handle: '@noahv',
    role: 'Backend developer',
    color: 'violet',
    time: '5h ago',
    category: 'Discussion',
    content:
      'Unpopular opinion: most “we need a SIEM” conversations should start with “we need to know what normal looks like.” A tool cannot alert on a baseline you never established. Curious how small teams here track their normal traffic without a huge budget.',
    likes: 67,
    replies: [
      {
        id: 'r3',
        author: 'Mira K.',
        handle: '@mira_k',
        content:
          'We started with a simple weekly review of auth logs and a one-page list of expected services. It caught a forgotten staging box before any tooling did.',
        time: '3h ago',
        color: 'neon',
      },
    ],
  },
  {
    id: 'post-3',
    author: 'Aya S.',
    handle: '@ayas',
    role: 'Product designer',
    color: 'sky',
    time: '8h ago',
    category: 'Resource',
    content:
      'Made a printable one-page incident contact card for my team: who to call, what to preserve, and the exact sentence to use when reporting a phishing click. Removing the “what do I say?” friction helped a lot. Happy to share the structure — it is deliberately boring and that is the point.',
    likes: 31,
    replies: [
      {
        id: 'r4',
        author: 'Jonas L.',
        handle: '@jonas_l',
        content:
          'The reporting sentence is underrated. We added a two-click report button and reports tripled without any new training.',
        time: '6h ago',
        color: 'amber',
      },
    ],
  },
  {
    id: 'post-4',
    author: 'Jonas L.',
    handle: '@jonas_l',
    role: 'IT generalist',
    color: 'amber',
    time: '1d ago',
    category: 'Question',
    content:
      'Setting up a small home lab with two Linux VMs. Is it worth adding a separate firewall VM, or should I keep it simple and use host-only networking plus the hypervisor firewall? I want to practice segmentation without creating a maintenance project.',
    likes: 18,
    replies: [
      {
        id: 'r5',
        author: 'Noah V.',
        handle: '@noahv',
        content:
          'Keep it simple first. Host-only networking and a documented rule set teach the concept. Add pfSense later only if you want firewall-specific practice.',
        time: '20h ago',
        color: 'violet',
      },
    ],
  },
  {
    id: 'post-5',
    author: 'Lina R.',
    handle: '@linar',
    role: 'CS student',
    color: 'rose',
    time: '1d ago',
    category: 'Ethics',
    content:
      'A classmate asked me to “just check” a website they do not own because it looked suspicious. I said no and explained scope and written authorization. It was awkward. How do you handle these requests without sounding like a compliance robot?',
    likes: 54,
    replies: [
      {
        id: 'r6',
        author: 'Mira K.',
        handle: '@mira_k',
        content:
          'I use a short script: “I can help you report it to the owner or a CERT, but I cannot test it without permission.” It redirects the energy toward a lawful path.',
        time: '1d ago',
        color: 'neon',
      },
      {
        id: 'r7',
        author: 'Jonas L.',
        handle: '@jonas_l',
        content:
          'Not a robot at all. Unauthorized testing can end a career before it starts. Saying no is the professional move.',
        time: '22h ago',
        color: 'amber',
      },
    ],
  },
  {
    id: 'post-6',
    author: 'Kai M.',
    handle: '@kaim',
    role: 'Cloud engineer',
    color: 'cyan',
    time: '2d ago',
    category: 'Study log',
    content:
      'Completed the Python for Security course in a week. The dry-run and timeouts lesson saved me from writing a very confident, very destructive cleanup script. I now default to read-only and require an explicit flag. Small habit, big difference.',
    likes: 71,
    replies: [],
  },
  {
    id: 'post-7',
    author: 'DARKNET ACADEMY',
    handle: '@darknet_academy',
    role: 'Official channel · demo',
    color: 'neon',
    time: '3d ago',
    category: 'Announcement',
    content:
      'New field note added: “How does encryption work?” It covers symmetric vs. asymmetric keys, the TLS handshake and why hashing is not encryption. No account required. Read it in the FYP feed and tell us what to cover next.',
    likes: 98,
    replies: [],
  },
];

export const COMMUNITY_CATEGORIES = [
  'All',
  'Study log',
  'Discussion',
  'Question',
  'Resource',
  'Ethics',
  'Announcement',
];

export const LEADERBOARD = [
  { name: 'Mira K.', points: 2840, badge: 'SOC Sprint', color: 'neon' },
  { name: 'Noah V.', points: 2310, badge: 'Log Whisperer', color: 'violet' },
  { name: 'Kai M.', points: 1985, badge: 'Automation', color: 'cyan' },
  { name: 'Aya S.', points: 1740, badge: 'Clarity', color: 'sky' },
  { name: 'Lina R.', points: 1520, badge: 'Ethics First', color: 'rose' },
];

export const UPCOMING_EVENTS = [
  {
    date: 'NOV 18',
    title: 'Open study room: DNS & TLS',
    time: '18:00 UTC · 45 min',
    type: 'Live session',
  },
  {
    date: 'NOV 23',
    title: 'Threat modeling clinic',
    time: '17:30 UTC · 60 min',
    type: 'Workshop',
  },
  {
    date: 'DEC 02',
    title: 'Home lab show & tell',
    time: '19:00 UTC · 60 min',
    type: 'Community',
  },
];
