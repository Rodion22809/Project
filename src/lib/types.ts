export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type Category =
  | 'Fundamentals'
  | 'Networking'
  | 'Threats'
  | 'Cryptography'
  | 'Linux'
  | 'Web Security'
  | 'Identity';

export interface ArticleBlock {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  code?: { label: string; content: string };
}

export interface Topic {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  level: Level;
  minutes: number;
  updated: string;
  featured?: boolean;
  sections: ArticleBlock[];
  takeaways: string[];
  relatedCourse: string;
}

export interface CourseSection extends ArticleBlock {}

export interface LessonCheck {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  summary: string;
  sections: CourseSection[];
  check?: LessonCheck;
}

export type CourseIcon =
  | 'shield'
  | 'terminal'
  | 'linux'
  | 'network'
  | 'python'
  | 'globe';

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: Level;
  hours: number;
  icon: CourseIcon;
  gradient: string;
  accent: string;
  tags: string[];
  outcomes: string[];
  prerequisites: string[];
  lessons: Lesson[];
}

export interface LibraryResource {
  id: string;
  title: string;
  category: 'Glossary' | 'Cheat Sheet' | 'Field Guide' | 'Research Digest';
  type: string;
  readTime: number;
  summary: string;
  sections: ArticleBlock[];
  tags: string[];
}

export interface Reply {
  id: string;
  author: string;
  handle: string;
  content: string;
  time: string;
  color: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  handle: string;
  role: string;
  color: string;
  time: string;
  category: string;
  content: string;
  likes: number;
  replies: Reply[];
  pinned?: boolean;
}

export interface DemoUser {
  username: string;
  email: string;
  joinedAt: string;
  bio: string;
  accent: 'neon' | 'violet' | 'cyan' | 'amber';
  provider: 'apple-demo';
}

export interface Enrollment {
  enrolledAt: string;
  completedLessons: string[];
}

export type AppLanguage = 'en' | 'ru';

export type AccentKey = 'neon' | 'violet' | 'cyan' | 'amber' | 'sky' | 'rose';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  tone: 'neon' | 'violet' | 'neutral';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone: 'success' | 'error' | 'info';
}

export interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  issued: string;
  kind: string;
  accent: string;
  description: string;
}
