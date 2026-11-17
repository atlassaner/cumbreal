'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth-context';
import { progressKey } from './storage';
export type EvidenceStatus = 'pending' | 'verified' | 'rejected';
export interface Evidence {
  id: string;
  activityId: string;
  note: string;
  submittedAt: string;
  status: EvidenceStatus;
  reviewedAt?: string;
}
export interface Activity {
  id: string;
  title: string;
  description: string;
  skill: string;
  createdAt: string;
  evidence?: Evidence;
}
interface ProgressContextType {
  activities: Activity[];
  xp: number;
  isLoading: boolean;
  error: string;
  createActivity: (data: Pick<Activity, 'title' | 'description' | 'skill'>) => void;
  submitEvidence: (id: string, note: string) => void;
  reviewEvidence: (id: string, status: Exclude<EvidenceStatus, 'pending'>) => void;
}
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);
function validActivity(a: Activity) {
  return (
    !!a &&
    typeof a.id === 'string' &&
    typeof a.title === 'string' &&
    typeof a.description === 'string' &&
    typeof a.skill === 'string' &&
    typeof a.createdAt === 'string' &&
    (!a.evidence || (typeof a.evidence.note === 'string' && ['pending', 'verified', 'rejected'].includes(a.evidence.status)))
  );
}
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const owner = user?.id || '';
  const [state, setState] = useState<{
    owner: string;
    items: Activity[];
  }>({ owner: '', items: [] });
  const [error, setError] = useState('');
  useEffect(() => {
    setError('');
    if (!owner) {
      setState({ owner: '', items: [] });
      return;
    }
    try {
      const raw = localStorage.getItem(progressKey(owner));
      const items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(items) || !items.every(validActivity)) throw new Error();
      setState({ owner, items });
    } catch {
      setState({ owner, items: [] });
      setError(
        'No pudimos recuperar tus actividades guardadas. Puedes comenzar una lista nueva; al registrar una actividad se reemplazarán los datos dañados.',
      );
    }
  }, [owner]);
  const activities = state.owner === owner ? state.items : [];
  function change(transform: (a: Activity[]) => Activity[]) {
    if (!owner || state.owner !== owner) return;
    const next = transform(activities);
    try {
      localStorage.setItem(progressKey(owner), JSON.stringify(next));
      setState({ owner, items: next });
      setError('');
    } catch {
      setError('No se pudo guardar. Libera espacio o habilita el almacenamiento y vuelve a intentarlo.');
    }
  }
  function createActivity(data: Pick<Activity, 'title' | 'description' | 'skill'>) {
    if (!data.title.trim() || !data.skill.trim()) return;
    change((a) => [
      { ...data, title: data.title.trim(), skill: data.skill.trim(), id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      ...a,
    ]);
  }
  function submitEvidence(id: string, note: string) {
    if (!note.trim()) return;
    change((list) =>
      list.map((a) =>
        a.id === id
          ? {
              ...a,
              evidence: {
                id: crypto.randomUUID(),
                activityId: id,
                note: note.trim(),
                submittedAt: new Date().toISOString(),
                status: 'pending',
              },
            }
          : a,
      ),
    );
  }
  function reviewEvidence(id: string, status: Exclude<EvidenceStatus, 'pending'>) {
    change((list) =>
      list.map((a) =>
        a.id === id && a.evidence ? { ...a, evidence: { ...a.evidence, status, reviewedAt: new Date().toISOString() } } : a,
      ),
    );
  }
  const xp = activities.reduce((sum, a) => sum + (a.evidence?.status === 'verified' ? 100 : 0), 0);
  return (
    <ProgressContext.Provider
      value={{ activities, xp, isLoading: state.owner !== owner, error, createActivity, submitEvidence, reviewEvidence }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
export function useProgress() {
  const c = useContext(ProgressContext);
  if (!c) throw new Error('ProgressProvider requerido');
  return c;
}
