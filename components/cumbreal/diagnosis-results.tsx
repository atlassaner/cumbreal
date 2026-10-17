'use client';
import { DiagnosisResult, DIMENSIONS, HOLLAND_TYPES } from '@/lib/diagnosis';
import { PATHWAYS } from '@/lib/pathways';
import { PathwayDetails } from './pathway-details';

export function InterestProfile({ result }: { result: DiagnosisResult }) {
  return <section aria-label="Perfil de intereses">
    <p className="eyebrow">Tus intereses hoy</p>
    <h2 className="text-3xl mt-3">{result.code ? <>Código Holland <span className="font-sans font-semibold tracking-widest">{result.code}</span></> : 'Todavía no aparece una preferencia clara.'}</h2>
    <p className="text-ink-muted mt-3">{result.code ? 'Las letras resumen tus tres áreas con mayor puntuación. Describen intereses actuales; no miden tu capacidad ni deciden tu profesión.' : result.status === 'no-interest' ? 'Ninguna de estas actividades te interesó. Puedes revisar tus respuestas o explorar el catálogo sin una clasificación personal.' : result.status === 'flat' ? 'Las seis áreas quedaron iguales. Elegir una carrera por este orden sería arbitrario; explora actividades distintas antes de decidir.' : 'No aparece un interés por encima del punto neutral en ninguna área. Puedes probar experiencias nuevas y volver a responder.'}</p>
    {result.code && result.tied && <p className="notice mt-4">Hay áreas empatadas, incluso dentro o en el límite del código. El orden entre ellas es convencional (RIASEC), no una preferencia demostrada.</p>}
    <div className="grid gap-4 mt-6">{DIMENSIONS.map((d, i) => <div key={d}>
      <div className="flex justify-between gap-4 text-sm"><span><strong>{d} · {HOLLAND_TYPES[d].name}</strong></span><span className="tabular-nums">{Math.round(result.vector[i] * 100)}/100</span></div>
      <meter className="interest-meter w-full h-3 mt-1" min={0} max={1} value={result.vector[i]} aria-label={'Interés ' + HOLLAND_TYPES[d].name}>{Math.round(result.vector[i] * 100)} de 100</meter>
      <p className="text-sm text-ink-muted">{HOLLAND_TYPES[d].description}</p>
    </div>)}</div>
    <details className="border-y border-ink/15 py-4 mt-6"><summary className="cursor-pointer font-medium min-h-[44px] flex items-center">Cómo interpretar este resultado</summary>
      <div className="space-y-3 mt-3 text-sm text-ink-muted">
        <p>Sumamos tus tres respuestas por área (3 a 15) y calculamos (suma − 3) ÷ 12. Las barras son interés declarado, no percentiles ni notas.</p>
        <p>La coincidencia compara la dirección de tus seis puntuaciones con el perfil de cada trayectoria mediante similitud coseno × 100. No es una probabilidad de éxito, aptitud o empleo; perfiles muy distintos pueden compartir un porcentaje parecido.</p>
        <p>Esta adaptación de 18 preguntas se basa en RIASEC. Sus preguntas y perfiles de trayectoria son una propuesta editorial sin validación psicométrica local. La evidencia de otros instrumentos RIASEC no valida automáticamente esta adaptación.</p>
        <a href="https://www.onetcenter.org/reports/IP_Manual.html" target="_blank" rel="noreferrer" className="underline text-teal-deep">Consultar el marco RIASEC y el manual de O*NET ↗</a>
      </div>
    </details>
  </section>;
}
export function DiagnosisResults({ result, selected, onSelect }: { result: DiagnosisResult; selected: string; onSelect: (id: string) => void }) {
  const chosen = PATHWAYS.find(p => p.id === selected);
  const ids = [...result.topThree, ...(result.wildcardId ? [result.wildcardId] : [])];
  return <div className="space-y-8">
    <InterestProfile result={result} />
    {ids.length > 0 && <section aria-label="Trayectorias recomendadas"><h2 className="text-3xl">Tres caminos para explorar</h2><p className="text-sm text-ink-muted mt-3">Ordenados por coincidencia matemática con tus respuestas. Puedes elegir otro camino.</p>
      <div className="grid gap-4 mt-5">{ids.map((id, i) => {
        const path = PATHWAYS.find(p => p.id === id)!;
        const match = result.matches.find(m => m.pathwayId === id)!;
        const discovery = id === result.wildcardId;
        return <article key={id} className={'rounded-lg border p-5 ' + (selected === id ? 'border-teal bg-teal-light' : 'border-ink/20')}>
          <p className="eyebrow">{discovery ? 'Descubrimiento · fuera de tus tres primeras opciones' : '0' + (i + 1) + ' · ' + path.domain}</p>
          <h3 className="text-2xl mt-2">{path.title}</h3><p className="font-medium mt-2">{match.matchScore}% de coincidencia de intereses</p>
          <p className="text-sm text-ink-muted mt-2">{discovery && result.wildcardDimension ? 'Otra forma de explorar el área ' + HOLLAND_TYPES[result.wildcardDimension].name.toLowerCase() + ', que aparece segunda en el orden de tus puntuaciones.' : 'Las áreas que más aportan a esta coincidencia son ' + match.sharedDimensions.map(d => HOLLAND_TYPES[d].name.toLowerCase()).join(' y ') + '.'}</p>
          <button type="button" className="button button-secondary mt-4" aria-pressed={selected === id} onClick={() => onSelect(id)}>Elegir {path.title}</button>
        </article>;
      })}</div>
    </section>}
    <div><label htmlFor="primary-pathway" className="field-label">Tu trayectoria para comenzar · puedes elegir cualquiera</label><select id="primary-pathway" className="field" value={selected} onChange={e => onSelect(e.target.value)}><option value="">Elige una trayectoria</option>{PATHWAYS.map(path => <option key={path.id} value={path.id}>{path.title}</option>)}</select></div>
    {chosen && <section aria-label="Tu trayectoria elegida"><h2 className="text-3xl">{chosen.title}</h2><PathwayDetails path={chosen}/></section>}
  </div>;
}
