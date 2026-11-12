import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AppLanguage,
  AppNotification,
  CommunityPost,
  DemoUser,
  Enrollment,
  Reply,
  ToastMessage,
} from '../lib/types';
import { readStorage, writeStorage, removeStorage } from '../lib/storage';
import { nowISO, uid } from '../lib/utils';
import { translate, type TranslationKey } from '../lib/i18n';
import { COURSES } from '../data/courses';
import { TOPICS } from '../data/topics';

const STORAGE_KEY = 'darknet-academy:v1';

export interface ActivityEntry {
  id: string;
  type: 'read' | 'enrolled' | 'completed' | 'favorite' | 'auth' | 'post';
  ref?: string;
  at: string;
}

interface PersistedState {
  user: DemoUser | null;
  favorites: string[];
  readTopics: string[];
  enrollments: Record<string, Enrollment>;
  notifications: AppNotification[];
  posts: CommunityPost[];
  likes: string[];
  replies: Record<string, Reply[]>;
  reminders: string[];
  language: AppLanguage;
  activity: ActivityEntry[];
}

const seedNotifications: AppNotification[] = [
  {
    id: 'seed-welcome',
    title: 'Welcome to the academy',
    body: 'All field notes are open. Create a demo profile whenever you want to save progress.',
    time: 'Just now',
    read: false,
    tone: 'neon',
  },
  {
    id: 'seed-course',
    title: 'New learning path available',
    body: 'Python for Security now includes a lesson on safe automation and dry-run design.',
    time: '2h ago',
    read: false,
    tone: 'violet',
  },
  {
    id: 'seed-demo',
    title: 'Demo environment',
    body: 'Accounts, documents and community profiles are illustrative. Nothing is sent to a server.',
    time: '1d ago',
    read: true,
    tone: 'neutral',
  },
];

function defaultState(): PersistedState {
  return {
    user: null,
    favorites: [],
    readTopics: [],
    enrollments: {},
    notifications: seedNotifications,
    posts: [],
    likes: [],
    replies: {},
    reminders: [],
    language: 'en',
    activity: [],
  };
}

function loadState(): PersistedState {
  const stored = readStorage<Partial<PersistedState>>(STORAGE_KEY, {});
  const base = defaultState();
  return {
    ...base,
    ...stored,
    user: stored.user ?? null,
    favorites: Array.isArray(stored.favorites) ? stored.favorites : base.favorites,
    readTopics: Array.isArray(stored.readTopics) ? stored.readTopics : base.readTopics,
    enrollments:
      stored.enrollments && typeof stored.enrollments === 'object'
        ? stored.enrollments
        : base.enrollments,
    notifications: Array.isArray(stored.notifications)
      ? stored.notifications
      : base.notifications,
    posts: Array.isArray(stored.posts) ? stored.posts : base.posts,
    likes: Array.isArray(stored.likes) ? stored.likes : base.likes,
    replies: stored.replies && typeof stored.replies === 'object' ? stored.replies : base.replies,
    reminders: Array.isArray(stored.reminders) ? stored.reminders : base.reminders,
    language: stored.language === 'ru' ? 'ru' : 'en',
    activity: Array.isArray(stored.activity) ? stored.activity : base.activity,
  };
}

function usernameFromEmail(email: string): string {
  const raw = email.split('@')[0] ?? 'operator';
  const cleaned = raw.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 20);
  if (!cleaned) return 'Operator';
  return cleaned
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

