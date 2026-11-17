'use client';
import { FormEvent, useState } from 'react';
import { useProgress } from '@/lib/progress-context';
import { Cumbi } from '@/components/cumbreal/cumbi';
export default function EvidencePage() {
  const { activities, createActivity, submitEvidence, reviewEvidence, error } = useProgress();
  const [title, setTitle] = useState(''),
    [description, setDescription] = useState(''),
    [skill, setSkill] = useState(''),
    [notes, setNotes] = useState<Record<string, string>>({}),
    [celebrated, setCelebrated] = useState(''),
    [status, setStatus] = useState('');
  function add(e: FormEvent) {
    e.preventDefault();
    createActivity({ title, description, skill });
    setTitle('');
    setDescription('');
    setSkill('');
    setStatus('Solicitud procesada. Revisa la lista de actividades o el aviso de almacenamiento.');
  }
  return (
    <>
      <h1 className="text-4xl">Lo que haces deja huella.</h1>
      <p className="text-ink-muted mt-4 max-w-xl">
        Registra una experiencia y explica lo que aprendiste. La verificación disponible aquí es una simulación local, no una revisión
        institucional.
      </p>
      <form onSubmit={add} className="panel mt-8 grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label" htmlFor="activity-title">
            Nombre de la actividad
          </label>
          <input id="activity-title" className="field" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={160} />
        </div>
        <div>
          <label className="field-label" htmlFor="activity-skill">
            Habilidad que practicaste
          </label>
          <input id="activity-skill" className="field" value={skill} onChange={(e) => setSkill(e.target.value)} required maxLength={100} />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="activity-description">
            ¿Qué aprendiste o construiste?
          </label>
          <textarea
            id="activity-description"
            className="field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            maxLength={3000}
          />
        </div>
        <button className="button sm:col-span-2">Registrar actividad</button>
      </form>
      {status && !error && (
        <p className="text-sm mt-4" role="status">
          {status}
        </p>
      )}
      <section className="mt-8" aria-label="Actividades registradas">
        {activities.length === 0 ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-ink/25 pt-6">
            <Cumbi state="Leyendo" size={120} className="shrink-0" />
            <div>
              <h2 className="text-2xl">Aquí comienza tu cuaderno de evidencias.</h2>
              <p className="text-ink-muted mt-3">Aún no hay actividades. Registra la primera arriba.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {activities.map((a) => (
              <article key={a.id} className="panel">
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-2xl break-words">{a.title}</h2>
                    <p className="text-sm text-teal-deep mt-2 break-words">{a.skill}</p>
                  </div>
                  <span className="tag">
                    {a.evidence?.status === 'verified'
                      ? 'Verificada (prueba)'
                      : a.evidence?.status === 'pending'
                        ? 'En revisión (prueba)'
                        : a.evidence?.status === 'rejected'
                          ? 'Necesita cambios'
                          : 'Sin evidencia'}
                  </span>
                </div>
                <p className="text-ink-muted mt-4 whitespace-pre-wrap break-words">
                  {a.description || 'Todavía no agregaste una descripción.'}
                </p>
                {!a.evidence || a.evidence.status === 'rejected' ? (
                  <form
                    className="mt-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitEvidence(a.id, notes[a.id] || '');
                    }}
                  >
                    <label htmlFor={'note-' + a.id} className="field-label">
                      Describe o enlaza tu evidencia
                    </label>
                    <textarea
                      id={'note-' + a.id}
                      className="field"
                      rows={2}
                      required
                      maxLength={4000}
                      value={notes[a.id] || ''}
                      onChange={(e) => setNotes({ ...notes, [a.id]: e.target.value })}
                    />
                    <button className="button button-secondary mt-3">Enviar evidencia</button>
                  </form>
                ) : (
                  <p className="mt-4 break-words whitespace-pre-wrap">Evidencia: {a.evidence.note}</p>
                )}
                {a.evidence?.status === 'pending' && (
                  <div className="mt-5">
                    <p className="text-sm text-ink-muted">
                      Modo de prueba: puedes simular la revisión. Una evidencia verificada suma 100 XP una sola vez.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <button
                        className="button"
                        onClick={() => {
                          reviewEvidence(a.id, 'verified');
                          setCelebrated(a.id);
                          setStatus('Revisión de prueba procesada. Revisa el estado y el contador de XP.');
                        }}
                      >
                        Verificar en modo de prueba
                      </button>
                      <button className="button button-secondary" onClick={() => reviewEvidence(a.id, 'rejected')}>
                        Solicitar cambios
                      </button>
                    </div>
                  </div>
                )}
                {celebrated === a.id && a.evidence?.status === 'verified' && (
                  <div role="status" className="flex items-center gap-4 mt-5">
                    <Cumbi state="Celebrando" size={100} />
                    <p>¡Un paso más en tu recorrido! +100 XP.</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
