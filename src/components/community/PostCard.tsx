import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  CornerDownRight,
  Heart,
  MessageCircle,
  Pin,
  Send,
  ShieldCheck,
} from 'lucide-react';
import type { AccentKey, CommunityPost } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';

const categoryTone: Record<string, string> = {
  'Study log': 'border-neon-400/20 text-neon-300 bg-neon-400/[0.05]',
  Discussion: 'border-violet-400/20 text-violet-300 bg-violet-400/[0.05]',
  Question: 'border-sky-400/20 text-sky-300 bg-sky-400/[0.05]',
  Resource: 'border-amber-400/20 text-amber-300 bg-amber-400/[0.05]',
  Ethics: 'border-rose-400/20 text-rose-300 bg-rose-400/[0.05]',
  Announcement: 'border-fuchsia-400/20 text-fuchsia-300 bg-fuchsia-400/[0.05]',
};

export function PostCard({ post }: { post: CommunityPost }) {
  const { t, user, likes, toggleLike, replies, addReply } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState('');
  const liked = likes.includes(post.id);
  const allReplies = [...post.replies, ...(replies[post.id] ?? [])];
  const accent = (['neon', 'violet', 'cyan', 'amber', 'sky', 'rose'].includes(post.color)
    ? post.color
    : 'neon') as AccentKey;

  const submitReply = (event: React.FormEvent) => {
    event.preventDefault();
    if (!reply.trim() || reply.trim().length < 2) return;
    addReply(post.id, reply.trim());
    setReply('');
    setExpanded(true);
  };

  return (
    <article className="rounded-2xl border border-white/[0.07] bg-ink-800/45 p-5 transition hover:border-white/[0.11] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={post.author} accent={accent} size="md" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[13px] font-medium text-white">{post.author}</p>
              {post.pinned && (
                <span className="flex items-center gap-1 rounded-full border border-neon-400/20 bg-neon-400/[0.06] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-neon-300">
                  <Pin className="h-2.5 w-2.5" />
                  Pinned
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[10.5px] text-slate-600">
              {post.handle} · {post.role}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-700">
            {post.time}
          </span>
          <span
            className={cn(
              'chip !px-2 !py-0.5 !text-[8px]',
              categoryTone[post.category] ?? 'border-white/10 text-slate-500',
            )}
          >
            {post.category}
          </span>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-line break-words text-[13px] leading-relaxed text-slate-300">
        {post.content}
      </p>

      <div className="mt-5 flex items-center gap-1 border-t border-white/[0.05] pt-3.5">
        <button
          type="button"
          onClick={() => toggleLike(post.id)}
          aria-pressed={liked}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] transition',
            liked
              ? 'bg-rose-400/[0.08] text-rose-300'
              : 'text-slate-500 hover:bg-white/[0.03] hover:text-slate-200',
          )}
        >
          <Heart className={cn('h-3.5 w-3.5', liked && 'fill-rose-300/40')} />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-200"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          {t('community.replies', { count: String(allReplies.length) })}
          <ChevronDown className={cn('h-3 w-3 transition', expanded && 'rotate-180')} />
        </button>
        <span className="ml-auto flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-slate-700">
          <ShieldCheck className="h-2.5 w-2.5" />
          demo
        </span>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 border-t border-white/[0.05] pt-4">
          {allReplies.map((item) => {
            const replyAccent = (['neon', 'violet', 'cyan', 'amber', 'sky', 'rose'].includes(
              item.color,
            )
              ? item.color
              : 'violet') as AccentKey;
            return (
              <div key={item.id} className="flex gap-3 pl-1">
                <Avatar name={item.author} accent={replyAccent} size="xs" />
                <div className="min-w-0 rounded-xl rounded-tl-sm border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] font-medium text-slate-200">{item.author}</p>
                    <span className="font-mono text-[8.5px] text-slate-700">{item.time}</span>
                  </div>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-slate-400">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}

          {allReplies.length === 0 && (
            <p className="pl-1 font-mono text-[9px] uppercase tracking-wider text-slate-700">
              No replies yet — start the thread.
            </p>
          )}

          {user ? (
            <form onSubmit={submitReply} className="flex items-start gap-2 pt-1">
              <Avatar name={user.username} accent={user.accent} size="xs" />
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-ink-900/70 px-3 py-1.5">
                <CornerDownRight className="h-3.5 w-3.5 shrink-0 text-slate-700" />
                <input
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder={t('community.replyPlaceholder')}
                  maxLength={400}
                  className="min-w-0 flex-1 bg-transparent py-1.5 text-[11.5px] text-white placeholder:text-slate-600 focus:outline-none"
                  aria-label={t('community.replyPlaceholder')}
                />
                <button
                  type="submit"
                  disabled={reply.trim().length < 2}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neon-400/90 text-ink-950 transition hover:bg-neon-300 disabled:opacity-30"
                  aria-label={t('community.sendReply')}
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </form>
          ) : (
            <p className="pl-1 text-[11px] text-slate-600">
              <Link to="/register" className="text-neon-400/80 underline-offset-2 hover:underline">
                Create a demo profile
              </Link>{' '}
              to reply to threads.
            </p>
          )}
        </div>
      )}
    </article>
  );
}