interface AppContextValue {
  user: DemoUser | null;
  favorites: string[];
  readTopics: string[];
  enrollments: Record<string, Enrollment>;
  notifications: AppNotification[];
  posts: CommunityPost[];
  likes: string[];
  replies: Record<string, Reply[]>;
  reminders: string[];
  language: AppLanguage;
  activity: ActivityEntry[];
  toasts: ToastMessage[];
  unreadCount: number;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  setLanguage: (language: AppLanguage) => void;
  signInDemo: (email: string) => DemoUser;
  signOut: () => void;
  updateProfile: (patch: Partial<Pick<DemoUser, 'username' | 'bio' | 'accent'>>) => void;
  toggleFavorite: (slug: string) => boolean;
  markTopicRead: (slug: string) => void;
  enroll: (courseSlug: string) => void;
  toggleLessonComplete: (courseSlug: string, lessonId: string) => void;
  isEnrolled: (courseSlug: string) => boolean;
  courseProgress: (courseSlug: string) => number;
  addPost: (content: string, category: string) => void;
  toggleLike: (postId: string) => void;
  addReply: (postId: string, content: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  toggleReminder: (eventTitle: string) => boolean;
  resetDemoData: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    writeStorage(STORAGE_KEY, state);
  }, [state]);

  useEffect(() => {
    document.documentElement.lang = state.language;
  }, [state.language]);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) =>
      translate(state.language, key, vars),
    [state.language],
  );

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = uid('toast');
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const pushNotification = useCallback(
    (title: string, body: string, tone: AppNotification['tone'] = 'neutral') => {
      const notification: AppNotification = {
        id: uid('notification'),
        title,
        body,
        time: 'Just now',
        read: false,
        tone,
      };
      setState((current) => ({
        ...current,
        notifications: [notification, ...current.notifications].slice(0, 30),
      }));
    },
    [],
  );

  const pushActivity = useCallback((entry: Omit<ActivityEntry, 'id' | 'at'>) => {
    setState((current) => ({
      ...current,
      activity: [
        { ...entry, id: uid('activity'), at: nowISO() },
        ...current.activity,
      ].slice(0, 24),
    }));
  }, []);

  const signInDemo = useCallback(
    (email: string) => {
      const existing = state.user;
      const user: DemoUser =
        existing && existing.email.toLowerCase() === email.toLowerCase()
          ? { ...existing, provider: 'apple-demo' }
          : {
              username: usernameFromEmail(email),
              email,
              joinedAt: nowISO(),
              bio: 'Learning in public. Building a security baseline, one field note at a time.',
              accent: 'neon',
              provider: 'apple-demo',
            };
      const welcome: AppNotification = {
        id: uid('notification'),
        title: existing ? 'Welcome back' : 'Demo profile created',
        body: existing
          ? 'Your local progress and favorites are exactly where you left them.'
          : 'Your learning record now lives in this browser. Edit it from your profile at any time.',
        time: 'Just now',
        read: false,
        tone: 'neon',
      };
      setState((current) => ({
        ...current,
        user,
        activity: [
          { id: uid('activity'), type: 'auth' as const, at: nowISO() },
          ...current.activity,
        ].slice(0, 24),
        notifications: [welcome, ...current.notifications].slice(0, 30),
      }));
      return user;
    },
    [state.user],
  );

  const signOut = useCallback(() => {
    setState((current) => ({ ...current, user: null }));
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<Pick<DemoUser, 'username' | 'bio' | 'accent'>>) => {
      setState((current) =>
        current.user
          ? { ...current, user: { ...current.user, ...patch } }
          : current,
      );
    },
    [],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      const isFavorite = state.favorites.includes(slug);
      const topic = TOPICS.find((item) => item.slug === slug);
      setState((current) => ({
        ...current,
        favorites: isFavorite
          ? current.favorites.filter((item) => item !== slug)
          : [...current.favorites, slug],
        activity: isFavorite
          ? current.activity
          : [
              {
                id: uid('activity'),
                type: 'favorite' as const,
                ref: slug,
                at: nowISO(),
              },
              ...current.activity,
            ].slice(0, 24),
      }));
      if (!isFavorite && topic) {
        addToast({
          title: 'Saved to favorites',
          description: topic.title,
          tone: 'success',
        });
      }
      return !isFavorite;
    },
    [state.favorites, addToast],
  );

  const markTopicRead = useCallback((slug: string) => {
    setState((current) => {
      if (current.readTopics.includes(slug)) return current;
      return {
        ...current,
        readTopics: [...current.readTopics, slug],
        activity: [
          { id: uid('activity'), type: 'read' as const, ref: slug, at: nowISO() },
          ...current.activity,
        ].slice(0, 24),
      };
    });
  }, []);

  const enroll = useCallback(
    (courseSlug: string) => {
      const course = COURSES.find((item) => item.slug === courseSlug);
      const enrollmentNotice: AppNotification = {
        id: uid('notification'),
        title: 'Enrollment confirmed',
        body: course
          ? `You are enrolled in “${course.title}”. Progress is stored in this browser.`
          : 'Your course enrollment is saved locally.',
        time: 'Just now',
        read: false,
        tone: 'violet',
      };
      setState((current) => {
        if (current.enrollments[courseSlug]) return current;
        return {
          ...current,
          enrollments: {
            ...current.enrollments,
            [courseSlug]: { enrolledAt: nowISO(), completedLessons: [] },
          },
          activity: [
            {
              id: uid('activity'),
              type: 'enrolled' as const,
              ref: courseSlug,
              at: nowISO(),
            },
            ...current.activity,
          ].slice(0, 24),
          notifications: [enrollmentNotice, ...current.notifications].slice(0, 30),
        };
      });
      addToast({
        title: 'Enrolled for free',
        description: course?.title,
        tone: 'success',
      });
    },
    [addToast],
  );

  const toggleLessonComplete = useCallback(
    (courseSlug: string, lessonId: string) => {
      const course = COURSES.find((item) => item.slug === courseSlug);
      setState((current) => {
        const existing =
          current.enrollments[courseSlug] ?? { enrolledAt: nowISO(), completedLessons: [] };
        const isDone = existing.completedLessons.includes(lessonId);
        const completedLessons = isDone
          ? existing.completedLessons.filter((id) => id !== lessonId)
          : [...existing.completedLessons, lessonId];
        return {
          ...current,
          enrollments: {
            ...current.enrollments,
            [courseSlug]: { ...existing, completedLessons },
          },
          activity: isDone
            ? current.activity
            : [
                {
                  id: uid('activity'),
                  type: 'completed' as const,
                  ref: courseSlug,
                  at: nowISO(),
                },
                ...current.activity,
              ].slice(0, 24),
        };
      });
      const courseLessons = course?.lessons.length ?? 0;
      const existing = state.enrollments[courseSlug];
      const alreadyDone = existing?.completedLessons.includes(lessonId) ?? false;
      if (!alreadyDone && courseLessons) {
        const done = (existing?.completedLessons.length ?? 0) + 1;
        if (done >= courseLessons) {
          pushNotification(
            'Course complete',
            `You finished every lesson in “${course?.title}”. Review or start a new path.`,
            'neon',
          );
          addToast({
            title: 'Course complete',
            description: course?.title,
            tone: 'success',
          });
        }
      }
    },
    [state.enrollments, pushNotification, addToast],
  );

  const isEnrolled = useCallback(
    (courseSlug: string) => Boolean(state.enrollments[courseSlug]),
    [state.enrollments],
  );

  const courseProgress = useCallback(
    (courseSlug: string) => {
      const course = COURSES.find((item) => item.slug === courseSlug);
      const enrollment = state.enrollments[courseSlug];
      if (!course || !enrollment) return 0;
      return Math.round((enrollment.completedLessons.length / course.lessons.length) * 100);
    },
    [state.enrollments],
  );

  const addPost = useCallback(
    (content: string, category: string) => {
      const user = state.user;
      if (!user) return;
      const post: CommunityPost = {
        id: uid('post'),
        author: user.username,
        handle: `@${user.username.toLowerCase().replace(/\s+/g, '_')}`,
        role: 'Academy member · demo',
        color: user.accent,
        time: 'Just now',
        category,
        content,
        likes: 0,
        replies: [],
      };
      setState((current) => ({
        ...current,
        posts: [post, ...current.posts],
        activity: [
          { id: uid('activity'), type: 'post' as const, at: nowISO() },
          ...current.activity,
        ].slice(0, 24),
      }));
      addToast({ title: 'Post published locally', tone: 'success' });
    },
    [state.user, addToast],
  );

  const toggleLike = useCallback((postId: string) => {
    setState((current) => ({
      ...current,
      likes: current.likes.includes(postId)
        ? current.likes.filter((id) => id !== postId)
        : [...current.likes, postId],
    }));
  }, []);

  const addReply = useCallback(
    (postId: string, content: string) => {
      const user = state.user;
      if (!user) return;
      const reply: Reply = {
        id: uid('reply'),
        author: user.username,
        handle: `@${user.username.toLowerCase().replace(/\s+/g, '_')}`,
        content,
        time: 'Just now',
        color: user.accent,
      };
      setState((current) => ({
        ...current,
        replies: {
          ...current.replies,
          [postId]: [...(current.replies[postId] ?? []), reply],
        },
      }));
      addToast({ title: 'Reply added locally', tone: 'success' });
    },
    [state.user, addToast],
  );

  const markAllNotificationsRead = useCallback(() => {
    setState((current) => ({
      ...current,
      notifications: current.notifications.map((item) => ({ ...item, read: true })),
    }));
  }, []);

  const clearNotifications = useCallback(() => {
    setState((current) => ({ ...current, notifications: [] }));
  }, []);

  const toggleReminder = useCallback(
    (eventTitle: string) => {
      const nowSet = !state.reminders.includes(eventTitle);
      setState((current) => ({
        ...current,
        reminders: nowSet
          ? [...current.reminders, eventTitle]
          : current.reminders.filter((item) => item !== eventTitle),
      }));
      return nowSet;
    },
    [state.reminders],
  );

  const setLanguage = useCallback((language: AppLanguage) => {
    setState((current) => ({ ...current, language }));
  }, []);

  const resetDemoData = useCallback(() => {
    removeStorage(STORAGE_KEY);
    setState(defaultState());
    setToasts([]);
  }, []);

  const unreadCount = useMemo(
    () => state.notifications.filter((item) => !item.read).length,
    [state.notifications],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      user: state.user,
      favorites: state.favorites,
      readTopics: state.readTopics,
      enrollments: state.enrollments,
      notifications: state.notifications,
      posts: state.posts,
      likes: state.likes,
      replies: state.replies,
      reminders: state.reminders,
      language: state.language,
      activity: state.activity,
      toasts,
      unreadCount,
      t,
      setLanguage,
      signInDemo,
      signOut,
      updateProfile,
      toggleFavorite,
      markTopicRead,
      enroll,
      toggleLessonComplete,
      isEnrolled,
      courseProgress,
      addPost,
      toggleLike,
      addReply,
      markAllNotificationsRead,
      clearNotifications,
      toggleReminder,
      resetDemoData,
      addToast,
      removeToast,
    }),
    [
      state,
      toasts,
      unreadCount,
      t,
      setLanguage,
      signInDemo,
      signOut,
      updateProfile,
      toggleFavorite,
      markTopicRead,
      enroll,
      toggleLessonComplete,
      isEnrolled,
      courseProgress,
      addPost,
      toggleLike,
      addReply,
      markAllNotificationsRead,
      clearNotifications,
      toggleReminder,
      resetDemoData,
      addToast,
      removeToast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
