import { useEffect, useRef } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

export function NotificationsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { notifications, unreadCount, markAllNotificationsRead, clearNotifications, t } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={t('notif.title')}
      className="absolute right-0 top-full z-50 mt-3 w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-ink-850 shadow-panel"
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-neon-300" />
          <h2 className="font-display text-sm font-semibold text-white">{t('notif.title')}</h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-neon-400/15 px-1.5 py-0.5 font-mono text-[9px] text-neon-300">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={markAllNotificationsRead}
            disabled={unreadCount === 0}
            className="flex h-7 items-center gap-1 rounded-md px-2 font-mono text-[9px] uppercase tracking-wider text-slate-500 transition hover:bg-white/5 hover:text-neon-300 disabled:opacity-30"
            title={t('notif.markAll')}
          >
            <CheckCheck className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={clearNotifications}
            disabled={notifications.length === 0}
            className="flex h-7 items-center gap-1 rounded-md px-2 font-mono text-[9px] uppercase tracking-wider text-slate-500 transition hover:bg-white/5 hover:text-rose-300 disabled:opacity-30"
            title={t('notif.clear')}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="max-h-[380px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <Bell className="mx-auto mb-3 h-6 w-6 text-slate-600" />
            <p className="text-xs leading-relaxed text-slate-500">{t('notif.empty')}</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={cn(
                  'relative px-4 py-3.5 transition hover:bg-white/[0.02]',
                  !notification.read && 'bg-neon-400/[0.02]',
                )}
              >
                <div className="flex gap-3">
                  <span
                    className={cn(
                      'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                      notification.read
                        ? 'bg-slate-700'
                        : notification.tone === 'neon'
                          ? 'bg-neon-400 shadow-[0_0_8px_rgba(57,255,136,0.6)]'
                          : notification.tone === 'violet'
                            ? 'bg-violet-400'
                            : 'bg-slate-400',
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium leading-snug text-slate-200">
                      {notification.title}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-500">
                      {notification.body}
                    </p>
                    <p className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-white/[0.07] px-4 py-2.5">
        <Link
          to="/profile"
          onClick={onClose}
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 transition hover:text-neon-300"
        >
          {t('nav.profile')} →
        </Link>
      </div>
    </div>
  );
}
