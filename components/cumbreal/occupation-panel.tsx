import { OCCUPATIONAL_CONTEXT, OCCUPATIONS_REVIEWED_AT } from '@/lib/occupations';

export function OccupationPanel({ pathwayId }: { pathwayId: string }) {
  const context = OCCUPATIONAL_CONTEXT[pathwayId];
  if (!context) return null;

  return <section aria-label="Ocupaciones relacionadas" className="border-t border-ink/15 pt-5">
    <p className="eyebrow">Del aprendizaje al trabajo</p>
    <h3 className="font-sans text-lg font-semibold mt-2">¿En qué podrías trabajar?</h3>
    <p className="text-sm text-ink-muted mt-2">Explora ocupaciones relacionadas con esta trayectoria. Son ejemplos para investigar, no vacantes ni una recomendación automática de empleo.</p>
    <ul className="mt-4 space-y-3">{context.occupations.map(occupation => <li key={occupation.title} className="rounded-lg bg-canvas-subtle p-4">
      <h4 className="font-sans font-semibold">{occupation.title}</h4>
      <p className="text-sm text-ink-muted mt-2"><strong>Qué preparar:</strong> {occupation.preparation}</p>
    </li>)}</ul>
    {context.independentPath && <p className="text-sm mt-4"><strong>También por cuenta propia:</strong> {context.independentPath}</p>}
    <p className="text-sm text-ink-muted mt-4">La preparación resume perfiles formativos; cada puesto puede pedir estudios, experiencia o acreditaciones diferentes. Tu primer proyecto permite explorar y practicar, pero no certifica competencia profesional.</p>
    {context.sourceNote && <p className="text-sm text-ink-muted mt-3">{context.sourceNote}</p>}
    <a href={context.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center min-h-[44px] text-teal-deep text-sm underline mt-2">Consultar perfil formativo · {context.sourceLabel} ↗</a>
    <p className="text-xs text-ink-muted mt-1">Fuentes consultadas: {OCCUPATIONS_REVIEWED_AT}. Cumbreal todavía no ofrece intermediación ni colocación laboral.</p>
  </section>;
}
