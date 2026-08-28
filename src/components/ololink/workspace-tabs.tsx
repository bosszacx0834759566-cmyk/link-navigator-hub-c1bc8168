'use client';

import { cn } from '@/lib/utils';
import type { RailId } from '@/hooks/use-ololink';

export const WORKSPACE_TABS: { id: RailId; label: string; hint: string }[] = [
  { id: 'overview', label: 'Overview', hint: 'Situation, active route, events' },
  { id: 'assets', label: 'Operations', hint: 'Constellation and ground segment' },
  { id: 'network', label: 'Network', hint: 'Topology health and link inventory' },
  { id: 'intel', label: 'Intelligence', hint: 'AI decisions and atmospheric state' },
  { id: 'analytics', label: 'Analytics', hint: 'Performance and orchestration timeline' },
];

export function WorkspaceTabs({
  active,
  onSelect,
  alertCount,
  onAlerts,
}: {
  active: RailId | null;
  onSelect: (id: RailId) => void;
  alertCount: number;
  onAlerts: () => void;
}) {
  return (
    <nav className="pointer-events-auto absolute inset-x-0 top-12 z-40 flex h-9 items-center gap-1 border-b border-white/[0.06] bg-black/60 pl-3 pr-3 backdrop-blur-xl">
      {WORKSPACE_TABS.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            title={t.hint}
            aria-pressed={isActive}
            onClick={() => onSelect(t.id)}
            className={cn(
              'relative rounded-[6px] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] transition-colors',
              isActive
                ? 'bg-sky-500/[0.14] text-sky-200'
                : 'text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground'
            )}
          >
            {t.label}
            <span
              className={cn(
                'absolute inset-x-2 -bottom-[5px] h-[2px] rounded-full bg-sky-400 transition-opacity',
                isActive ? 'opacity-100' : 'opacity-0'
              )}
            />
          </button>
        );
      })}

      <span className="mx-1 h-4 w-px bg-white/[0.07]" />

      <button
        type="button"
        title="Active alerts and event stream"
        aria-pressed={active === 'alerts'}
        onClick={onAlerts}
        className={cn(
          'flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] transition-colors',
          active === 'alerts'
            ? 'bg-rose-500/[0.14] text-rose-200'
            : 'text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground'
        )}
      >
        Alerts
        {alertCount > 0 && (
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.85)]" />
        )}
      </button>
    </nav>
  );
}
