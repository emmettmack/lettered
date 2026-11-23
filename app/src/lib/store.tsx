import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { openers, people, type Message, type Mode } from './data';

// In-memory app state for the first draft. Swapped for the backend later.
type State = {
  door: 'roster' | 'apply' | null;
  name: string;
  member: boolean;
  mode: Mode;
  seen: Record<Mode, string[]>; // ids already decided on today
  matches: string[]; // newest first
  threads: Record<string, Message[]>;
  read: Record<string, number>; // messages seen per thread
  hideFromSchool: boolean;
  paused: boolean;
  vouchesLeft: number;
};

const initial: State = {
  door: null,
  name: '',
  member: false,
  mode: 'Date',
  seen: { Date: [], Friends: [] },
  matches: [],
  threads: {},
  read: {},
  hideFromSchool: false,
  paused: false,
  vouchesLeft: 2,
};

type Actions = {
  setDoor: (d: State['door']) => void;
  setName: (n: string) => void;
  becomeMember: () => void;
  setMode: (m: Mode) => void;
  decide: (id: string, yes: boolean) => boolean; // returns true on a match
  send: (id: string, text: string) => void;
  markRead: (id: string, count: number) => void;
  set: (patch: Partial<State>) => void;
  reset: () => void;
};

const Ctx = createContext<(State & Actions) | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(initial);

  const actions = useMemo<Actions>(
    () => ({
      setDoor: (door) => setS((p) => ({ ...p, door })),
      setName: (name) => setS((p) => ({ ...p, name })),
      becomeMember: () => setS((p) => ({ ...p, member: true })),
      setMode: (mode) => setS((p) => ({ ...p, mode })),
      decide: (id, yes) => {
        const person = people.find((x) => x.id === id);
        const match = !!(yes && person?.likesYou);
        setS((p) => ({
          ...p,
          seen: { ...p.seen, [p.mode]: [...p.seen[p.mode], id] },
          matches: match ? [id, ...p.matches.filter((m) => m !== id)] : p.matches,
          threads: match && !p.threads[id] && openers[id] ? { ...p.threads, [id]: [{ from: 'them', text: openers[id] }] } : p.threads,
        }));
        return match;
      },
      send: (id, text) => {
        setS((p) => ({ ...p, threads: { ...p.threads, [id]: [...(p.threads[id] ?? []), { from: 'me', text }] } }));
        // A quiet, believable reply so the thread feels alive in the demo.
        setTimeout(() => {
          setS((p) => ({ ...p, threads: { ...p.threads, [id]: [...(p.threads[id] ?? []), { from: 'them', text: 'Deal.' }] } }));
        }, 1800);
      },
      markRead: (id, count) => setS((p) => (p.read[id] === count ? p : { ...p, read: { ...p.read, [id]: count } })),
      set: (patch) => setS((p) => ({ ...p, ...patch })),
      reset: () => setS(initial),
    }),
    [],
  );

  return <Ctx.Provider value={{ ...s, ...actions }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore outside StoreProvider');
  return v;
}
