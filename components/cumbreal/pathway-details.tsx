import { Pathway, CATALOG_REVIEWED_AT } from '@/lib/pathways';
import { OccupationPanel } from './occupation-panel';
export function PathwayDetails({ path }: { path: Pathway }) {
  return <div className="space-y-6 mt-5">
    <p className="text-ink-muted">{path.description}</p>
    <section><h3 className="font-sans text-lg font-semibold">Rutas educativas en El Salvador</h3>
      <p className="text-sm text-ink-muted mt-2">Son alternativas, no pasos obligatorios. Confirma sede, requisitos, costos, becas y convocatoria con cada institución.</p>
      <ul className="divide-y divide-ink/15 mt-3">{path.educationalOptions.map((option, i) => <li key={i} className="py-4">
        <p className="eyebrow">{option.level}</p><p className="font-medium mt-1">{option.program}</p>
        <p className="text-sm text-ink-muted">{option.institution}</p>
        <a href={option.sourceUrl} target="_blank" rel="noreferrer" className="text-teal-deep text-sm underline">Consultar fuente oficial <span className="sr-only">de {option.program}</span> ↗</a>
        {option.note && <p className="text-sm text-ink-muted">{option.note}</p>}
      </li>)}</ul><p className="text-xs text-ink-muted">Fuentes consultadas: {CATALOG_REVIEWED_AT}. La publicación de un programa no garantiza cupos disponibles.</p>
    </section>
    <section className="rounded-lg bg-canvas-subtle p-4"><h3 className="font-sans text-lg font-semibold">Tu primer proyecto</h3><p className="mt-2">{path.starterProject}</p><p className="text-sm text-ink-muted mt-3"><strong>Evidencia para guardar:</strong> {path.evidence}</p></section>
    <div className="flex flex-wrap gap-2">{path.skills.map(skill => <span className="tag" key={skill}>{skill}</span>)}</div>
    <OccupationPanel pathwayId={path.id}/>
  </div>;
}
