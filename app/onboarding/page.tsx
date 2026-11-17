'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cumbi } from '@/components/cumbreal/cumbi';
import { DiagnosisResults } from '@/components/cumbreal/diagnosis-results';
import { AssessmentReference } from '@/components/cumbreal/assessment-reference';
import { useAuth } from '@/lib/auth-context';
import { PATHWAYS } from '@/lib/pathways';
import { Answers, createDiagnosis, DIAGNOSIS_VERSION, LIKERT_OPTIONS, QUESTIONS } from '@/lib/diagnosis';
import { GUEST_DIAGNOSIS_KEY, draftKey } from '@/lib/storage';

// Step 0 is the intro, 1–18 one activity each, RESULTS the map.
const RESULTS = QUESTIONS.length + 1;

function Questionnaire() {
  const { user, completeOnboarding } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(user?.diagnosis ? RESULTS : 0);
  const [answers, setAnswers] = useState<Answers>(user?.diagnosis?.answers || {});
  const [selected, setSelected] = useState(user?.diagnosis?.selectedPathwayId || '');
  const [message, setMessage] = useState('');
  const [ready, setReady] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const key = draftKey(user?.id || 'guest');
  useEffect(() => {
    try {
      const storage = user ? localStorage : sessionStorage;
      const raw = storage.getItem(key);
      if (raw) {
        const draft = JSON.parse(raw);
        if (
          draft.version !== DIAGNOSIS_VERSION ||
          !Number.isInteger(draft.step) ||
          draft.step < 0 ||
          draft.step > RESULTS ||
          !draft.answers ||
          typeof draft.answers !== 'object' ||
          Array.isArray(draft.answers) ||
          typeof draft.selected !== 'string' ||
          (draft.selected && !PATHWAYS.some((p) => p.id === draft.selected)) ||
          Object.entries(draft.answers).some(
            ([id, value]) => !QUESTIONS.some((q) => q.id === id) || !Number.isInteger(value) || Number(value) < 1 || Number(value) > 5,
          )
        )
          throw new Error('invalid');
        if (draft.step === RESULTS) createDiagnosis(draft.answers, draft.selected);
        setAnswers(draft.answers);
        setSelected(draft.selected);
        setStep(draft.step);
      }
    } catch {
      setMessage('No pudimos recuperar el borrador. Puedes volver a responder; tu resultado guardado sigue en tu perfil.');
    }
    setReady(true);
    // The parent remounts the questionnaire whenever the account changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (ready && step > 0) heading.current?.focus();
  }, [step, ready]);
  function persist(nextAnswers: Answers, nextStep: number, nextSelected = selected) {
    setAnswers(nextAnswers);
    setStep(nextStep);
    setSelected(nextSelected);
    setMessage('');
    try {
      (user ? localStorage : sessionStorage).setItem(
        key,
        JSON.stringify({ version: DIAGNOSIS_VERSION, answers: nextAnswers, step: nextStep, selected: nextSelected }),
      );
      if (!user) sessionStorage.removeItem(GUEST_DIAGNOSIS_KEY);
    } catch {
      setMessage('Tus respuestas siguen en pantalla, pero no pudimos guardar el borrador. Comprueba el almacenamiento antes de salir.');
    }
  }
  const question = QUESTIONS[step - 1];
  const answered = QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
  const result = step === RESULTS ? createDiagnosis(answers, selected) : null;
  function answer(value: number) {
    if (advancing) return;
    const nextAnswers = { ...answers, [question.id]: value };
    persist(nextAnswers, step);
    setAdvancing(true);
    // A beat to see the choice land; also stops a double click from answering the next activity.
    setTimeout(() => {
      setAdvancing(false);
      try {
        if (step === QUESTIONS.length) createDiagnosis(nextAnswers);
        persist(nextAnswers, step + 1);
      } catch {
        setMessage('Faltan respuestas. Vuelve a las actividades anteriores y completa las 18.');
      }
    }, 250);
  }
  function finish() {
    if (!selected || !result) {
      setMessage('Elige una trayectoria para comenzar.');
      return;
    }
    try {
      if (user) {
        completeOnboarding(result);
        try {
          localStorage.removeItem(key);
        } catch {
          /* The completed profile is already saved. */
        }
        router.push('/dashboard/pathways');
      } else {
        sessionStorage.setItem(GUEST_DIAGNOSIS_KEY, JSON.stringify(result));
        sessionStorage.removeItem(key);
        router.push('/signup');
      }
    } catch {
      setMessage('No pudimos guardar el resultado. Tus respuestas siguen aquí. Comprueba el almacenamiento e inténtalo de nuevo.');
    }
  }
  if (!ready) return <p role="status">Preparando tu exploración…</p>;
  return (
    <div className="panel">
      {step === 0 ? (
        <>
          <div className="flex justify-center">
            <Cumbi state="Curioso" size={150} />
          </div>
          <h1 ref={heading} tabIndex={-1} className="text-4xl">
            Descubre qué te mueve.
          </h1>
          <p className="text-ink-muted mt-4">
            Cumbi te acompaña por 18 actividades. Dinos cuánto te gustaría hacer cada una, aunque todavía no sepas cómo. Piensa en tu
            interés, no en tus notas ni en lo que otras personas esperan.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-5">
            <li>Una actividad a la vez, sin límite de tiempo. Puedes volver atrás cuando quieras.</li>
            <li>Podrás revisar tus respuestas y explorar ocho trayectorias de El Salvador.</li>
            <li>
              Tu resultado describe intereses actuales. Esta adaptación no es una prueba de aptitud ni un diagnóstico psicológico validado.
            </li>
          </ul>
          <p className="text-sm text-ink-muted mt-5">
            {user
              ? 'El borrador y el resultado se guardan por separado para cada perfil en este navegador.'
              : 'Puedes explorar sin cuenta. Al terminar, crea un perfil para guardar tu resultado. El borrador temporal vive en esta pestaña.'}{' '}
            No se sincroniza con otros dispositivos.
          </p>
          <AssessmentReference />
          <div className="flex flex-wrap justify-between gap-3 mt-6">
            <Link href={user ? '/dashboard' : '/'}>Volver</Link>
            <button type="button" className="button" onClick={() => persist(answers, 1)}>
              Comenzar mis 18 actividades
            </button>
          </div>
        </>
      ) : step < RESULTS ? (
        <>
          <p className="annotation" aria-live="polite">
            Actividad {step} de {QUESTIONS.length} · {answered} respondidas
          </p>
          <progress
            className="w-full h-2 mt-3 accent-teal-deep"
            max={QUESTIONS.length}
            value={answered}
            aria-label="Actividades respondidas"
          />
          <p className="text-sm text-ink-muted mt-6">¿Cuánto te gustaría hacer esto?</p>
          <h1 ref={heading} tabIndex={-1} id="activity" className="text-3xl mt-2 min-h-[2.3em]">
            {question.text}
          </h1>
          <div role="group" aria-labelledby="activity" className="grid grid-cols-5 gap-2 mt-6">
            {LIKERT_OPTIONS.map((label, i) => (
              <button
                key={question.id + i}
                type="button"
                aria-pressed={answers[question.id] === i + 1}
                disabled={advancing}
                onClick={() => answer(i + 1)}
                className={
                  'flex flex-col items-center justify-start gap-2 min-h-[96px] border rounded-lg px-1 py-3 text-center ' +
                  (answers[question.id] === i + 1 ? 'border-teal bg-teal-light text-teal-deep' : 'border-ink/20 hover:bg-canvas')
                }
              >
                <span className="text-2xl font-serif">{i + 1}</span>
                <span className="text-xs leading-tight">{label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-3 mt-8 border-t border-ink/15 pt-5">
            <button type="button" className="button button-secondary" onClick={() => persist(answers, step - 1)} disabled={advancing}>
              Anterior
            </button>
            <p className="annotation self-center text-right">Al elegir, pasas a la siguiente.</p>
          </div>
        </>
      ) : (
        result && (
          <>
            <div className="flex items-center gap-5 mb-8">
              <Cumbi state="Celebrando" size={110} className="shrink-0" />
              <h1 ref={heading} tabIndex={-1} className="text-4xl">
                Terminaste. Este es tu mapa para comenzar.
              </h1>
            </div>
            <DiagnosisResults result={result} selected={selected} onSelect={(id) => persist(answers, RESULTS, id)} />
            <p className="text-sm text-ink-muted mt-6">
              {user?.diagnosis
                ? 'Guardar actualizará tu resultado y conservará tus actividades y XP.'
                : 'Recibirás 50 XP al guardar tu primer perfil de intereses. Repetirlo no suma XP adicionales.'}
            </p>
            <div className="flex flex-wrap justify-between gap-3 border-t border-ink/15 pt-5 mt-6">
              <button type="button" className="button button-secondary" onClick={() => persist(answers, 1)}>
                Revisar mis respuestas
              </button>
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  className="button disabled:opacity-60"
                  disabled={!selected}
                  aria-describedby={selected ? undefined : 'save-hint'}
                  onClick={finish}
                >
                  {user ? 'Guardar mi resultado' : 'Crear perfil y guardar resultado'}
                </button>
                {!selected && (
                  <p id="save-hint" className="annotation">
                    Elige una trayectoria arriba para poder guardar.
                  </p>
                )}
              </div>
            </div>
          </>
        )
      )}
      {message && (
        <p role="alert" className="notice mt-5">
          {message}
        </p>
      )}
    </div>
  );
}
export default function Onboarding() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <p role="status">Abriendo tu perfil…</p>;
  return <Questionnaire key={user?.id || 'guest'} />;
}
