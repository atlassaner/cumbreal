'use client';
import { DiagnosisResult, DIMENSIONS, HOLLAND_TYPES } from '@/lib/diagnosis';
import { HollandType, rankedDimensions } from '@/lib/riasec';
import { PATHWAYS } from '@/lib/pathways';
import { PathwayDetails } from './pathway-details';
import { AssessmentReference } from './assessment-reference';

export function InterestProfile({ result }: { result: DiagnosisResult }) {
  // With a clear code its three letters lead as equal atlas entries; without one, no area is promoted.
  const order = result.code ? rankedDimensions(result.vector) : [...DIMENSIONS];
  const lead = result.code ? order.slice(0, 3) : [];
  const rest = result.code ? order.slice(3) : order;
  const score = (d: HollandType) => result.vector[DIMENSIONS.indexOf(d)];
  const meter = (d: HollandType) => (
    <meter className="interest-meter w-full h-3 mt-1" min={0} max={1} value={score(d)} aria-label={'Interés ' + HOLLAND_TYPES[d].name}>
      {Math.round(score(d) * 100)} de 100
    </meter>
  );
  return (
    <section aria-label="Perfil de intereses">
      <h2 className="text-3xl">
        {result.code ? (
          <>
            Código Holland <span className="font-sans font-semibold tracking-widest">{result.code}</span>
          </>
        ) : (
          'Todavía no aparece una preferencia clara.'
        )}
      </h2>
      <p className="text-ink-muted mt-3">
        {result.code
          ? 'Las letras resumen tus tres áreas con mayor puntuación. Describen intereses actuales; no miden tu capacidad ni deciden tu profesión.'
          : result.status === 'no-interest'
            ? 'Ninguna de estas actividades te interesó. Puedes revisar tus respuestas o explorar el catálogo sin una clasificación personal.'
            : result.status === 'flat'
              ? 'Las seis áreas quedaron iguales. Elegir una carrera por este orden sería arbitrario; explora actividades distintas antes de decidir.'
              : 'No aparece un interés por encima del punto neutral en ninguna área. Puedes probar experiencias nuevas y volver a responder.'}
      </p>
      {result.code && result.tied && (
        <p className="notice mt-4">
          Hay áreas empatadas, incluso dentro o en el límite del código. El orden entre ellas es convencional (RIASEC), no una preferencia
          demostrada.
        </p>
      )}
      {lead.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {lead.map((d) => (
            <div key={d} className="border-t border-ink/25 pt-4">
              <h3 className="text-2xl">
                {HOLLAND_TYPES[d].name} <span className="annotation font-sans">· {d}</span>
              </h3>
              <p className="text-sm tabular-nums mt-1">{Math.round(score(d) * 100)}/100</p>
              {meter(d)}
              <p className="mt-2">{HOLLAND_TYPES[d].description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        {lead.length > 0 && <h3 className="font-sans text-base font-semibold">Otras áreas</h3>}
        <div className="grid gap-3 mt-3">
          {rest.map((d) => (
            <div key={d}>
              <div className="flex justify-between gap-4 text-sm">
                <span>
                  {d} · {HOLLAND_TYPES[d].name}
                </span>
                <span className="tabular-nums">{Math.round(score(d) * 100)}/100</span>
              </div>
              {meter(d)}
              <p className="text-sm text-ink-muted">{HOLLAND_TYPES[d].description}</p>
            </div>
          ))}
        </div>
      </div>
      <details className="border-y border-ink/15 py-4 mt-6">
        <summary className="cursor-pointer font-medium min-h-[44px] flex items-center">Cómo interpretar este resultado</summary>
        <div className="space-y-3 mt-3 text-sm text-ink-muted">
          <p>
            Sumamos tus tres respuestas por área (3 a 15) y calculamos (suma − 3) ÷ 12. Las barras son interés declarado, no percentiles ni
            notas.
          </p>
          <p>
            El orden de las trayectorias compara la dirección de tus seis puntuaciones con el perfil de cada una (similitud coseno). No es
            una probabilidad de éxito, aptitud o empleo, por eso no lo mostramos como porcentaje.
          </p>
          <p>
            Esta adaptación de 18 preguntas se basa en RIASEC. Sus preguntas y perfiles de trayectoria son una propuesta editorial sin
            validación psicométrica local. La evidencia de otros instrumentos RIASEC no valida automáticamente esta adaptación.
          </p>
          <a href="https://www.onetcenter.org/reports/IP_Manual.html" target="_blank" rel="noreferrer" className="underline text-teal-deep">
            Consultar el marco RIASEC y el manual de O*NET ↗
          </a>
          <AssessmentReference />
        </div>
      </details>
    </section>
  );
}
export function DiagnosisResults({
  result,
  selected,
  onSelect,
}: {
  result: DiagnosisResult;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const chosen = PATHWAYS.find((p) => p.id === selected);
  const ids = [...result.topThree, ...(result.wildcardId ? [result.wildcardId] : [])];
  return (
    <div className="space-y-8">
      <InterestProfile result={result} />
      {ids.length > 0 && (
        <section aria-label="Trayectorias recomendadas">
          <h2 className="text-3xl">Caminos para explorar</h2>
          <p className="text-sm text-ink-muted mt-3">
            Ordenados por su parecido con tus respuestas. Puedes elegir cualquier otro camino.
          </p>
          <div className="grid gap-4 mt-5">
            {ids.map((id) => {
              const path = PATHWAYS.find((p) => p.id === id)!;
              const match = result.matches.find((m) => m.pathwayId === id)!;
              const discovery = id === result.wildcardId;
              return (
                <article key={id} className={'pt-5 ' + (selected === id ? 'border-t-2 border-teal-deep' : 'border-t border-ink/25')}>
                  <h3 className="text-2xl">{path.title}</h3>
                  <p className="annotation mt-1">
                    {discovery ? 'Descubrimiento · fuera de tus tres primeras opciones' : path.domain}
                  </p>
                  <p className="text-ink mt-2">
                    {discovery && result.wildcardDimension
                      ? 'Otra forma de explorar el área ' +
                        HOLLAND_TYPES[result.wildcardDimension].name.toLowerCase() +
                        ', que aparece segunda en el orden de tus puntuaciones.'
                      : 'Se relaciona con tus áreas ' +
                        match.sharedDimensions.map((d) => HOLLAND_TYPES[d].name.toLowerCase()).join(' y ') +
                        '.'}
                  </p>
                  <button
                    type="button"
                    className="button button-secondary mt-4"
                    aria-pressed={selected === id}
                    onClick={() => onSelect(id)}
                  >
                    Elegir {path.title}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}
      {/* The full catalog stays one step away: the only choice when nothing is recommended, a fallback otherwise. */}
      <details open={ids.length === 0 || (!!selected && !ids.includes(selected))} className="border-y border-ink/15 py-4">
        <summary className="cursor-pointer font-medium min-h-[44px] flex items-center">
          {ids.length ? 'Elegir otra trayectoria' : 'Elige una trayectoria para comenzar'}
        </summary>
        <label htmlFor="primary-pathway" className="field-label mt-3">
          Todas las trayectorias
        </label>
        <select id="primary-pathway" className="field" value={selected} onChange={(e) => onSelect(e.target.value)}>
          <option value="">Elige una trayectoria</option>
          {PATHWAYS.map((path) => (
            <option key={path.id} value={path.id}>
              {path.title}
            </option>
          ))}
        </select>
      </details>
      {chosen && (
        <section aria-label="Tu trayectoria elegida">
          <h2 className="text-3xl">{chosen.title}</h2>
          <PathwayDetails path={chosen} />
        </section>
      )}
    </div>
  );
}
