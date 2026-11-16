'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PATHWAYS } from '@/lib/pathways';
import { useAuth } from '@/lib/auth-context';
import { Cumbi } from './cumbi';
import { PathwayDetails } from './pathway-details';
import { InterestProfile } from './diagnosis-results';
export function PathwayExplorer({ dashboard = false }: { dashboard?: boolean }) {
  const { user, completeOnboarding } = useAuth();
  const result = dashboard ? user?.diagnosis : undefined;
  const [selection, setSelection] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const selected = selection || result?.selectedPathwayId || PATHWAYS[0].id;
  const path = PATHWAYS.find((p) => p.id === selected) || PATHWAYS[0];
  const paths = result?.matches.length ? result.matches.map((m) => PATHWAYS.find((p) => p.id === m.pathwayId)!) : PATHWAYS;
  function saveSelection() {
    if (!result) return;
    try {
      completeOnboarding({ ...result, selectedPathwayId: path.id });
      setMessage('Tu trayectoria elegida se guardó en tu perfil.');
    } catch {
      setMessage('No pudimos guardar. Comprueba el almacenamiento del navegador.');
    }
  }
  return (
    <>
      {result && (
        <div className="panel mt-8">
          <InterestProfile result={result} />
          <p className="text-sm text-ink-muted mt-4">Resultado guardado el {new Date(result.completedAt).toLocaleDateString('es-SV')}.</p>
          <Link href="/onboarding" className="text-teal-deep underline mt-3">
            Revisar o repetir mis 18 actividades
          </Link>
        </div>
      )}
      {dashboard && !result && (
        <p className="notice mt-6">
          Todavía no tienes el nuevo perfil de intereses.{' '}
          <Link href="/onboarding" className="underline">
            Completar las 18 actividades
          </Link>
        </p>
      )}
      <div className="grid md:grid-cols-[.85fr_1.4fr] gap-6 md:gap-10 mt-8">
        <div className="space-y-2" role="group" aria-label="Elige una trayectoria">
          {paths.map((p) => {
            return (
              <button
                type="button"
                key={p.id}
                aria-pressed={selected === p.id}
                onClick={() => {
                  setSelection(p.id);
                  setMessage('');
                }}
                className={'path-option ' + (selected === p.id ? 'border-teal bg-teal-light' : 'border-transparent hover:bg-canvas-subtle')}
              >
                <span className="flex-1">
                  {p.title}
                  {(result?.topThree.includes(p.id) || result?.wildcardId === p.id) && (
                    <span className="block text-sm font-normal mt-1">
                      {result.wildcardId === p.id ? 'Descubrimiento' : 'Entre tus tres primeras'}
                    </span>
                  )}
                </span>
                {selected === p.id && <Check size={18} className="shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
          <p className="text-sm text-ink-muted pt-4">
            {result?.matches.length
              ? 'El orden compara intereses; no predice admisión, empleo ni éxito. Tu elección puede ser distinta del primer resultado.'
              : 'Catálogo para explorar, sin orden de afinidad personal.'}
          </p>
        </div>
        <div className="panel relative overflow-hidden" aria-live="polite">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-3xl">{path.title}</h2>
              <p className="annotation mt-1">{path.domain}</p>
            </div>
            <Cumbi state="Explorando" size={90} className="shrink-0 hidden lg:block" />
          </div>
          <PathwayDetails path={path} />
          {result && (
            <button type="button" className="button mt-5" onClick={saveSelection}>
              {result.selectedPathwayId === path.id ? 'Trayectoria guardada · confirmar elección' : 'Guardar como mi trayectoria'}
            </button>
          )}
          {message && (
            <p role="status" className="notice mt-3">
              {message}
            </p>
          )}
          <Link className="button button-secondary mt-5" href={dashboard ? '/dashboard/evidence' : '/onboarding'}>
            {dashboard ? 'Registrar una actividad' : 'Descubrir mis intereses'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
