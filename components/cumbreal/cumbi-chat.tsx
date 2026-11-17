'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Cumbi } from './cumbi';
import { CumbiContext, CumbiReply, SUGGESTIONS, reply } from '@/lib/cumbi-replies';

type Turn = { from: 'me'; text: string } | ({ from: 'cumbi' } & CumbiReply);

export function CumbiChat({ context }: { context: CumbiContext }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const end = useRef<HTMLLIElement>(null);
  const last = [...turns].reverse().find((t): t is Extract<Turn, { from: 'cumbi' }> => t.from === 'cumbi');
  useEffect(() => {
    if (turns.length) end.current?.scrollIntoView({ block: 'nearest' });
  }, [turns, thinking]);

  const ask = (text: string) => {
    if (!text.trim() || thinking) return;
    setTurns((t) => [...t, { from: 'me', text: text.trim() }]);
    setDraft('');
    setThinking(true);
    // A short pause so the scripted answer reads like a reply, not an instant lookup.
    setTimeout(() => {
      setTurns((t) => [...t, { from: 'cumbi', ...reply(text, context) }]);
      setThinking(false);
    }, 600);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(draft);
  };

  return (
    <section aria-labelledby="ask-cumbi" className="mt-12 panel">
      <div className="flex items-center gap-4">
        <Cumbi state={thinking ? 'Leyendo' : last?.state || 'Curioso'} size={72} decorative className="shrink-0" />
        <div>
          <h2 id="ask-cumbi" className="text-3xl">
            Pregúntale a Cumbi
          </h2>
          <p className="annotation">Demostración: respuestas programadas a partir de tu perfil, no un asistente real.</p>
        </div>
      </div>
      <ol className="mt-6 grid gap-4 max-w-2xl" aria-live="polite">
        {turns.map((t, i) =>
          t.from === 'me' ? (
            <li key={i} className="justify-self-end max-w-[85%] rounded-lg bg-teal-light text-teal-deep px-4 py-3">
              <span className="sr-only">Tú: </span>
              {t.text}
            </li>
          ) : (
            <li key={i} className="border-l-2 border-teal-deep pl-4 max-w-[90%]">
              <span className="sr-only">Cumbi: </span>
              <p>{t.text}</p>
              {t.link && (
                <Link href={t.link.href} className="text-teal-deep font-medium mt-2 inline-flex items-center gap-1">
                  {t.link.label} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </li>
          ),
        )}
        {thinking && (
          <li className="annotation border-l-2 border-ink/25 pl-4" role="status">
            Cumbi está pensando…
          </li>
        )}
        <li ref={end} aria-hidden="true" />
      </ol>
      <div className="flex flex-wrap gap-2 mt-4 max-w-2xl">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" className="button button-secondary button-small" onClick={() => ask(s)} disabled={thinking}>
            {s}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2 mt-4 max-w-2xl">
        <label htmlFor="cumbi-question" className="sr-only">
          Escribe tu pregunta para Cumbi
        </label>
        <input
          id="cumbi-question"
          className="field"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escribe tu pregunta…"
          autoComplete="off"
          maxLength={200}
        />
        <button type="submit" className="button button-secondary shrink-0" disabled={thinking || !draft.trim()}>
          Preguntar
        </button>
      </form>
    </section>
  );
}
